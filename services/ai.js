const Groq = require("groq-sdk");

const {
    PLANS,
    FREE,
    effortAllowed
} = require("./entitlements");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const EFFORT_CONFIG = {
    Quick: {
        maxTokens: 300,
        temperature: 0.2
    },

    Balanced: {
        maxTokens: 800,
        temperature: 0.4
    },

    Detailed: {
        maxTokens: 1800,
        temperature: 0.6
    },

    // Premium only. Two model passes — see buildPlan().
    Deep: {
        maxTokens: 4000,
        temperature: 0.3
    }
};


// =====================================================
// DEEP REASONING — PLANNER PASS
// =====================================================
//
// A single pass tends to answer the question that was asked
// rather than the question behind it. Before answering, a cheap
// short pass reads the farmer's situation and writes down what
// actually needs to be worked out. The main pass then reasons
// from that plan instead of straight from the prompt.
//

const PLANNER_SYSTEM_PROMPT = `
You are the analysis planner inside GroWell AI, an agricultural
reasoning system for farmers.

You do NOT answer the farmer. You only prepare the ground work that
the answering model will reason from.

Read the farmer's question and their farm profile. Then output a
short plan in exactly this structure:

UNKNOWN
- List the facts that are genuinely missing and that would change
  the answer (stage, variety, soil type, dose, days after sowing,
  rainfall, temperature, budget, etc).
- If nothing material is missing, write "Nothing material."

RISKS
- List the ways a naive answer here could go wrong, or could cause
  financial or crop loss.
- Focus on real agronomic traps: wrong growth stage, wrong dose,
  phytotoxicity, wrong fungicide for the pathogen, ignoring
  resistance, unsafe spraying conditions, off-label use.

ANGLE
- One or two sentences naming the core decision the farmer is
  really trying to make.

Keep it under 120 words total. Plain text. No emoji. No preamble.
`;

async function buildPlan(message, context) {

    try {

        const completion =
            await groq.chat.completions.create({
                model: "openai/gpt-oss-120b",
                temperature: 0.2,
                max_tokens: 400,
                messages: [
                    {
                        role: "system",
                        content: PLANNER_SYSTEM_PROMPT
                    },
                    {
                        role: "user",
                        content: `${context}\n\nFARMER QUESTION:\n${message}`
                    }
                ]
            });

        const plan =
            completion?.choices?.[0]?.message
                ?.content?.trim();

        if (!plan) {
            return null;
        }

        console.log(
            "[GroWell] Deep planner pass complete"
        );

        return plan;

    } catch (error) {

        // A failed planner must never cost the farmer their
        // answer — fall through to a normal single pass.
        console.warn(
            "[GroWell] Planner pass failed, answering directly:",
            error.message
        );

        return null;

    }
}

