import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    MapPin, Search, RefreshCw, Wind, Droplets, Eye,
    Thermometer, Gauge, Sun, Umbrella, Leaf, AlertTriangle,
    Sprout, Snowflake, Flame, Clock, ChevronRight
} from "lucide-react";
import "./Weather.css";
import { apiRequest } from "../../services/api";

// ─── helpers ────────────────────────────────────────────────────────────────
function wmoEmoji(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 55) return "🌦️";
    if (code <= 65) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌧️";
    if (code <= 86) return "🌨️";
    if (code >= 95) return "⛈️";
    return "🌡️";
}

function heroBg(code, temp) {
    if (code === 0 && temp > 28) return "sunny";
    if (code === 0) return "clear";
    if (code <= 3) return "partly";
    if (code <= 48) return "foggy";
    if (code >= 95) return "storm";
    if (code >= 60) return "rainy";
    return "cloudy";
}

function aqiColor(idx) {
    return ["", "#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"][idx] || "#94a3b8";
}

function riskColor(level) {
    if (!level) return "var(--gw-muted)";
    const l = level.toLowerCase();
    if (l === "high" || l === "severe") return "#ef4444";
    if (l === "medium" || l === "moderate") return "#f59e0b";
    return "#22c55e";
}

function fmt(v, digits = 1) {
    if (v === null || v === undefined) return "—";
    return Number(v).toFixed(digits);
}

