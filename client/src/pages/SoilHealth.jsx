import { useState } from "react";
import "./SoilHealth.css";
import { useFarm } from "../context/FarmContext";
import { apiRequest } from "../services/api";
import {
    Printer,
    RotateCcw,
    FlaskConical,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    ShieldCheck,
    FileText
} from "lucide-react";

/* =================================================
   HELPERS
   ================================================= */

function makeReportId() {
    const now = new Date();
    const ymd =
        String(now.getFullYear()) +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");
    const random = Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase();
    return `GW-${ymd}-${random}`;
}

function todayISO() {
    const now = new Date();
    return (
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0")
    );
}

function scoreValue(value) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
        return 0;
    }
    return Math.max(0, Math.min(100, Math.round(Number(value))));
}

function fmt(value, digits = 1) {
    if (value === null || value === undefined) {
        return null;
    }
    return Number(value).toFixed(digits);
}

function getStatusClass(status) {
    if (!status) {
        return "warning";
    }
    const normalized = String(status).toLowerCase();
    if (
        normalized.includes("critical") ||
        normalized.includes("very low") ||
        normalized.includes("high risk") ||
        normalized.includes("strongly") ||
        normalized.includes("sodic") ||
        normalized.includes("low")
    ) {
        return "danger";
    }
    if (
        normalized.includes("moderate") ||
        normalized.includes("medium") ||
        normalized.includes("marginal") ||
        normalized.includes("fair") ||
        normalized.includes("slight") ||
        normalized.includes("attention")
    ) {
        return "warning";
    }
    return "good";
}

function ratingClass(level) {
    if (level === "low") return "danger";
    if (level === "medium") return "warning";
    if (level === "high") return "good";
    return "untested";
}

const PPM_TO_KGHA = 2.24;

const MACRO_FIELDS = [
    ["nitrogen", "Available N", "kg N/ha"],
    ["phosphorus", "Available P (P₂O₅)", "kg P₂O₅/ha"],
    ["potassium", "Available K (K₂O)", "kg K₂O/ha"],
    ["calcium", "Exchangeable Ca", "kg Ca/ha"],
    ["magnesium", "Exchangeable Mg", "kg Mg/ha"],
    ["sulphur", "Available S", "kg S/ha"]
];

const MICRO_FIELDS = [
    ["zinc", "Zinc (Zn)", "DTPA · ppm"],
    ["iron", "Iron (Fe)", "DTPA · ppm"],
    ["manganese", "Manganese (Mn)", "DTPA · ppm"],
    ["copper", "Copper (Cu)", "DTPA · ppm"],
    ["boron", "Boron (B)", "Hot water · ppm"]
];

const INITIAL_FORM = {
    reportId: makeReportId(),
    farmName: "",
    fieldName: "",
    sampleDepth: "0–15 cm",
    sampleDate: todayISO(),

    crop: "",
    growthStage: "",
    soilType: "",
    bulkDensity: "",

    ph: "",
    ec: "",
    organicCarbon: "",

    cec: "",
    baseSaturation: "",
    esp: "",
    bufferPh: "",

    nutrientUnit: "kgha",
    phosphorusMethod: "Olsen",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    calcium: "",
    magnesium: "",
    sulphur: "",

    zinc: "",
    iron: "",
    manganese: "",
    copper: "",
    boron: ""
};

/* =================================================
   COMPONENT
   ================================================= */

