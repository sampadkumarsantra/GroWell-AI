
const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {
    try {
        const { text, targetLanguage } = req.body;

        if (!text || !targetLanguage) {
            return res.status(400).json({
                success: false,
                message: "Text and target language are required",
            });
        }

        // English does not need translation
        if (targetLanguage === "en") {
            return res.json({
                success: true,
                translation: text,
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

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a professional agricultural translator. Translate accurately and naturally for farmers.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.2,
        });

        const translation =
            completion.choices?.[0]?.message?.content?.trim();

        if (!translation) {
            throw new Error("No translation returned");
        }

        res.json({
            success: true,
            translation,
        });
    } catch (error) {
        console.error("Translation error:", error);

        res.status(500).json({
            success: false,
            message: "Translation failed",
        });
    }
});

module.exports = router;

