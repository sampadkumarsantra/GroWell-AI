// =====================================================
// PLAN CONFIGURATION
// =====================================================
//
// Single source of truth for what Free and Premium can do.
// The server enforces this. The client only ever mirrors it
// so the UI can grey things out before a request is made.
//
// =====================================================


const FREE = "free";
const PREMIUM = "premium";


// =====================================================
// LIMITS
// =====================================================

const PLANS = {
    [FREE]: {
        id: FREE,
        name: "GroWell Free",
        priceInPaise: 0,
        priceLabel: "Free",
        pricePeriod: "forever",

        // Daily AI chat messages.
        chatPerDay: 15,

        // Monthly voice + translation calls.
        voicePerMonth: 30,

        // Highest reasoning effort the model will run.
        maxEffort: "Balanced",

        // Multi-pass "Deep Reasoning" is a paid capability.
        deepReasoning: false,

        features: [
            {
                label: "15 AI questions per day",
                included: true
            },
            {
                label: "30 voice questions per month",
                included: true
            },
            {
                label: "Balanced reasoning",
                included: true
            },
            {
                label: "Deep Reasoning — multi-step analysis",
                included: false
            },
            {
                label: "Unlimited questions, any hour",
                included: false
            },
            {
                label: "Unlimited voice in 12+ languages",
                included: false
            },
            {
                label: "Priority model capacity",
                included: false
            }
        ]
    },

    [PREMIUM]: {
        id: PREMIUM,
        name: "GroWell Premium",
        priceInPaise: 9900,
        priceLabel: "₹99",
        pricePeriod: "per month",

        chatPerDay: null,
        voicePerMonth: null,
        maxEffort: "Deep",
        deepReasoning: true,

        features: [
            {
                label: "Unlimited AI questions",
                included: true
            },
            {
                label: "Unlimited voice questions",
                included: true
            },
            {
                label:
                    "Deep Reasoning — plans, checks assumptions, then answers",
                included: true
            },
            {
                label: "Detailed agronomy breakdowns",
                included: true
            },
            {
                label: "Priority model capacity",
                included: true
            },
            {
                label: "Cancel anytime, no lock-in",
                included: true
            }
        ]
    }
};


// =====================================================
// EFFORT LADDER
// =====================================================

const EFFORT_ORDER = [
    "Quick",
    "Balanced",
    "Detailed",
    "Deep"
];


function effortAllowed(planId, effort) {

    const plan = PLANS[planId] || PLANS[FREE];

    if (effort === "Deep") {
        return plan.deepReasoning === true;
    }

    return (
        EFFORT_ORDER.indexOf(effort) <=
        EFFORT_ORDER.indexOf(plan.maxEffort)
    );
}


// =====================================================
// MONTH BOUNDARIES (UTC)
// =====================================================

function startOfUtcDay(date = new Date()) {
    return new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate()
        )
    );
}

function startOfUtcMonth(date = new Date()) {
    return new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            1
        )
    );
}


// =====================================================
// USAGE COUNTERS
// =====================================================

async function countUsage(userId, kind, since) {

    if (!userId) {
        return 0;
    }

    const { get } = require("../database/pool");

    const row = await get(
        `SELECT COUNT(*)::int AS total
         FROM usage_events
         WHERE user_id = $1
           AND kind = $2
           AND created_at >= $3`,
        [userId, kind, since]
    );

    return row ? row.total : 0;
}


/**
 * Returns how much of a quota is left, or null when unlimited.
 */
async function remaining(userId, planId, kind) {

    const plan = PLANS[planId] || PLANS[FREE];

    let limit;
    let since;

    if (kind === "chat") {
        limit = plan.chatPerDay;
        since = startOfUtcDay();
    } else {
        limit = plan.voicePerMonth;
        since = startOfUtcMonth();
    }

    if (limit === null || limit === undefined) {
        return null;
    }

    const used = await countUsage(
        userId,
        kind,
        since
    );

    return Math.max(0, limit - used);
}


async function recordUsage(userId, kind) {

    if (!userId) {
        return;
    }

    const { run } = require("../database/pool");

    await run(
        `INSERT INTO usage_events (user_id, kind)
         VALUES ($1, $2)`,
        [userId, kind]
    );
}


module.exports = {
    FREE,
    PREMIUM,
    PLANS,
    EFFORT_ORDER,
    effortAllowed,
    remaining,
    recordUsage,
    countUsage,
    startOfUtcDay,
    startOfUtcMonth
};