function SoilHealth() {
    const {
        updateFarmData,
        updateSoilData
    } = useFarm();

    const [form, setForm] = useState(INITIAL_FORM);
    const [analyzing, setAnalyzing] = useState(false);
    const [analyzed, setAnalyzed] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    /* ================================
       INPUT HANDLING
    ================================= */

    function handleChange(event) {
        const { name, value } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));

        if (name === "crop") {
            updateFarmData({ crop: value });
        }

        if (name === "growthStage") {
            updateFarmData({ growthStage: value });
        }

        if (
            [
                "soilType", "ph", "ec", "organicCarbon",
                "nitrogen", "phosphorus", "potassium",
                "sulphur", "zinc", "iron", "manganese",
                "copper", "boron", "calcium", "magnesium",
                "cec", "esp"
            ].includes(name)
        ) {
            updateSoilData({ [name]: value });
        }

        setAnalyzed(false);
        setResult(null);
        setError("");
    }

    /*
     * Switching the macro-nutrient unit converts the
     * values already typed, so nothing is silently
     * reinterpreted.
     */
    function handleNutrientUnit(nextUnit) {
        setForm(previous => {
            if (previous.nutrientUnit === nextUnit) {
                return previous;
            }

            const converted = { ...previous, nutrientUnit: nextUnit };

            for (const [key] of MACRO_FIELDS) {
                const raw = String(previous[key] ?? "").trim();
                if (raw === "" || Number.isNaN(Number(raw))) {
                    continue;
                }
                const num = Number(raw);
                converted[key] =
                    nextUnit === "ppm"
                        ? String(Math.round((num / PPM_TO_KGHA) * 100) / 100)
                        : String(Math.round(num * PPM_TO_KGHA * 10) / 10);
            }

            return converted;
        });

        setAnalyzed(false);
        setResult(null);
    }

    function resetForm() {
        setForm({
            ...INITIAL_FORM,
            reportId: makeReportId(),
            sampleDate: todayISO()
        });
        setAnalyzed(false);
        setResult(null);
        setError("");
    }

    /* ================================
       ANALYSIS
    ================================= */

    async function analyzeSoil() {
        setAnalyzing(true);
        setAnalyzed(false);
        setResult(null);
        setError("");

        try {
            const response = await apiRequest(
                "/api/soil/analyze",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        reportId: form.reportId,
                        farmName: form.farmName,
                        fieldName: form.fieldName,
                        sampleDepth: form.sampleDepth,
                        sampleDate: form.sampleDate,

                        crop: form.crop,
                        growthStage: form.growthStage,
                        soilType: form.soilType,
                        bulkDensity: form.bulkDensity,

                        ph: form.ph,
                        ec: form.ec,
                        organicCarbon: form.organicCarbon,

                        cec: form.cec,
                        baseSaturation: form.baseSaturation,
                        esp: form.esp,
                        bufferPh: form.bufferPh,

                        nutrientUnit: form.nutrientUnit,
                        phosphorusMethod: form.phosphorusMethod,
                        nitrogen: form.nitrogen,
                        phosphorus: form.phosphorus,
                        potassium: form.potassium,
                        calcium: form.calcium,
                        magnesium: form.magnesium,
                        sulphur: form.sulphur,

                        zinc: form.zinc,
                        iron: form.iron,
                        manganese: form.manganese,
                        copper: form.copper,
                        boron: form.boron
                    })
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Soil analysis failed."
                );
            }

            setResult(data);
            setAnalyzed(true);

            updateFarmData({
                crop: data.crop || form.crop,
                growthStage: data.growthStage || form.growthStage
            });

            updateSoilData({
                soilType: data.soilType || form.soilType,
                ph: form.ph,
                ec: form.ec,
                organicCarbon: form.organicCarbon,
                nitrogen: form.nitrogen,
                phosphorus: form.phosphorus,
                potassium: form.potassium,
                sulphur: form.sulphur,
                zinc: form.zinc,
                iron: form.iron,
                manganese: form.manganese,
                copper: form.copper,
                boron: form.boron,
                score: data.score || "",
                overallStatus: data.overallStatus || "",
                cropFit: data.cropFit || "",
                cropFitStatus: data.cropFitStatus || "",
                risks: data.risks || {},
                classifications: data.classifications || {},
                constraints: data.constraints || [],
                actions: data.actions || []
            });

        } catch (err) {
            console.error("Soil Lab Error:", err);
            setError(
                err.message || "Unable to analyze soil."
            );
        } finally {
            setAnalyzing(false);
        }
    }

    function printReport() {
        window.print();
    }

    /* ================================
       REPORT ROWS
    ================================= */

    function buildResultRows() {
        if (!result) {
            return [];
        }

        const c = result.classifications || {};
        const unit = result.nutrientUnit === "ppm" ? "ppm → kg/ha" : "kg/ha";

        const row = (label, method, cls, unitLabel, digits = 1) => ({
            label,
            method,
            unit: unitLabel,
            value: cls?.value ?? null,
            rating: cls?.label ?? "Not tested",
            level: cls?.level ?? null,
            digits
        });

        return [
            {
                label: "Soil reaction (pH)",
                method: "1:2.5 soil : water",
                unit: "",
                value: c.ph?.value ?? null,
                rating: c.ph?.label ?? "Not tested",
                level: c.ph?.level ?? null,
                digits: 1
            },
            {
                label: "Electrical conductivity",
                method: "1:2 extract · conductivity bridge",
                unit: "dS/m",
                value: c.ec?.value ?? null,
                rating: c.ec?.label ?? "Not tested",
                level: c.ec?.level ?? null,
                digits: 2
            },
            {
                label: "Organic carbon",
                method: "Walkley & Black",
                unit: "%",
                value: c.organicCarbon?.value ?? null,
                rating: c.organicCarbon?.label ?? "Not tested",
                level: c.organicCarbon?.level ?? null,
                digits: 2
            },
            row("Available nitrogen", "Alkaline KMnO₄ (Subbiah & Asija)", c.nitrogen, unit, 0),
            {
                label: `Available phosphorus (P₂O₅)`,
                method: result.phosphorusMethod === "Bray-1"
                    ? "Bray & Kurtz No. 1"
                    : "Olsen (0.5 M NaHCO₃)",
                unit,
                value: c.phosphorus?.value ?? null,
                rating: c.phosphorus?.label ?? "Not tested",
                level: c.phosphorus?.level ?? null,
                digits: 1
            },
            row("Available potash (K₂O)", "Neutral N NH₄OAc · flame photometry", c.potassium, unit, 1),
            row("Available sulphur", "CaCl₂ extractable · turbidimetric", c.sulphur, unit, 1),
            row("Exchangeable calcium", "Neutral N NH₄OAc", c.calcium, unit, 0),
            row("Exchangeable magnesium", "Neutral N NH₄OAc", c.magnesium, unit, 0),
            {
                label: "Zinc (Zn)",
                method: "DTPA extraction · AAS",
                unit: "ppm",
                value: c.zinc?.value ?? null,
                rating: c.zinc?.label ?? "Not tested",
                level: c.zinc?.level ?? null,
                digits: 2
            },
            {
                label: "Iron (Fe)",
                method: "DTPA extraction · AAS",
                unit: "ppm",
                value: c.iron?.value ?? null,
                rating: c.iron?.label ?? "Not tested",
                level: c.iron?.level ?? null,
                digits: 2
            },
            {
                label: "Manganese (Mn)",
                method: "DTPA extraction · AAS",
                unit: "ppm",
                value: c.manganese?.value ?? null,
                rating: c.manganese?.label ?? "Not tested",
                level: c.manganese?.level ?? null,
                digits: 2
            },
            {
                label: "Copper (Cu)",
                method: "DTPA extraction · AAS",
                unit: "ppm",
                value: c.copper?.value ?? null,
                rating: c.copper?.label ?? "Not tested",
                level: c.copper?.level ?? null,
                digits: 2
            },
            {
                label: "Boron (B)",
                method: "Hot water · Azomethine-H",
                unit: "ppm",
                value: c.boron?.value ?? null,
                rating: c.boron?.label ?? "Not tested",
                level: c.boron?.level ?? null,
                digits: 2
            },
            {
                label: "Cation exchange capacity",
                method: "NH₄OAc saturation",
                unit: "cmol(+)/kg",
                value: c.cec?.value ?? null,
                rating: c.cec?.label ?? "Not tested",
                level: c.cec?.level ?? null,
                digits: 1
            },
            {
                label: "Exchangeable sodium (ESP)",
                method: "ESP = (Na / CEC) × 100",
                unit: "%",
                value: c.esp?.value ?? null,
                rating: c.esp?.label ?? "Not tested",
                level: c.esp?.level ?? null,
                digits: 1
            },
            {
                label: "Base saturation",
                method: "NH₄OAc",
                unit: "%",
                value: c.baseSaturation?.value ?? null,
                rating: c.baseSaturation?.label ?? "Not tested",
                level: c.baseSaturation?.level ?? null,
                digits: 0
            },
            {
                label: "Bulk density",
                method: "Core method",
                unit: "g/cm³",
                value: c.bulkDensity?.value ?? null,
                rating: c.bulkDensity?.label ?? "Not tested",
                level: c.bulkDensity?.level ?? null,
                digits: 2
            }
        ];
    }

    const resultRows = buildResultRows();

    /* ================================
       RENDER
    ================================= */

    return (
        <div className="soil-page">

            {/* ================= HERO ================= */}

            <div className="soil-hero">

                <div className="soil-hero-text">
                    <div className="soil-eyebrow">
                        GROWELL AGRICULTURAL LABORATORY
                    </div>

                    <h1>
                        Professional Soil Testing
                    </h1>

                    <p>
                        A laboratory-grade soil analysis workflow —
                        sample registration, standardised test methods,
                        rated results and a printable agronomy report.
                    </p>
                </div>

                <div className="soil-hero-meta">
                    <div className="soil-hero-meta-row">
                        <span>Report No.</span>
                        <strong>{result?.reportId || form.reportId}</strong>
                    </div>
                    <div className="soil-hero-meta-row">
                        <span>Date</span>
                        <strong>{form.sampleDate}</strong>
                    </div>
                    <div className="soil-hero-meta-row">
                        <span>Status</span>
                        <strong className={analyzed ? "ok" : "pending"}>
                            {analyzed ? "Report generated" : "Awaiting analysis"}
                        </strong>
                    </div>
                </div>

            </div>

            {/* ================= FORM ================= */}

            <div className="soil-form">

                {/* 01 — SAMPLE & FIELD DETAILS */}

                <section className="soil-panel">
                    <header className="soil-panel-head">
                        <span className="soil-step">01</span>
                        <div>
                            <h2>Sample &amp; Field Details</h2>
                            <p>Register the sample exactly as a laboratory would.</p>
                        </div>
                    </header>

                    <div className="soil-grid soil-grid-4">
                        <div className="soil-field">
                            <label htmlFor="farmName">Farm / Grower</label>
                            <input
                                id="farmName"
                                name="farmName"
                                type="text"
                                placeholder="e.g. Ramesh Patil Farm"
                                value={form.farmName}
                                onChange={handleChange}
                                maxLength={80}
                            />
                        </div>

                        <div className="soil-field">
                            <label htmlFor="fieldName">Field / Plot</label>
                            <input
                                id="fieldName"
                                name="fieldName"
                                type="text"
                                placeholder="e.g. North Block · Plot 4"
                                value={form.fieldName}
                                onChange={handleChange}
                                maxLength={80}
                            />
                        </div>

                        <div className="soil-field">
                            <label htmlFor="sampleDepth">Sampling Depth</label>
                            <select
                                id="sampleDepth"
                                name="sampleDepth"
                                value={form.sampleDepth}
                                onChange={handleChange}
                            >
                                <option>0–15 cm</option>
                                <option>15–30 cm</option>
                                <option>30–60 cm</option>
                            </select>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="sampleDate">Sample Collection Date</label>
                            <input
                                id="sampleDate"
                                name="sampleDate"
                                type="date"
                                value={form.sampleDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="soil-grid soil-grid-4">
                        <div className="soil-field">
                            <label htmlFor="crop">Crop</label>
                            <select
                                id="crop"
                                name="crop"
                                value={form.crop}
                                onChange={handleChange}
                            >
                                <option value="">Select crop</option>
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
                            <label htmlFor="growthStage">Growth Stage</label>
                            <select
                                id="growthStage"
                                name="growthStage"
                                value={form.growthStage}
                                onChange={handleChange}
                            >
                                <option value="">Select stage</option>
                                <option>Seedling</option>
                                <option>Vegetative</option>
                                <option>Flowering</option>
                                <option>Fruiting</option>
                                <option>Grain Filling</option>
                                <option>Maturity</option>
                            </select>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="soilType">Soil Texture / Type</label>
                            <select
                                id="soilType"
                                name="soilType"
                                value={form.soilType}
                                onChange={handleChange}
                            >
                                <option value="">Select soil type</option>
                                <option>Clay</option>
                                <option>Clay Loam</option>
                                <option>Loam</option>
                                <option>Sandy Loam</option>
                                <option>Sandy</option>
                                <option>Silty Loam</option>
                            </select>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="bulkDensity">
                                Bulk Density <em>(optional)</em>
                            </label>
                            <div className="soil-input-suffix">
                                <input
                                    id="bulkDensity"
                                    name="bulkDensity"
                                    type="number"
                                    min="0.5"
                                    max="2.5"
                                    step="0.01"
                                    placeholder="1.28"
                                    value={form.bulkDensity}
                                    onChange={handleChange}
                                />
                                <span>g/cm³</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 02 — CHEMICAL PROPERTIES */}

                <section className="soil-panel">
                    <header className="soil-panel-head">
                        <span className="soil-step">02</span>
                        <div>
                            <h2>Chemical Properties</h2>
                            <p>Fundamental soil reaction, salinity and organic matter.</p>
                        </div>
                    </header>

                    <div className="soil-grid soil-grid-3">
                        <div className="soil-field">
                            <label htmlFor="ph">pH (1:2.5)</label>
                            <input
                                id="ph"
                                name="ph"
                                type="number"
                                min="3"
                                max="10"
                                step="0.1"
                                placeholder="6.8"
                                value={form.ph}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="soil-field">
                            <label htmlFor="ec">EC</label>
                            <div className="soil-input-suffix">
                                <input
                                    id="ec"
                                    name="ec"
                                    type="number"
                                    min="0"
                                    max="20"
                                    step="0.01"
                                    placeholder="0.35"
                                    value={form.ec}
                                    onChange={handleChange}
                                />
                                <span>dS/m</span>
                            </div>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="organicCarbon">Organic Carbon</label>
                            <div className="soil-input-suffix">
                                <input
                                    id="organicCarbon"
                                    name="organicCarbon"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.01"
                                    placeholder="0.55"
                                    value={form.organicCarbon}
                                    onChange={handleChange}
                                />
                                <span>%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 03 — EXCHANGEABLE & BUFFER PROPERTIES */}

                <section className="soil-panel">
                    <header className="soil-panel-head">
                        <span className="soil-step">03</span>
                        <div>
                            <h2>Exchangeable &amp; Buffer Properties <em>(optional)</em></h2>
                            <p>
                                Unlocks lime / gypsum requirement and sodicity diagnosis.
                                Leave blank if not tested.
                            </p>
                        </div>
                    </header>

                    <div className="soil-grid soil-grid-4">
                        <div className="soil-field">
                            <label htmlFor="cec">CEC</label>
                            <div className="soil-input-suffix">
                                <input
                                    id="cec"
                                    name="cec"
                                    type="number"
                                    min="0"
                                    max="150"
                                    step="0.1"
                                    placeholder="18"
                                    value={form.cec}
                                    onChange={handleChange}
                                />
                                <span>cmol(+)/kg</span>
                            </div>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="baseSaturation">Base Saturation</label>
                            <div className="soil-input-suffix">
                                <input
                                    id="baseSaturation"
                                    name="baseSaturation"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="1"
                                    placeholder="72"
                                    value={form.baseSaturation}
                                    onChange={handleChange}
                                />
                                <span>%</span>
                            </div>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="esp">ESP (exchangeable Na)</label>
                            <div className="soil-input-suffix">
                                <input
                                    id="esp"
                                    name="esp"
                                    type="number"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    placeholder="8"
                                    value={form.esp}
                                    onChange={handleChange}
                                />
                                <span>%</span>
                            </div>
                        </div>

                        <div className="soil-field">
                            <label htmlFor="bufferPh">Buffer pH (SMP)</label>
                            <input
                                id="bufferPh"
                                name="bufferPh"
                                type="number"
                                min="4"
                                max="9"
                                step="0.1"
                                placeholder="7.2"
                                value={form.bufferPh}
                                onChange={handleChange}
                            />
                            <small className="soil-field-hint">
                                Only used to compute lime requirement when acidic.
                            </small>
                        </div>
                    </div>
                </section>

                {/* 04 — MACRONUTRIENTS */}

                <section className="soil-panel">
                    <header className="soil-panel-head">
                        <span className="soil-step">04</span>
                        <div>
                            <h2>Macronutrients</h2>
                            <p>Available N, P, K, Ca, Mg and S — laboratory test values.</p>
                        </div>
                    </header>

                    <div className="soil-panel-toolbar">
                        <div className="soil-seg" role="group" aria-label="Nutrient unit">
                            <button
                                type="button"
                                className={form.nutrientUnit === "kgha" ? "active" : ""}
                                onClick={() => handleNutrientUnit("kgha")}
                            >
                                kg / hectare
                            </button>
                            <button
                                type="button"
                                className={form.nutrientUnit === "ppm" ? "active" : ""}
                                onClick={() => handleNutrientUnit("ppm")}
                            >
                                ppm (mg/kg)
                            </button>
                        </div>

                        <div className="soil-seg" role="group" aria-label="Phosphorus extraction method">
                            <button
                                type="button"
                                className={form.phosphorusMethod === "Olsen" ? "active" : ""}
                                onClick={() => handleChange({ target: { name: "phosphorusMethod", value: "Olsen" } })}
                            >
                                P · Olsen
                            </button>
                            <button
                                type="button"
                                className={form.phosphorusMethod === "Bray-1" ? "active" : ""}
                                onClick={() => handleChange({ target: { name: "phosphorusMethod", value: "Bray-1" } })}
                            >
                                P · Bray-1
                            </button>
                        </div>
                    </div>

                    <div className="soil-grid soil-grid-3">
                        {MACRO_FIELDS.map(([name, label, unitLabel]) => (
                            <div className="soil-field" key={name}>
                                <label htmlFor={name}>
                                    {label} <em>({form.nutrientUnit === "ppm" ? "ppm" : unitLabel})</em>
                                </label>
                                <div className="soil-input-suffix">
                                    <input
                                        id={name}
                                        name={name}
                                        type="number"
                                        min="0"
                                        step={form.nutrientUnit === "ppm" ? "0.1" : "1"}
                                        placeholder={name === "nitrogen" ? "260" : name === "phosphorus" ? "12" : name === "potassium" ? "150" : "—"}
                                        value={form[name]}
                                        onChange={handleChange}
                                    />
                                    <span>{form.nutrientUnit === "ppm" ? "ppm" : "kg/ha"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 05 — MICRONUTRIENTS */}

                <section className="soil-panel">
                    <header className="soil-panel-head">
                        <span className="soil-step">05</span>
                        <div>
                            <h2>Micronutrients</h2>
                            <p>DTPA-extractable Zn, Fe, Mn, Cu · hot-water B. In ppm.</p>
                        </div>
                    </header>

                    <div className="soil-grid soil-grid-5">
                        {MICRO_FIELDS.map(([name, label, unitLabel]) => (
                            <div className="soil-field" key={name}>
                                <label htmlFor={name}>{label}</label>
                                <div className="soil-input-suffix">
                                    <input
                                        id={name}
                                        name={name}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="—"
                                        value={form[name]}
                                        onChange={handleChange}
                                    />
                                    <span>ppm</span>
                                </div>
                                <small className="soil-field-hint">{unitLabel}</small>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ACTIONS BAR */}

                <div className="soil-run-bar no-print">
                    <button
                        type="button"
                        className="soil-run-primary"
                        onClick={analyzeSoil}
                        disabled={analyzing}
                    >
                        <FlaskConical size={19} aria-hidden="true" />
                        {analyzing
                            ? "Running laboratory analysis…"
                            : "Run Laboratory Analysis"}
                    </button>

                    <button
                        type="button"
                        className="soil-run-secondary"
                        onClick={resetForm}
                        disabled={analyzing}
                    >
                        <RotateCcw size={16} aria-hidden="true" />
                        Reset sample
                    </button>

                    <p className="soil-run-hint">
                        Every field except crop, stage and soil type is optional —
                        the report marks untested parameters as “Not tested”.
                    </p>
                </div>

                {error && (
                    <div className="soil-error no-print" role="alert">
                        <XCircle size={18} aria-hidden="true" />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {/* ================= REPORT ================= */}

            {analyzed && result && (

                <article className="soil-report" id="soil-report">

                    {/* LETTERHEAD */}

                    <header className="report-letterhead">
                        <div className="report-letterhead-left">
                            <div className="report-lab-badge">
                                <FlaskConical size={26} aria-hidden="true" />
                            </div>
                            <div>
                                <div className="report-lab-name">
                                    GROWELL AGRICULTURAL LABORATORY
                                </div>
                                <div className="report-lab-tag">
                                    Soil &amp; Plant Nutrition Advisory Unit
                                </div>
                            </div>
                        </div>

                        <div className="report-letterhead-right">
                            <div className="report-doc-title">
                                SOIL TEST REPORT
                            </div>
                            <div className="report-doc-meta">
                                <span>Report No.: <strong>{result.reportId}</strong></span>
                                <span>Date of analysis: <strong>{form.sampleDate}</strong></span>
                            </div>
                        </div>
                    </header>

                    {/* SAMPLE REGISTER LINE */}

                    <div className="report-register">
                        <div><span>Farm / Grower</span><strong>{result.sampleMeta?.farmName || "—"}</strong></div>
                        <div><span>Field / Plot</span><strong>{result.sampleMeta?.fieldName || "—"}</strong></div>
                        <div><span>Sampling depth</span><strong>{result.sampleMeta?.sampleDepth || "0–15 cm"}</strong></div>
                        <div><span>Crop</span><strong>{result.crop}</strong></div>
                        <div><span>Growth stage</span><strong>{result.growthStage}</strong></div>
                        <div><span>Soil texture</span><strong>{result.soilType}</strong></div>
                    </div>

                    {/* A — SUMMARY */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>A</span> Summary of Findings
                        </h3>

                        <div className="report-summary">

                            <div className="report-score-wrap">
                                <svg
                                    className="report-score-ring"
                                    viewBox="0 0 120 120"
                                    role="img"
                                    aria-label={`Soil health score ${scoreValue(result.score)} out of 100`}
                                >
                                    <circle
                                        className="ring-track"
                                        cx="60" cy="60" r="50"
                                    />
                                    <circle
                                        className="ring-value"
                                        cx="60" cy="60" r="50"
                                        strokeDasharray={`${2 * Math.PI * 50}`}
                                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - scoreValue(result.score) / 100)}`}
                                        transform="rotate(-90 60 60)"
                                    />
                                    <text
                                        x="60" y="58"
                                        textAnchor="middle"
                                        className="ring-number"
                                    >
                                        {scoreValue(result.score)}
                                    </text>
                                    <text
                                        x="60" y="76"
                                        textAnchor="middle"
                                        className="ring-caption"
                                    >
                                        / 100
                                    </text>
                                </svg>

                                <div className="report-score-text">
                                    <div className="report-score-status">
                                        {result.overallStatus}
                                    </div>
                                    <div className="report-score-sub">
                                        Composite Soil Health Score
                                    </div>
                                </div>
                            </div>

                            <div className="report-summary-right">
                                <div className="report-verdict-line">
                                    <ShieldCheck size={18} aria-hidden="true" />
                                    <div>
                                        <span>Laboratory verdict</span>
                                        <strong>{result.verdict}</strong>
                                    </div>
                                </div>

                                <div className="report-index-line">
                                    <div>
                                        <span>Parker Nutrient Index</span>
                                        <strong>
                                            {result.parkerIndex
                                                ? `${result.parkerIndex.value} — ${result.parkerIndex.category}`
                                                : "Not enough data"}
                                        </strong>
                                        {result.parkerIndex && (
                                            <small>
                                                Computed from {result.parkerIndex.testedCount} tested parameter(s); low = 1, medium = 2, high = 3.
                                            </small>
                                        )}
                                    </div>
                                    <div>
                                        <span>Crop–soil fit</span>
                                        <strong>
                                            {scoreValue(result.cropFit)}% — {result.cropFitStatus}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* A2 — DERIVED LAB METRICS */}

                    {(result.derived?.organicMatter != null || result.derived?.usdaSalinitySodicity || result.derived?.compaction) && (
                        <section className="report-section">
                            <h3 className="report-section-title">
                                <span>A2</span> Derived Laboratory Metrics
                            </h3>
                            <div className="report-risk-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                                {result.derived?.organicMatter != null && (
                                    <div className="report-risk-item">
                                        <span>Organic matter (calculated)</span>
                                        <strong>{Number(result.derived.organicMatter).toFixed(2)}%</strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>OM = OC × 1.724</small>
                                    </div>
                                )}
                                {result.derived?.usdaSalinitySodicity && (
                                    <div className="report-risk-item">
                                        <span>Salinity / sodicity (USDA screening)</span>
                                        <strong className={getStatusClass(result.derived.usdaSalinitySodicity.risk === "High" ? "High" : result.derived.usdaSalinitySodicity.risk === "Moderate" ? "Moderate" : "Low")}>
                                            {result.derived.usdaSalinitySodicity.class}
                                        </strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>{result.derived.usdaSalinitySodicity.formula}</small>
                                    </div>
                                )}
                                {result.derived?.compaction && (
                                    <div className="report-risk-item">
                                        <span>Compaction (bulk density)</span>
                                        <strong className={getStatusClass(result.derived.compaction.risk === "High" ? "High" : result.derived.compaction.risk === "Moderate" ? "Moderate" : "Low")}>
                                            {result.derived.compaction.status}
                                        </strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>BD {Number(result.derived.compaction.bulkDensity).toFixed(2)} g/cm³ · limit ~{result.derived.compaction.textureLimit_g_cm3}</small>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* A3 — ADVANCED CATION & SALINITY METRICS */}

                    {(result.derived?.sar != null || result.derived?.cationRatios || result.derived?.baseSaturation != null || result.derived?.tds != null || result.derived?.ionBalance != null) && (
                        <section className="report-section">
                            <h3 className="report-section-title">
                                <span>A3</span> Advanced Cation & Salinity Metrics
                            </h3>
                            <div className="report-risk-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
                                {result.derived?.sar != null && (
                                    <div className="report-risk-item">
                                        <span>Sodium Adsorption Ratio (SAR)</span>
                                        <strong>{Number(result.derived.sar).toFixed(2)}</strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>SAR = Na⁺ / √((Ca²⁺ + Mg²⁺) / 2) — sodicity hazard indicator</small>
                                    </div>
                                )}
                                {result.derived?.cationRatios && (
                                    <div className="report-risk-item">
                                        <span>Cation balance (ESP-calculated)</span>
                                        <strong>{result.derived.cationRatios.balanceStatus}</strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>Ca {result.derived.cationRatios.caPercent}% · Mg {result.derived.cationRatios.mgPercent}% · K {result.derived.cationRatios.kPercent}% · Na {result.derived.cationRatios.naPercent}%</small>
                                    </div>
                                )}
                                {result.derived?.baseSaturation != null && (
                                    <div className="report-risk-item">
                                        <span>Base saturation (calculated)</span>
                                        <strong className={getStatusClass(result.derived.baseSaturation >= 80 ? "High" : result.derived.baseSaturation >= 50 ? "Moderate" : "Low")}>
                                            {Number(result.derived.baseSaturation).toFixed(1)}%
                                        </strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>BS% = (Ca+Mg+K+Na) / CEC × 100</small>
                                    </div>
                                )}
                                {result.derived?.tds != null && (
                                    <div className="report-risk-item">
                                        <span>Total dissolved solids (est.)</span>
                                        <strong>{Number(result.derived.tds).toLocaleString()} mg/L</strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>TDS ≈ EC × 640</small>
                                    </div>
                                )}
                                {result.derived?.ionBalance != null && (
                                    <div className="report-risk-item">
                                        <span>Ion charge balance</span>
                                        <strong className={getStatusClass(Math.abs(result.derived.ionBalance) > 10 ? "High" : Math.abs(result.derived.ionBalance) > 5 ? "Moderate" : "Low")}>
                                            {Number(result.derived.ionBalance).toFixed(1)}%
                                        </strong>
                                        <small style={{ color: "var(--gw-faint)", fontSize: 10 }}>Charge balance % — analytical quality check</small>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* B — TEST RESULTS TABLE */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>B</span> Test Results
                        </h3>

                        <div className="report-table-wrap">
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Method</th>
                                        <th className="num">Result</th>
                                        <th>Unit</th>
                                        <th>Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultRows.map(row => (
                                        <tr
                                            key={row.label}
                                            className={row.value === null ? "untested" : ""}
                                        >
                                            <td>{row.label}</td>
                                            <td className="method">{row.method}</td>
                                            <td className="num">
                                                {row.value === null
                                                    ? "—"
                                                    : fmt(row.value, row.digits)}
                                            </td>
                                            <td>{row.unit || "—"}</td>
                                            <td>
                                                <span
                                                    className={
                                                        "rating-pill " + ratingClass(row.level)
                                                    }
                                                >
                                                    {row.rating}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {result.nutrientUnit === "ppm" && (
                            <p className="report-footnote">
                                Values entered in mg/kg (ppm) were converted to kg/ha for a
                                0–15 cm furrow slice using the factor 2.24 (bulk density 1.28 g/cm³).
                            </p>
                        )}
                    </section>

                    {/* C — INTERPRETATION */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>C</span> Interpretation &amp; Diagnosis
                        </h3>

                        <ul className="report-interpretation">
                            {result.interpretation?.map((point, index) => (
                                <li key={index} className={point.level}>
                                    {point.level === "ok" && <CheckCircle2 size={16} aria-hidden="true" />}
                                    {point.level === "warn" && <AlertTriangle size={16} aria-hidden="true" />}
                                    {point.level === "bad" && <XCircle size={16} aria-hidden="true" />}
                                    <span>{point.text}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* D — FERTILIZER RECOMMENDATION */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>D</span> Fertilizer Recommendation
                        </h3>

                        <div className="report-table-wrap">
                            <table className="report-table report-fertilizer">
                                <thead>
                                    <tr>
                                        <th>Nutrient</th>
                                        <th>Soil-test status</th>
                                        <th className="num">Dose (kg/ha)</th>
                                        <th>Reference sources &amp; timing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.fertilizerPlan?.rows.map(row => (
                                        <tr key={row.nutrient}>
                                            <td>{row.nutrient}</td>
                                            <td>{row.testStatus}</td>
                                            <td className="num">
                                                {row.doseKgHa === 0
                                                    ? "Skip (soil sufficient)"
                                                    : row.doseKgHa}
                                            </td>
                                            <td className="sources">
                                                <div>{row.sources}</div>
                                                <small>{row.timing}</small>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="report-footnote">
                            {result.fertilizerPlan?.basis}
                        </p>

                        {/* Amendments */}

                        {(result.fertilizerPlan?.amendments?.length > 0 ||
                            result.limeRequirement ||
                            result.gypsumRequirement) && (
                            <div className="report-amendments">
                                <h4>Soil amendments &amp; organic nutrition</h4>
                                <ul>
                                    {result.fertilizerPlan?.amendments?.map((item, index) => (
                                        <li key={index}>
                                            <strong>{item.material} — {item.dose}.</strong>{" "}
                                            {item.note}
                                        </li>
                                    ))}

                                    {result.limeRequirement && (
                                        <li>
                                            <strong>
                                                Agricultural lime (CaCO₃) — ≈ {result.limeRequirement.tonnesPerHa} t/ha.
                                            </strong>{" "}
                                            {result.limeRequirement.basis}. {result.limeRequirement.note}
                                        </li>
                                    )}

                                    {result.gypsumRequirement && (
                                        <li>
                                            <strong>
                                                Gypsum (CaSO₄·2H₂O) —{" "}
                                                {result.gypsumRequirement.tonnesPerHa !== null
                                                    ? `≈ ${result.gypsumRequirement.tonnesPerHa} t/ha`
                                                    : "CEC required to compute"}
                                                .
                                            </strong>{" "}
                                            {result.gypsumRequirement.basis}. {result.gypsumRequirement.note}
                                        </li>
                                    )}

                                    {result.micronutrientCorrections?.map((item, index) => (
                                        <li key={`micro-${index}`}>
                                            <strong>{item.nutrient} — {item.material}.</strong>{" "}
                                            {item.dose}. {item.note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                    {/* E — RISKS & ACTION PLAN */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>E</span> Risk Radar &amp; Action Plan
                        </h3>

                        <div className="report-risk-grid">
                            {[
                                ["Nutrient depletion", result.risks?.nutrientDepletion],
                                ["Acidity", result.risks?.acidity],
                                ["Alkalinity", result.risks?.alkalinity],
                                ["Salinity", result.risks?.salinity],
                                ["Organic matter decline", result.risks?.organicMatterDecline]
                            ].map(([label, value]) => (
                                <div key={label} className="report-risk-item">
                                    <span>{label}</span>
                                    <strong className={getStatusClass(value)}>
                                        {value || "Unknown"}
                                    </strong>
                                </div>
                            ))}
                        </div>

                        <ol className="report-actions">
                            {result.actions?.slice(0, 6).map((action, index) => (
                                <li key={index}>
                                    <span className="report-action-num">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <small>{action.timing}</small>
                                        <p>{action.action}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* F — METHODS & DISCLAIMER */}

                    <section className="report-section">
                        <h3 className="report-section-title">
                            <span>F</span> Methods, Validation &amp; Disclaimer
                        </h3>

                        <div className="report-methods">
                            {result.methods?.map((method, index) => (
                                <div key={index} className="report-method-row">
                                    <strong>{method.parameter}</strong>
                                    <span>{method.method}</span>
                                    <em>{method.reference}</em>
                                </div>
                            ))}
                        </div>

                        <p className="report-disclaimer">
                            This report is a decision-support screening generated by the GroWell
                            Soil Intelligence engine from the values entered. It does not replace
                            an accredited laboratory certificate for regulatory, subsidy or
                            contractual purposes. Recommendations are general; local agro-climatic
                            conditions, crop variety and irrigation quality may modify them.
                            Always confirm corrective dosing (lime, gypsum, micronutrients) with
                            your nearest soil-testing laboratory or Krishi Vigyan Kendra before
                            bulk application.
                        </p>

                        <div className="report-signatures">
                            <div className="report-signature-block">
                                <span className="report-signature-line" />
                                <small>Analysed by — GroWell Soil Intelligence Engine</small>
                            </div>
                            <div className="report-signature-block">
                                <span className="report-signature-line" />
                                <small>Agronomist / Field officer verification</small>
                            </div>
                            <div className="report-signature-block">
                                <span className="report-signature-line" />
                                <small>Farmer acknowledgement</small>
                            </div>
                        </div>
                    </section>

                    {/* REPORT ACTIONS */}

                    <div className="report-actions-bar no-print">
                        <button
                            type="button"
                            className="soil-run-primary"
                            onClick={printReport}
                        >
                            <Printer size={18} aria-hidden="true" />
                            Print soil test report
                        </button>

                        <div className="report-actions-note">
                            <FileText size={16} aria-hidden="true" />
                            Use your browser’s “Save as PDF” to get a digital certificate.
                        </div>
                    </div>

                </article>

            )}

        </div>
    );
}

export default SoilHealth;
