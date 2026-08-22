const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});


/*
|--------------------------------------------------------------------------
| VALIDATION HELPERS
|--------------------------------------------------------------------------
*/

function numberOrNull(value) {
    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {
        return null;
    }

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : null;
}


function validateRange(value, min, max) {
    if (value === null) {
        return null;
    }

    if (value < min || value > max) {
        return null;
    }

    return value;
}


/*
|--------------------------------------------------------------------------
| FARM DATA VALIDATION
|--------------------------------------------------------------------------
*/

function validateFarmData(data = {}) {

    const crop = String(data.crop || "").trim();

    const growthStage = String(
        data.growthStage || ""
    ).trim();

    const soilType = String(
        data.soilType || ""
    ).trim();


    /*
    SOIL
    */

    const soil = data.soil || {};

    const ph = validateRange(
        numberOrNull(soil.ph),
        3,
        10
    );

    const ec = validateRange(
        numberOrNull(soil.ec),
        0,
        20
    );

    const organicCarbon = validateRange(
        numberOrNull(soil.organicCarbon),
        0,
        10
    );

    const nitrogen = validateRange(
        numberOrNull(soil.nitrogen),
        0,
        500
    );

    const phosphorus = validateRange(
        numberOrNull(soil.phosphorus),
        0,
        500
    );

    const potassium = validateRange(
        numberOrNull(soil.potassium),
        0,
        1000
    );


    /*
    WEATHER
    */

    const weather = data.weather || {};

    const temperature = validateRange(
        numberOrNull(weather.temperature),
        -10,
        60
    );

    const humidity = validateRange(
        numberOrNull(weather.humidity),
        0,
        100
    );

    const rainfall = validateRange(
        numberOrNull(weather.rainfall),
        0,
        1000
    );

    const condition = String(
        weather.condition || ""
    ).trim();


    /*
    REQUIRED FARM CONTEXT
    */

    const errors = [];


    if (!crop) {
        errors.push("Crop is required.");
    }

    if (!growthStage) {
        errors.push("Growth stage is required.");
    }

    if (!soilType) {
        errors.push("Soil type is required.");
    }


    /*
    INVALID NUMERIC VALUES
    */

    if (
        soil.ph !== "" &&
        soil.ph !== undefined &&
        ph === null
    ) {
        errors.push(
            "Soil pH must be between 3 and 10."
        );
    }

    if (
        soil.ec !== "" &&
        soil.ec !== undefined &&
        ec === null
    ) {
        errors.push(
            "Soil EC must be between 0 and 20 dS/m."
        );
    }

    if (
        soil.organicCarbon !== "" &&
        soil.organicCarbon !== undefined &&
        organicCarbon === null
    ) {
        errors.push(
            "Organic carbon must be between 0 and 10%."
        );
    }

    if (
        soil.nitrogen !== "" &&
        soil.nitrogen !== undefined &&
        nitrogen === null
    ) {
        errors.push(
            "Nitrogen must be between 0 and 500 kg/ha."
        );
    }

    if (
        soil.phosphorus !== "" &&
        soil.phosphorus !== undefined &&
        phosphorus === null
    ) {
        errors.push(
            "Phosphorus must be between 0 and 500 kg/ha."
        );
    }

    if (
        soil.potassium !== "" &&
        soil.potassium !== undefined &&
        potassium === null
    ) {
        errors.push(
            "Potassium must be between 0 and 1000 kg/ha."
        );
    }


    /*
    WEATHER VALIDATION
    */

    if (
        weather.temperature !== "" &&
        weather.temperature !== undefined &&
        temperature === null
    ) {
        errors.push(
            "Temperature must be between -10°C and 60°C."
        );
    }

    if (
        weather.humidity !== "" &&
        weather.humidity !== undefined &&
        humidity === null
    ) {
        errors.push(
            "Humidity must be between 0 and 100%."
        );
    }

    if (
        weather.rainfall !== "" &&
        weather.rainfall !== undefined &&
        rainfall === null
    ) {
        errors.push(
            "Rainfall must be between 0 and 1000 mm."
        );
    }


    if (errors.length > 0) {

        const error = new Error(
            errors.join(" ")
        );

        error.statusCode = 400;

        throw error;
    }


    return {

        crop,

        growthStage,

        soilType,

        soil: {
            ph,
            ec,
            organicCarbon,
            nitrogen,
            phosphorus,
            potassium
        },

        weather: {
            temperature,
            humidity,
            rainfall,
            condition
        }

    };
}


