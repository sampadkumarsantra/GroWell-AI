const express = require("express");
const router = express.Router();

const { generateResponse } = require("../services/ai");
const {
    authenticateToken,
    getEntitlement
} = require("../middleware/auth");
const {
    PLANS,
    effortAllowed,
    remaining,
    recordUsage
} = require("../services/entitlements");


/*
 * Chat is metered rather than hard-gated: the farmer always gets
 * an answer on the free tier, but the daily cap and the
 * reasoning tier are enforced here, on the server. The client's
 * idea of what a user is allowed is never trusted.
 */

router.post(
    "/",
    authenticateToken,
    async (req, res) => {

        try {

            const { message, settings } = req.body;

            if (!message || !message.trim()) {
                return res.status(400).json({
                    reply: "Please enter a message."
                });
            }

            const userSettings = settings || {};

            // Read the live plan from the database on every
            // message, so a lapse takes effect immediately
            // rather than whenever the token happens to expire.
            const entitlement = await getEntitlement(
                req.user.id
            );

            const isPremium = entitlement.isPremium;
            const plan = PLANS[entitlement.plan];

            /*
             * =========================================
             * DAILY QUOTA
             * =========================================
             */

            const left = await remaining(
                req.user.id,
                plan.id,
                "chat"
            );

            if (left !== null && left <= 0) {
                return res.status(402).json({
                    success: false,
                    code: "QUOTA_EXCEEDED",
                    reply:
                        "You have used today's free questions. GroWell Premium removes the daily limit and unlocks Deep Reasoning.",
                    entitlement: {
                        plan: plan.id,
                        isPremium: false,
                        chatRemaining: 0
                    }
                });
            }

            /*
             * =========================================
             * REASONING TIER
             * =========================================
             */

            const requestedEffort =
                userSettings.effort || "Balanced";

            const effort =
                effortAllowed(plan.id, requestedEffort)
                    ? requestedEffort
                    : plan.maxEffort;

            /*
             * =========================================
             * GENERATE
             * =========================================
             */

            const reply = await generateResponse(
                message,
                {
                    ...userSettings,
                    effort
                },
                {
                    isPremium
                }
            );

            await recordUsage(req.user.id, "chat");

            const chatRemaining = await remaining(
                req.user.id,
                plan.id,
                "chat"
            );

            res.json({
                reply,
                effort,
                deepReasoning: effort === "Deep",
                entitlement: {
                    plan: plan.id,
                    isPremium,
                    chatRemaining,
                    maxEffort: plan.maxEffort
                }
            });

        } catch (error) {

            console.error(
                "CHAT ROUTE ERROR:",
                error
            );

            res.status(500).json({
                reply:
                    "❌ GroWell AI could not generate a response. Please check that the backend and Groq API are running."
            });

        }

    }
);


module.exports = router;