async function generateResponse(
    message,
    settings = {},
    options = {}
) {

    const profile = settings.profile || {};

    const language =
        settings.language || "English";

    const requestedEffort =
        EFFORT_CONFIG[settings.effort]
            ? settings.effort
            : "Balanced";

    // The client can ask for anything. The server decides what it
    // actually gets, so a forged request cannot unlock a paid
    // reasoning tier.
    const isPremium = options.isPremium === true;

    const effort =
        !isPremium &&
        !effortAllowed(
            PLANS[FREE].id,
            requestedEffort
        )
            ? PLANS[FREE].maxEffort
            : requestedEffort;

    const isDeep = effort === "Deep";

    const config =
        EFFORT_CONFIG[effort];

    const farmName =
        profile.farmName ||
        settings.farmName ||
        "Not specified";

    const crops =
        profile.cropFocus ||
        settings.crop ||
        "Not specified";

    const location =
        profile.location ||
        settings.location ||
        "Not specified";


    // =================================================
    // DEEP REASONING — PLANNER PASS
    // =================================================

    const farmContext = `
Farm: ${farmName}
Main crops: ${crops}
Location: ${location}
Reply language: ${language}
`;

    const plan = isDeep
        ? await buildPlan(message, farmContext)
        : null;

    const deepInstructions = isDeep
        ? `
DEEP REASONING MODE

You are running the full GroWell reasoning stack. A separate
planning pass has already analysed this question. Use it.

${plan ? `ANALYSIS PLAN FROM THE PLANNER PASS\n\n${plan}` : "No plan was produced. Reason from first principles and be explicit about any assumption you make."}

Then follow this structure:

### 🧠 Reasoning

- Show the reasoning, not just the conclusion.
- State the assumption you are making where the farmer's data was incomplete.
- If the planner listed unknowns, name the one that matters most and explain how you handled it.
- If the planner flagged a risk, say explicitly why a common wrong answer would have caused loss here.

### 🌱 Assessment

Short bullet points.

### 🛠️ Recommended actions

Numbered practical steps, specific enough to act on today.

### 💰 Cost and risk

- Rough input cost per acre where a purchase is involved.
- What could go wrong, and how to avoid it.

### 👀 What to monitor

Short bullet points.


Stay factual. Never invent a field observation you were not given.
`
        : "";


    const systemPrompt = `

You are GroWell AI — a practical agricultural intelligence assistant.

Your job is to give farmers answers that are:

- Clear
- Practical
- Easy to scan
- Action-oriented
- Scientifically responsible

FARM PROFILE

Farm: ${farmName}
Main crops: ${crops}
Location: ${location}

Use this information only when relevant.


LANGUAGE

Reply in ${language}.

If the farmer writes in another language, respond in ${language}.


VERY IMPORTANT — RESPONSE FORMATTING

NEVER write a long wall of text.

Your response MUST be visually separated.

Use Markdown.

Follow these rules STRICTLY:

1. Use headings for major sections.

Example:

### 🌱 Assessment

### 🔍 Why it matters

### 🛠️ Recommended actions

### 👀 What to monitor


2. ALWAYS put a BLANK LINE before and after every heading.


3. Use bullet points for explanations.

Example:

- First important point.

- Second important point.

- Third important point.


4. For procedures, use numbered steps.

Example:

1. Prepare the soil.

2. Select the seed.

3. Treat the seed.

4. Transplant at the correct stage.


5. NEVER create a huge paragraph containing multiple ideas.

If an explanation is longer than 2 sentences, split it into bullets.


6. Keep individual bullet points short.

Prefer:

- High humidity increases fungal disease risk.

Instead of:

- High humidity increases fungal disease risk because prolonged leaf wetness creates favorable conditions for fungal infection and therefore farmers should monitor...


7. For every numbered step, put a blank line between steps.


8. For nested information, use this format:

1. **Soil preparation**

   - Test soil pH.

   - Check organic carbon.

   - Correct nutrient deficiencies.


9. Important terms, measurements, warnings and actions MUST use **bold**.

Example:

- Maintain **5–7 cm** water depth.

- Avoid spraying during **strong winds**.

- Monitor for **rice blast**.


10. NEVER use HTML.

11. NEVER use tables unless the farmer specifically asks for a table.

12. NEVER put the entire response inside a code block.

13. Do not use excessive emojis.

14. Do not repeat the same information.

15. Do not start every answer with "GroWell AI".


RECOMMENDED STRUCTURE

For agricultural questions, use:

### 🌱 Assessment

Short bullet points.

### 🔍 Why it matters

Short bullet points.

### 🛠️ Recommended actions

Numbered practical steps.

### 👀 What to monitor

Short bullet points.

Only include sections that are actually useful.


EFFORT LEVEL

Current effort: ${effort}

Quick:
Give only the essential answer.

Balanced:
Give a useful explanation plus practical actions.

Detailed:
Give a comprehensive agricultural answer, but ALWAYS maintain short paragraphs, bullets, numbered steps and blank-line spacing.
${deepInstructions}

AGRICULTURAL SAFETY

- Never invent real-time weather or market prices.

- Never claim a pesticide is universally safe.

- For pesticides and fertilizers, recommend following the **approved product label**, local agricultural guidance and safe handling requirements.

- Do not invent local laws or regulations.

- If critical information is missing, ask one concise clarification question.


FINAL FORMATTING CHECK

Before returning your answer, verify:

✓ Headings have blank lines around them.

✓ Bullets are separated clearly.

✓ Numbered steps are separated clearly.

✓ Important terms are bold.

✓ No giant paragraphs.

✓ No unnecessary repetition.

✓ The answer is easy to scan on a phone.

`;

    console.log(
        `[GroWell] Effort: ${effort} | Token limit: ${config.maxTokens}`
    );


    const completion =
        await groq.chat.completions.create({

            model: "openai/gpt-oss-120b",

            temperature:
                config.temperature,

            max_tokens:
                config.maxTokens,

            messages: [

                {
                    role: "system",
                    content: systemPrompt
                },

                {
                    role: "user",
                    content: message
                }

            ]

        });


    let reply =
        completion?.choices?.[0]?.message?.content?.trim();


    if (!reply) {
        throw new Error(
            "Groq returned an empty response."
        );
    }


    /*
     * CLEAN UP COMMON MARKDOWN PROBLEMS
     */

    reply = reply
        .replace(/\r\n/g, "\n")

        // Remove excessive blank lines
        .replace(/\n{4,}/g, "\n\n")

        // Ensure headings have spacing
        .replace(
            /([^\n])\n(#{2,4}\s)/g,
            "$1\n\n$2"
        )

        // Ensure heading is separated from following text
        .replace(
            /(#{2,4}\s[^\n]+)\n([^\n])/g,
            "$1\n\n$2"
        )

        // Separate numbered items
        .replace(
            /([^\n])\n(\d+\.\s)/g,
            "$1\n\n$2"
        )

        // Separate bullet points
        .replace(
            /([^\n])\n(-\s)/g,
            "$1\n\n$2"
        )

        .trim();


    return reply;
}


module.exports = {
    generateResponse,
    buildPlan
};