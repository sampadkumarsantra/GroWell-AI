
const { GoogleGenAI } = require("@google/genai");

// =====================================================
// GEMINI CONFIGURATION
// =====================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// You can change this later from .env
// Example:
// GEMINI_VISION_MODEL=gemini-3.8-flash
const GEMINI_VISION_MODEL =
    process.env.GEMINI_VISION_MODEL || "gemini-3.8-flash";

if (!GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing from .env");
} else {
    console.log("✅ Gemini API key loaded");
    console.log(
        "🔬 Gemini Vision Model:",
        GEMINI_VISION_MODEL
    );
}

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});


// =====================================================
// RATE LIMIT / AVAILABILITY DETECTION
// =====================================================

function isRateLimitError(error) {

    if (
        error?.status === 429 ||
        error?.statusCode === 429
    ) {

        return true;

    }

    const message =
        String(error?.message || "").toLowerCase();

    return (
        message.includes("429") ||
        message.includes("quota") ||
        message.includes("rate limit") ||
        message.includes("too many requests") ||
        message.includes("limit reached")
    );

}

function isAvailabilityError(error) {

    if (
        error?.status === 503 ||
        error?.statusCode === 503
    ) {

        return true;

    }

    const message =
        String(error?.message || "").toLowerCase();

    return (
        message.includes("503") ||
        message.includes("unavailable") ||
        message.includes("high demand") ||
        message.includes("overloaded") ||
        message.includes("try again later")
    );

}


// =====================================================
// MODEL FALLBACK CHAIN
// =====================================================

const FALLBACK_MODELS = [
    "gemini-3.5-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-3.7-flash"
];

function buildModelChain() {

    const chain = [GEMINI_VISION_MODEL];

    for (const model of FALLBACK_MODELS) {

        if (!chain.includes(model)) {

            chain.push(model);

        }

    }

    return chain;

}


// =====================================================
// CROP IMAGE DIAGNOSIS
// =====================================================

