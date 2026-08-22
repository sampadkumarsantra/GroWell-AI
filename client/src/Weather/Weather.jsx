import { useEffect, useState } from "react";
import {
    MapPin,
    Search,
    Loader2,
    CloudSun,
    Droplets,
    Wind,
    CloudRain,
    Thermometer,
    Sprout,
    AlertTriangle,
    CheckCircle2,
    Info,
    CalendarDays
} from "lucide-react";

import "./Weather.css";
import { useFarm } from "../../context/FarmContext";

export default function Weather() {
    const {
        updateFarmData,
        updateWeatherData
    } = useFarm();

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState("Kolkata");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchWeather() {
        const location = city.trim();

        if (!location) {
            setError("Please enter a city.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `http://localhost:5000/api/weather/${encodeURIComponent(location)}`
            );

            if (!response.ok) {
                throw new Error(
                    `Weather server returned ${response.status}`
                );
            }

            const data = await response.json();

            console.log("🌦 WEATHER API:", data);

            setWeather(data);

            const current = data?.current || {};

            updateFarmData({
                location: data?.location || location
            });

            updateWeatherData({
                connected: true,
                location: data?.location || location,
                temperature: current.temperature ?? "",
                feelsLike:
                    current.feels_like ??
                    current.feelsLike ??
                    "",
                humidity: current.humidity ?? "",
                rainfall: data?.rainfall?.today ?? 0,
                windSpeed:
                    current.wind_speed ??
                    current.windSpeed ??
                    0,
                condition:
                    current.condition ??
                    current.weather ??
                    "Current conditions",
                forecast:
                    data?.rainfall?.next7Days || []
            });

        } catch (err) {
            console.error("Weather Error:", err);

            setError(
                err.message ||
                "Unable to load weather."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWeather();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function advisory() {
        if (!weather?.current) return [];

        const temperature =
            Number(weather.current.temperature);

        const humidity =
            Number(weather.current.humidity);

        const wind =
            Number(
                weather.current.wind_speed ??
                weather.current.windSpeed ??
                0
            );

        const tips = [];

        if (humidity > 85) {
            tips.push({
                type: "warning",
                title: "High disease pressure",
                text: "High humidity may increase fungal disease risk. Monitor leaves closely and avoid unnecessary leaf wetness.",
                icon: <AlertTriangle size={17} />
            });
        }

        if (wind > 15) {
            tips.push({
                type: "warning",
                title: "Strong wind conditions",
                text: "Avoid pesticide and foliar nutrient spraying while wind speeds remain high.",
                icon: <Wind size={17} />
            });
        }

        if (temperature > 35) {
            tips.push({
                type: "warning",
                title: "Heat stress possible",
                text: "Prefer irrigation during early morning or evening and monitor crop moisture carefully.",
                icon: <Thermometer size={17} />
            });
        }

        if (
            temperature >= 20 &&
            temperature <= 32
        ) {
            tips.push({
                type: "good",
                title: "Favorable temperature",
                text: "Current temperature is favorable for many field crops.",
                icon: <CheckCircle2 size={17} />
            });
        }

        if (humidity < 40) {
            tips.push({
                type: "info",
                title: "Low humidity",
                text: "Crop water demand may increase. Check soil moisture before irrigation.",
                icon: <Droplets size={17} />
            });
        }

        if (tips.length === 0) {
            tips.push({
                type: "good",
                title: "Conditions look stable",
                text: "Current weather does not indicate a major immediate weather-related concern.",
                icon: <CheckCircle2 size={17} />
            });
        }

        return tips;
    }

    const forecast =
        weather?.rainfall?.next7Days || [];

    const temperature =
        weather?.current?.temperature ?? "--";

    const humidity =
        weather?.current?.humidity ?? "--";

    const wind =
        weather?.current?.wind_speed ??
        weather?.current?.windSpeed ??
        "--";

    const rainfall =
        weather?.rainfall?.today ?? 0;

    return (
        <div className="weather-new-page">

            <div className="weather-orb weather-orb-one" />
            <div className="weather-orb weather-orb-two" />

            {/* HEADER */}

            <header className="weather-new-header">

                <div className="weather-title-area">

                    <div className="weather-mini-label">
                        <span className="live-dot" />
                        GROWELL WEATHER INTELLIGENCE
                    </div>

                    <h1>
                        Weather decisions,
                        <span>not just weather data.</span>
                    </h1>

                    <p>
                        Real-time weather translated into
                        practical agricultural decisions
                        for your field.
                    </p>

                </div>

                <div className="weather-status">

                    <span className="live-dot" />

                    <div>
                        <strong>LIVE WEATHER</strong>
                        <span>
                            Connected to GroWell
                        </span>
                    </div>

                </div>

            </header>


            {/* LOCATION */}

            <section className="weather-location-bar">

                <div className="location-info">

                    <div className="location-icon">
                        <MapPin size={19} />
                    </div>

                    <div>
                        <span>FARM LOCATION</span>

                        <strong>
                            {weather?.location || city}
                        </strong>
                    </div>

                </div>

                <div className="weather-search-new">

                    <input
                        value={city}
                        onChange={(e) =>
                            setCity(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetchWeather();
                            }
                        }}
                        placeholder="Enter city"
                    />

                    <button
                        onClick={fetchWeather}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <Loader2
                                    size={15}
                                    className="spin"
                                />
                                Connecting
                            </>
                        ) : (
                            <>
                                <Search size={15} />
                                Search
                            </>
                        )}

                    </button>

                </div>

            </section>


            {/* ERROR */}

            {error && (
                <div className="weather-new-error">
                    <AlertTriangle size={17} />
                    {error}
                </div>
            )}


            {weather && (
                <>

                    {/* HERO */}

                    <section className="weather-hero">

                        <div>

                            <div className="hero-label">
                                CURRENT CONDITIONS
                            </div>

                            <div className="hero-temperature">
                                {temperature}
                                <sup>°C</sup>
                            </div>

                            <div className="hero-location">
                                <MapPin size={14} />
                                {weather.location || city}
                            </div>

                            <p className="hero-description">
                                Current atmospheric conditions
                                are being interpreted for
                                agricultural decision-making.
                            </p>

                        </div>


                        <div className="hero-weather-icon">
                            <CloudSun size={105} strokeWidth={1} />
                        </div>


                        <div className="hero-right">

                            <div className="hero-metric">
                                <span>Humidity</span>
                                <strong>{humidity}%</strong>
                            </div>

                            <div className="hero-metric">
                                <span>Wind</span>
                                <strong>{wind} km/h</strong>
                            </div>

                            <div className="hero-metric">
                                <span>Rain today</span>
                                <strong>{rainfall} mm</strong>
                            </div>

                        </div>

                    </section>


                    {/* METRICS */}

                    <section className="weather-metrics">

                        <div className="metric-card">

                            <div className="metric-icon green">
                                <Thermometer size={19} />
                            </div>

                            <div>
                                <span>TEMPERATURE</span>
                                <strong>{temperature}°C</strong>
                            </div>

                        </div>


                        <div className="metric-card">

                            <div className="metric-icon blue">
                                <Droplets size={19} />
                            </div>

                            <div>
                                <span>HUMIDITY</span>
                                <strong>{humidity}%</strong>
                            </div>

                        </div>


                        <div className="metric-card">

                            <div className="metric-icon teal">
                                <Wind size={19} />
                            </div>

                            <div>
                                <span>WIND SPEED</span>
                                <strong>{wind} km/h</strong>
                            </div>

                        </div>


                        <div className="metric-card">

                            <div className="metric-icon gold">
                                <CloudRain size={19} />
                            </div>

                            <div>
                                <span>RAINFALL TODAY</span>
                                <strong>{rainfall} mm</strong>
                            </div>

                        </div>

                    </section>


                    {/* CONNECTION */}

                    <section className="weather-panel connection-panel">

                        <div className="panel-heading">

                            <div>
                                <span>FARM CONNECTION</span>

                                <h2>
                                    Weather connected to GroWell
                                </h2>
                            </div>

                            <div className="panel-icon">
                                <Sprout size={19} />
                            </div>

                        </div>

                        <p className="connection-text">
                            These live weather conditions are
                            available to GroWell's decision
                            engine and can be used for
                            irrigation, crop-risk and farm
                            recommendations.
                        </p>

                    </section>


                    {/* CONTENT */}

                    <div className="weather-content-grid">

                        {/* ADVISORY */}

                        <section className="weather-panel">

                            <div className="panel-heading">

                                <div>
                                    <span>
                                        GROWELL AI
                                    </span>

                                    <h2>
                                        Weather Advisory
                                    </h2>
                                </div>

                                <div className="panel-icon">
                                    <Sprout size={19} />
                                </div>

                            </div>

                            <div className="advice-cards">

                                <div className="weather-advice-list">
    {advisory().map((tip, index) => (
        <div className="weather-advice-point" key={index}>
            <span className="weather-advice-number">
                {String(index + 1).padStart(2, "0")}
            </span>

            <strong>
                {tip}
            </strong>
        </div>
    ))}
</div>

                            </div>

                        </section>


                        {/* FORECAST */}

                        <section className="weather-panel">

                            <div className="panel-heading">

                                <div>
                                    <span>
                                        WEATHER OUTLOOK
                                    </span>

                                    <h2>
                                        Next 7 Days
                                    </h2>
                                </div>

                                <div className="panel-icon">
                                    <CalendarDays size={19} />
                                </div>

                            </div>

                            <div className="forecast-list">

                                {forecast.length > 0 ? (
                                    forecast.map(
                                        (day, index) => {

                                            const date =
                                                day.date
                                                    ? new Date(day.date)
                                                    : null;

                                            const dayName =
                                                date &&
                                                !isNaN(date)
                                                    ? date.toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday: "short"
                                                        }
                                                    )
                                                    : `Day ${index + 1}`;

                                            return (
                                                <div
                                                    className="forecast-row"
                                                    key={index}
                                                >

                                                    <div className="forecast-day">
                                                        <strong>
                                                            {dayName}
                                                        </strong>
                                                    </div>

                                                    <div className="forecast-rain">
                                                        <CloudRain size={14} />
                                                        {day.rainProbability ?? 0}%
                                                    </div>

                                                    <div className="forecast-temp">
                                                        {day.minTemp ?? "--"}°
                                                        {" / "}
                                                        {day.maxTemp ?? "--"}°C
                                                    </div>

                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="no-forecast">
                                        <Info size={20} />
                                        <p>
                                            Forecast data is not
                                            currently available.
                                        </p>
                                    </div>
                                )}

                            </div>

                        </section>

                    </div>

                </>

            )}

        </div>
    );
}