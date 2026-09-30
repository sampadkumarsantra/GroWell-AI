const express = require("express");
const Groq = require("groq-sdk");

const {
    authenticateToken,
    getEntitlement
} = require("../middleware/auth");
const {
    PLANS,
    remaining,
    recordUsage
} = require("../services/entitlements");

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


/*
 * Every translated answer is a voice answer, because the farmer
 * is speaking to the phone. This is the second metered surface —
 * free tier gets a monthly allowance, Premium is unlimited.
 */

router.post(
    "/",
    authenticateToken,
    async (req, res) => {

        try {

            const { text, targetLanguage } = req.body;

            if (!text || !targetLanguage) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Text and target language are required"
                });
            }

            const entitlement = await getEntitlement(
                req.user.id
            );

            const plan = PLANS[entitlement.plan];

            const left = await remaining(
                req.user.id,
                plan.id,
                "voice"
            );

            if (left !== null && left <= 0) {
                return res.status(402).json({
                    success: false,
                    code: "QUOTA_EXCEEDED",
                    message:
                        "You have used this month's free voice questions. GroWell Premium makes voice unlimited.",
                    entitlement: {
                        plan: plan.id,
                        isPremium: false,
                        voiceRemaining: 0
                    }
                });
            }

            // English is a pass-through, so it must never be
            // charged against the quota.
            if (targetLanguage === "en") {
                return res.json({
                    success: true,
                    translation: text
                });
            }

            const prompt = `
Translate the following agricultural information into ${targetLanguage}.

Rules:
- Preserve the exact meaning.
- Use simple language suitable for farmers.
- Do not add extra information.
- Do not remove information.
- Keep scientific names unchanged.
- Keep chemical names unchanged.
- Keep numbers, units, pH values and NPK values unchanged.
- Return ONLY the translated text.

Text:
${text}
`;

            const completion =
                await groq.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a professional agricultural translator. Translate accurately and naturally for farmers."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.2
                });

            const translation =
                completion?.choices?.[0]?.message
                    ?.content?.trim();

            if (!translation) {
                throw new Error(
                    "No translation returned"
                );
            }

            await recordUsage(req.user.id, "voice");

            const voiceRemaining = await remaining(
                req.user.id,
                plan.id,
                "voice"
            );

            res.json({
                success: true,
                translation,
                entitlement: {
                    plan: plan.id,
                    isPremium: entitlement.isPremium,
                    voiceRemaining
                }
            });

        } catch (error) {

            console.error("Translation error:", error);

            res.status(500).json({
                success: false,
                message: "Translation failed"
            });

        }

    }
);


module.exports = router;