async function analyzeCropImage(file) {

    try {

        console.log("");
        console.log("======================================");
        console.log("🔬 GROWELL VISION");
        console.log("======================================");


        // -------------------------------------------------
        // CHECK API KEY
        // -------------------------------------------------

        if (!GEMINI_API_KEY) {

            throw new Error(
                "Gemini API key is missing. Add GEMINI_API_KEY to your server .env file."
            );

        }


        // -------------------------------------------------
        // CHECK IMAGE
        // -------------------------------------------------

        if (!file) {

            throw new Error(
                "No crop image was received."
            );

        }

        if (!file.buffer) {

            throw new Error(
                "Crop image data is missing."
            );

        }

        if (!file.mimetype) {

            throw new Error(
                "Crop image type is missing."
            );

        }


        // -------------------------------------------------
        // ALLOWED IMAGE TYPES
        // -------------------------------------------------

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.mimetype)) {

            throw new Error(
                "Please upload a JPG, PNG or WebP crop image."
            );

        }


        // -------------------------------------------------
        // IMAGE SIZE CHECK
        // -------------------------------------------------

        const maxSize =
            10 * 1024 * 1024;

        if (file.buffer.length > maxSize) {

            throw new Error(
                "Image is too large. Please upload an image smaller than 10 MB."
            );

        }


        console.log(
            "📷 Image type:",
            file.mimetype
        );

        console.log(
            "📦 Image size:",
            Math.round(
                file.buffer.length / 1024
            ),
            "KB"
        );


        // -------------------------------------------------
        // CONVERT IMAGE TO BASE64
        // -------------------------------------------------

        const imageBase64 =
            file.buffer.toString("base64");


        // =================================================
        // AGRICULTURAL VISION PROMPT
        // =================================================

        const prompt = `

You are GroWell Vision, an agricultural crop diagnosis AI.

Analyze the uploaded crop image carefully.

Your diagnosis MUST be based primarily on visible evidence in the image.

Do not invent symptoms.

If the image is unclear, damaged, too distant, poorly lit,
or does not contain enough information for diagnosis,
say that the diagnosis is uncertain.

Do not claim certainty when the image does not support it.

Consider these possible categories:

- fungal disease
- bacterial disease
- viral disease
- insect or pest damage
- nutrient deficiency
- nutrient toxicity
- water stress
- heat stress
- cold stress
- physical damage
- herbicide injury
- other environmental stress


IMPORTANT SAFETY RULES:

- Never fabricate pesticide doses.
- Never provide pesticide mixing instructions.
- Do not recommend a chemical unless it is reasonably appropriate.
- Mention active ingredients or product categories only when appropriate.
- Always tell the farmer to follow the registered product label.
- Encourage local agricultural-extension confirmation for uncertain cases.


RETURN ONLY VALID JSON.

Do NOT use Markdown.

Do NOT use code fences.

Do NOT write anything before or after the JSON.


Use EXACTLY these fields:

{
    "crop": "",
    "disease": "",
    "confidence": "",
    "severity": "",
    "symptoms": "",
    "cause": "",
    "organicTreatment": "",
    "chemicalTreatment": "",
    "prevention": "",
    "recommendation": ""
}


FIELD RULES:


crop:

Identify the crop if reasonably possible.

If possible, include the common crop name.

If the crop cannot be identified reliably, say:

"Unable to identify crop reliably from image."


disease:

Identify the most likely condition.

This can be:

- disease
- pest
- nutrient disorder
- environmental stress
- physical damage

If uncertain, start with:

"Suspected ..."


confidence:

Give a realistic percentage.

Examples:

"90%"
"75%"
"45%"

Do not use 100% unless the image provides exceptionally strong evidence.


severity:

Use exactly one:

Low
Moderate
High

Then briefly explain the visible severity.


symptoms:

Describe ONLY visible symptoms.

Mention where possible:

- leaf colour
- spots
- lesions
- margins
- holes
- curling
- wilting
- necrosis
- yellowing
- tissue distortion
- stem symptoms
- fruit symptoms
- distribution across plant


cause:

Explain the most likely cause.

Consider:

- pathogen
- insect
- nutrient problem
- moisture
- temperature
- humidity
- management
- environmental stress


organicTreatment:

Give practical non-chemical management.

Examples:

- sanitation
- removal of severely affected leaves
- drainage
- irrigation management
- biological control
- resistant varieties
- crop rotation
- field hygiene
- balanced nutrition


chemicalTreatment:

Only recommend chemical treatment if appropriate.

Do NOT give mixing instructions.

Do NOT invent doses.

Use wording such as:

"Use a locally registered product containing an appropriate active ingredient, following the product label and local agricultural recommendations."


prevention:

Give practical prevention measures.

Include relevant measures such as:

- field sanitation
- crop rotation
- healthy planting material
- resistant varieties
- drainage
- irrigation management
- balanced nutrition
- regular scouting
- weather monitoring


recommendation:

Give a practical farmer action plan.

Structure the content internally as:

1. Inspect immediately
2. Action to take today
3. What to monitor
4. When treatment should be considered
5. When expert confirmation is needed

Keep the recommendations practical and understandable.

`;


        console.log(
            "🚀 Sending crop image to Gemini..."
        );


        // =================================================
        // GEMINI REQUEST (WITH MODEL FALLBACK + RETRY)
        // =================================================

        const modelChain = buildModelChain();

        let response;
        let lastError = null;

        for (const model of modelChain) {

            console.log(
                `📡 Trying Gemini model: ${model}`
            );

            for (let attempt = 1; attempt <= 2; attempt++) {

                try {

                    response =
                        await ai.models.generateContent({

                            model,

                            contents: [

                                {

                                    role: "user",

                                    parts: [

                                        {
                                            text: prompt
                                        },

                                        {

                                            inlineData: {

                                                mimeType:
                                                    file.mimetype,

                                                data:
                                                    imageBase64

                                            }

                                        }

                                    ]

                                }

                            ],

                            config: {

                                responseMimeType:
                                    "application/json",

                                temperature: 0.2

                            }

                        });

                    lastError = null;

                    console.log(
                        `✅ Gemini model ${model} succeeded`
                    );

                    break;

                }

                catch (requestError) {

                    lastError = requestError;

                    const temporary =
                        isRateLimitError(requestError) ||
                        isAvailabilityError(requestError);

                    console.warn(
                        `⚠️ Gemini model ${model} attempt ${attempt} failed:`,
                        requestError?.message
                    );

                    // Temporary overload/rate limit:
                    // wait briefly and retry the same model,
                    // then move to the next model.
                    if (
                        attempt === 1 &&
                        temporary
                    ) {

                        console.log(
                            "⏳ Waiting 2 seconds before retrying..."
                        );

                        await new Promise(
                            resolve => setTimeout(resolve, 2000)
                        );

                        continue;

                    }

                    console.log(
                        `➡️ Moving to next Gemini model...`
                    );

                    break;

                }

            }

            if (response) {

                break;

            }

        }

        if (!response) {

            if (
                lastError &&
                isRateLimitError(lastError)
            ) {

                const rateError = new Error(
                    "Crop diagnosis is temporarily busy. The AI service has reached its request limit (429). Please wait a minute and try again."
                );

                rateError.status = 429;

                throw rateError;

            }

            if (
                lastError &&
                isAvailabilityError(lastError)
            ) {

                const unavailableError = new Error(
                    "Crop diagnosis is temporarily unavailable. The AI model is experiencing high demand. Please wait a moment and try again."
                );

                unavailableError.status = 503;

                throw unavailableError;

            }

            throw new Error(
                lastError?.message ||
                "All Gemini models failed to analyze the crop image."
            );

        }


        // =================================================
        // GET RESPONSE TEXT
        // =================================================

        let text =
            response?.text;


        if (!text) {

            throw new Error(
                "Gemini returned an empty diagnosis."
            );

        }


        text =
            text
                .trim();


        console.log(
            "✅ Gemini response received"
        );


        // =================================================
        // CLEAN MARKDOWN IF GEMINI ADDS IT
        // =================================================

        if (text.startsWith("```")) {

            text =
                text
                    .replace(
                        /^```json\s*/i,
                        ""
                    )
                    .replace(
                        /^```\s*/i,
                        ""
                    )
                    .replace(
                        /\s*```$/i,
                        ""
                    )
                    .trim();

        }


        // =================================================
        // PARSE JSON
        // =================================================

        let result;

        try {

            result =
                JSON.parse(text);

        }

        catch (parseError) {

            console.error(
                "❌ Gemini returned invalid JSON:"
            );

            console.error(text);

            throw new Error(
                "Gemini returned an invalid diagnosis response."
            );

        }


        // =================================================
        // NORMALIZE RESULT
        // =================================================

        const diagnosis = {

            crop:
                result.crop ||
                "Unable to identify crop reliably from image.",

            disease:
                result.disease ||
                "No specific condition could be identified.",

            confidence:
                result.confidence ||
                "Not available",

            severity:
                result.severity ||
                "Not available",

            symptoms:
                result.symptoms ||
                "No clear symptoms could be determined from the image.",

            cause:
                result.cause ||
                "The cause could not be determined reliably from the image.",

            organicTreatment:
                result.organicTreatment ||
                "Further assessment is recommended before treatment.",

            chemicalTreatment:
                result.chemicalTreatment ||
                "Chemical treatment should only be considered after confirming the condition.",

            prevention:
                result.prevention ||
                "Maintain good field sanitation and regular crop monitoring.",

            recommendation:
                result.recommendation ||
                "Inspect the affected plant closely and seek local agricultural guidance if symptoms continue."

        };


        // =================================================
        // LOG RESULT
        // =================================================

        console.log("");
        console.log("🌱 CROP:", diagnosis.crop);
        console.log("🦠 CONDITION:", diagnosis.disease);
        console.log("📊 CONFIDENCE:", diagnosis.confidence);
        console.log("⚠️ SEVERITY:", diagnosis.severity);
        console.log("======================================");
        console.log("");


        return diagnosis;


    }

    catch (error) {

        console.error("");
        console.error(
            "❌ GROWELL VISION ERROR"
        );
        console.error(
            error?.message || error
        );
        console.error("");


        // Keep useful error message for diagnose route

        if (
            isRateLimitError(error)
        ) {

            const rateError = new Error(
                "Crop diagnosis is temporarily busy. The AI service has reached its request limit (429). Please wait a minute and try again."
            );

            rateError.status = 429;

            throw rateError;

        }


        if (
            error?.message?.includes(
                "not found"
            )
        ) {

            throw new Error(
                `Gemini Vision model "${GEMINI_VISION_MODEL}" is unavailable. Check GEMINI_VISION_MODEL in your .env file.`
            );

        }


        if (
            error?.status === 401 ||
            error?.status === 403
        ) {

            throw new Error(
                "Gemini API authentication failed. Check GEMINI_API_KEY in your .env file."
            );

        }


        throw new Error(
            error?.message ||
            "Failed to analyze crop image."
        );

    }

}


// =====================================================
// EXPORT
// =====================================================

module.exports = {
    analyzeCropImage
};