function fmtTime(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function getGrowellSettings() {
    try { return JSON.parse(localStorage.getItem("growell-settings") || "{}"); }
    catch { return {}; }
}

// ─── constants ───────────────────────────────────────────────────────────────
const CROPS = ["Rice", "Wheat", "Maize", "Tomato", "Potato", "Chilli", "Soybean", "Groundnut", "Cotton", "Sugarcane", "Onion", "Mango"];
const STAGES = ["Seedling", "Vegetative", "Flowering", "Fruiting", "Harvest"];
const SOILS = ["Sandy", "Loamy", "Clay", "Silty", "Black Cotton"];

// ─── component ───────────────────────────────────────────────────────────────
export default function Weather() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [crop, setCrop] = useState("Rice");
    const [stage, setStage] = useState("Vegetative");
    const [soil, setSoil] = useState("Loamy");

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locating, setLocating] = useState(false);
    const [error, setError] = useState("");

    const [aiReport, setAiReport] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");

    const searchRef = useRef(null);
    const suggestTimer = useRef(null);

    // Auto-detect on mount
    useEffect(() => {
        autoDetectLocation();
    }, []);

    // Geocode suggestions
    useEffect(() => {
        clearTimeout(suggestTimer.current);
        if (query.trim().length < 2) { setSuggestions([]); return; }
        suggestTimer.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`
                );
                const data = await res.json();
                setSuggestions(data.results || []);
                setShowSuggestions(true);
            } catch { setSuggestions([]); }
        }, 320);
        return () => clearTimeout(suggestTimer.current);
    }, [query]);

    // Click-outside to close suggestions
    useEffect(() => {
        function handle(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    async function autoDetectLocation() {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }
        setLocating(true);
        setError("");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                await fetchByCoords(pos.coords.latitude, pos.coords.longitude);
                setLocating(false);
            },
            (err) => {
                setLocating(false);
                setError("Could not detect location. Please search manually.");
            },
            { timeout: 10000, maximumAge: 300000 }
        );
    }

    async function fetchByCoords(lat, lon) {
        setLoading(true);
        setError("");
        setAiReport("");
        try {
            // Try backend first (has AQI + reverse geocode)
            const res = await apiRequest(`/api/weather/coords?lat=${lat}&lon=${lon}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success) { setWeather(data); return; }
            }
        } catch { /* fall through to direct */ }

        // Fallback: direct Open-Meteo
        try {
            const meteoRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
                `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,dew_point_2m,cloud_cover` +
                `&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m,rain` +
                `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset,weather_code,rain_sum` +
                `&forecast_days=16&timezone=auto`
            );
            const m = await meteoRes.json();
            const c = m.current;
            const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
            const windDir = dirs[Math.round((c.wind_direction_10m || 0) / 22.5) % 16];
            const wmoDesc = { 0:"Clear Sky",1:"Mainly Clear",2:"Partly Cloudy",3:"Overcast",45:"Foggy",51:"Drizzle",61:"Light Rain",63:"Rain",65:"Heavy Rain",80:"Rain Showers",95:"Thunderstorm" };
            const cond = wmoDesc[c.weather_code] || "Unknown";
            const now = new Date();
            const hourly = (m.hourly?.time || []).map((t, i) => ({
                time: t, temperature: m.hourly.temperature_2m?.[i],
                precipProbability: m.hourly.precipitation_probability?.[i],
                weatherCode: m.hourly.weather_code?.[i], windSpeed: m.hourly.wind_speed_10m?.[i]
            })).filter(h => new Date(h.time) >= now).slice(0, 24);
            const daily = (m.daily?.time || []).map((date, i) => ({
                date, day: new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
                fullDay: new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
                maxTemp: m.daily.temperature_2m_max?.[i], minTemp: m.daily.temperature_2m_min?.[i],
                rainfall: m.daily.precipitation_sum?.[i], rainProbability: m.daily.precipitation_probability_max?.[i],
                windMax: m.daily.wind_speed_10m_max?.[i], uvMax: m.daily.uv_index_max?.[i],
                sunrise: m.daily.sunrise?.[i], sunset: m.daily.sunset?.[i],
                weatherCode: m.daily.weather_code?.[i], condition: wmoDesc[m.daily.weather_code?.[i]] || "Unknown"
            }));
            const today = daily[0] || {};
            const diseaseRisk = c.relative_humidity_2m > 85 ? "High" : c.relative_humidity_2m > 72 ? "Medium" : "Low";
            setWeather({
                success: true,
                location: `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
                coordinates: { latitude: lat, longitude: lon },
                current: { temperature: c.temperature_2m, feelsLike: c.apparent_temperature, humidity: c.relative_humidity_2m,
                    rainfall: c.precipitation, rain: c.rain, weatherCode: c.weather_code, condition: cond,
                    windSpeed: c.wind_speed_10m, windDirectionText: windDir, pressure: c.surface_pressure,
                    visibility: c.visibility, uvIndex: c.uv_index, dewPoint: c.dew_point_2m },
                hourly, daily,
                sunrise: today.sunrise ? new Date(today.sunrise).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "",
                sunset: today.sunset ? new Date(today.sunset).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "",
                aqi: null,
                risk: { disease: diseaseRisk, frost: today.minTemp < 8 ? "Medium" : "Low", heatStress: c.temperature_2m > 35 ? "High" : "Low", sprayWindow: "Check conditions" }
            });
        } catch (err) {
            setError("Weather data unavailable. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function fetchByCity(name, lat, lon) {
        setQuery(name);
        setShowSuggestions(false);
        setSuggestions([]);
        await fetchByCoords(lat, lon);
    }

    async function handleSearch() {
        const q = query.trim();
        if (!q) return;
        setLoading(true);
        setError("");
        setAiReport("");
        setSuggestions([]);
        setShowSuggestions(false);
        try {
            // Use backend city route
            const res = await apiRequest(`/api/weather/${encodeURIComponent(q)}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success) { setWeather(data); setLoading(false); return; }
            }
            // Fallback: geocode + coords
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`);
            const geoData = await geoRes.json();
            if (geoData.results?.length) {
                const p = geoData.results[0];
                await fetchByCoords(p.latitude, p.longitude);
                setWeather(prev => prev ? { ...prev, location: [p.name, p.admin1, p.country].filter(Boolean).join(", ") } : prev);
            } else {
                setError("Location not found. Try a different name.");
            }
        } catch {
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Disease and irrigation logic
    function diseaseInfo() {
        if (!weather) return null;
        const { humidity, weatherCode } = weather.current || {};
        const rain7 = weather.daily?.slice(0, 7).reduce((s, d) => s + (d.rainProbability || 0), 0) / 7;
        if (crop === "Rice" && humidity > 80) return { risk: "HIGH", problem: "Rice Blast", reason: "High humidity + warm conditions favour fungal disease.", action: "Monitor leaves, reduce nitrogen, improve aeration." };
        if (crop === "Tomato" && humidity > 75) return { risk: "HIGH", problem: "Early Blight", reason: "Warm humid conditions increase fungal pressure.", action: "Remove infected foliage, avoid leaf wetness." };
        if (crop === "Potato" && weather.current.temperature < 25 && humidity > 80) return { risk: "HIGH", problem: "Late Blight", reason: "Cool humid conditions favour late blight.", action: "Improve drainage and airflow, scout canopy." };
        if (crop === "Wheat" && humidity > 78 && rain7 > 40) return { risk: "MEDIUM", problem: "Rust", reason: "Moderate to high humidity over sustained period.", action: "Scout for rust symptoms, consider preventive fungicide." };
        return { risk: "LOW", problem: "No major threat detected", reason: "Current conditions are not strongly favourable for major diseases.", action: "Continue regular scouting." };
    }

    function irrigationInfo() {
        if (!weather) return null;
        const { rain, temperature } = weather.current || {};
        if (rain > 5) return { decision: "Delay Irrigation", reason: "Recent rainfall has supplied water to the field.", action: "Check soil moisture before irrigating." };
        if (temperature > 35) return { decision: "Increase Irrigation", reason: "High temp increases crop water loss.", action: "Irrigate during cooler hours, check soil frequently." };
        if (soil === "Sandy") return { decision: "Frequent Light Irrigation", reason: "Sandy soil has low water retention.", action: "Use shorter intervals, avoid over-watering." };
        if (soil === "Clay" || soil === "Black Cotton") return { decision: "Irrigate Carefully", reason: "Clay retains water longer.", action: "Check soil before irrigating, avoid waterlogging." };
        return { decision: "Normal Schedule", reason: "Conditions don't indicate immediate adjustment needed.", action: "Maintain schedule, monitor actual soil moisture." };
    }

    async function generateAIReport() {
        if (!weather) { setAiError("Fetch weather data first."); return; }
        setAiLoading(true);
        setAiReport("");
        setAiError("");
        try {
            const settings = getGrowellSettings();
            const w = weather.current;
            const today = weather.daily?.[0];
            const msg = `Create a detailed farm weather intelligence report for an Indian farmer.

