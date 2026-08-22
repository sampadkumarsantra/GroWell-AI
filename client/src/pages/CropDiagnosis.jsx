
import { useState } from "react";
import "./CropDiagnosis.css";
import { useFarm } from "../context/FarmContext";

function CropDiagnosis() {
    const {
        updateFarmData,
        updateDiagnosisData
    } = useFarm();

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    // =====================================================
    // IMAGE UPLOAD
    // =====================================================

    function handleImageUpload(event) {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));

        setResult(null);
        setError("");
    }

    // =====================================================
    // CROP ANALYSIS
    // =====================================================

    async function analyzeCrop() {
        if (!file) {
            setError("Please upload a crop image first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();

            formData.append("image", file);

            const response = await fetch(
                "http://localhost:3000/api/diagnose",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Crop diagnosis failed."
                );
            }

            console.log("🌿 GroWell Vision:", data);

            setResult(data);

            // =================================================
            // CONNECT DIAGNOSIS TO FARM CONTEXT
            // =================================================

            updateDiagnosisData({
                crop: data.crop || "",

                disease:
                    data.disease ||
                    data.condition ||
                    "",

                confidence:
                    data.confidence ||
                    "",

                severity:
                    data.severity ||
                    "",

                symptoms:
                    data.symptoms ||
                    "",

                cause:
                    data.cause ||
                    "",

                recommendation:
                    data.recommendation ||
                    ""
            });

            // =================================================
            // UPDATE MAIN FARM CROP
            // =================================================

            if (data.crop) {
                updateFarmData({
                    crop: data.crop
                });
            }

        } catch (err) {
            console.error(
                "Crop Diagnosis Error:",
                err
            );

            setError(
                err.message ||
                "GroWell Vision could not analyze the image."
            );

        } finally {
            setLoading(false);
        }
    }

    // =====================================================
    // SEVERITY CLASS
    // =====================================================

    function getSeverityClass(severity) {
        if (!severity) return "";

        const value =
            String(severity).toLowerCase();

        if (
            value.includes("high") ||
            value.includes("severe") ||
            value.includes("critical")
        ) {
            return "severity-high";
        }

        if (
            value.includes("moderate") ||
            value.includes("medium")
        ) {
            return "severity-medium";
        }

        if (
            value.includes("low") ||
            value.includes("mild")
        ) {
            return "severity-low";
        }

        return "";
    }

    // =====================================================
    // RENDER
    // =====================================================

    return (
        <div className="crop-diagnosis-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="diagnosis-header">

                <div className="vision-label">
                    GROWELL VISION
                </div>

                <h1>
                    Crop Diagnosis
                </h1>

                <p>
                    AI-powered crop health analysis
                    from a single image.
                </p>

            </div>


            {/* =================================================
                MAIN AREA
            ================================================= */}

            <div className="diagnosis-main">

                {/* =================================================
                    IMAGE CARD
                ================================================= */}

                <div className="image-card">

                    <div className="card-title">

                        <span>
                            🌱
                        </span>

                        <div>

                            <h2>
                                Crop Image
                            </h2>

                            <p>
                                Upload a clear image of
                                the affected crop.
                            </p>

                        </div>

                    </div>


                    {/* IMAGE UPLOAD */}

                    <label className="upload-area">

                        {image ? (

                            <img
                                src={image}
                                alt="Crop preview"
                                className="crop-preview"
                            />

                        ) : (

                            <div className="upload-placeholder">

                                <div className="upload-icon">
                                    📷
                                </div>

                                <strong>
                                    Upload Crop Image
                                </strong>

                                <span>
                                    JPG, PNG or WEBP
                                </span>

                            </div>

                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            hidden
                        />

                    </label>


                    {/* ANALYZE BUTTON */}

                    <button
                        className="analyze-button"
                        onClick={analyzeCrop}
                        disabled={!file || loading}
                    >

                        {loading
                            ? "Analyzing..."
                            : "Analyze Crop"
                        }

                    </button>


                    {/* LOADING */}

                    {loading && (

                        <div className="loading-message">

                            GroWell Vision is analyzing
                            the crop image...

                        </div>

                    )}


                    {/* ERROR */}

                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}

                </div>


                {/* =================================================
                    DIAGNOSIS CARD
                ================================================= */}

                <div className="diagnosis-card">

                    <div className="card-heading">

                        <span>
                            🧠
                        </span>

                        <div>

                            <h2>
                                Diagnosis
                            </h2>

                            <p>
                                GroWell Vision analysis
                            </p>

                        </div>

                    </div>


                    {/* EMPTY */}

                    {!result && !loading && (

                        <div className="empty-diagnosis">

                            <div>
                                🩺
                            </div>

                            <h3>
                                Awaiting Analysis
                            </h3>

                            <p>
                                Upload a crop image
                                and click Analyze Crop
                                to begin.
                            </p>

                        </div>

                    )}


                    {/* LOADING */}

                    {loading && (

                        <div className="diagnosis-loading">

                            <div className="loading-circle">
                                🔬
                            </div>

                            <h3>
                                Analyzing Crop
                            </h3>

                            <p>
                                GroWell Vision is examining
                                visible crop health indicators.
                            </p>

                        </div>

                    )}


                    {/* RESULT */}

                    {result && (

                        <div className="diagnosis-summary">

                            {/* CROP */}

                            <div className="crop-name">

                                <span>
                                    🌾
                                </span>

                                <div>

                                    <small>
                                        CROP
                                    </small>

                                    <strong>
                                        {
                                            result.crop ||
                                            "Unknown"
                                        }
                                    </strong>

                                </div>

                            </div>


                            {/* CONDITION */}

                            <div className="disease-name">

                                <small>
                                    POSSIBLE CONDITION
                                </small>

                                <h3>

                                    {
                                        result.disease ||
                                        result.condition ||
                                        "Not identified"
                                    }

                                </h3>

                            </div>


                            {/* STATS */}

                            <div className="stat-grid">

                                {/* CONFIDENCE */}

                                <div className="stat-box">

                                    <span>
                                        🎯
                                    </span>

                                    <small>
                                        CONFIDENCE
                                    </small>

                                    <strong>
                                        {
                                            result.confidence ||
                                            "Unavailable"
                                        }
                                    </strong>

                                </div>


                                {/* SEVERITY */}

                                <div className="stat-box">

                                    <span>
                                        ⚠️
                                    </span>

                                    <small>
                                        SEVERITY
                                    </small>

                                    <strong
                                        className={getSeverityClass(
                                            result.severity
                                        )}
                                    >
                                        {
                                            result.severity ||
                                            "Unavailable"
                                        }
                                    </strong>

                                </div>

                            </div>

                        </div>

                    )}

                </div>

            </div>


            {/* =================================================
                FULL RESULTS
            ================================================= */}

            {result && (

                <div className="results-section">

                    {/* =================================================
                        SYMPTOMS
                    ================================================= */}

                    <div className="result-card">

                        <div className="result-icon">
                            🔍
                        </div>

                        <div>

                            <h2>
                                Visible Symptoms
                            </h2>

                            <p>
                                Observations from
                                the uploaded image
                            </p>

                            <div className="result-content">

                                {
                                    result.symptoms ||
                                    "No symptoms reported."
                                }

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        CAUSE
                    ================================================= */}

                    <div className="result-card">

                        <div className="result-icon">
                            🧬
                        </div>

                        <div>

                            <h2>
                                Likely Cause
                            </h2>

                            <p>
                                Factors associated with
                                the observed condition
                            </p>

                            <div className="result-content">

                                {
                                    result.cause ||
                                    "No cause information available."
                                }

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        TREATMENTS
                    ================================================= */}

                    <div className="treatment-grid">

                        {/* ORGANIC */}

                        <div className="result-card">

                            <div className="result-icon">
                                🌿
                            </div>

                            <div>

                                <h2>
                                    Organic Treatment
                                </h2>

                                <div className="result-content">

                                    {
                                        result.organicTreatment ||
                                        "No organic treatment information available."
                                    }

                                </div>

                            </div>

                        </div>


                        {/* CHEMICAL */}

                        <div className="result-card">

                            <div className="result-icon">
                                🧪
                            </div>

                            <div>

                                <h2>
                                    Chemical Treatment
                                </h2>

                                <div className="result-content">

                                    {
                                        result.chemicalTreatment ||
                                        "No chemical treatment information available."
                                    }

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        PREVENTION
                    ================================================= */}

                    <div className="result-card">

                        <div className="result-icon">
                            🛡️
                        </div>

                        <div>

                            <h2>
                                Prevention
                            </h2>

                            <p>
                                Steps to reduce future
                                disease risk
                            </p>

                            <div className="result-content">

                                {
                                    result.prevention ||
                                    "No prevention information available."
                                }

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        RECOMMENDATION
                    ================================================= */}

                    <div className="priority-card">

                        <div className="priority-title">

                            <span>
                                🚨
                            </span>

                            <div>

                                <h2>
                                    GroWell Recommendation
                                </h2>

                                <p>
                                    Priority action based
                                    on the analysis
                                </p>

                            </div>

                        </div>


                        <div className="priority-content">

                            {
                                result.recommendation
                                    ?.split(/\n|(?=\d+\.)/)
                                    .map(
                                        point =>
                                            point
                                                .replace(
                                                    /\*\*\d+\*\*/g,
                                                    ""
                                                )
                                                .replace(
                                                    /^\s*\d+\.\s*/,
                                                    ""
                                                )
                                                .trim()
                                    )
                                    .filter(
                                        point =>
                                            point.length > 0
                                    )
                                    .map(
                                        (
                                            point,
                                            index
                                        ) => (

                                            <div
                                                className="recommendation-point"
                                                key={index}
                                            >

                                                <span>
                                                    {index + 1}
                                                </span>

                                                <p>
                                                    {point}
                                                </p>

                                            </div>

                                        )
                                    )
                            }

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default CropDiagnosis;
