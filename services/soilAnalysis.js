function number(value) {
    if (value === "" || value === null || value === undefined) {
        return null;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
}

function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
}

function round(value) {
    return Math.round(value);
}


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

const LIMITS = {
    ph: {
        min: 3,
        max: 10
    },

    ec: {
        min: 0,
        max: 20
    },

    organicCarbon: {
        min: 0,
        max: 10
    },

    nitrogen: {
        min: 0,
        max: 20000
    },

    phosphorus: {
        min: 0,
        max: 5000
    },

    potassium: {
        min: 0,
        max: 15000
    },

    calcium: {
        min: 0,
        max: 30000
    },

    magnesium: {
        min: 0,
        max: 15000
    },

    sulphur: {
        min: 0,
        max: 5000
    },

    zinc: {
        min: 0,
        max: 100
    },

    iron: {
        min: 0,
        max: 200
    },

    manganese: {
        min: 0,
        max: 200
    },

    copper: {
        min: 0,
        max: 100
    },

    boron: {
        min: 0,
        max: 20
    },

    cec: {
        min: 0,
        max: 150
    },

    esp: {
        min: 0,
        max: 100
    },

    bufferPh: {
        min: 4,
        max: 9
    },

    baseSaturation: {
        min: 0,
        max: 100
    },

    bulkDensity: {
        min: 0.5,
        max: 2.5
    }
};


function validateNumber(name, value) {

    if (value === null) {
        return null;
    }

    const limit = LIMITS[name];

    if (!limit) {
        return null;
    }

    if (value < limit.min || value > limit.max) {

        throw new Error(
            `${name} value must be between ${limit.min} and ${limit.max}.`
        );
    }

    return value;
}


/*
|--------------------------------------------------------------------------
| CROP PROFILES
|--------------------------------------------------------------------------
*/

const CROP_PROFILES = {

    Rice: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.0,
        phMax: 7.8,
        nitrogenDemand: 75,
        phosphorusDemand: 55,
        potassiumDemand: 65,
        salinityTolerance: 65
    },

    Wheat: {
        phMin: 6.0,
        phIdealMin: 6.0,
        phIdealMax: 7.5,
        phMax: 8.0,
        nitrogenDemand: 75,
        phosphorusDemand: 60,
        potassiumDemand: 65,
        salinityTolerance: 65
    },

    Maize: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.0,
        phMax: 7.5,
        nitrogenDemand: 85,
        phosphorusDemand: 65,
        potassiumDemand: 70,
        salinityTolerance: 60
    },

    Potato: {
        phMin: 5.0,
        phIdealMin: 5.2,
        phIdealMax: 6.5,
        phMax: 7.2,
        nitrogenDemand: 65,
        phosphorusDemand: 65,
        potassiumDemand: 85,
        salinityTolerance: 55
    },

    Tomato: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 6.8,
        phMax: 7.5,
        nitrogenDemand: 70,
        phosphorusDemand: 70,
        potassiumDemand: 85,
        salinityTolerance: 55
    },

    Cotton: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.5,
        phMax: 8.0,
        nitrogenDemand: 70,
        phosphorusDemand: 60,
        potassiumDemand: 80,
        salinityTolerance: 60
    },

    Soybean: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.0,
        phMax: 7.5,
        nitrogenDemand: 55,
        phosphorusDemand: 70,
        potassiumDemand: 75,
        salinityTolerance: 55
    },

    Groundnut: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.0,
        phMax: 7.5,
        nitrogenDemand: 50,
        phosphorusDemand: 70,
        potassiumDemand: 70,
        salinityTolerance: 55
    },

    Other: {
        phMin: 5.5,
        phIdealMin: 6.0,
        phIdealMax: 7.5,
        phMax: 8.0,
        nitrogenDemand: 65,
        phosphorusDemand: 65,
        potassiumDemand: 65,
        salinityTolerance: 60
    }
};


/*
|--------------------------------------------------------------------------
| GROWTH STAGES
|--------------------------------------------------------------------------
*/

const STAGE_PROFILES = {

    Seedling: {
        nitrogen: 0.65,
        phosphorus: 0.80,
        potassium: 0.55,
        sensitivity: 1.10
    },

    Vegetative: {
        nitrogen: 1.00,
        phosphorus: 0.75,
        potassium: 0.75,
        sensitivity: 1.00
    },

    Flowering: {
        nitrogen: 0.80,
        phosphorus: 1.00,
        potassium: 1.00,
        sensitivity: 1.05
    },

    Fruiting: {
        nitrogen: 0.75,
        phosphorus: 0.95,
        potassium: 1.10,
        sensitivity: 1.10
    },

    "Grain Filling": {
        nitrogen: 0.70,
        phosphorus: 0.85,
        potassium: 1.10,
        sensitivity: 1.05
    },

    Maturity: {
        nitrogen: 0.45,
        phosphorus: 0.60,
        potassium: 0.80,
        sensitivity: 0.90
    }
};


/*
|--------------------------------------------------------------------------
| SOIL PROFILES
|--------------------------------------------------------------------------
*/

const SOIL_PROFILES = {

    Clay: {
        waterBehavior: 85,
        drainage: 35,
        nutrientRetention: 90,
        salinityRisk: 1.10
    },

    "Clay Loam": {
        waterBehavior: 82,
        drainage: 55,
        nutrientRetention: 82,
        salinityRisk: 1.00
    },

    Loam: {
        waterBehavior: 90,
        drainage: 75,
        nutrientRetention: 80,
        salinityRisk: 0.90
    },

    "Sandy Loam": {
        waterBehavior: 65,
        drainage: 90,
        nutrientRetention: 55,
        salinityRisk: 0.85
    },

    Sandy: {
        waterBehavior: 50,
        drainage: 95,
        nutrientRetention: 40,
        salinityRisk: 0.80
    },

    "Silty Loam": {
        waterBehavior: 78,
        drainage: 65,
        nutrientRetention: 75,
        salinityRisk: 0.95
    }
};


/*
|--------------------------------------------------------------------------
| PROFESSIONAL SOIL TESTING LAYER
|--------------------------------------------------------------------------
| Classification bands follow widely used reference ranges (Indian /
| international soil-testing convention). Values entered in ppm are
| converted to kg/ha using the 0–15 cm furrow-slice factor 2.24.
*/

const PPM_TO_KGHA = 2.24;

function bandOf(value, bands) {

    if (value === null) {
        return null;
    }

    for (const band of bands) {
        if (value < band.upTo) {
            return band.label;
        }
    }

    return bands[bands.length - 1].label;
}

