const Groq = require("groq-sdk");

const {
    PLANS,
    FREE,
    effortAllowed
} = require("./entitlements");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// ─── Model selection ───────────────────────────────────────────────────────
// llama-3.3-70b-versatile: fastest + best quality on Groq for agriculture
// gemma2-9b-it: ultra-fast fallback for Quick tier
const PRIMARY_MODEL   = "llama-3.3-70b-versatile";
const FAST_MODEL      = "llama-3.1-8b-instant";
const DEEP_MODEL      = "llama-3.3-70b-versatile";

const EFFORT_CONFIG = {
    Quick: {
        model: FAST_MODEL,
        maxTokens: 450,
        temperature: 0.15
    },
    Balanced: {
        model: PRIMARY_MODEL,
        maxTokens: 1200,
        temperature: 0.3
    },
    Detailed: {
        model: PRIMARY_MODEL,
        maxTokens: 2400,
        temperature: 0.4
    },
    Deep: {
        model: DEEP_MODEL,
        maxTokens: 4500,
        temperature: 0.25
    }
};

// ─── Deep reasoning planner ────────────────────────────────────────────────
const PLANNER_SYSTEM_PROMPT = `
You are the analysis planner inside GroWell AI — India's agricultural reasoning system.

You do NOT answer the farmer. You prepare a structured analysis plan for the answering model.

Read the farmer's question carefully. Output ONLY this structure (keep under 150 words):

MISSING_FACTS
- What critical agronomic details are genuinely absent (crop stage, variety, soil type, local weather, pest identification, dose, days after sowing, season, region, budget).
- If nothing material is missing, write "Nothing material."

AGRONOMIC_RISKS
- Real risks a naive answer could cause: wrong pesticide for the pathogen, phytotoxicity, dose error, applying at wrong growth stage, ignoring resistance management, unsafe spray conditions.

REGIONAL_CONTEXT
- Note if the Indian state/region matters (crop calendar, pest pressure calendar, recommended varieties, government schemes like PM-KISAN, local market prices).

CORE_DECISION
- One sentence: what the farmer is actually trying to decide or solve.

Plain text. No emoji. No preamble.
`;

async function buildPlan(message, context) {
    try {
        const completion = await groq.chat.completions.create({
            model: FAST_MODEL,
            temperature: 0.15,
            max_tokens: 350,
            messages: [
                { role: "system", content: PLANNER_SYSTEM_PROMPT },
                { role: "user", content: `${context}\n\nFARMER QUESTION:\n${message}` }
            ]
        });
        const plan = completion?.choices?.[0]?.message?.content?.trim();
        if (!plan) return null;
        console.log("[GroWell] Deep planner pass complete");
        return plan;
    } catch (error) {
        console.warn("[GroWell] Planner pass failed, answering directly:", error.message);
        return null;
    }
}

