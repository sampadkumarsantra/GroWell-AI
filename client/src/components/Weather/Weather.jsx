import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./Weather.css";

function getGrowellSettings() {
    try {
        return JSON.parse(
            localStorage.getItem("growell-settings") || "{}"
        );
    } catch {
        return {};
    }
}

function Weather() {
    const [city, setCity] = useState("");
    const [crop, setCrop] = useState("Rice");
    const [stage, setStage] = useState("Vegetative");
    const [soil, setSoil] = useState("Loamy");

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [aiReport, setAiReport] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

    const crops = [
        "Rice",
        "Wheat",
        "Maize",
        "Tomato",
        "Potato",
        "Chilli",
        "Soybean",
        "Groundnut"
    ];

    const stages = [
        "Seedling",
        "Vegetative",
        "Flowering",
        "Fruiting"
    ];

    const soils = [
        "Sandy",
        "Loamy",
        "Clay"
    ];

    async function analyzeFarm() {
        if (!city.trim()) {
            setError("Enter a farm location.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setAiReport("");
            setAiError("");

            const geoResponse = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
            );

            if (!geoResponse.ok) {
                throw new Error("Location request failed");
            }

            const geoData = await geoResponse.json();

            if (!geoData.results?.length) {
                setError("Location not found.");
                return;
            }

            const selectedLocation = geoData.results[0];

            const weatherResponse = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${selectedLocation.latitude}&longitude=${selectedLocation.longitude}&current=temperature_2m,relative_humidity_2m,rain,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
            );

            if (!weatherResponse.ok) {
                throw new Error("Weather request failed");
            }

            const data = await weatherResponse.json();

            setWeather({
                location: selectedLocation.name,
                current: data.current,
                daily: data.daily
            });
        } catch (err) {
            console.error("WEATHER ERROR:", err);
            setError("Weather service error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function generateAIReport() {
        if (!weather) {
            setAiError("Analyze the farm weather first.");
            return;
        }

        try {
            setAiLoading(true);
            setAiReport("");
            setAiError("");

            const savedSettings = getGrowellSettings();

            const message = `
Create a practical farm weather report.

Farm location: ${weather.location}
Crop: ${crop}
Growth stage: ${stage}
Soil type: ${soil}

Current weather:
- Temperature: ${weather.current.temperature_2m}°C
- Humidity: ${weather.current.relative_humidity_2m}%
- Rainfall: ${weather.current.rain} mm
- Wind speed: ${weather.current.wind_speed_10m} km/h

Include:
1. Main weather risks
2. Irrigation recommendation
3. Disease-risk guidance
4. The most important actions for today

Do not claim access to real-time data beyond the values provided above.
            `.trim();

            const response = await fetch(
                "http://localhost:3000/api/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message,
                        settings: {
                            language:
                                savedSettings.preferences?.language ||
                                "English",
                            effort:
                                savedSettings.preferences?.effort ||
                                "Balanced",
                            profile: {
                                ...savedSettings.profile,
                                location: weather.location,
                                cropFocus: crop
                            }
                        }
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.reply ||
                    data.message ||
                    "AI report failed"
                );
            }

            setAiReport(
                data.reply || "No AI report received."
            );
        } catch (err) {
            console.error("AI REPORT ERROR:", err);

            setAiError(
                "GroWell AI could not generate the report. Check that the backend and Groq API are running."
            );
        } finally {
            setAiLoading(false);
        }
    }

    function disease() {
        const humidity =
            weather.current.relative_humidity_2m;

        const temperature =
            weather.current.temperature_2m;

        if (crop === "Rice" && humidity > 80) {
            return {
                risk: "HIGH",
                problem: "Rice Blast",
                reason:
                    "High humidity combined with warm conditions can favour fungal disease development.",
                action:
                    "Monitor leaves closely, avoid excessive nitrogen, and maintain good field aeration."
            };
        }

        if (crop === "Tomato" && humidity > 75) {
            return {
                risk: "HIGH",
                problem: "Early Blight",
                reason:
                    "Warm and humid conditions can increase fungal infection pressure.",
                action:
                    "Monitor lower leaves, remove infected foliage, and avoid unnecessary leaf wetness."
            };
        }

        if (
            crop === "Potato" &&
            temperature < 25 &&
            humidity > 80
        ) {
            return {
                risk: "HIGH",
                problem: "Late Blight",
                reason:
                    "Cool, humid conditions can favour late blight development.",
                action:
                    "Inspect the canopy frequently and maintain good drainage and airflow."
            };
        }

        return {
            risk: "LOW",
            problem: "No major weather-driven threat detected",
            reason:
                "Current conditions are not strongly favourable for the major diseases covered by this rule layer.",
            action:
                "Continue regular crop scouting and monitor weather changes."
        };
    }

    function irrigation() {
        const rain = weather.current.rain;
        const temperature = weather.current.temperature_2m;

        if (rain > 5) {
            return {
                decision: "Delay irrigation",
                reason:
                    "Recent rainfall has already supplied water to the field.",
                action:
                    "Check soil moisture before applying additional irrigation."
            };
        }

        if (temperature > 35) {
            return {
                decision: "Increase irrigation attention",
                reason:
                    "High temperature can increase crop water loss.",
                action:
                    "Check soil moisture frequently and irrigate during cooler hours."
            };
        }

        if (soil === "Sandy") {
            return {
                decision: "Frequent light irrigation",
                reason:
                    "Sandy soil generally has lower water-holding capacity.",
                action:
                    "Use shorter irrigation intervals and avoid applying too much water at once."
            };
        }

        if (soil === "Clay") {
            return {
                decision: "Irrigate carefully",
                reason:
                    "Clay soil can retain water for longer periods.",
                action:
                    "Check soil moisture before irrigation and avoid waterlogging."
            };
        }

        return {
            decision: "Normal irrigation",
            reason:
                "Current weather and soil type do not indicate an immediate irrigation adjustment.",
            action:
                "Maintain the normal schedule while checking actual soil moisture."
        };
    }

    return (
        <div className="weather-page">
            <div className="weather-header">
                <h1>🌱 GroWell Farm Intelligence</h1>

                <div className="weather-search">
                    <input
                        type="text"
                        placeholder="Farm location"
                        value={city}
                        onChange={(event) =>
                            setCity(event.target.value)
                        }
                    />

                    <select
                        value={crop}
                        onChange={(event) =>
                            setCrop(event.target.value)
                        }
                    >
                        {crops.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={stage}
                        onChange={(event) =>
                            setStage(event.target.value)
                        }
                    >
                        {stages.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={soil}
                        onChange={(event) =>
                            setSoil(event.target.value)
                        }
                    >
                        {soils.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <button type="button" onClick={analyzeFarm}>
                        Analyze
                    </button>
                </div>
            </div>

            {loading && (
                <div className="info-card">
                    <h3>🌦️ Analyzing farm weather...</h3>
                </div>
            )}

            {error && (
                <div className="info-card">
                    <h3>❌ {error}</h3>
                </div>
            )}

            {weather && (
                <>
                    <div className="current-strip">
                        <div className="info-card">
                            <h4>Location</h4>
                            <h2>📍 {weather.location}</h2>
                        </div>

                        <div className="info-card">
                            <h4>Temperature</h4>
                            <h2>
                                {weather.current.temperature_2m}°C
                            </h2>
                        </div>

                        <div className="info-card">
                            <h4>Humidity</h4>
                            <h2>
                                {weather.current.relative_humidity_2m}%
                            </h2>
                        </div>

                        <div className="info-card">
                            <h4>Rain</h4>
                            <h2>{weather.current.rain} mm</h2>
                        </div>

                        <div className="info-card">
                            <h4>Wind</h4>
                            <h2>
                                {weather.current.wind_speed_10m} km/h
                            </h2>
                        </div>
                    </div>

                    <div className="decision-card">
                        <h2>🌾 {crop} Farm Report</h2>

                        <p>
                            Growth Stage: <strong>{stage}</strong>
                        </p>

                        <p>
                            Soil Type: <strong>{soil}</strong>
                        </p>

                        <div className="decision-grid">
                            <div>
                                <h3>🦠 Disease Intelligence</h3>

                                <ul className="decision-list">
                                    <li>
                                        <strong>Risk:</strong>{" "}
                                        {disease().risk}
                                    </li>

                                    <li>
                                        <strong>Possible Threat:</strong>{" "}
                                        {disease().problem}
                                    </li>

                                    <li>
                                        <strong>Why:</strong>{" "}
                                        {disease().reason}
                                    </li>

                                    <li>
                                        <strong>Action:</strong>{" "}
                                        {disease().action}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3>💧 Irrigation Intelligence</h3>

                                <ul className="decision-list">
                                    <li>
                                        <strong>Recommendation:</strong>{" "}
                                        {irrigation().decision}
                                    </li>

                                    <li>
                                        <strong>Why:</strong>{" "}
                                        {irrigation().reason}
                                    </li>

                                    <li>
                                        <strong>Action:</strong>{" "}
                                        {irrigation().action}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={generateAIReport}
                            disabled={aiLoading}
                            style={{
                                marginTop: "25px",
                                padding: "13px 22px",
                                border: "none",
                                borderRadius: "12px",
                                background: "#22c55e",
                                color: "white",
                                fontWeight: "700",
                                cursor: aiLoading
                                    ? "wait"
                                    : "pointer"
                            }}
                        >
                            {aiLoading
                                ? "🤖 GroWell AI is thinking..."
                                : "🌱 Generate GroWell AI Report"}
                        </button>
                    </div>

                    {aiError && (
                        <div className="info-card">
                            <h3>⚠️ {aiError}</h3>
                        </div>
                    )}

                    {aiReport && (
                        <div className="decision-card">
                            <h2>🤖 GroWell AI Expert Farm Report</h2>

                            <div className="ai-report-content">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {aiReport}
                                </ReactMarkdown>
                            </div>
                        </div>
                    )}

                    <div className="forecast-card">
                        <h2>📅 7-Day Weather Forecast</h2>

                        <div className="forecast-grid">
                            {weather.daily.time.map((day, index) => (
                                <div
                                    className="forecast-item"
                                    key={day}
                                >
                                    <h3>
                                        {new Date(
                                            `${day}T00:00:00`
                                        ).toLocaleDateString(
                                            "en-US",
                                            {
                                                weekday: "short"
                                            }
                                        )}
                                    </h3>

                                    <p>
                                        🌡️ Max:{" "}
                                        {
                                            weather.daily
                                                .temperature_2m_max[index]
                                        }
                                        °C
                                    </p>

                                    <p>
                                        🌡️ Min:{" "}
                                        {
                                            weather.daily
                                                .temperature_2m_min[index]
                                        }
                                        °C
                                    </p>

                                    <p>
                                        🌧️ Rain:{" "}
                                        {
                                            weather.daily
                                                .precipitation_probability_max[
                                                index
                                            ]
                                        }
                                        %
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Weather;