function levelOf(value, bands) {

    if (value === null) {
        return null;
    }

    for (const band of bands) {
        if (value < band.upTo) {
            return band.level;
        }
    }

    return bands[bands.length - 1].level;
}

const BANDS = {

    ph: [
        { upTo: 4.5, label: "Strongly acidic", level: "low" },
        { upTo: 5.5, label: "Moderately acidic", level: "low" },
        { upTo: 6.5, label: "Slightly acidic", level: "medium" },
        { upTo: 7.3, label: "Neutral", level: "high" },
        { upTo: 8.0, label: "Slightly alkaline", level: "medium" },
        { upTo: 8.5, label: "Moderately alkaline", level: "low" },
        { upTo: Infinity, label: "Strongly alkaline", level: "low" }
    ],

    ec: [
        { upTo: 2, label: "Non-saline", level: "high" },
        { upTo: 4, label: "Slightly saline", level: "medium" },
        { upTo: 8, label: "Moderately saline", level: "low" },
        { upTo: 16, label: "Strongly saline", level: "low" },
        { upTo: Infinity, label: "Very strongly saline", level: "low" }
    ],

    organicCarbon: [
        { upTo: 0.5, label: "Low", level: "low" },
        { upTo: 0.75, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    nitrogen: [
        { upTo: 280, label: "Low", level: "low" },
        { upTo: 560, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    /* Olsen extraction (pH > 7.3 soils). */
    phosphorusOlsen: [
        { upTo: 11, label: "Low", level: "low" },
        { upTo: 22, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    /* Bray-1 extraction (acidic / neutral soils). */
    phosphorusBray: [
        { upTo: 22, label: "Low", level: "low" },
        { upTo: 45, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    potassium: [
        { upTo: 108, label: "Low", level: "low" },
        { upTo: 280, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    sulphur: [
        { upTo: 10, label: "Low", level: "low" },
        { upTo: 20, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    calcium: [
        { upTo: 400, label: "Low", level: "low" },
        { upTo: 1000, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    magnesium: [
        { upTo: 130, label: "Low", level: "low" },
        { upTo: 290, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    zinc: [
        { upTo: 0.6, label: "Low", level: "low" },
        { upTo: 1.2, label: "Medium", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    iron: [
        { upTo: 4.5, label: "Low", level: "low" },
        { upTo: 10, label: "Adequate", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    manganese: [
        { upTo: 1.0, label: "Low", level: "low" },
        { upTo: 3.5, label: "Adequate", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    copper: [
        { upTo: 0.2, label: "Low", level: "low" },
        { upTo: 0.8, label: "Adequate", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    boron: [
        { upTo: 0.5, label: "Low", level: "low" },
        { upTo: 1.0, label: "Adequate", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    cec: [
        { upTo: 10, label: "Low (sandy)", level: "low" },
        { upTo: 25, label: "Medium (loamy)", level: "medium" },
        { upTo: Infinity, label: "High (clayey)", level: "high" }
    ],

    esp: [
        { upTo: 10, label: "Normal", level: "high" },
        { upTo: 15, label: "Borderline sodic", level: "medium" },
        { upTo: 25, label: "Sodic", level: "low" },
        { upTo: Infinity, label: "Strongly sodic", level: "low" }
    ],

    baseSaturation: [
        { upTo: 50, label: "Low", level: "low" },
        { upTo: 80, label: "Adequate", level: "medium" },
        { upTo: Infinity, label: "High", level: "high" }
    ],

    bulkDensity: [
        { upTo: 1.1, label: "Loose", level: "high" },
        { upTo: 1.4, label: "Ideal", level: "high" },
        { upTo: 1.6, label: "Compact", level: "medium" },
        { upTo: Infinity, label: "Highly compacted", level: "low" }
    ]
};

function classify(value, bands) {

    if (value === null) {
        return {
            value: null,
            label: "Not tested",
            level: null
        };
    }

    return {
        value,
        label: bandOf(value, bands),
        level: levelOf(value, bands)
    };
}

/* Parker's Nutrient Index: low = 1, medium = 2, high = 3. */
function parkerNutrientIndex(items) {

    const tested =
        items.filter(item => item.level !== null);

    if (tested.length === 0) {
        return null;
    }

    const score =
        tested.reduce((sum, item) => {
            if (item.level === "high") {
                return sum + 3;
            }

            if (item.level === "medium") {
                return sum + 2;
            }

            return sum + 1;
        }, 0);

    const index =
        score / tested.length;

    let category = "Low fertility";

    if (index > 2.33) {
        category = "High fertility";
    } else if (index >= 1.67) {
        category = "Medium fertility";
    }

    return {
        value: Number(index.toFixed(2)),
        category,
        testedCount: tested.length
    };
}

function limeRequirement(ph, soilType, bufferPh) {

    if (ph === null || ph >= 5.5) {
        return null;
    }

    const round1 = v => Math.round(v * 10) / 10;

    if (bufferPh !== null) {

        const lr =
            clamp((8.00 - bufferPh) * 1.5, 0, 12);

        return {
            tonnesPerHa: round1(lr),
            targetPh: 6.5,
            basis:
                `SMP-buffer estimate: (8.00 − ${bufferPh.toFixed(1)}) × 1.5 t CaCO₃/ha`,
            note:
                "Mineral soil estimate to lift pH toward 6.4–6.5. Confirm with a buffer-pH test at your nearest soil-testing laboratory before bulk liming."
        };
    }

    const texture =
        soilType === "Clay" || soilType === "Clay Loam"
            ? "clay"
            : soilType === "Sandy" || soilType === "Sandy Loam"
                ? "sandy"
                : "loam";

    let tonnes;

    if (ph > 5.0) {
        tonnes = { sandy: 1.0, loam: 1.5, clay: 2.0 }[texture];
    } else if (ph > 4.5) {
        tonnes = { sandy: 1.5, loam: 2.25, clay: 3.0 }[texture];
    } else {
        tonnes = { sandy: 2.0, loam: 3.0, clay: 4.0 }[texture];
    }

    return {
        tonnesPerHa: tonnes,
        targetPh: 6.5,
        basis:
            `Field estimate for ${texture} soil at pH ${ph.toFixed(1)} (target ≈ 6.5)`,
        note:
            "Apply agricultural lime (CaCO₃ ≥ 85%) in split doses with incorporation; re-test pH after one season."
    };
}

function gypsumRequirement(esp, cec) {

    if (esp === null || esp <= 15) {
        return null;
    }

    if (cec === null) {
        return {
            tonnesPerHa: null,
            basis:
                "GR = (ESP − 15) × CEC ÷ 100; gypsum (t/ha) = GR × 1.72",
            note:
                "ESP exceeds the sodic threshold (15), but CEC was not supplied — gypsum requirement cannot be computed. Provide CEC (cmol(+)/kg) or consult your soil-testing laboratory."
        };
    }

    const gr = ((esp - 15) * cec) / 100;
    const tonnes = gr * 1.72;

    return {
        tonnesPerHa: Math.round(tonnes * 10) / 10,
        basis:
            `GR = (${esp.toFixed(1)} − 15) × ${cec.toFixed(1)} ÷ 100 = ${gr.toFixed(2)} cmol(+)/kg; gypsum = GR × 1.72 t/ha`,
        note:
            "Apply mined gypsum (CaSO₄·2H₂O ≥ 90%) in split doses with leaching irrigations; keep field ponded where possible; re-test ESP after one season."
    };
}

/* Generic (blanket) recommendations, adjusted by soil-test status. */

const BLANKET_RECOMMENDATIONS = {
    Rice:      { n: 120, p: 60, k: 40 },
    Wheat:     { n: 120, p: 60, k: 40 },
    Maize:     { n: 150, p: 60, k: 40 },
    Cotton:    { n: 120, p: 60, k: 60 },
    Potato:    { n: 150, p: 80, k: 100 },
    Tomato:    { n: 120, p: 80, k: 80 },
    Soybean:   { n: 25,  p: 60, k: 40 },
    Groundnut: { n: 20,  p: 40, k: 60 },
    Other:     { n: 100, p: 50, k: 50 }
};

const STATUS_ADJUSTMENT = {
    low: 1.25,
    medium: 1.0,
    high: 0
};

const N_ADJUSTMENT = {
    low: 1.2,
    medium: 1.0,
    high: 0.8
};

function adjustmentFactor(level, table) {

    if (!level) {
        return 1;
    }

    return table[level] ?? 1;
}

function buildFertilizerPlan({ crop, classifications, organicCarbon }) {

    const base =
        BLANKET_RECOMMENDATIONS[crop] ||
        BLANKET_RECOMMENDATIONS.Other;

    const nLevel = classifications.nitrogen.level;
    const pLevel = classifications.phosphorus.level;
    const kLevel = classifications.potassium.level;

    const nDose =
        Math.round(base.n * adjustmentFactor(nLevel, N_ADJUSTMENT));

    const pDose =
        Math.round(base.p * adjustmentFactor(pLevel, STATUS_ADJUSTMENT));

    const kDose =
        Math.round(base.k * adjustmentFactor(kLevel, STATUS_ADJUSTMENT));

    const rows = [
        {
            nutrient: "Nitrogen (N)",
            testStatus: classifications.nitrogen.label,
            doseKgHa: nDose,
            sources:
                "Urea (46% N): " +
                Math.round(nDose / 0.46) +
                " kg/ha",
            timing:
                "Split 50% basal, 25% at tillering / early vegetative, 25% at panicle initiation / flowering."
        },
        {
            nutrient: "Phosphorus (P₂O₅)",
            testStatus: classifications.phosphorus.label,
            doseKgHa: pDose,
            sources:
                "SSP (16% P₂O₅): " +
                Math.round(pDose / 0.16) +
                " kg/ha  or  DAP (46%): " +
                Math.round(pDose / 0.46) +
                " kg/ha",
            timing:
                "Full dose as basal, placed near the root zone. If using DAP, its N contribution (18%) may replace part of the urea requirement."
        },
        {
            nutrient: "Potash (K₂O)",
            testStatus: classifications.potassium.label,
            doseKgHa: kDose,
            sources:
                "MOP (60% K₂O): " +
                Math.round(kDose / 0.6) +
                " kg/ha",
            timing:
                "Full dose as basal for field crops; 30–40% split at tuber initiation / fruiting in potato and tomato."
        }
    ];

    const amendments = [];

    if (organicCarbon !== null) {

        amendments.push({
            material: "FYM / compost",
            dose:
                organicCarbon < 0.5
                    ? "10–15 t/ha"
                    : "5 t/ha (maintenance)",
            note:
                organicCarbon < 0.5
                    ? "Incorporate well-rotted farmyard manure 3–4 weeks before sowing to rebuild organic matter."
                    : "Maintain organic matter through residues and green manure."
        });
    } else {

        amendments.push({
            material: "FYM / compost",
            dose: "5–10 t/ha",
            note:
                "Organic carbon was not supplied; a maintenance farmyard application is recommended."
        });
    }

    return {
        crop,
        basis:
            "General crop recommendation adjusted by soil-test status (Low ×1.25, Medium ×1.0, High ×0 for P and K; N scaled ×1.2 / ×1.0 / ×0.8). Values not tested are left at the medium (×1.0) rate.",
        rows,
        amendments
    };
}

function buildMicronutrientCorrections(classifications) {

    const corrections = [];

    if (classifications.zinc.level === "low") {
        corrections.push({
            nutrient: "Zinc (Zn)",
            material: "Zinc sulphate monohydrate (33% Zn)",
            dose: "25 kg/ha once every 2–3 seasons, or 0.5% foliar ZnSO₄ at early vegetative stage",
            note:
                "Zinc deficiency is the most common micronutrient disorder in Indian soils; most responsive in cereals, pulses and oilseeds."
        });
    }

    if (classifications.iron.level === "low") {
        corrections.push({
            nutrient: "Iron (Fe)",
            material: "Ferrous sulphate (19% Fe)",
            dose: "25 kg/ha soil application, or 1% FeSO₄ foliar spray at first chlorosis symptoms",
            note:
                "Common on calcareous / high-pH soils; prefer foliar correction for standing crops."
        });
    }

    if (classifications.manganese.level === "low") {
        corrections.push({
            nutrient: "Manganese (Mn)",
            material: "Manganese sulphate (26–28% Mn)",
            dose: "10–20 kg/ha soil application, or 0.5% MnSO₄ foliar spray",
            note:
                "Frequently deficient in high-pH and over-limed soils; watch cereals and legumes."
        });
    }

    if (classifications.copper.level === "low") {
        corrections.push({
            nutrient: "Copper (Cu)",
            material: "Copper sulphate (25% Cu)",
            dose: "5 kg/ha soil application",
            note:
                "Rarely required; apply only on confirmed deficiency, typically in organic / peat soils."
        });
    }

    if (classifications.boron.level === "low") {
        corrections.push({
            nutrient: "Boron (B)",
            material: "Borax (11% B)",
            dose: "1 kg/ha soil application, or 0.2% boric-acid foliar spray before flowering",
            note:
                "Critical for pollen germination and fruit set; essential in oilseeds, pulses and cotton."
        });
    }

    if (classifications.sulphur.level === "low") {
        corrections.push({
            nutrient: "Sulphur (S)",
            material: "Elemental sulphur (90% S) or gypsum (18% S)",
            dose: "20–40 kg S/ha, or 100–200 kg gypsum/ha",
            note:
                "Sulphur boosts oil content in oilseeds and N-use efficiency; single super phosphate also supplies S."
        });
    }

    return corrections;
}

function buildInterpretation({ ph, ec, organicCarbon, classifications, lime, gypsum, esp }) {

    const points = [];

    if (ph !== null) {

        if (ph < 5.5) {
            points.push({
                level: "bad",
                text:
                    `Soil is ${classifications.ph.label.toLowerCase()} (pH ${ph.toFixed(1)}). Aluminium and manganese toxicity risk is elevated; apply lime${lime ? ` (≈${lime.tonnesPerHa} t CaCO₃/ha)` : ""} before sowing.`
            });
        } else if (ph > 8.5) {
            points.push({
                level: "bad",
                text:
                    `Soil is ${classifications.ph.label.toLowerCase()} (pH ${ph.toFixed(1)}). Iron, zinc, manganese and phosphorus availability decline sharply; apply elemental sulphur and organic matter, and prefer acid-forming fertilizers.`
            });
        } else if (ph >= 6.5 && ph <= 7.3) {
            points.push({
                level: "ok",
                text:
                    `Soil reaction is neutral (pH ${ph.toFixed(1)}) — the optimum window for most field crops.`
            });
        } else {
            points.push({
                level: "warn",
                text:
                    `Soil is ${classifications.ph.label.toLowerCase()} (pH ${ph.toFixed(1)}). Monitor micronutrient availability and re-test annually.`
            });
        }
    }

    if (ec !== null) {

        if (ec >= 4) {
            points.push({
                level: "bad",
                text:
                    `Electrical conductivity ${ec.toFixed(2)} dS/m indicates ${classifications.ec.label.toLowerCase()} conditions. Leach salts with good-quality irrigation, improve drainage and select salt-tolerant varieties.`
            });
        } else if (ec >= 2) {
            points.push({
                level: "warn",
                text:
                    `EC ${ec.toFixed(2)} dS/m — mild salinity affecting sensitive crops (beans, carrots, peas). Monitor and leach periodically.`
            });
        } else {
            points.push({
                level: "ok",
                text:
                    `EC ${ec.toFixed(2)} dS/m — no salinity constraint.`
            });
        }
    }

    if (esp !== null && esp > 15) {

        points.push({
            level: "bad",
            text:
                `ESP ${esp.toFixed(1)} exceeds the sodicity threshold (15). Sodium must be displaced with gypsum${gypsum && gypsum.tonnesPerHa ? ` (≈${gypsum.tonnesPerHa} t/ha)` : ""} followed by leaching; reclaim before sowing.`
        });
    }

    if (organicCarbon !== null) {

        if (organicCarbon < 0.5) {
            points.push({
                level: "bad",
                text:
                    `Organic carbon ${organicCarbon.toFixed(2)}% is low. Nutrient cycling, aggregation and water holding are degraded — prioritise FYM/compost and residue retention.`
            });
        } else if (organicCarbon >= 0.75) {
            points.push({
                level: "ok",
                text:
                    `Organic carbon ${organicCarbon.toFixed(2)}% — satisfactory for sustained fertility.`
            });
        } else {
            points.push({
                level: "warn",
                text:
                    `Organic carbon ${organicCarbon.toFixed(2)}% — medium. Build organic matter gradually.`
            });
        }
    }

    for (const [key, label] of [
        ["nitrogen", "Nitrogen"],
        ["phosphorus", "Available phosphorus"],
        ["potassium", "Available potash"],
        ["sulphur", "Sulphur"],
        ["zinc", "Zinc"],
        ["iron", "Iron"],
        ["manganese", "Manganese"],
        ["copper", "Copper"],
        ["boron", "Boron"],
        ["calcium", "Calcium"],
        ["magnesium", "Magnesium"]
    ]) {

        const item = classifications[key];

        if (item && item.level === "low") {
            points.push({
                level: "bad",
                text:
                    `${label} is ${item.label === "Low" ? "LOW" : item.label} — dependent on soil-test correction before the next crop.`
            });
        }
    }

    if (points.every(p => p.level === "ok")) {

        points.push({
            level: "ok",
            text:
                "No major limiting factor detected in the supplied results. Maintain balanced nutrition and re-test annually."
        });
    }

    return points;
}

function buildVerdict({ score, ph, ec, esp }) {

    if (
        (ph !== null && ph < 5) ||
        (ec !== null && ec >= 8) ||
        (esp !== null && esp > 15)
    ) {
        return "Amelioration required before sowing";
    }

    if (score === null || score >= 80) {
        return "Highly suitable — maintain soil health";
    }

    if (score >= 60) {
        return "Suitable with nutrient management";
    }

    if (score >= 40) {
        return "Marginal — correct limiting factors first";
    }

    return "Not suitable without amelioration";
}

function buildMethods({ provided, phosphorusMethod, nutrientUnit }) {

    const methods = [];

    const add = (parameter, method, reference) =>
        methods.push({ parameter, method, reference });

    if (provided.ph) {
        add("pH", "1:2.5 soil : water suspension", "Jackson, 1973");
    }

    if (provided.ec) {
        add("EC", "1:2 soil : water extract, conductivity bridge", "Jackson, 1973");
    }

    if (provided.organicCarbon) {
        add("Organic carbon", "Walkley & Black wet oxidation", "Walkley & Black, 1934");
    }

    if (provided.nitrogen) {
        add("Available nitrogen", "Alkaline potassium permanganate", "Subbiah & Asija, 1956");
    }

    if (provided.phosphorus) {
        add(
            "Available phosphorus",
            phosphorusMethod === "Bray-1"
                ? "Bray & Kurtz No. 1 extractant"
                : "0.5 M NaHCO₃ (Olsen) extractant",
            phosphorusMethod === "Bray-1"
                ? "Bray & Kurtz, 1945"
                : "Olsen et al., 1954"
        );
    }

    if (provided.potassium) {
        add("Available potash", "Neutral normal ammonium acetate, flame photometry", "Jackson, 1973");
    }

    if (provided.sulphur) {
        add("Available sulphur", "Calcium chloride extractable, turbidimetric", "Chesnin & Yien, 1950");
    }

    if (provided.calcium || provided.magnesium) {
        add("Exchangeable Ca / Mg", "Neutral normal ammonium acetate", "Jackson, 1973");
    }

    if (provided.zinc || provided.iron || provided.manganese || provided.copper) {
        add("DTPA-extractable Zn, Fe, Mn, Cu", "DTPA chelate extraction, AAS", "Lindsay & Norvell, 1978");
    }

    if (provided.boron) {
        add("Available boron", "Hot-water soluble, colorimetric (Azomethine-H)", "Berger & Truog, 1939");
    }

    if (provided.cec) {
        add("CEC", "Ammonium acetate saturation, distillation", "Jackson, 1973");
    }

    if (provided.esp) {
        add("ESP / exchangeable sodium", "Ammonium acetate; ESP = (Na / CEC) × 100", "Jackson, 1973");
    }

    if (provided.bufferPh) {
        add("Buffer pH / lime requirement", "SMP buffer", "Shoemaker et al., 1961");
    }

    if (nutrientUnit === "ppm") {
        add(
            "Unit conversion",
            "Values entered in mg/kg (ppm) converted to kg/ha for the 0–15 cm furrow slice using factor 2.24",
            "Bulk density 1.28 g/cm³ assumed"
        );
    }

    return methods;
}

function generateReportId() {

    const now = new Date();

    const ymd =
        String(now.getFullYear()) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");

    const random =
        Math.random().toString(36).slice(2, 6).toUpperCase();

    return `GW-${ymd}-${random}`;
}

function cleanText(value, maxLength = 80) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/[<>]/g, "")
        .trim()
        .slice(0, maxLength);
}

/*
|--------------------------------------------------------------------------
| SCORE FUNCTIONS
|--------------------------------------------------------------------------
*/

function calculatePhScore(ph, crop) {

    if (ph === null) {
        return null;
    }

    if (
        ph >= crop.phIdealMin &&
        ph <= crop.phIdealMax
    ) {
        return 100;
    }

    if (ph < crop.phIdealMin) {

        return clamp(
            100 - (crop.phIdealMin - ph) * 25
        );
    }

    return clamp(
        100 - (ph - crop.phIdealMax) * 25
    );
}


function calculateEcScore(ec, crop, soil) {

    if (ec === null) {
        return null;
    }

    if (ec <= 1) {
        return 100;
    }

    const limit =
        10 *
        (crop.salinityTolerance / 60) /
        soil.salinityRisk;

    if (ec >= limit) {
        return 0;
    }

    return clamp(
        100 -
        ((ec - 1) / (limit - 1)) * 100
    );
}


function calculateOrganicScore(organicCarbon, soil) {

    if (organicCarbon === null) {
        return null;
    }

    let score;

    if (organicCarbon >= 2) {
        score = 100;
    } else {
        score =
            (organicCarbon / 2) * 100;
    }

    if (soil.nutrientRetention < 60) {
        score += 5;
    }

    return clamp(score);
}


function calculateNutrientBase(value, upperLimit) {

    if (value === null) {
        return null;
    }

    return clamp(
        (value / upperLimit) * 100
    );
}


function calculateCropNutrientScore(
    baseScore,
    demand,
    stageFactor
) {

    if (baseScore === null) {
        return null;
    }

    const effectiveDemand =
        demand * stageFactor;

    return clamp(
        (baseScore / effectiveDemand) * 100
    );
}


function nutrientStatus(score) {

    if (score === null) {
        return "Unknown";
    }

    if (score < 30) {
        return "Very Low";
    }

    if (score < 50) {
        return "Low";
    }

    if (score < 70) {
        return "Moderate";
    }

    if (score < 85) {
        return "Good";
    }

    return "High";
}


function calculateSoilHealthScore(scores) {

    const weights = {
        ph: 0.20,
        ec: 0.10,
        organicCarbon: 0.15,
        nitrogen: 0.20,
        phosphorus: 0.15,
        potassium: 0.20
    };

    let total = 0;
    let usedWeight = 0;

    for (const key of Object.keys(weights)) {

        if (scores[key] !== null) {

            total +=
                scores[key] *
                weights[key];

            usedWeight +=
                weights[key];
        }
    }

    if (usedWeight === 0) {
        return 0;
    }

    return round(
        total / usedWeight
    );
}


function overallStatus(score) {

    if (score < 40) {
        return "Critical";
    }

    if (score < 60) {
        return "Needs Attention";
    }

    if (score < 75) {
        return "Fair";
    }

    if (score < 90) {
        return "Good";
    }

    return "Excellent";
}


/*
|--------------------------------------------------------------------------
| CROP FIT
|--------------------------------------------------------------------------
*/

function calculateCropFit(data) {

    const components = [];

    if (data.phScore !== null) {
        components.push({
            score: data.phScore,
            weight: 0.25
        });
    }

    if (data.ecScore !== null) {
        components.push({
            score: data.ecScore,
            weight: 0.15
        });
    }

    if (data.nitrogenScore !== null) {
        components.push({
            score: data.nitrogenScore,
            weight: 0.20
        });
    }

    if (data.phosphorusScore !== null) {
        components.push({
            score: data.phosphorusScore,
            weight: 0.15
        });
    }

    if (data.potassiumScore !== null) {
        components.push({
            score: data.potassiumScore,
            weight: 0.15
        });
    }

    components.push({
        score: data.waterBehavior,
        weight: 0.05
    });

    components.push({
        score: data.nutrientRetention,
        weight: 0.05
    });

    let total = 0;
    let weight = 0;

    components.forEach((item) => {

        total +=
            item.score *
            item.weight;

        weight +=
            item.weight;
    });

    let result =
        weight > 0
            ? total / weight
            : 0;

    if (
        data.stage.sensitivity > 1 &&
        result < 70
    ) {

        result -=
            (data.stage.sensitivity - 1) * 15;
    }

    return round(
        clamp(result)
    );
}


function cropFitStatus(score) {

    if (score < 40) {
        return "Poor Fit";
    }

    if (score < 60) {
        return "Needs Management";
    }

    if (score < 75) {
        return "Suitable";
    }

    if (score < 90) {
        return "Highly Suitable";
    }

    return "Excellent Fit";
}


/*
|--------------------------------------------------------------------------
| CONSTRAINTS
|--------------------------------------------------------------------------
*/

function buildConstraints(data) {

    const constraints = [];

    if (
        data.nitrogenScore !== null &&
        data.nitrogenScore < 50
    ) {

        constraints.push({
            priority: 1,
            name: "Nitrogen Availability",
            reason:
                `${data.crop} has relatively high nitrogen demand at the ${data.stage} stage while the current screening score is low.`
        });
    }

    if (
        data.phosphorusScore !== null &&
        data.phosphorusScore < 50
    ) {

        constraints.push({
            priority: 1,
            name: "Phosphorus Availability",
            reason:
                `Phosphorus availability may limit ${data.crop} development at the ${data.stage} stage.`
        });
    }

    if (
        data.potassiumScore !== null &&
        data.potassiumScore < 50
    ) {

        constraints.push({
            priority: 1,
            name: "Potassium Availability",
            reason:
                `Potassium availability may become limiting for ${data.crop}.`
        });
    }

    if (
        data.phScore !== null &&
        data.phScore < 50
    ) {

        constraints.push({
            priority: 1,
            name: "pH Suitability",
            reason:
                `The soil pH is outside the preferred screening range for ${data.crop}.`
        });
    }

    if (
        data.ecScore !== null &&
        data.ecScore < 50
    ) {

        constraints.push({
            priority: 1,
            name: "Salinity Stress",
            reason:
                `Electrical conductivity indicates elevated salinity stress for ${data.crop}.`
        });
    }

    if (
        data.organicScore !== null &&
        data.organicScore < 50
    ) {

        constraints.push({
            priority: 2,
            name: "Low Organic Carbon",
            reason:
                "Low organic carbon may reduce nutrient cycling, soil structure and water-holding resilience."
        });
    }

    constraints.sort(
        (a, b) =>
            a.priority - b.priority
    );

    return constraints;
}


/*
|--------------------------------------------------------------------------
| RISKS
|--------------------------------------------------------------------------
*/

function buildRisks(data) {

    const minimumNutrient =
        Math.min(
            data.nitrogenScore ?? 100,
            data.phosphorusScore ?? 100,
            data.potassiumScore ?? 100
        );

    let nutrientRisk = "Low";

    if (minimumNutrient < 35) {
        nutrientRisk = "High";
    } else if (
        minimumNutrient < 55 ||
        data.soil.nutrientRetention < 60
    ) {
        nutrientRisk = "Moderate";
    }

    let salinity = "Low";

    if (data.ec !== null) {

        if (
            data.ec >= 6 &&
            data.crop.salinityTolerance < 60
        ) {
            salinity = "High";
        } else if (data.ec >= 4) {
            salinity = "Moderate";
        }
    }

    return {

        nutrientDepletion:
            nutrientRisk,

        acidity:
            data.ph !== null &&
            data.ph < 5.5
                ? "High"
                : data.ph !== null &&
                  data.ph < 6
                    ? "Moderate"
                    : "Low",

        alkalinity:
            data.ph !== null &&
            data.ph > 8.5
                ? "High"
                : data.ph !== null &&
                  data.ph > 8
                    ? "Moderate"
                    : "Low",

        salinity,

        organicMatterDecline:
            data.organicScore !== null &&
            data.organicScore < 35
                ? "High"
                : data.organicScore !== null &&
                  data.organicScore < 55
                    ? "Moderate"
                    : "Low"
    };
}


/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

function buildActions(data) {

    const actions = [];

    if (data.constraints.length > 0) {

        actions.push({
            timing: "Immediate",
            action:
                `Review the primary constraint: ${data.constraints[0].name}.`
        });

    } else {

        actions.push({
            timing: "Immediate",
            action:
                `Maintain balanced nutrient management for ${data.crop} and avoid unnecessary fertilizer application.`
        });
    }

    if (
        data.scores.nitrogen !== null &&
        data.scores.nitrogen < 55
    ) {

        actions.push({
            timing: "Current growth stage",
            action:
                `Review nitrogen availability because ${data.crop} is currently at the ${data.growthStage} stage.`
        });
    }

    if (
        data.scores.phosphorus !== null &&
        data.scores.phosphorus < 55
    ) {

        actions.push({
            timing: "Current growth stage",
            action:
                `Review phosphorus availability for ${data.crop} during the ${data.growthStage} stage.`
        });
    }

    if (
        data.scores.potassium !== null &&
        data.scores.potassium < 55
    ) {

        actions.push({
            timing: "Current growth stage",
            action:
                `Review potassium availability during the current crop stage.`
        });
    }

    if (
        data.soil.nutrientRetention < 60
    ) {

        actions.push({
            timing: "Irrigation & nutrition",
            action:
                "Because this soil has relatively low nutrient-retention capacity, avoid large single fertilizer applications and follow locally appropriate recommendations."
        });
    }

    if (
        data.scores.organicCarbon !== null &&
        data.scores.organicCarbon < 60
    ) {

        actions.push({
            timing: "Next season",
            action:
                "Increase suitable organic matter return through crop residues, compost or other locally appropriate organic inputs."
        });
    }

    actions.push({
        timing: "Next 7 days",
        action:
            `Monitor ${data.crop} at the ${data.growthStage} stage and compare crop response with the soil-test results before making another major nutrient decision.`
    });

    return actions.slice(0, 6);
}


/*
|--------------------------------------------------------------------------
| MAIN ANALYSIS
|--------------------------------------------------------------------------
*/

function analyzeSoil(input) {

    /*
    Normalize text.
    */

    const crop =
        CROP_PROFILES[input.crop]
            ? input.crop
            : "Other";

    const growthStage =
        STAGE_PROFILES[input.growthStage]
            ? input.growthStage
            : "Vegetative";

    const soilType =
        SOIL_PROFILES[input.soilType]
            ? input.soilType
            : "Loam";


    /*
    Convert numbers.
    */

    const ph =
        validateNumber(
            "ph",
            number(input.ph)
        );

    const ec =
        validateNumber(
            "ec",
            number(input.ec)
        );

    const organicCarbon =
        validateNumber(
            "organicCarbon",
            number(input.organicCarbon)
        );

    const nitrogen =
        validateNumber(
            "nitrogen",
            number(input.nitrogen)
        );

    const phosphorus =
        validateNumber(
            "phosphorus",
            number(input.phosphorus)
        );

    const potassium =
        validateNumber(
            "potassium",
            number(input.potassium)
        );


    /*
    Unit handling. Macronutrients may be entered in ppm
    (mg/kg); convert to kg/ha for the 0–15 cm furrow slice.
    */

    const nutrientUnit =
        input.nutrientUnit === "ppm" ? "ppm" : "kgha";

    const toKgHa = value =>
        nutrientUnit === "ppm" && value !== null
            ? value * PPM_TO_KGHA
            : value;

    const nitrogenKgHa =
        toKgHa(nitrogen);

    const phosphorusKgHa =
        toKgHa(phosphorus);

    const potassiumKgHa =
        toKgHa(potassium);


    /*
    Additional professional parameters (all optional).
    */

    const calcium =
        toKgHa(
            validateNumber(
                "calcium",
                number(input.calcium)
            )
        );

    const magnesium =
        toKgHa(
            validateNumber(
                "magnesium",
                number(input.magnesium)
            )
        );

    const sulphur =
        toKgHa(
            validateNumber(
                "sulphur",
                number(input.sulphur)
            )
        );

    /* Micronutrients are always reported in ppm (DTPA / hot water). */
    const zinc =
        validateNumber("zinc", number(input.zinc));

    const iron =
        validateNumber("iron", number(input.iron));

    const manganese =
        validateNumber("manganese", number(input.manganese));

    const copper =
        validateNumber("copper", number(input.copper));

    const boron =
        validateNumber("boron", number(input.boron));

    const cec =
        validateNumber("cec", number(input.cec));

    const esp =
        validateNumber("esp", number(input.esp));

    const bufferPh =
        validateNumber("bufferPh", number(input.bufferPh));

    const baseSaturation =
        validateNumber(
            "baseSaturation",
            number(input.baseSaturation)
        );

    const bulkDensity =
        validateNumber(
            "bulkDensity",
            number(input.bulkDensity)
        );

    const phosphorusMethod =
        input.phosphorusMethod === "Bray-1" ? "Bray-1" : "Olsen";


    /*
    Sample metadata (echoed back for the report).
    */

    const sampleMeta = {

        farmName:
            cleanText(input.farmName, 80),

        fieldName:
            cleanText(input.fieldName, 80),

        sampleDepth:
            cleanText(input.sampleDepth, 20) || "0–15 cm",

        sampleDate:
            cleanText(input.sampleDate, 20),

        reportId:
            cleanText(input.reportId, 40) ||
            generateReportId()
    };


    /*
    Profiles.
    */

    const cropProfile =
        CROP_PROFILES[crop];

    const stageProfile =
        STAGE_PROFILES[growthStage];

    const soilProfile =
        SOIL_PROFILES[soilType];


    /*
    Base nutrient scores.
    */

    const baseNitrogen =
        calculateNutrientBase(
            nitrogenKgHa,
            1000
        );

    const basePhosphorus =
        calculateNutrientBase(
            phosphorusKgHa,
            100
        );

    const basePotassium =
        calculateNutrientBase(
            potassiumKgHa,
            600
        );


    /*
    Crop + stage scores.
    */

    const nitrogenScore =
        calculateCropNutrientScore(
            baseNitrogen,
            cropProfile.nitrogenDemand,
            stageProfile.nitrogen
        );

    const phosphorusScore =
        calculateCropNutrientScore(
            basePhosphorus,
            cropProfile.phosphorusDemand,
            stageProfile.phosphorus
        );

    const potassiumScore =
        calculateCropNutrientScore(
            basePotassium,
            cropProfile.potassiumDemand,
            stageProfile.potassium
        );


    /*
    Other scores.
    */

    const phScore =
        calculatePhScore(
            ph,
            cropProfile
        );

    const ecScore =
        calculateEcScore(
            ec,
            cropProfile,
            soilProfile
        );

    const organicScore =
        calculateOrganicScore(
            organicCarbon,
            soilProfile
        );


    /*
    Soil health.
    */

    const score =
        calculateSoilHealthScore({

            ph: phScore,

            ec: ecScore,

            organicCarbon: organicScore,

            nitrogen: baseNitrogen,

            phosphorus: basePhosphorus,

            potassium: basePotassium
        });


    /*
    Water behavior.
    */

    let waterBehavior =
        soilProfile.waterBehavior;

    if (ecScore !== null) {

        if (ecScore < 40) {
            waterBehavior -= 20;
        } else if (ecScore < 60) {
            waterBehavior -= 10;
        }
    }

    waterBehavior =
        round(
            clamp(waterBehavior)
        );


    /*
    Crop fit.
    */

    const cropFit =
        calculateCropFit({

            phScore,

            ecScore,

            nitrogenScore,

            phosphorusScore,

            potassiumScore,

            waterBehavior,

            nutrientRetention:
                soilProfile.nutrientRetention,

            stage:
                stageProfile
        });


    /*
    Constraints.
    */

    const constraints =
        buildConstraints({

            nitrogenScore,

            phosphorusScore,

            potassiumScore,

            phScore,

            ecScore,

            organicScore,

            crop,

            stage:
                growthStage
        });


    /*
    Risks.
    */

    const risks =
        buildRisks({

            nitrogenScore,

            phosphorusScore,

            potassiumScore,

            ph,

            ec,

            organicScore,

            crop:
                cropProfile,

            soil:
                soilProfile
        });


    /*
    Actions.
    */

    const actions =
        buildActions({

            crop,

            growthStage,

            constraints,

            scores: {

                nitrogen:
                    nitrogenScore,

                phosphorus:
                    phosphorusScore,

                potassium:
                    potassiumScore,

                organicCarbon:
                    organicScore
            },

            soil:
                soilProfile
        });


    /*
    |--------------------------------------------------------------
    | PROFESSIONAL SOIL-TEST LAYER
    |--------------------------------------------------------------
    */

    const pBands =
        phosphorusMethod === "Bray-1"
            ? BANDS.phosphorusBray
            : BANDS.phosphorusOlsen;

    const classifications = {

        ph:
            classify(ph, BANDS.ph),

        ec:
            classify(ec, BANDS.ec),

        organicCarbon:
            classify(
                organicCarbon,
                BANDS.organicCarbon
            ),

        nitrogen:
            classify(
                nitrogenKgHa,
                BANDS.nitrogen
            ),

        phosphorus:
            classify(
                phosphorusKgHa,
                pBands
            ),

        potassium:
            classify(
                potassiumKgHa,
                BANDS.potassium
            ),

        sulphur:
            classify(
                sulphur,
                BANDS.sulphur
            ),

        calcium:
            classify(
                calcium,
                BANDS.calcium
            ),

        magnesium:
            classify(
                magnesium,
                BANDS.magnesium
            ),

        zinc:
            classify(zinc, BANDS.zinc),

        iron:
            classify(iron, BANDS.iron),

        manganese:
            classify(
                manganese,
                BANDS.manganese
            ),

        copper:
            classify(
                copper,
                BANDS.copper
            ),

        boron:
            classify(boron, BANDS.boron),

        cec:
            classify(cec, BANDS.cec),

        esp:
            classify(esp, BANDS.esp),

        baseSaturation:
            classify(
                baseSaturation,
                BANDS.baseSaturation
            ),

        bulkDensity:
            classify(
                bulkDensity,
                BANDS.bulkDensity
            )
    };

    const parkerIndex =
        parkerNutrientIndex([
            classifications.organicCarbon,
            classifications.nitrogen,
            classifications.phosphorus,
            classifications.potassium,
            classifications.sulphur,
            classifications.zinc,
            classifications.iron,
            classifications.manganese,
            classifications.copper,
            classifications.boron
        ]);

    const lime =
        limeRequirement(ph, soilType, bufferPh);

    const gypsum =
        gypsumRequirement(esp, cec);

    const fertilizerPlan =
        buildFertilizerPlan({
            crop,
            classifications,
            organicCarbon
        });

    const micronutrientCorrections =
        buildMicronutrientCorrections(
            classifications
        );

    const provided = {

        ph:
            ph !== null,

        ec:
            ec !== null,

        organicCarbon:
            organicCarbon !== null,

        nitrogen:
            nitrogenKgHa !== null,

        phosphorus:
            phosphorusKgHa !== null,

        potassium:
            potassiumKgHa !== null,

        sulphur:
            sulphur !== null,

        calcium:
            calcium !== null,

        magnesium:
            magnesium !== null,

        zinc:
            zinc !== null,

        iron:
            iron !== null,

        manganese:
            manganese !== null,

        copper:
            copper !== null,

        boron:
            boron !== null,

        cec:
            cec !== null,

        esp:
            esp !== null,

        bufferPh:
            bufferPh !== null
    };

    const methods =
        buildMethods({
            provided,
            phosphorusMethod,
            nutrientUnit
        });

    const interpretation =
        buildInterpretation({
            ph,
            ec,
            organicCarbon,
            classifications,
            lime,
            gypsum,
            esp
        });

    const verdict =
        buildVerdict({
            score,
            ph,
            ec,
            esp
        });

    /*
    Amendment actions are appended to the standard plan so
    the farmer sees them in one place.
    */

    if (lime) {

        actions.unshift({
            timing: "Before sowing",
            action:
                `Apply agricultural lime (CaCO₃) at approximately ${lime.tonnesPerHa} t/ha to raise soil pH toward 6.5. ${lime.note}`
        });
    }

    if (gypsum && gypsum.tonnesPerHa) {

        actions.unshift({
            timing: "Before sowing",
            action:
                `Apply gypsum at approximately ${gypsum.tonnesPerHa} t/ha in split doses with leaching irrigation to reclaim sodic soil. ${gypsum.note}`
        });
    }

    for (const correction of micronutrientCorrections) {

        actions.unshift({
            timing: "Before sowing",
            action:
                `${correction.nutrient}: ${correction.dose}. ${correction.note}`
        });
    }

    const professionalActions =
        actions.slice(0, 8);


    /*
    Final response.
    */

    return {

        success: true,

        crop,

        growthStage,

        soilType,

        score,

        overallStatus:
            overallStatus(score),

        cropFit,

        cropFitStatus:
            cropFitStatus(cropFit),


        /*
        Professional soil-test report fields.
        */

        reportId:
            sampleMeta.reportId,

        sampleMeta,

        nutrientUnit,

        phosphorusMethod,


        classifications,

        parkerIndex,

        limeRequirement:
            lime,

        gypsumRequirement:
            gypsum,

        fertilizerPlan,

        micronutrientCorrections,

        interpretation,

        verdict,

        methods,


        calculatedScores: {

            ph: phScore,

            ec: ecScore,

            organicCarbon: organicScore,

            nitrogen: nitrogenScore,

            phosphorus: phosphorusScore,

            potassium: potassiumScore
        },


        parameters: {

            ph: {

                value: ph,

                status:
                    ph === null
                        ? "Unknown"
                        : ph < 5
                            ? "Strongly acidic"
                            : ph < 6
                                ? "Acidic"
                                : ph <= 7.5
                                    ? "Optimal"
                                    : ph <= 8
                                        ? "Slightly alkaline"
                                        : ph <= 9
                                            ? "Alkaline"
                                            : "Strongly alkaline",

                score: phScore
            },

            ec: {

                value: ec,

                status:
                    ec === null
                        ? "Unknown"
                        : ec < 2
                            ? "Low"
                            : ec < 4
                                ? "Moderate"
                                : ec < 8
                                    ? "High"
                                    : "Very High",

                score: ecScore
            },

            organicCarbon: {

                value: organicCarbon,

                status:
                    organicCarbon === null
                        ? "Unknown"
                        : organicCarbon < 0.5
                            ? "Low"
                            : organicCarbon < 0.75
                                ? "Moderate"
                                : organicCarbon < 1.5
                                    ? "Good"
                                    : "High",

                score: organicScore
            },

            nitrogen: {

                value: nitrogenKgHa,

                status:
                    nutrientStatus(
                        nitrogenScore
                    ),

                score:
                    nitrogenScore
            },

            phosphorus: {

                value: phosphorusKgHa,

                status:
                    nutrientStatus(
                        phosphorusScore
                    ),

                score:
                    phosphorusScore
            },

            potassium: {

                value: potassiumKgHa,

                status:
                    nutrientStatus(
                        potassiumScore
                    ),

                score:
                    potassiumScore
            }
        },


        soilBehavior: {

            waterBehavior,

            nutrientRetention:
                soilProfile.nutrientRetention,

            drainage:
                soilProfile.drainage
        },


        cropProfile: {

            crop,

            nitrogenDemand:
                cropProfile.nitrogenDemand,

            phosphorusDemand:
                cropProfile.phosphorusDemand,

            potassiumDemand:
                cropProfile.potassiumDemand,

            salinityTolerance:
                cropProfile.salinityTolerance
        },


        growthProfile: {

            stage:
                growthStage,

            nitrogenFactor:
                stageProfile.nitrogen,

            phosphorusFactor:
                stageProfile.phosphorus,

            potassiumFactor:
                stageProfile.potassium
        },


        constraints,

        risks,

        actions: professionalActions
    };
}


module.exports = {
    analyzeSoil
};