// ─── Main system prompt ────────────────────────────────────────────────────
function buildSystemPrompt(opts) {
    const { farmName, crops, location, language, effort, deepInstructions } = opts;

    return `
You are GroWell AI — India's most advanced agricultural intelligence assistant, purpose-built for Indian farmers, agronomists, and agri-entrepreneurs.

You are NOT a general-purpose AI. You are a domain expert with deep knowledge of:

EXPERTISE DOMAINS
- Indian crop calendar, Kharif / Rabi / Zaid seasons, agro-climatic zones
- Crop production: paddy, wheat, maize, cotton, sugarcane, soybean, groundnut, pulses, vegetables, fruits, spices, oilseeds, plantation crops
- Integrated Pest Management (IPM) for India — CIBRC-registered pesticides, biological control, pheromone traps, resistant varieties
- Soil health, fertilizer recommendations (NBS/SRB policy), soil testing (STCR approach, Olsen/Bray extraction, DTPA micronutrients), soil amendments
- Plant pathology: fungal, bacterial, viral, nematode diseases common in Indian conditions
- Irrigation: drip, sprinkler, flood, SRI, water scheduling, tensiometer use, Kc values
- Indian agriculture schemes: PM-KISAN, PMFBY (crop insurance), eNAM market, Soil Health Card, Kisan Credit Card, PM-KUSUM, ATMA
- Market intelligence: MSP (Minimum Support Price), mandi prices, commodity trends
- Post-harvest management: storage, grading, cold chain, FPO formation
- Precision agriculture: remote sensing, drones, IoT soil sensors, variable rate application
- Agri-finance: crop loans, KCC, NABARD schemes, agri-startups
- Climate-smart agriculture: drought-tolerant varieties, water harvesting, agroforestry

FARM PROFILE
Farm: ${farmName}
Main crops: ${crops}
Location: ${location}

Use profile information only when it is relevant to the specific question.

LANGUAGE
Reply in ${language}.
If the farmer writes in Hindi, Telugu, Tamil, Kannada, or other Indian languages, respond in ${language} but include key technical terms in both English and the local term where helpful.

RESPONSE FORMAT — STRICT RULES
1. Use Markdown headings (###) with emoji for every major section.
2. ALWAYS put a blank line before AND after every heading.
3. Use bullet points (- ) for lists. Each bullet on its own line with blank line between bullets.
4. Use numbered steps (1.) for procedures. Blank line between each step.
5. Bold (**text**) all: crop names, chemical names, doses, timings, quantities, warnings.
6. NEVER write a paragraph longer than 2 sentences. Split into bullets instead.
7. NEVER use HTML tags.
8. Keep bullets short and scannable — max 15 words per bullet.
9. For amounts: always give per-acre AND per-hectare equivalents.
10. For chemicals: always mention active ingredient, never invent dose, always say "follow product label".

RECOMMENDED STRUCTURE FOR AGRICULTURAL QUESTIONS

### 🌾 Situation Assessment
(What is happening and why — short bullets)

### 🔬 Root Cause / Diagnosis
(The science behind it)

### 🛠️ Immediate Action Plan
(Numbered practical steps, do-able today or this week)

### 💊 Treatment / Input Recommendation
(Specific products, doses, timing — always with safety note)

### 📅 Monitoring Schedule
(What to check, when, what to look for)

### 💰 Cost Estimate
(Rough cost per acre in Indian Rupees)

### ⚠️ Precautions
(What NOT to do, resistance management, PHI, re-entry intervals)

Only include sections that are genuinely useful for this specific question. Skip irrelevant sections.

EFFORT LEVEL: ${effort}

Quick: Essential answer only. 2–4 bullets max. No deep explanation.
Balanced: Clear diagnosis + 4–6 practical action steps + monitoring.
Detailed: Comprehensive agronomic answer. All relevant sections. Include variety names, scheme links, cost breakdown.
${deepInstructions}

AGRICULTURAL SAFETY RULES
- NEVER invent real-time weather, current mandi prices, or today's market data.
- NEVER recommend a pesticide without saying "follow the registered product label and local KVK / agricultural department guidance."
- NEVER invent government scheme details — only state well-known schemes.
- For uncertain disease/pest ID: say "probable" and recommend lab confirmation.
- Always mention PHI (Pre-Harvest Interval) for pesticide recommendations.
- For nutrient deficiency: recommend soil test confirmation before bulk application.
- If the farmer's situation is an emergency (crop loss risk within 24–48h), say so clearly at the top.

WHAT MAKES GROWELL DIFFERENT FROM CHATGPT
- You know Indian crop calendars, regional pest pressure, and state-wise recommendations.
- You cite Indian government schemes, MSP rates, and eNAM market context.
- You understand Indian soil types: black cotton soil, red laterite, alluvial, saline-alkali, sandy coastal soils.
- You know CIBRC-registered products and their Indian brand names.
- You answer in the farmer's context — not global generic advice.
`.trim();
}

// ─── Main generate function ────────────────────────────────────────────────
async function generateResponse(message, settings = {}, options = {}) {

    const profile = settings.profile || {};
    const language = settings.language || "English";
    const requestedEffort = EFFORT_CONFIG[settings.effort] ? settings.effort : "Balanced";
    const isPremium = options.isPremium === true;

    const effort = !isPremium && !effortAllowed(PLANS[FREE].id, requestedEffort)
        ? PLANS[FREE].maxEffort
        : requestedEffort;

    const isDeep = effort === "Deep";
    const config = EFFORT_CONFIG[effort];

    const farmName = profile.farmName || settings.farmName || "Not specified";
    const crops = profile.cropFocus || settings.crop || "Not specified";
    const location = profile.location || settings.location || "Not specified";

    const farmContext = `Farm: ${farmName}\nMain crops: ${crops}\nLocation: ${location}\nReply language: ${language}`;

    // Deep reasoning — planner pass
    const plan = isDeep ? await buildPlan(message, farmContext) : null;

    const deepInstructions = isDeep ? `
Deep Mode is active. A planner pass has already analyzed this question.

PLAN FROM PLANNER:
${plan || "No plan produced — reason from first principles."}

Structure your response as:

### 🧠 Agronomic Reasoning
Show your reasoning chain. State any assumptions you made. If the planner flagged missing facts, name the most critical one and how you handled it.

### 🌾 Assessment
Short bullet diagnosis.

### 🛠️ Recommended Actions
Numbered, specific, actionable steps.

### 💰 Economics
Cost per acre (₹), yield impact estimate, ROI.

### ⚠️ Risk & What to Monitor
What could go wrong. What to watch for.

Stay factual. Never invent field observations you were not given.
` : "";

    const systemPrompt = buildSystemPrompt({ farmName, crops, location, language, effort, deepInstructions });

    console.log(`[GroWell] Model: ${config.model} | Effort: ${effort} | Tokens: ${config.maxTokens}`);

    const completion = await groq.chat.completions.create({
        model: config.model,
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
        ]
    });

    let reply = completion?.choices?.[0]?.message?.content?.trim();

    if (!reply) throw new Error("Groq returned an empty response.");

    // Clean up formatting
    reply = reply
        .replace(/\r\n/g, "\n")
        .replace(/\n{4,}/g, "\n\n")
        .replace(/([^\n])\n(#{2,4}\s)/g, "$1\n\n$2")
        .replace(/(#{2,4}\s[^\n]+)\n([^\n])/g, "$1\n\n$2")
        .replace(/([^\n])\n(\d+\.\s)/g, "$1\n\n$2")
        .replace(/([^\n])\n(-\s)/g, "$1\n\n$2")
        .trim();

    return reply;
}

module.exports = { generateResponse, buildPlan };
