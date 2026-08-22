const Groq = require("groq-sdk");

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
    }
};

async function generateResponse(message, settings = {}) {

    const profile = settings.profile || {};

    const language =
        settings.language || "English";

    const effort =
        EFFORT_CONFIG[settings.effort]
            ? settings.effort
            : "Balanced";

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
    generateResponse
};