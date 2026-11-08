
const { GoogleGenAI } = require("@google/genai");

// =====================================================
// GEMINI CONFIGURATION
// =====================================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// You can change this later from .env
// Example:
// GEMINI_VISION_MODEL=gemini-1.5-flash
const GEMINI_VISION_MODEL =
    process.env.GEMINI_VISION_MODEL || "gemini-1.5-flash";

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
    "gemini-1.5-pro",
    "gemini-1.5-flash-8b",
    "gemini-1.0-pro-vision"
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
You are GroWell Vision - India's most advanced agricultural crop disease and pest diagnosis AI.

STEP-BY-STEP DIAGNOSIS:
1. Identify the crop species from visual cues (leaf shape, venation, color, stem, fruit if visible).
2. Analyze ALL visible symptoms methodically and completely.
3. Cross-reference symptoms against the most common diseases/pests for that crop in Indian conditions.
4. Consider: fungal (blast, blight, rust, mildew, wilt, anthracnose), bacterial (leaf spot, canker, blight), viral (mosaic, yellowing, curl), insect (mite webbing, aphid colonies, thrips silvering, stem borer deadheart, whitefly+sooty mold), nutrient deficiency (N=uniform yellowing older leaves, Fe=interveinal chlorosis young, Zn=stunting+small leaves+bronzing, Mg=interveinal older leaves, B=distorted tips).
5. Rate confidence HONESTLY based on image quality and symptom clarity.

Return ONLY valid JSON - no markdown, no code fences, nothing else before or after the JSON object.

{
    "crop": "Common name + scientific name in parentheses. Example: Paddy (Oryza sativa). Write 'Unable to identify crop reliably from image' if unclear.",
    "disease": "Primary condition with pathogen/pest in parentheses. Example: Rice Blast (Magnaporthe oryzae). Use 'Suspected ...' prefix if uncertain.",
    "confidence": "Realistic percentage with brief reason for that confidence level. Example: 84% - classic diamond-shaped lesions with gray centers visible on multiple leaves. NEVER use 100%.",
    "severity": "One of: Low / Moderate / High / Critical. Then: estimated % leaf area affected and whether damage is localized (few plants) or widespread (whole field).",
    "symptoms": "Comprehensive visible symptom description covering ALL: (1) Leaf symptoms - specific colors, pattern, location on plant (upper/lower canopy, leaf tip/margin/interveinal), (2) Lesion details - shape, size range, colors of center and margin, presence of halos or water-soaking, (3) Other plant parts visible - stem, collar, root crown, fruit, flowers, (4) Secondary signs - fungal sporulation color, bacterial ooze, pest frass, webbing, egg masses, honeydew and sooty mold, (5) Distribution - which leaves and plants are affected and spreading direction.",
    "cause": "Pathogen/pest biology and epidemiology: specific scientific name, infection and spread mechanism (airborne spores/rain splash/soil-borne/insect vector/seed-borne), environmental conditions that favor outbreak (temperature range, humidity threshold, leaf wetness hours, plant density, irrigation type). Include Indian seasonal context if relevant.",
    "organicTreatment": "5-6 specific organic and cultural management steps with timing: (1) Immediate sanitation action, (2) Specific biocontrol agent with application method such as Trichoderma viride 4g/L spray on affected area, (3) Cultural practice change, (4) Nutrient correction if deficiency involved with specific dose, (5) Resistant or tolerant Indian varieties to consider for next crop with 2-3 names, (6) Water management adjustment.",
    "chemicalTreatment": "Chemical management options with active ingredient class and example generic or brand name common in India. Include: fungicide or insecticide class such as systemic triazole fungicide, example active ingredient such as Propiconazole 25EC, application method and frequency. ALWAYS end with: Follow the registered product label strictly. Observe the Pre-Harvest Interval (PHI). Consult your local KVK (Krishi Vigyan Kendra) or agricultural extension officer before purchase.",
    "prevention": "7-8 specific prevention measures: (1) Resistant or tolerant Indian varieties with 2-3 names, (2) Seed treatment protocol, (3) Crop rotation with specific previous and next crop recommendations, (4) Field sanitation covering stubble management and weed hosts, (5) Optimal plant spacing and canopy management, (6) Irrigation management, (7) Balanced nutrition highlighting specific nutrients that increase susceptibility, (8) Monitoring protocol with scouting frequency and economic threshold level (ETL) if applicable.",
    "recommendation": "Structured action plan: (1) IMMEDIATE within 0-24 hours - exact action to take today, (2) THIS WEEK - spray or treatment schedule with timing, (3) NEXT 2-4 WEEKS - monitoring schedule with signs of improvement or worsening, (4) ESCALATE - specific conditions requiring KVK or laboratory or plant pathologist consultation, (5) ECONOMIC IMPACT - estimated yield loss if untreated as percentage and approximate INR loss per acre, and estimated treatment cost per acre in INR."
}
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