/*
|--------------------------------------------------------------------------
| AGRICULTURAL SAFETY CONTEXT
|--------------------------------------------------------------------------
*/

function buildAgriculturalContext(data) {

    const {
        crop,
        growthStage,
        soilType,
        soil,
        weather
    } = data;


    return `
FARM DATA

Crop:
${crop}

Growth stage:
${growthStage}

Soil type:
${soilType}


SOIL TEST

pH:
${soil.ph ?? "Not provided"}

EC:
${soil.ec ?? "Not provided"} dS/m

Organic carbon:
${soil.organicCarbon ?? "Not provided"} %

Nitrogen:
${soil.nitrogen ?? "Not provided"} kg/ha

Phosphorus:
${soil.phosphorus ?? "Not provided"} kg/ha

Potassium:
${soil.potassium ?? "Not provided"} kg/ha


CURRENT WEATHER

Temperature:
${weather.temperature ?? "Not provided"} °C

Humidity:
${weather.humidity ?? "Not provided"} %

Rainfall:
${weather.rainfall ?? "Not provided"} mm

Condition:
${weather.condition || "Not provided"}
`;
}


/*
|--------------------------------------------------------------------------
| DECISION ENGINE
|--------------------------------------------------------------------------
*/

async function generateDecision(rawData) {

    const data = validateFarmData(rawData);

    const agriculturalContext =
        buildAgriculturalContext(data);


    const prompt = `
You are GroWell AI Decision Engine.

You are an agricultural decision-support system.

Your job is to transform VALIDATED farm information into practical,
conservative and crop-specific decisions.

${agriculturalContext}


IMPORTANT DECISION RULES

1. Never invent missing measurements.

2. Never treat missing data as zero.

3. Never create an exact fertilizer dose when sufficient information
   is not available.

4. Never recommend irrigation solely because the crop exists.

5. Consider crop growth stage before making recommendations.

6. Consider soil type before irrigation recommendations.

7. Consider rainfall before irrigation recommendations.

8. If rainfall is high or waterlogging is likely, avoid unnecessary
   irrigation.

9. If humidity and moisture conditions favor fungal disease,
   increase monitoring rather than claiming the crop has a disease.

10. Weather data alone cannot diagnose a disease.

11. Soil test values should be interpreted cautiously and in relation
    to crop requirements.

12. If important data is missing, explicitly state that the decision
    confidence is limited.

13. Recommendations must be practical for a farmer.

14. Prioritize economical and sustainable management.

15. Do not provide dangerous pesticide mixing instructions.

16. For pesticides or fungicides, tell the farmer to follow the
    registered product label and local agricultural recommendations.

17. Do not fabricate weather forecasts.

18. Do not make recommendations based on values that were not supplied.

19. Never claim certainty when the available information only supports
    a risk assessment.

20. The priority should represent the MOST IMPORTANT action or risk,
    not simply repeat a soil parameter.


RETURN ONLY VALID JSON.

Use exactly this structure:

{
    "priority": {
        "title": "",
        "reason": "",
        "urgency": "LOW",
        "confidence": ""
    },

    "today": {
        "title": "",
        "action": ""
    },

    "irrigation": {
        "status": "",
        "reason": ""
    },

    "disease": {
        "risk": "",
        "action": ""
    },

    "nutrition": {
        "status": "",
        "action": ""
    },

    "nextDays": [
        {
            "period": "Day 1",
            "action": ""
        },
        {
            "period": "Day 2-3",
            "action": ""
        },
        {
            "period": "Day 4-5",
            "action": ""
        },
        {
            "period": "Day 6-7",
            "action": ""
        }
    ],

    "summary": ""
}


FIELD RULES


priority.urgency:

Choose only:

LOW
MODERATE
HIGH


priority.confidence:

Give a realistic percentage based on how much useful information
was actually supplied.

Do NOT automatically use 90% or 95%.


irrigation.status:

Choose only one:

IRRIGATE NOW
IRRIGATE SOON
WAIT
AVOID IRRIGATION
INSUFFICIENT DATA


disease.risk:

Choose only:

LOW
MODERATE
HIGH
INSUFFICIENT DATA


nutrition.status:

Use a concise agricultural assessment such as:

Balanced
Monitor nitrogen
Monitor phosphorus
Monitor potassium
Nutrient concern
Insufficient data


NEXT DAYS

The 7-day plan must not pretend to know future weather.

Use the available current information and give monitoring actions.

Do not invent rainfall events.


SUMMARY

Write a short practical summary for the farmer.

Focus on what the farmer should actually do.


FINAL REQUIREMENT

The output must be valid JSON.

No Markdown.

No explanation outside JSON.
`;


    try {

        const completion =
            await groq.chat.completions.create({

                model:
                    "llama-3.3-70b-versatile",

                temperature:
                    0.1,

                max_tokens:
                    2200,

                messages: [

                    {
                        role: "system",

                        content:
                            "You are GroWell AI's agricultural decision engine. Return only valid JSON and never invent farm data."
                    },

                    {
                        role: "user",

                        content: prompt
                    }

                ]

            });


        let text =
            completion?.choices?.[0]
                ?.message
                ?.content;


        if (!text) {

            throw new Error(
                "Groq returned an empty decision."
            );

        }


        text = text.trim();


        /*
        REMOVE ACCIDENTAL CODE FENCES
        */

        if (text.startsWith("```")) {

            text = text
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


        let decision;

        try {

            decision = JSON.parse(text);

        } catch (parseError) {

            console.error(
                "❌ Invalid Decision JSON:"
            );

            console.error(text);

            throw new Error(
                "GroWell received an invalid decision response."
            );

        }


        /*
        BASIC RESPONSE SAFETY
        */

        return {

            priority: {

                title:
                    decision.priority?.title ||
                    "Monitor crop condition",

                reason:
                    decision.priority?.reason ||
                    "Continue monitoring the crop using available field information.",

                urgency:
                    decision.priority?.urgency ||
                    "MODERATE",

                confidence:
                    decision.priority?.confidence ||
                    "Limited"

            },


            today: {

                title:
                    decision.today?.title ||
                    "Inspect the crop",

                action:
                    decision.today?.action ||
                    "Inspect crop condition, soil moisture and visible stress."

            },


            irrigation: {

                status:
                    decision.irrigation?.status ||
                    "INSUFFICIENT DATA",

                reason:
                    decision.irrigation?.reason ||
                    "There is not enough information to make a reliable irrigation decision."

            },


            disease: {

                risk:
                    decision.disease?.risk ||
                    "INSUFFICIENT DATA",

                action:
                    decision.disease?.action ||
                    "Inspect the crop for visible disease symptoms and monitor changing conditions."

            },


            nutrition: {

                status:
                    decision.nutrition?.status ||
                    "Insufficient data",

                action:
                    decision.nutrition?.action ||
                    "Use soil-test results and crop-stage requirements before applying fertilizer."

            },


            nextDays:
                Array.isArray(
                    decision.nextDays
                )
                    ? decision.nextDays.slice(0, 4)
                    : [
                        {
                            period: "Day 1",
                            action: "Inspect crop and soil condition."
                        },
                        {
                            period: "Day 2-3",
                            action: "Monitor crop response and soil moisture."
                        },
                        {
                            period: "Day 4-5",
                            action: "Review changes in crop condition."
                        },
                        {
                            period: "Day 6-7",
                            action: "Reassess management requirements."
                        }
                    ],


            summary:
                decision.summary ||
                "Continue monitoring the crop and make management decisions using updated field observations."
        };

    } catch (error) {

        console.error(
            "❌ GroWell Decision Engine Error:"
        );

        console.error(error);

        throw error;
    }
}


module.exports = {
    generateDecision,
    validateFarmData
};