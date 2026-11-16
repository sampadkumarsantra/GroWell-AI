import { useState, useRef } from "react";
import {
    Camera,
    Upload,
    Scan,
    CheckCircle2,
    AlertTriangle,
    Printer,
    RotateCcw,
    Sparkles,
    Leaf,
    Bug,
    FlaskConical,
    Shield,
    Lightbulb,
    FileText,
    ArrowRight
} from "lucide-react";
import "./CropDiagnosis.css";
import { useFarm } from "../context/FarmContext";
import { apiRequest } from "../services/api";

function CropDiagnosis() {
    const { updateFarmData, updateDiagnosisData } = useFarm();

    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [diagnosesCount, setDiagnosesCount] = useState(0);

    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // =====================================================
    // IMAGE UPLOAD / CAPTURE
    // =====================================================

    function handleFileSelected(selectedFile) {
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith("image/")) {
            setError("Please upload a valid image file (JPG, PNG, or WebP).");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("Image size exceeds 10 MB. Please choose a smaller photo.");
            return;
        }

        setFile(selectedFile);
        setImage(URL.createObjectURL(selectedFile));
        setResult(null);
        setError("");
    }

    function handleImageUpload(event) {
        const selectedFile = event.target.files[0];
        handleFileSelected(selectedFile);
    }

    function handleReset() {
        setImage(null);
        setFile(null);
        setResult(null);
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
    }

    // =====================================================
    // CROP ANALYSIS
    // =====================================================

    async function analyzeCrop() {
        if (!file) {
            setError("Please capture or upload a crop image first.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await apiRequest("/api/diagnose", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                const requestError = new Error(data.message || "Crop diagnosis failed.");
                requestError.status = response.status;
                throw requestError;
            }

            console.log("🌿 GroWell Vision Diagnosis:", data);
            setResult(data);
            setDiagnosesCount((prev) => prev + 1);

            // Connect diagnosis to Farm context
            updateDiagnosisData({
                crop: data.crop || "",
                disease: data.disease || data.condition || "",
                confidence: data.confidence || "",
                severity: data.severity || "",
                symptoms: data.symptoms || "",
                cause: data.cause || "",
                recommendation: data.recommendation || ""
            });

            if (data.crop) {
                updateFarmData({ crop: data.crop });
            }
        } catch (err) {
            console.error("Crop Diagnosis Error:", err);
            setError(
                err?.status === 429
                    ? "Rate limit reached: the diagnosis service is busy right now. Please wait about a minute and try again."
                    : err?.status === 503
                    ? "Crop diagnosis is temporarily unavailable: the AI model is experiencing high demand. Please wait a moment and try again."
                    : err.message || "GroWell Vision could not analyze the image. Please verify your photo is clear and try again."
            );
        } finally {
            setLoading(false);
        }
    }

    // Parse numeric confidence percentage for visual meter
    function parseConfidencePct(confStr) {
        if (!confStr) return 80;
        const match = String(confStr).match(/(\d+)%/);
        if (match) return Math.min(99, Math.max(10, parseInt(match[1], 10)));
        return 80;
    }

    function getSeverityClass(severity) {
        if (!severity) return "severity-medium";
        const val = String(severity).toLowerCase();
        if (val.includes("critical")) return "severity-critical";
        if (val.includes("high") || val.includes("severe")) return "severity-high";
        if (val.includes("moderate") || val.includes("medium")) return "severity-medium";
        if (val.includes("low") || val.includes("mild")) return "severity-low";
        return "severity-medium";
    }

    function handlePrint() {
        window.print();
    }

    return (
        <div className="crop-diagnosis-page">
            {/* Header */}
            <div className="diagnosis-header">
                <div className="header-meta">
                    <div className="vision-label">
                        <Sparkles size={12} className="sparkle-icon" />
                        GROWELL AGRI-VISION AI
                    </div>
                    {diagnosesCount > 0 && (
                        <span className="session-count-chip">
                            {diagnosesCount} {diagnosesCount === 1 ? "Diagnosis" : "Diagnoses"} today
                        </span>
                    )}
                </div>
                <h1>AI Crop Diagnosis &amp; Plant Pathology</h1>
                <p>
                    Precision crop disease identification powered by agricultural computer vision.
                    Trained on ICAR/KVK field guidelines for 50+ Indian crops with instant organic and chemical remedies.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div className="diagnosis-main">
                {/* Left: Image Card & Upload */}
                <div className="image-card">
                    <div className="card-title">
                        <span className="card-icon-badge">
                            <Leaf size={20} />
                        </span>
                        <div>
                            <h2>Crop Specimen</h2>
                            <p>Capture or upload a clear photo of the leaf, fruit, or stem</p>
                        </div>
                    </div>

                    {/* Preview Area with Scanning Laser */}
                    <div className="upload-container">
                        {image ? (
                            <div className="image-preview-wrapper">
                                <img src={image} alt="Crop specimen" className="crop-preview" />
                                {loading && (
                                    <div className="scanning-overlay">
                                        <div className="scanning-laser"></div>
                                        <div className="scanning-grid"></div>
                                        <div className="scanning-badge">
                                            <Scan size={14} className="pulse-spin" />
                                            Analyzing Plant Pathology...
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <div className="placeholder-icon-circle">
                                    <Scan size={36} />
                                </div>
                                <strong>Upload Affected Crop Specimen</strong>
                                <span>High-resolution JPG, PNG or WebP (up to 10 MB)</span>

                                {/* Tips Bar */}
                                <div className="photo-tips-grid">
                                    <div className="tip-item">
                                        <span className="tip-dot">☀️</span>
                                        <span>Good daylight</span>
                                    </div>
                                    <div className="tip-item">
                                        <span className="tip-dot">🔍</span>
                                        <span>Focus on spots/lesions</span>
                                    </div>
                                    <div className="tip-item">
                                        <span className="tip-dot">🌿</span>
                                        <span>Include healthy area</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            hidden
                        />
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleImageUpload}
                            ref={cameraInputRef}
                            hidden
                        />
                    </div>

                    {/* Buttons Strip */}
                    <div className="action-buttons-strip">
                        <button
                            type="button"
                            className="btn-capture"
                            onClick={() => cameraInputRef.current?.click()}
                            disabled={loading}
                        >
                            <Camera size={16} />
                            Take Photo
                        </button>
                        <button
                            type="button"
                            className="btn-upload-file"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={loading}
                        >
                            <Upload size={16} />
                            Choose from Gallery
                        </button>
                    </div>

                    {file && !result && (
                        <button
                            className="analyze-button"
                            onClick={analyzeCrop}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Scan size={18} className="spin" />
                                    Scanning Crop Tissue...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    Diagnose Disease &amp; Pests
                                </>
                            )}
                        </button>
                    )}

                    {result && (
                        <div className="result-controls">
                            <button className="btn-reset" onClick={handleReset}>
                                <RotateCcw size={15} />
                                Diagnose Another Specimen
                            </button>
                            <button className="btn-print" onClick={handlePrint}>
                                <Printer size={15} />
                                Print Report
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="error-message">
                            <AlertTriangle size={18} />
                            <div>{error}</div>
                        </div>
                    )}
                </div>

                {/* Right: Diagnosis Overview Card */}
                <div className="diagnosis-card">
                    <div className="card-heading">
                        <span className="card-icon-badge">
                            <Bug size={20} />
                        </span>
                        <div>
                            <h2>Pathological Assessment</h2>
                            <p>Clinical identification &amp; threat analysis</p>
                        </div>
                    </div>

                    {!result && !loading && (
                        <div className="empty-diagnosis">
                            <div className="empty-icon-ring">🔬</div>
                            <h3>Awaiting Crop Specimen</h3>
                            <p>
                                Upload a crop image and click <strong>Diagnose Disease &amp; Pests</strong> to
                                run deep ICAR-standard plant pathology analysis.
                            </p>
                        </div>
                    )}

                    {loading && (
                        <div className="diagnosis-loading">
                            <div className="loading-radar">
                                <div className="radar-circle"></div>
                                <div className="radar-scanner"></div>
                            </div>
                            <h3>Examining Crop Specimen</h3>
                            <p>
                                Comparing visible symptoms against 50,000+ Indian agricultural disease patterns...
                            </p>
                        </div>
                    )}

                    {result && (
                        <div className="diagnosis-summary">
                            {/* Crop Identification Pill */}
                            <div className="crop-hero-banner">
                                <div className="crop-hero-icon">🌾</div>
                                <div className="crop-hero-text">
                                    <span className="hero-sub">IDENTIFIED CROP SPECIMEN</span>
                                    <h3>{result.crop || "Crop Detected"}</h3>
                                </div>
                            </div>

                            {/* Condition / Disease Name */}
                            <div className="disease-highlight-box">
                                <span className="box-sub">DETECTED CONDITION / PATHOGEN</span>
                                <h2 className="disease-title">
                                    {result.disease || result.condition || "No severe pathogen detected"}
                                </h2>
                            </div>

                            {/* Metrics Grid */}
                            <div className="metrics-grid">
                                {/* Confidence Meter */}
                                <div className="metric-card">
                                    <div className="metric-header">
                                        <span className="metric-label">DIAGNOSTIC CONFIDENCE</span>
                                        <span className="metric-val">
                                            {parseConfidencePct(result.confidence)}%
                                        </span>
                                    </div>
                                    <div className="confidence-track">
                                        <div
                                            className="confidence-fill"
                                            style={{ width: `${parseConfidencePct(result.confidence)}%` }}
                                        ></div>
                                    </div>
                                    <span className="confidence-caption">
                                        {result.confidence || "High symptom correlation"}
                                    </span>
                                </div>

                                {/* Severity Badge */}
                                <div className="metric-card">
                                    <div className="metric-header">
                                        <span className="metric-label">SEVERITY LEVEL</span>
                                        <span className={`severity-badge ${getSeverityClass(result.severity)}`}>
                                            {result.severity?.split(".")[0]?.split(" ")[0] || "Moderate"}
                                        </span>
                                    </div>
                                    <p className="severity-detail-text">
                                        {result.severity || "Localized infection symptoms"}
                                    </p>
                                </div>
                            </div>

                            {/* Action Summary Pill */}
                            <div className="quick-summary-bar">
                                <CheckCircle2 size={16} className="check-icon" />
                                <span>
                                    Diagnosis complete. Review immediate remedies and prevention protocols below.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed Medical / Agronomy Results Sections */}
            {result && (
                <div className="results-section">
                    <div className="section-divider">
                        <span>DETAILED AGRONOMIC ACTION PLAN</span>
                    </div>

                    <div className="results-deck">
                        {/* 1. Visible Symptoms */}
                        <div className="result-card symptoms-card">
                            <div className="card-top">
                                <span className="pill-badge blue">SYMPTOMS</span>
                                <h3>🔍 Visual Symptoms Observed</h3>
                            </div>
                            <div className="result-body">
                                <p>{result.symptoms || "Visual leaf damage observed on the specimen."}</p>
                            </div>
                        </div>

                        {/* 2. Pathogen Biology & Cause */}
                        <div className="result-card cause-card">
                            <div className="card-top">
                                <span className="pill-badge purple">EPIDEMIOLOGY</span>
                                <h3>🧬 Pathogen &amp; Environmental Triggers</h3>
                            </div>
                            <div className="result-body">
                                <p>{result.cause || "Environmental humidity and temperature conditions favored pathogen spread."}</p>
                            </div>
                        </div>

                        {/* 3. Organic & Bio-control Treatment */}
                        <div className="result-card organic-card">
                            <div className="card-top">
                                <span className="pill-badge green">ORGANIC / BIO-REMEDY</span>
                                <h3>🌿 Organic &amp; Biological Treatment</h3>
                            </div>
                            <div className="result-body">
                                <p>{result.organicTreatment || "Apply neem cake and spray Trichoderma viride @ 4g/L on affected plants."}</p>
                            </div>
                        </div>

                        {/* 4. Chemical Treatment */}
                        <div className="result-card chemical-card">
                            <div className="card-top">
                                <span className="pill-badge amber">CIBRC REGISTERED</span>
                                <h3>🧪 Chemical Treatment Options</h3>
                            </div>
                            <div className="result-body">
                                <p>{result.chemicalTreatment || "Consult local KVK for registered fungicide / insecticide dosage."}</p>
                            </div>
                        </div>

                        {/* 5. Long-term Prevention */}
                        <div className="result-card prevention-card">
                            <div className="card-top">
                                <span className="pill-badge teal">FARM MANAGEMENT</span>
                                <h3>🛡️ Preventive Measures &amp; Sanitation</h3>
                            </div>
                            <div className="result-body">
                                <p>{result.prevention || "Use certified disease-free seeds and maintain proper field drainage."}</p>
                            </div>
                        </div>

                        {/* 6. Action Roadmap & Economic Impact */}
                        <div className="result-card action-card">
                            <div className="card-top">
                                <span className="pill-badge red">ACTION ROADMAP</span>
                                <h3>🚨 Priority Action Plan</h3>
                            </div>
                            <div className="result-body action-roadmap">
                                {result.recommendation
                                    ?.split(/\n|(?=\d+\.)/)
                                    .map((point) =>
                                        point
                                            .replace(/\*\*\d+\*\*/g, "")
                                            .replace(/^\s*\d+\.\s*/, "")
                                            .trim()
                                    )
                                    .filter((p) => p.length > 0)
                                    .map((point, idx) => (
                                        <div className="action-step-item" key={idx}>
                                            <span className="step-number">{idx + 1}</span>
                                            <div className="step-content">
                                                <p>{point}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CropDiagnosis;
