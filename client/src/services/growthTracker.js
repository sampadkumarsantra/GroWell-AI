const STORAGE_KEY = "growell-growth";

const INITIAL_DATA = {
    searches: 0
};

function loadGrowth() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return INITIAL_DATA;
        }

        return {
            ...INITIAL_DATA,
            ...JSON.parse(saved)
        };
    } catch {
        return INITIAL_DATA;
    }
}

function saveGrowth(data) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}

/*
    Words/phrases that should NOT count as
    meaningful agricultural interactions.
*/
const IGNORE_PATTERNS = [
    /^hi$/i,
    /^hello$/i,
    /^hey$/i,
    /^hey there$/i,
    /^good morning$/i,
    /^good afternoon$/i,
    /^good evening$/i,
    /^thanks$/i,
    /^thank you$/i,
    /^ok$/i,
    /^okay$/i,
    /^fine$/i,
    /^yes$/i,
    /^no$/i,
    /^who are you\??$/i,
    /^what are you\??$/i,
    /^what can you do\??$/i
];

/*
    Agricultural keywords.

    A question containing meaningful farming
    terminology can qualify as a growth action.
*/
const AGRICULTURE_KEYWORDS = [
    "crop",
    "crops",
    "farmer",
    "farming",
    "farm",
    "soil",
    "fertilizer",
    "fertiliser",
    "manure",
    "compost",
    "irrigation",
    "water",
    "rain",
    "rainfall",
    "weather",
    "temperature",
    "humidity",
    "disease",
    "pest",
    "insect",
    "fungus",
    "fungal",
    "leaf",
    "leaves",
    "plant",
    "seed",
    "seedling",
    "wheat",
    "rice",
    "maize",
    "corn",
    "potato",
    "tomato",
    "onion",
    "chilli",
    "pepper",
    "mustard",
    "soybean",
    "groundnut",
    "sorghum",
    "sugarcane",
    "cotton",
    "vegetable",
    "fruit",
    "yield",
    "harvest",
    "mandi",
    "market",
    "price",
    "apmc",
    "nitrogen",
    "phosphorus",
    "potassium",
    "npk",
    "ph",
    "ec",
    "organic carbon",
    "nutrient",
    "weed",
    "weeds",
    "spray",
    "pesticide",
    "herbicide",
    "fungicide",
    "insecticide",
    "growth",
    "planting",
    "sowing",
    "harvesting",
    "cultivation",
    "agriculture"
];

/*
    Check whether a user's query is meaningful.
*/
export function isMeaningfulAgriculturalQuery(query) {
    if (!query || typeof query !== "string") {
        return false;
    }

    const text = query.trim();

    if (!text) {
        return false;
    }

    // Ignore obvious greetings/casual messages
    if (
        IGNORE_PATTERNS.some((pattern) =>
            pattern.test(text)
        )
    ) {
        return false;
    }

    const normalized = text.toLowerCase();

    // Agricultural terminology
    const hasAgricultureKeyword =
        AGRICULTURE_KEYWORDS.some((keyword) =>
            normalized.includes(keyword)
        );

    if (hasAgricultureKeyword) {
        return true;
    }

    /*
        Questions that look like genuine advisory
        questions can also qualify.
    */
    const advisoryWords = [
        "how",
        "why",
        "which",
        "what",
        "when",
        "should",
        "can",
        "recommend",
        "advice",
        "problem",
        "solution",
        "best"
    ];

    const hasAdvisoryWord =
        advisoryWords.some((word) =>
            normalized.includes(word)
        );

    /*
        Don't count very short generic questions.
    */
    if (
        hasAdvisoryWord &&
        normalized.split(/\s+/).length >= 5
    ) {
        return true;
    }

    return false;
}

/*
    Register one meaningful GroWell action.
*/
export function registerGrowthAction(query) {
    if (!isMeaningfulAgriculturalQuery(query)) {
        return loadGrowth();
    }

    const current = loadGrowth();

    const updated = {
        ...current,
        searches: current.searches + 1
    };

    saveGrowth(updated);

    /*
        Notify GrowthJourney immediately.
    */
    window.dispatchEvent(
        new CustomEvent("growell:growth-update", {
            detail: updated
        })
    );

    return updated;
}

/*
    Get current growth progress.
*/
export function getGrowthProgress() {
    return loadGrowth();
}

/*
    Reset growth.
    Useful during development/testing.
*/
export function resetGrowthProgress() {
    const reset = {
        ...INITIAL_DATA
    };

    saveGrowth(reset);

    window.dispatchEvent(
        new CustomEvent("growell:growth-update", {
            detail: reset
        })
    );

    return reset;
}