Farm Location: ${weather.location}
Crop: ${crop} (${stage} stage)
Soil: ${soil}
Date: ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}

Current Conditions:
- Temperature: ${w.temperature}°C (feels like ${w.feelsLike}°C)
- Humidity: ${w.humidity}%
- Rainfall: ${w.rain ?? 0} mm
- Wind: ${w.windSpeed} km/h ${w.windDirectionText}
- UV Index: ${w.uvIndex}
- Pressure: ${w.pressure} hPa
${weather.aqi ? `- Air Quality: ${weather.aqi.label} (AQI ${weather.aqi.index})` : ""}

Today's Forecast: Max ${today?.maxTemp}°C / Min ${today?.minTemp}°C, ${today?.rainProbability}% rain chance
7-Day Outlook: ${weather.daily?.slice(0,7).map(d => `${d.day}: ${d.maxTemp}/${d.minTemp}°C ${d.rainProbability}% rain`).join(", ")}

Agricultural Risks:
- Disease Risk: ${weather.risk?.disease}
- Heat Stress: ${weather.risk?.heatStress}
- Frost Risk: ${weather.risk?.frost}
- Best Spray Window: ${weather.risk?.sprayWindow}

Please provide:
1. **Weather Summary** — what the conditions mean for farming today
2. **Crop-Specific Risks** — for ${crop} at ${stage} stage
3. **Irrigation Guidance** — precise recommendation for ${soil} soil
4. **Disease Watch** — what to monitor and prevent
5. **Action Plan** — top 5 actions for today and this week

