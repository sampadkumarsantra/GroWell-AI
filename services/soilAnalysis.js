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
        max: 2000
    },

    phosphorus: {
        min: 0,
        max: 500
    },

    potassium: {
        min: 0,
        max: 1500
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
            nitrogen,
            1000
        );

    const basePhosphorus =
        calculateNutrientBase(
            phosphorus,
            100
        );

    const basePotassium =
        calculateNutrientBase(
            potassium,
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

                value: nitrogen,

                status:
                    nutrientStatus(
                        nitrogenScore
                    ),

                score:
                    nitrogenScore
            },

            phosphorus: {

                value: phosphorus,

                status:
                    nutrientStatus(
                        phosphorusScore
                    ),

                score:
                    phosphorusScore
            },

            potassium: {

                value: potassium,

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

        actions
    };
}


module.exports = {
    analyzeSoil
};