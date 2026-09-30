const express = require("express");

const db = require("../database/pool");
const billing = require("../services/billing");
const {
    authenticateToken,
    getEntitlement,
    ensureSubscription,
    describeUser
} = require("../middleware/auth");

const router = express.Router();


// =====================================================
// PLANS (public — the pricing page needs this before login)
// =====================================================

router.get("/plans", (req, res) => {

    res.json({
        success: true,
        configured: billing.isConfigured(),
        razorpayKeyId: process.env.RAZORPAY_KEY_ID || "",
        currency: "INR",
        plans: billing.publicPlans()
    });

});


// =====================================================
// SUBSCRIBE
// =====================================================

router.post(
    "/subscribe",
    authenticateToken,
    async (req, res) => {

        try {

            await ensureSubscription(req.user.id);

            const user = await db.get(
                `SELECT id, name, email
                 FROM users
                 WHERE id = $1`,
                [req.user.id]
            );

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User account no longer exists."
                });
            }

            const subscription =
                await billing.createSubscription(user);

            return res.json({
                success: true,
                subscriptionId: subscription.id,
                shortUrl: subscription.shortUrl,
                keyId: process.env.RAZORPAY_KEY_ID
            });

        } catch (error) {

            console.error(
                "❌ SUBSCRIBE ERROR:",
                error
            );

            if (
                error.code ===
                "BILLING_NOT_CONFIGURED"
            ) {
                return res.status(503).json({
                    success: false,
                    message:
                        "Payments are not available right now. Please try again later."
                });
            }

            return res.status(500).json({
                success: false,
                message:
                    "Could not start the subscription. Please try again."
            });

        }

    }
);


// =====================================================
// STATUS
// =====================================================

router.get(
    "/status",
    authenticateToken,
    async (req, res) => {

        try {

            // Repair any drift before answering.
            await billing.reconcile(req.user.id);

            const entitlement =
                await getEntitlement(req.user.id);

            return res.json({
                success: true,
                ...entitlement
            });

        } catch (error) {

            console.error(
                "❌ BILLING STATUS ERROR:",
                error
            );

            return res.status(500).json({
                success: false,
                message: "Could not read your plan."
            });

        }

    }
);


// =====================================================
// CANCEL
// =====================================================

router.post(
    "/cancel",
    authenticateToken,
    async (req, res) => {

        try {

            await billing.cancelSubscription(
                req.user.id
            );

            const entitlement =
                await getEntitlement(req.user.id);

            return res.json({
                success: true,
                message:
                    "Your plan will not renew. You keep Premium until the end of the period you already paid for.",
                ...entitlement
            });

        } catch (error) {

            console.error(
                "❌ CANCEL ERROR:",
                error
            );

            if (
                error.code ===
                "NOTHING_TO_CANCEL"
            ) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message:
                    "Could not cancel the subscription. Please try again."
            });

        }

    }
);


// =====================================================
// WEBHOOK
// =====================================================
//
// The only endpoint allowed to grant Premium. The signature is
// checked against the raw body before anything is parsed, so a
// forged or replayed call cannot reach the database.
//
// =====================================================

router.post(
    "/webhook",
    async (req, res) => {

        const signature =
            req.headers["x-razorpay-signature"];

        const valid =
            billing.verifyWebhookSignature(
                req.rawBody,
                signature
            );

        if (!valid) {
            console.warn(
                "🚫 Rejected Razorpay webhook: bad signature"
            );
            return res.status(400).json({
                success: false
            });
        }

        const event = req.body || {};
        const type = event.event;

        // Razorpay retries anything that is not 2xx.
        if (!type) {
            return res.json({ success: true });
        }

        console.log(
            `💳 Razorpay event: ${type}`
        );

        try {

            const entity = event.payload &&
                event.payload.subscription &&
                event.payload.subscription.entity;

            if (entity) {
                const applied =
                    await billing.applySubscriptionEntity(
                        entity
                    );

                if (applied) {
                    console.log(
                        `   → user ${applied.userId} → ${applied.plan} (${applied.status})`
                    );
                }
            }

            return res.json({ success: true });

        } catch (error) {

            console.error(
                "❌ WEBHOOK ERROR:",
                error
            );

            return res.status(500).json({
                success: false
            });

        }

    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;