Be specific, practical and actionable for a small to medium Indian farmer.`.trim();

            const res = await apiRequest("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: msg,
                    settings: {
                        language: settings.preferences?.language || "English",
                        effort: settings.preferences?.effort || "Balanced",
                        profile: { ...settings.profile, location: weather.location, cropFocus: crop }
                    }
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.reply || data.message || "AI report failed");
            setAiReport(data.reply || "No report received.");
        } catch {
            setAiError("GroWell AI could not generate the report. Ensure backend is running.");
        } finally {
            setAiLoading(false);
        }
    }

    const w = weather?.current;
    const disease = diseaseInfo();
    const irrigation = irrigationInfo();
    const heroCls = weather ? `wth-hero wth-hero--${heroBg(w?.weatherCode, w?.temperature)}` : "wth-hero";

    return (
        <div className="wth-page">
            {/* ── HEADER ─────────────────────────────────────────────── */}
            <div className="wth-header">
                <div className="wth-title-block">
                    <span className="wth-eyebrow">GROWELL AI</span>
                    <h1 className="wth-title">Farm Weather Intelligence</h1>
                    <p className="wth-subtitle">Hyperlocal forecasts • 16-day outlook • AI crop advisory</p>
                </div>

                <div className="wth-controls">
                    {/* Location bar */}
                    <div className="wth-location-bar" ref={searchRef}>
                        <button
                            className="wth-gps-btn"
                            onClick={autoDetectLocation}
                            disabled={locating || loading}
                            title="Detect my location"
                        >
                            {locating ? <RefreshCw size={15} className="wth-spin" /> : <MapPin size={15} />}
                        </button>

                        <div className="wth-search-wrap">
                            <Search size={14} className="wth-search-icon" />
                            <input
                                type="text"
                                className="wth-search-input"
                                placeholder="Search village, town, city..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onFocus={() => suggestions.length && setShowSuggestions(true)}
                                onKeyDown={e => e.key === "Enter" && handleSearch()}
                                autoComplete="off"
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="wth-suggestions">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            className="wth-suggestion-item"
                                            onMouseDown={() => fetchByCity(
                                                [s.name, s.admin1, s.country].filter(Boolean).join(", "),
                                                s.latitude, s.longitude
                                            )}
                                        >
                                            <MapPin size={12} className="wth-suggest-icon" />
                                            <div>
                                                <span className="wth-suggest-name">{s.name}</span>
                                                <span className="wth-suggest-sub">
                                                    {[s.admin2, s.admin1, s.country].filter(Boolean).join(", ")}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="wth-search-btn" onClick={handleSearch} disabled={loading}>
                            {loading ? <RefreshCw size={14} className="wth-spin" /> : "Search"}
                        </button>
                    </div>

                    {/* Crop/Stage/Soil row */}
                    <div className="wth-selectors">
                        <div className="wth-select-wrap">
                            <Leaf size={13} />
                            <select value={crop} onChange={e => setCrop(e.target.value)}>
                                {CROPS.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="wth-select-wrap">
                            <Sprout size={13} />
                            <select value={stage} onChange={e => setStage(e.target.value)}>
                                {STAGES.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="wth-select-wrap">
                            <Thermometer size={13} />
                            <select value={soil} onChange={e => setSoil(e.target.value)}>
                                {SOILS.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <button className="wth-analyze-btn" onClick={() => weather && setAiReport("") || handleSearch()} disabled={loading}>
                            Analyze Farm
                        </button>
                    </div>
                </div>
            </div>

            {/* ── STATUS MESSAGES ─────────────────────────────────────── */}
            {locating && (
                <div className="wth-status-card wth-status--info">
                    <RefreshCw size={16} className="wth-spin" />
                    <span>📍 Detecting your location...</span>
                </div>
            )}
            {loading && !locating && (
                <div className="wth-status-card wth-status--info">
                    <RefreshCw size={16} className="wth-spin" />
                    <span>🌦️ Fetching weather data...</span>
                </div>
            )}
            {error && (
                <div className="wth-status-card wth-status--error">
                    <AlertTriangle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {/* ── SKELETON ────────────────────────────────────────────── */}
            {(loading || locating) && !weather && (
                <div className="wth-skeleton-wrap">
                    <div className="wth-skeleton wth-skeleton--hero" />
                    <div className="wth-skeleton-row">
                        {[...Array(6)].map((_, i) => <div key={i} className="wth-skeleton wth-skeleton--metric" />)}
                    </div>
                    <div className="wth-skeleton wth-skeleton--hourly" />
                    <div className="wth-skeleton-grid">
                        {[...Array(8)].map((_, i) => <div key={i} className="wth-skeleton wth-skeleton--day" />)}
                    </div>
                </div>
            )}

            {/* ── MAIN CONTENT ────────────────────────────────────────── */}
            {weather && (
                <div className="wth-content wth-fade-in">
                    {/* ── LOCATION BAR ─────────────────────────────────── */}
                    <div className="wth-loc-strip">
                        <MapPin size={14} className="wth-loc-icon" />
                        <span className="wth-loc-name">{weather.location}</span>
                        {weather.coordinates && (
                            <span className="wth-loc-coords">
                                {weather.coordinates.latitude?.toFixed(4)}°N, {weather.coordinates.longitude?.toFixed(4)}°E
                            </span>
                        )}
                        <span className="wth-loc-updated">Updated {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}</span>
                        {weather.aqi && (
                            <span className="wth-aqi-badge" style={{ background: aqiColor(weather.aqi.index) + "22", color: aqiColor(weather.aqi.index), border: `1px solid ${aqiColor(weather.aqi.index)}44` }}>
                                💨 AQI: {weather.aqi.label}
                            </span>
                        )}
                    </div>

                    {/* ── HERO CARD ─────────────────────────────────────── */}
                    <div className={heroCls}>
                        <div className="wth-hero-main">
                            <div className="wth-hero-icon">{wmoEmoji(w?.weatherCode)}</div>
                            <div className="wth-hero-temp-block">
                                <div className="wth-hero-temp">{fmt(w?.temperature, 0)}°C</div>
                                <div className="wth-hero-cond">{w?.condition}</div>
                                <div className="wth-hero-feels">Feels like {fmt(w?.feelsLike, 0)}°C</div>
                            </div>
                            <div className="wth-hero-sun">
                                {weather.sunrise && <div className="wth-sun-row"><Sun size={13} /> <span>Sunrise {weather.sunrise}</span></div>}
                                {weather.sunset && <div className="wth-sun-row"><Sun size={13} style={{ opacity: 0.5 }} /> <span>Sunset {weather.sunset}</span></div>}
                            </div>
                        </div>

                        <div className="wth-metrics-strip">
                            <div className="wth-metric">
                                <Droplets size={16} />
                                <span className="wth-metric-val">{w?.humidity}%</span>
                                <span className="wth-metric-label">Humidity</span>
                            </div>
                            <div className="wth-metric">
                                <Wind size={16} />
                                <span className="wth-metric-val">{fmt(w?.windSpeed, 0)} <small>km/h</small></span>
                                <span className="wth-metric-label">Wind {w?.windDirectionText}</span>
                            </div>
                            <div className="wth-metric">
                                <Umbrella size={16} />
                                <span className="wth-metric-val">{fmt(w?.rain ?? w?.rainfall, 1)} <small>mm</small></span>
                                <span className="wth-metric-label">Rainfall</span>
                            </div>
                            <div className="wth-metric">
                                <Eye size={16} />
                                <span className="wth-metric-val">{w?.visibility ? fmt(w.visibility / 1000, 1) : "—"} <small>km</small></span>
                                <span className="wth-metric-label">Visibility</span>
                            </div>
                            <div className="wth-metric">
                                <Gauge size={16} />
                                <span className="wth-metric-val">{fmt(w?.pressure, 0)} <small>hPa</small></span>
                                <span className="wth-metric-label">Pressure</span>
                            </div>
                            <div className="wth-metric">
                                <Sun size={16} />
                                <span className="wth-metric-val">{fmt(w?.uvIndex, 0)}</span>
                                <span className="wth-metric-label">UV Index</span>
                            </div>
                        </div>
                    </div>

                    {/* ── HOURLY STRIP ──────────────────────────────────── */}
                    {weather.hourly?.length > 0 && (
                        <div className="wth-section">
                            <h2 className="wth-section-title"><Clock size={15} /> Hourly Forecast — Next 24h</h2>
                            <div className="wth-hourly-scroll">
                                {weather.hourly.map((h, i) => {
                                    const isNow = i === 0;
                                    const t = new Date(h.time);
                                    const timeStr = t.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
                                    return (
                                        <div key={h.time} className={`wth-hourly-item${isNow ? " wth-hourly-item--now" : ""}`}>
                                            <span className="wth-h-time">{isNow ? "Now" : timeStr}</span>
                                            <span className="wth-h-icon">{wmoEmoji(h.weatherCode)}</span>
                                            <span className="wth-h-temp">{fmt(h.temperature, 0)}°</span>
                                            <div className="wth-h-rain-bar">
                                                <div className="wth-h-rain-fill" style={{ width: `${h.precipProbability || 0}%` }} />
                                            </div>
                                            <span className="wth-h-rain-pct">{h.precipProbability ?? 0}%</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ── 16-DAY FORECAST ───────────────────────────────── */}
                    {weather.daily?.length > 0 && (
                        <div className="wth-section">
                            <h2 className="wth-section-title">📅 16-Day Forecast</h2>
                            <div className="wth-daily-grid">
                                {weather.daily.map((d, i) => (
                                    <div key={d.date} className={`wth-day-card${i === 0 ? " wth-day-card--today" : i < 3 ? " wth-day-card--near" : ""}`}>
                                        <div className="wth-day-name">{i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.fullDay || d.day}</div>
                                        <div className="wth-day-icon">{wmoEmoji(d.weatherCode)}</div>
                                        <div className="wth-day-cond">{d.condition}</div>
                                        <div className="wth-day-temps">
                                            <span className="wth-day-max">{fmt(d.maxTemp, 0)}°</span>
                                            <span className="wth-day-min">{fmt(d.minTemp, 0)}°</span>
                                        </div>
                                        <div className="wth-day-rain-bar">
                                            <div className="wth-day-rain-fill" style={{ width: `${d.rainProbability || 0}%` }} />
                                        </div>
                                        <div className="wth-day-rain-info">
                                            💧 {d.rainProbability ?? 0}% · {fmt(d.rainfall, 1)}mm
                                        </div>
                                        {d.uvMax != null && (
                                            <div className="wth-day-uv">☀️ UV {fmt(d.uvMax, 0)}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── AGRICULTURAL INTELLIGENCE ─────────────────────── */}
                    <div className="wth-section">
                        <h2 className="wth-section-title">🌾 Agricultural Intelligence — {crop}</h2>
                        <div className="wth-agri-grid">
                            {/* Disease Risk */}
                            {disease && (
                                <div className="wth-agri-card">
                                    <div className="wth-agri-head">
                                        <span className="wth-agri-icon">🦠</span>
                                        <span className="wth-agri-title">Disease Risk</span>
                                        <span className="wth-risk-badge" style={{ color: riskColor(disease.risk), background: riskColor(disease.risk) + "18" }}>
                                            {disease.risk}
                                        </span>
                                    </div>
                                    <div className="wth-agri-body">
                                        <p><strong>{disease.problem}</strong></p>
                                        <p className="wth-agri-why">{disease.reason}</p>
                                        <p className="wth-agri-action">✅ {disease.action}</p>
                                    </div>
                                </div>
                            )}

                            {/* Irrigation */}
                            {irrigation && (
                                <div className="wth-agri-card">
                                    <div className="wth-agri-head">
                                        <span className="wth-agri-icon">💧</span>
                                        <span className="wth-agri-title">Irrigation</span>
                                    </div>
                                    <div className="wth-agri-body">
                                        <p><strong>{irrigation.decision}</strong></p>
                                        <p className="wth-agri-why">{irrigation.reason}</p>
                                        <p className="wth-agri-action">✅ {irrigation.action}</p>
                                    </div>
                                </div>
                            )}

                            {/* Heat Stress */}
                            <div className="wth-agri-card">
                                <div className="wth-agri-head">
                                    <Flame size={15} />
                                    <span className="wth-agri-title">Heat Stress</span>
                                    <span className="wth-risk-badge" style={{ color: riskColor(weather.risk?.heatStress), background: riskColor(weather.risk?.heatStress) + "18" }}>
                                        {weather.risk?.heatStress || "Low"}
                                    </span>
                                </div>
                                <div className="wth-agri-body">
                                    <p>Temp: <strong>{fmt(w?.temperature, 0)}°C</strong> · Feels: <strong>{fmt(w?.feelsLike, 0)}°C</strong></p>
                                    <p className="wth-agri-why">
                                        {w?.temperature > 40 ? "Severe heat — provide shade netting and mist irrigation."
                                            : w?.temperature > 35 ? "High heat — irrigate early morning, monitor wilting."
                                            : w?.temperature > 30 ? "Moderate heat stress possible for sensitive crops."
                                            : "Temperature is within comfortable range for most crops."}
                                    </p>
                                </div>
                            </div>

                            {/* Frost Risk */}
                            <div className="wth-agri-card">
                                <div className="wth-agri-head">
                                    <Snowflake size={15} />
                                    <span className="wth-agri-title">Frost Risk</span>
                                    <span className="wth-risk-badge" style={{ color: riskColor(weather.risk?.frost), background: riskColor(weather.risk?.frost) + "18" }}>
                                        {weather.risk?.frost || "Low"}
                                    </span>
                                </div>
                                <div className="wth-agri-body">
                                    <p>Tonight Min: <strong>{fmt(weather.daily?.[0]?.minTemp, 0)}°C</strong></p>
                                    <p className="wth-agri-why">
                                        {weather.daily?.[0]?.minTemp < 4 ? "Frost very likely — cover crops or use heaters."
                                            : weather.daily?.[0]?.minTemp < 8 ? "Frost possible — watch overnight, protect sensitive seedlings."
                                            : "Frost risk is low for the next 3 days."}
                                    </p>
                                </div>
                            </div>

                            {/* Spray Window */}
                            <div className="wth-agri-card">
                                <div className="wth-agri-head">
                                    <span className="wth-agri-icon">🌿</span>
                                    <span className="wth-agri-title">Best Spray Window</span>
                                </div>
                                <div className="wth-agri-body">
                                    <p>Next window: <strong>{weather.risk?.sprayWindow || "Check conditions"}</strong></p>
                                    <p className="wth-agri-why">Low wind (&lt;15 km/h) + low rain probability (&lt;20%) conditions.</p>
                                    <p className="wth-agri-action">✅ Spray early morning or late evening to minimise evaporation and drift.</p>
                                </div>
                            </div>

                            {/* Soil Moisture Estimate */}
                            <div className="wth-agri-card">
                                <div className="wth-agri-head">
                                    <span className="wth-agri-icon">🪱</span>
                                    <span className="wth-agri-title">Soil Moisture Est.</span>
                                </div>
                                <div className="wth-agri-body">
                                    {(() => {
                                        const rain3 = weather.daily?.slice(0, 3).reduce((s, d) => s + (d.rainfall || 0), 0) || 0;
                                        const temp = w?.temperature;
                                        let status = "Adequate";
                                        let note = "Soil moisture appears adequate for most crops.";
                                        if (rain3 > 30) { status = "Saturated"; note = "Risk of waterlogging. Ensure field drainage is open."; }
                                        else if (rain3 < 2 && temp > 35) { status = "Dry"; note = "Low rainfall + high temp. Irrigate soon to prevent stress."; }
                                        else if (rain3 < 5) { status = "Low"; note = "Low recent rainfall. Monitor crop for moisture stress signs."; }
                                        return (
                                            <>
                                                <p>3-day rain: <strong>{rain3.toFixed(1)} mm</strong> · Status: <strong style={{ color: status === "Dry" ? "#ef4444" : status === "Saturated" ? "#3b82f6" : "#22c55e" }}>{status}</strong></p>
                                                <p className="wth-agri-why">{note}</p>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── AI REPORT ─────────────────────────────────────── */}
                    <div className="wth-section wth-ai-section">
                        <div className="wth-ai-header">
                            <div>
                                <h2 className="wth-section-title">🤖 GroWell AI Farm Report</h2>
                                <p className="wth-ai-sub">Personalized analysis for your {crop} crop at {stage} stage on {soil} soil</p>
                            </div>
                            <button
                                className="wth-ai-btn"
                                onClick={generateAIReport}
                                disabled={aiLoading}
                            >
                                {aiLoading ? (
                                    <><RefreshCw size={14} className="wth-spin" /> Generating...</>
                                ) : (
                                    <>🌱 Generate AI Report</>
                                )}
                            </button>
                        </div>
                        {aiError && (
                            <div className="wth-status-card wth-status--error" style={{ marginTop: 12 }}>
                                <AlertTriangle size={14} /> <span>{aiError}</span>
                            </div>
                        )}
                        {aiReport && (
                            <div className="wth-ai-report">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{aiReport}</ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
