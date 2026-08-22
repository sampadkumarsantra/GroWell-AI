import { useState } from "react";
import "./SoilHealth.css";
import { useFarm } from "../context/FarmContext";

function SoilHealth() {
    const {
        updateFarmData,
        updateSoilData
    } = useFarm();

    const [form, setForm] = useState({
        crop: "",
        stage: "",
        soilType: "",
        ph: "",
        ec: "",
        organicCarbon: "",
        nitrogen: "",
        phosphorus: "",
        potassium: ""
    });

    const [analyzing, setAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [result, setResult] = useState(null);

    /* ================================
       HANDLE INPUT
    ================================= */

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        /*
         * IMPORTANT:
         * Save the soil information immediately
         * into the shared FarmContext.
         */

        if (name === "crop") {
            updateFarmData({
                crop: value
            });
        }

        if (name === "stage") {
            updateFarmData({
                growthStage: value
            });
        }

        if (
            [
                "soilType",
                "ph",
                "ec",
                "organicCarbon",
                "nitrogen",
                "phosphorus",
                "potassium"
            ].includes(name)
        ) {
            updateSoilData({
                [name]: value
            });
        }

        setAnalyzed(false);
        setResult(null);
    }


    /* ================================
       ANALYZE SOIL
    ================================= */

    async function analyzeSoil() {
        setAnalyzing(true);
        setAnalyzed(false);
        setResult(null);

        try {
            const response = await fetch(
                "http://localhost:3000/api/soil/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        crop: form.crop,
                        growthStage: form.stage,
                        soilType: form.soilType,
                        ph: form.ph,
                        ec: form.ec,
                        organicCarbon: form.organicCarbon,
                        nitrogen: form.nitrogen,
                        phosphorus: form.phosphorus,
                        potassium: form.potassium
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Soil analysis failed."
                );
            }

            console.log(
                "🌱 GroWell Soil Intelligence:",
                data
            );

            setResult(data);
            setAnalyzed(true);


            /* =================================
               SAVE FARM CONTEXT
            ================================= */

            updateFarmData({
                crop: data.crop || form.crop,
                growthStage:
                    data.growthStage || form.stage
            });


            /* =================================
               SAVE SOIL DATA
            ================================= */

            updateSoilData({
                soilType:
                    data.soilType || form.soilType,

                ph: form.ph,
                ec: form.ec,
                organicCarbon:
                    form.organicCarbon,

                nitrogen:
                    form.nitrogen,

                phosphorus:
                    form.phosphorus,

                potassium:
                    form.potassium,

                /*
                 * Store useful analysis results
                 * inside the soil object as well.
                 */

                score: data.score || "",
                overallStatus:
                    data.overallStatus || "",

                cropFit:
                    data.cropFit || "",

                cropFitStatus:
                    data.cropFitStatus || "",

                risks:
                    data.risks || {},

                parameters:
                    data.parameters || {},

                constraints:
                    data.constraints || [],

                actions:
                    data.actions || []
            });

        } catch (error) {
            console.error(
                "Soil Intelligence Error:",
                error
            );

            alert(
                error.message ||
                "Unable to analyze soil."
            );

        } finally {
            setAnalyzing(false);
        }
    }


    /* ================================
       HELPERS
    ================================= */

    function scoreValue(value) {
        if (
            value === null ||
            value === undefined ||
            Number.isNaN(Number(value))
        ) {
            return 0;
        }

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(Number(value))
            )
        );
    }


    function getParameter(name) {
        if (!result?.parameters) {
            return null;
        }

        return result.parameters[name] || null;
    }


    function getRisk(name) {
        if (!result?.risks) {
            return "Unknown";
        }

        return result.risks[name] || "Unknown";
    }


    function getStatusClass(status) {
        if (!status) {
            return "warning";
        }

        const normalized =
            String(status).toLowerCase();

        if (
            normalized.includes("critical") ||
            normalized.includes("very low") ||
            normalized.includes("high") ||
            normalized.includes("danger")
        ) {
            return "danger";
        }

        if (
            normalized.includes("moderate") ||
            normalized.includes("low") ||
            normalized.includes("fair") ||
            normalized.includes("attention")
        ) {
            return "warning";
        }

        return "good";
    }


    function getParameterScore(name) {
        const parameter =
            getParameter(name);

        if (!parameter) {
            return 0;
        }

        if (
            parameter.score !== undefined &&
            parameter.score !== null
        ) {
            return scoreValue(
                parameter.score
            );
        }

        return 0;
    }


    function getPrimaryConstraint() {
        if (
            result?.constraints &&
            result.constraints.length > 0
        ) {
            return result.constraints[0];
        }

        return null;
    }


    function getSecondaryConstraint() {
        if (
            result?.constraints &&
            result.constraints.length > 1
        ) {
            return result.constraints[1];
        }

        return null;
    }


    /* ================================
       CROP PRIORITY
    ================================= */

    function getCropPriority() {
        if (!result) {
            return null;
        }

        const crop = (
            result.crop ||
            form.crop ||
            ""
        ).toLowerCase();

        const stage = (
            result.growthStage ||
            form.stage ||
            ""
        ).toLowerCase();

        if (crop === "rice") {
            if (
                stage === "seedling" ||
                stage === "vegetative"
            ) {
                return {
                    priority:
                        "Vegetative nutrient development",
                    reason:
                        "Rice requires strong early vegetative development and balanced nutrient availability during this stage."
                };
            }

            if (
                stage === "flowering" ||
                stage === "grain filling"
            ) {
                return {
                    priority:
                        "Reproductive-stage nutrition",
                    reason:
                        "Balanced nutrition becomes important for panicle development and grain formation."
                };
            }
        }


        if (crop === "wheat") {
            if (
                stage === "seedling" ||
                stage === "vegetative"
            ) {
                return {
                    priority:
                        "Vegetative growth",
                    reason:
                        "Early wheat growth depends on adequate nutrient availability and healthy root development."
                };
            }

            if (
                stage === "flowering" ||
                stage === "grain filling"
            ) {
                return {
                    priority:
                        "Grain development",
                    reason:
                        "Balanced nutrition supports grain formation and crop performance."
                };
            }
        }


        if (crop === "maize") {
            if (stage === "vegetative") {
                return {
                    priority:
                        "Rapid vegetative growth",
                    reason:
                        "Maize has strong nutrient demand during vegetative growth."
                };
            }

            if (
                stage === "flowering" ||
                stage === "grain filling"
            ) {
                return {
                    priority:
                        "Reproductive development",
                    reason:
                        "Nutrient balance during reproductive development is important for kernel formation."
                };
            }
        }


        if (crop === "potato") {
            if (stage === "vegetative") {
                return {
                    priority:
                        "Canopy development",
                    reason:
                        "Healthy canopy development is important before strong tuber development."
                };
            }

            if (
                stage === "flowering" ||
                stage === "fruiting"
            ) {
                return {
                    priority:
                        "Tuber development",
                    reason:
                        "Balanced potassium and overall nutrient availability become particularly important."
                };
            }
        }


        if (crop === "tomato") {
            if (stage === "vegetative") {
                return {
                    priority:
                        "Canopy and root development",
                    reason:
                        "Healthy vegetative growth establishes the crop for later flowering and fruit production."
                };
            }

            if (
                stage === "flowering" ||
                stage === "fruiting"
            ) {
                return {
                    priority:
                        "Fruit development",
                    reason:
                        "Balanced nutrition and adequate potassium availability are important."
                };
            }
        }


        return {
            priority:
                "Balanced crop nutrition",
            reason:
                "Maintain balanced nutrition according to the soil test and crop stage."
        };
    }


    /* ================================
       SOIL ADVICE
    ================================= */

    function getSoilAdvice() {
        const soilType = (
            result?.soilType ||
            form.soilType ||
            ""
        ).toLowerCase();

        if (soilType === "sandy") {
            return "Sandy soil generally drains quickly and has lower nutrient-holding capacity. Monitor moisture frequently.";
        }

        if (soilType === "sandy loam") {
            return "Sandy loam generally provides good drainage but can lose water and mobile nutrients relatively quickly.";
        }

        if (soilType === "clay") {
            return "Clay soil generally holds nutrients and water strongly but can drain slowly. Monitor for waterlogging.";
        }

        if (soilType === "clay loam") {
            return "Clay loam generally provides good nutrient retention with moderate drainage. Maintain balanced moisture.";
        }

        if (soilType === "loam") {
            return "Loam generally provides a balanced combination of drainage, water retention and nutrient-holding capacity.";
        }

        if (soilType === "silty loam") {
            return "Silty loam can provide good water and nutrient availability but may be vulnerable to compaction.";
        }

        return "Continue monitoring soil moisture, nutrient availability and crop response.";
    }


    /* ================================
       DYNAMIC RECOMMENDATION
    ================================= */

    function getDynamicRecommendation() {
        if (!result) {
            return null;
        }

        const nitrogen =
            getParameter("nitrogen")?.status || "";

        const phosphorus =
            getParameter("phosphorus")?.status || "";

        const potassium =
            getParameter("potassium")?.status || "";

        let nutritionalMessage =
            "No major NPK deficiency is identified by the current screening thresholds.";

        if (
            nitrogen.toLowerCase().includes("low")
        ) {
            nutritionalMessage =
                "Nitrogen is currently the main nutritional concern. Review the soil-test recommendation before applying fertilizer.";
        } else if (
            phosphorus.toLowerCase().includes("low")
        ) {
            nutritionalMessage =
                "Phosphorus is currently the main nutritional concern. Review the soil-test recommendation.";
        } else if (
            potassium.toLowerCase().includes("low")
        ) {
            nutritionalMessage =
                "Potassium is currently the main nutritional concern. Review the soil-test recommendation.";
        }

        return {
            cropPriority:
                getCropPriority(),

            nutritionalMessage,

            soilAdvice:
                getSoilAdvice()
        };
    }


    const recommendation =
        getDynamicRecommendation();


    /* ================================
       RENDER
    ================================= */

    return (
        <div className="soil-page">

            <div className="soil-header">

                <div>
                    <div className="soil-eyebrow">
                        GroWell INTELLIGENCE
                    </div>

                    <h1>
                        Soil Intelligence
                    </h1>

                    <p>
                        Go beyond laboratory numbers.
                        Understand what your soil means
                        for your crop.
                    </p>
                </div>

                <div className="soil-live">
                    <span></span>
                    SOIL INTELLIGENCE
                </div>

            </div>


            {/* ================================
                INPUT AREA
            ================================= */}

            <div className="soil-input-grid">

                <div className="soil-card">

                    <div className="soil-card-header">

                        <div className="soil-card-icon">
                            🌱
                        </div>

                        <div>
                            <h2>Farm Context</h2>

                            <p>
                                Tell GroWell what is growing
                                in your field.
                            </p>
                        </div>

                    </div>


                    <div className="soil-fields">

                        <div className="soil-field">

                            <label>
                                Crop
                            </label>

                            <select
                                name="crop"
                                value={form.crop}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select crop
                                </option>

                                <option>Rice</option>
                                <option>Wheat</option>
                                <option>Maize</option>
                                <option>Potato</option>
                                <option>Tomato</option>
                                <option>Cotton</option>
                                <option>Soybean</option>
                                <option>Groundnut</option>
                                <option>Other</option>
                            </select>

                        </div>


                        <div className="soil-field">

                            <label>
                                Growth Stage
                            </label>

                            <select
                                name="stage"
                                value={form.stage}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select stage
                                </option>

                                <option>Seedling</option>
                                <option>Vegetative</option>
                                <option>Flowering</option>
                                <option>Fruiting</option>
                                <option>Grain Filling</option>
                                <option>Maturity</option>
                            </select>

                        </div>


                        <div className="soil-field">

                            <label>
                                Soil Type
                            </label>

                            <select
                                name="soilType"
                                value={form.soilType}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select soil type
                                </option>

                                <option>Clay</option>
                                <option>Clay Loam</option>
                                <option>Loam</option>
                                <option>Sandy Loam</option>
                                <option>Sandy</option>
                                <option>Silty Loam</option>
                            </select>

                        </div>

                    </div>

                </div>


                {/* ================================
                    SOIL PARAMETERS
                ================================= */}

                <div className="soil-card">

                    <div className="soil-card-header">

                        <div className="soil-card-icon">
                            ◈
                        </div>

                        <div>
                            <h2>
                                Soil Parameters
                            </h2>

                            <p>
                                Enter values from your
                                soil test.
                            </p>
                        </div>

                    </div>


                    <div className="soil-fields">

                        <div className="soil-field">
                            <label>pH</label>

                            <input
                                type="number"
                                min="0"
                                max="14"
                                step="0.1"
                                name="ph"
                                placeholder="6.8"
                                value={form.ph}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="soil-field">
                            <label>EC</label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="ec"
                                placeholder="dS/m"
                                value={form.ec}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="soil-field">
                            <label>
                                Organic Carbon
                            </label>

                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                name="organicCarbon"
                                placeholder="%"
                                value={form.organicCarbon}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="soil-field">
                            <label>Nitrogen</label>

                            <input
                                type="number"
                                min="0"
                                step="1"
                                name="nitrogen"
                                placeholder="kg/ha"
                                value={form.nitrogen}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="soil-field">
                            <label>Phosphorus</label>

                            <input
                                type="number"
                                min="0"
                                step="1"
                                name="phosphorus"
                                placeholder="kg/ha"
                                value={form.phosphorus}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="soil-field">
                            <label>Potassium</label>

                            <input
                                type="number"
                                min="0"
                                step="1"
                                name="potassium"
                                placeholder="kg/ha"
                                value={form.potassium}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                </div>

            </div>


            {/* ================================
                ANALYZE
            ================================= */}

            <button
                className="soil-analyze"
                onClick={analyzeSoil}
                disabled={analyzing}
            >
                {analyzing
                    ? "Analyzing Soil Intelligence..."
                    : "Analyze Soil Intelligence"
                }
            </button>


            {/* ================================
                RESULTS
            ================================= */}

            {analyzed && result && (

                <div className="soil-results">

                    <section className="soil-fingerprint">

                        <div className="section-top">

                            <div>

                                <span className="section-label">
                                    SOIL FINGERPRINT
                                </span>

                                <h2>
                                    Your soil at a glance
                                </h2>

                                <p>
                                    A high-level view of how
                                    your soil is performing.
                                </p>

                            </div>


                            <div className="soil-score">

                                <strong>
                                    {scoreValue(result.score)}
                                </strong>

                                <span>
                                    /100
                                </span>

                                <small>
                                    {result.overallStatus}
                                </small>

                            </div>

                        </div>


                        <div className="fingerprint-grid">

                            <div>
                                <span>Fertility</span>

                                <strong
                                    className={getStatusClass(
                                        result.overallStatus
                                    )}
                                >
                                    {result.overallStatus}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Nutrient Balance
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getRisk(
                                            "nutrientDepletion"
                                        )
                                    )}
                                >
                                    {getRisk(
                                        "nutrientDepletion"
                                    )}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Salinity
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getRisk("salinity")
                                    )}
                                >
                                    {getRisk("salinity")}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Organic Matter
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getParameter(
                                            "organicCarbon"
                                        )?.status
                                    )}
                                >
                                    {getParameter(
                                        "organicCarbon"
                                    )?.status ||
                                        "Unknown"}
                                </strong>
                            </div>

                        </div>

                    </section>


                    <div className="intelligence-grid">

                        <section className="soil-result-card">

                            <span className="section-label">
                                SOIL DIAGNOSIS
                            </span>

                            <h2>
                                What is limiting your soil?
                            </h2>


                            {getPrimaryConstraint() ? (

                                <div className="constraint primary">

                                    <div className="constraint-number">
                                        01
                                    </div>

                                    <div>

                                        <small>
                                            PRIMARY CONSTRAINT
                                        </small>

                                        <strong>
                                            {
                                                getPrimaryConstraint()
                                                    .name
                                            }
                                        </strong>

                                        <p>
                                            {
                                                getPrimaryConstraint()
                                                    .reason
                                            }
                                        </p>

                                    </div>

                                </div>

                            ) : (

                                <div className="constraint primary">

                                    <div className="constraint-number">
                                        ✓
                                    </div>

                                    <div>

                                        <small>
                                            PRIMARY CONSTRAINT
                                        </small>

                                        <strong>
                                            No major constraint detected
                                        </strong>

                                        <p>
                                            The submitted soil
                                            values are currently
                                            within the screening
                                            ranges used by GroWell.
                                        </p>

                                    </div>

                                </div>

                            )}


                            {getSecondaryConstraint() && (

                                <div className="constraint">

                                    <div className="constraint-number">
                                        02
                                    </div>

                                    <div>

                                        <small>
                                            SECONDARY CONSTRAINT
                                        </small>

                                        <strong>
                                            {
                                                getSecondaryConstraint()
                                                    .name
                                            }
                                        </strong>

                                        <p>
                                            {
                                                getSecondaryConstraint()
                                                    .reason
                                            }
                                        </p>

                                    </div>

                                </div>

                            )}

                        </section>


                        <section className="soil-result-card">

                            <span className="section-label">
                                CROP–SOIL FIT
                            </span>

                            <h2>
                                How well does your soil support the crop?
                            </h2>


                            <div className="fit-score">

                                <strong>
                                    {scoreValue(
                                        result.cropFit
                                    )}%
                                </strong>

                                <span>
                                    {result.cropFitStatus}
                                </span>

                            </div>


                            <div className="fit-row">

                                <span>
                                    pH suitability
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getParameter(
                                            "ph"
                                        )?.status
                                    )}
                                >
                                    {getParameter(
                                        "ph"
                                    )?.status ||
                                        "Unknown"}
                                </strong>

                            </div>


                            <div className="fit-row">

                                <span>
                                    Nutrient availability
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getRisk(
                                            "nutrientDepletion"
                                        )
                                    )}
                                >
                                    {getRisk(
                                        "nutrientDepletion"
                                    )}
                                </strong>

                            </div>


                            <div className="fit-row">

                                <span>
                                    Salinity behavior
                                </span>

                                <strong
                                    className={getStatusClass(
                                        getParameter(
                                            "ec"
                                        )?.status
                                    )}
                                >
                                    {getParameter(
                                        "ec"
                                    )?.status ||
                                        "Unknown"}
                                </strong>

                            </div>

                        </section>

                    </div>


                    {recommendation && (

                        <section className="soil-result-card growell-recommendation">

                            <span className="section-label">
                                GROWell RECOMMENDATION
                            </span>

                            <h2>
                                Your soil, translated into action.
                            </h2>

                            <p>
                                A practical path based on
                                your crop, growth stage and
                                current soil condition.
                            </p>


                            <div className="recommendation-grid">

                                <div className="recommendation-item">
                                    <span>
                                        PRIMARY PRIORITY
                                    </span>

                                    <strong>
                                        {
                                            recommendation
                                                .cropPriority
                                                ?.priority ||
                                            getPrimaryConstraint()
                                                ?.name ||
                                            "Balanced Soil"
                                        }
                                    </strong>
                                </div>


                                <div className="recommendation-item">
                                    <span>CROP</span>

                                    <strong>
                                        {result.crop}
                                    </strong>
                                </div>


                                <div className="recommendation-item">
                                    <span>
                                        GROWTH STAGE
                                    </span>

                                    <strong>
                                        {result.growthStage}
                                    </strong>
                                </div>


                                <div className="recommendation-item">
                                    <span>
                                        CROP–SOIL FIT
                                    </span>

                                    <strong>
                                        {scoreValue(
                                            result.cropFit
                                        )}%
                                        {" — "}
                                        {result.cropFitStatus}
                                    </strong>
                                </div>

                            </div>


                            <div className="recommendation-box">

                                <div className="recommendation-box-icon">
                                    ✓
                                </div>

                                <div>

                                    <span>
                                        NUTRIENT INTELLIGENCE
                                    </span>

                                    <p>
                                        {
                                            recommendation
                                                .nutritionalMessage
                                        }
                                    </p>

                                </div>

                            </div>


                            <div className="recommendation-box">

                                <div className="recommendation-box-icon">
                                    ◈
                                </div>

                                <div>

                                    <span>
                                        CROP + GROWTH STAGE
                                    </span>

                                    <p>
                                        {
                                            recommendation
                                                .cropPriority
                                                ?.reason
                                        }
                                    </p>

                                </div>

                            </div>


                            <div className="recommendation-box">

                                <div className="recommendation-box-icon">
                                    ◉
                                </div>

                                <div>

                                    <span>
                                        SOIL-TYPE INTELLIGENCE
                                    </span>

                                    <p>
                                        {
                                            recommendation
                                                .soilAdvice
                                        }
                                    </p>

                                </div>

                            </div>

                        </section>

                    )}


                    {/* NPK */}

                    <section className="soil-result-card">

                        <span className="section-label">
                            NUTRIENT INTELLIGENCE
                        </span>

                        <h2>
                            Nutrient Balance
                        </h2>


                        <div className="nutrient-grid">

                            {[
                                "nitrogen",
                                "phosphorus",
                                "potassium"
                            ].map((name) => (

                                <div
                                    className="nutrient-item"
                                    key={name}
                                >

                                    <div>

                                        <span>
                                            {name.toUpperCase()}
                                        </span>

                                        <strong
                                            className={getStatusClass(
                                                getParameter(
                                                    name
                                                )?.status
                                            )}
                                        >
                                            {
                                                getParameter(
                                                    name
                                                )?.status ||
                                                "Unknown"
                                            }
                                        </strong>

                                    </div>


                                    <div className="nutrient-bar">

                                        <i
                                            style={{
                                                width:
                                                    `${getParameterScore(
                                                        name
                                                    )}%`
                                            }}
                                        ></i>

                                    </div>


                                    <small>
                                        {getParameterScore(
                                            name
                                        )}/100
                                    </small>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* RISK RADAR */}

                    <section className="soil-result-card">

                        <span className="section-label">
                            SOIL RISK RADAR
                        </span>

                        <h2>
                            What should you watch?
                        </h2>


                        <div className="risk-grid">

                            {[
                                [
                                    "Nutrient depletion",
                                    "nutrientDepletion"
                                ],
                                [
                                    "Acidity",
                                    "acidity"
                                ],
                                [
                                    "Salinity",
                                    "salinity"
                                ],
                                [
                                    "Organic matter decline",
                                    "organicMatterDecline"
                                ]
                            ].map(([label, key]) => (

                                <div key={key}>

                                    <span>
                                        {label}
                                    </span>

                                    <strong
                                        className={getStatusClass(
                                            getRisk(key)
                                        )}
                                    >
                                        {getRisk(key)}
                                    </strong>

                                </div>

                            ))}

                        </div>

                    </section>


                    {/* ACTION PLAN */}

                    <section className="action-card">

                        <span className="section-label">
                            GROWell ACTION PLAN
                        </span>

                        <h2>
                            What should you do next?
                        </h2>


                        <div className="action-list">

                            {result.actions &&
                                result.actions
                                    .slice(0, 3)
                                    .map(
                                        (
                                            action,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                            >

                                                <b>
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </b>

                                                <p>

                                                    <strong>
                                                        {
                                                            action.timing
                                                        }
                                                    </strong>

                                                    {
                                                        action.action
                                                    }

                                                </p>

                                            </div>

                                        )
                                    )}

                        </div>

                    </section>


                    {/* REGENERATION */}

                    <section className="regeneration-card">

                        <div>

                            <span className="section-label">
                                SOIL REGENERATION
                            </span>

                            <h2>
                                Build soil that performs
                                for the next crop.
                            </h2>

                            <p>
                                GroWell looks beyond
                                today's nutrient values
                                and focuses on long-term
                                soil resilience.
                            </p>

                        </div>


                        <div className="regeneration-score">

                            <strong>
                                {getParameterScore(
                                    "organicCarbon"
                                )}
                            </strong>

                            <span>
                                /100
                            </span>

                        </div>

                    </section>

                </div>

            )}

        </div>
    );
}

export default SoilHealth;