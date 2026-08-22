
import { useEffect, useState } from "react";
import {
    CloudSun,
    Droplets,
    Wind,
    MapPin,
    Search,
    Sprout,
    CloudRain,
    ThermometerSun,
    AlertTriangle,
    CheckCircle2,
    Umbrella,
    RefreshCw
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

            const res = await fetch(
                `http://localhost:5000/api/weather/${encodeURIComponent(location)}`
            );

            if (!res.ok) {
                throw new Error(
                    `Weather server returned ${res.status}`
                );
            }

            const data = await res.json();

            console.log("🌦 GROWell WEATHER:", data);

            setWeather(data);

            const current = data?.current || {};

            updateFarmData({
                location: data?.location || location
            });

            updateWeatherData({

                temperature:
                    current.temperature ?? "",

                feelsLike:
                    current.feels_like ??
                    current.feelsLike ??
                    "",

                humidity:
                    current.humidity ?? "",

                rainfall:
                    data?.rainfall?.today ?? "",

                windSpeed:
                    current.wind_speed ??
                    current.windSpeed ??
                    "",

                condition:
                    current.condition ??
                    current.weather ??
                    "",

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

        if (!weather?.current) {
            return [];
        }

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
                text:
                    "High humidity can increase fungal disease pressure. Monitor leaves closely and avoid unnecessary leaf wetness."
            });

        }

        if (wind > 15) {

            tips.push({
                type: "warning",
                title: "Strong winds",
                text:
                    "Avoid pesticide or foliar nutrient spraying while wind speed remains high."
            });

        }

        if (temperature > 35) {

            tips.push({
                type: "warning",
                title: "Heat stress possible",
                text:
                    "Crop water demand may be high. Prefer irrigation during early morning or evening."
            });

        }

        if (
            temperature >= 20 &&
            temperature <= 32
        ) {

            tips.push({
                type: "good",
                title: "Favorable temperature",
                text:
                    "Current temperature is favorable for many field crops."
            });

        }

        if (humidity < 40) {

            tips.push({
                type: "info",
                title: "Low humidity",
                text:
                    "Low humidity can increase crop water demand. Check soil moisture before irrigating."
            });

        }

        if (tips.length === 0) {

            tips.push({
                type: "good",
                title: "Conditions look stable",
                text:
                    "No major immediate weather-related concern has been detected."
            });

        }

        return tips;
    }

    const forecast =
        weather?.rainfall?.next7Days ||
        weather?.forecast ||
        [];

    return (

        <div className="gw-weather">

            {/* AMBIENT BACKGROUND */}

            <div className="gw-weather-glow gw-weather-glow-1" />
            <div className="gw-weather-glow gw-weather-glow-2" />

            {/* HEADER */}

            <header className="gw-weather-header">

                <div>

                    <div className="gw-weather-kicker">

                        <span className="gw-live-dot" />

                        GROWell WEATHER INTELLIGENCE

                    </div>

                    <h1>
                        Weather that
                        <span>understands your farm.</span>
                    </h1>

                    <p>
                        Real-time atmospheric conditions
                        translated into practical agricultural
                        decisions.
                    </p>

                </div>

                <div className="gw-weather-live">

                    <span />

                    <div>
                        <strong>LIVE DATA</strong>
                        <small>Weather connection active</small>
                    </div>

                </div>

            </header>


            {/* LOCATION SEARCH */}

            <section className="gw-location">

                <div className="gw-location-current">

                    <div className="gw-location-icon">
                        <MapPin size={19} />
                    </div>

                    <div>
                        <span>FIELD LOCATION</span>

                        <strong>
                            {weather?.location || city}
                        </strong>
                    </div>

                </div>


                <div className="gw-search">

                    <Search size={17} />

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
                            <RefreshCw
                                size={16}
                                className="gw-spin"
                            />
                        ) : (
                            "Update"
                        )}

                    </button>

                </div>

            </section>


            {/* ERROR */}

            {error && (

                <div className="gw-error">

                    <AlertTriangle size={18} />

                    <span>{error}</span>

                </div>

            )}


            {/* LOADING */}

            {loading && !weather && (

                <div className="gw-loading">

                    <CloudSun size={42} />

                    <h2>
                        Reading the atmosphere...
                    </h2>

                    <p>
                        GroWell Weather Intelligence
                        is retrieving current conditions.
                    </p>

                </div>

            )}


            {/* MAIN WEATHER */}

            {weather && (

                <>

                    {/* HERO */}

                    <section className="gw-hero">

                        <div className="gw-hero-main">

                            <span className="gw-label">
                                CURRENT CONDITIONS
                            </span>

                            <div className="gw-temperature">

                                {weather.current?.temperature ?? "--"}

                                <sup>°C</sup>

                            </div>

                            <div className="gw-hero-location">

                                <MapPin size={15} />

                                {weather.location || city}

                            </div>

                            <p>
                                Current atmospheric conditions
                                for your farming location.
                            </p>

                        </div>


                        <div className="gw-hero-icon">

                            <CloudSun size={105} strokeWidth={1} />

                        </div>


                        <div className="gw-hero-side">

                            <div>
                                <span>HUMIDITY</span>
                                <strong>
                                    {weather.current?.humidity ?? "--"}%
                                </strong>
                            </div>

                            <div>
                                <span>WIND</span>
                                <strong>
                                    {
                                        weather.current?.wind_speed ??
                                        weather.current?.windSpeed ??
                                        "--"
                                    } km/h
                                </strong>
                            </div>

                            <div>
                                <span>RAINFALL TODAY</span>
                                <strong>
                                    {weather.rainfall?.today ?? "--"} mm
                                </strong>
                            </div>

                        </div>

                    </section>


                    {/* METRICS */}

                    <section className="gw-metrics">

                        <div className="gw-metric">

                            <div className="gw-metric-icon green">
                                <ThermometerSun size={20} />
                            </div>

                            <div>
                                <span>TEMPERATURE</span>
                                <strong>
                                    {weather.current?.temperature ?? "--"}°C
                                </strong>
                            </div>

                        </div>


                        <div className="gw-metric">

                            <div className="gw-metric-icon blue">
                                <Droplets size={20} />
                            </div>

                            <div>
                                <span>HUMIDITY</span>
                                <strong>
                                    {weather.current?.humidity ?? "--"}%
                                </strong>
                            </div>

                        </div>


                        <div className="gw-metric">

                            <div className="gw-metric-icon teal">
                                <Wind size={20} />
                            </div>

                            <div>
                                <span>WIND SPEED</span>
                                <strong>
                                    {
                                        weather.current?.wind_speed ??
                                        weather.current?.windSpeed ??
                                        "--"
                                    } km/h
                                </strong>
                            </div>

                        </div>


                        <div className="gw-metric">

                            <div className="gw-metric-icon gold">
                                <CloudRain size={20} />
                            </div>

                            <div>
                                <span>RAINFALL</span>
                                <strong>
                                    {weather.rainfall?.today ?? "--"} mm
                                </strong>
                            </div>

                        </div>

                    </section>


                    {/* TWO COLUMN AREA */}

                    <section className="gw-content">


                        {/* ADVISORY */}

                        <div className="gw-panel">

                            <div className="gw-panel-heading">

                                <div>

                                    <span>
                                        AGRICULTURAL DECISION SUPPORT
                                    </span>

                                    <h2>
                                        Weather Advisory
                                    </h2>

                                </div>

                                <div className="gw-panel-icon">
                                    <Sprout size={19} />
                                </div>

                            </div>


                            <div className="gw-advice">

                                {advisory().map(
                                    (item, index) => (

                                        <div
                                            className={`gw-advice-card ${item.type}`}
                                            key={index}
                                        >

                                            <div className="gw-advice-icon">

                                                {item.type === "warning" ? (
                                                    <AlertTriangle size={17} />
                                                ) : item.type === "info" ? (
                                                    <Droplets size={17} />
                                                ) : (
                                                    <CheckCircle2 size={17} />
                                                )}

                                            </div>

                                            <div>

                                                <strong>
                                                    {item.title}
                                                </strong>

                                                <p>
                                                    {item.text}
                                                </p>

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>


                        {/* FORECAST */}

                        <div className="gw-panel">

                            <div className="gw-panel-heading">

                                <div>

                                    <span>
                                        WEATHER OUTLOOK
                                    </span>

                                    <h2>
                                        Next 7 Days
                                    </h2>

                                </div>

                                <div className="gw-panel-icon">
                                    <Umbrella size={19} />
                                </div>

                            </div>


                            {forecast.length > 0 ? (

                                <div className="gw-forecast">

                                    {forecast.map(
                                        (day, index) => (

                                            <div
                                                className="gw-forecast-row"
                                                key={index}
                                            >

                                                <div>
                                                    <strong>
                                                        {
                                                            day.date
                                                                ? new Date(
                                                                    day.date
                                                                ).toLocaleDateString(
                                                                    "en-US",
                                                                    {
                                                                        weekday: "short"
                                                                    }
                                                                )
                                                                : `Day ${index + 1}`
                                                        }
                                                    </strong>

                                                    <small>
                                                        {day.date || ""}
                                                    </small>
                                                </div>


                                                <div className="gw-rain">

                                                    <CloudRain size={15} />

                                                    {
                                                        day.rainProbability ??
                                                        day.rain ??
                                                        "--"
                                                    }%

                                                </div>


                                                <div className="gw-temp">

                                                    {
                                                        day.minTemp ??
                                                        "--"
                                                    }°

                                                    <span>/</span>

                                                    {
                                                        day.maxTemp ??
                                                        "--"
                                                    }°

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <div className="gw-no-data">

                                    <CloudRain size={30} />

                                    <p>
                                        Forecast data unavailable.
                                    </p>

                                </div>

                            )}

                        </div>

                    </section>


                    {/* CONNECTION */}

                    <div className="gw-connection">

                        <div className="gw-connection-icon">
                            <Sprout size={19} />
                        </div>

                        <div>

                            <strong>
                                GroWell Weather Intelligence
                            </strong>

                            <p>
                                Weather conditions are connected
                                to GroWell's agricultural decision
                                engine.
                            </p>

                        </div>

                        <div className="gw-connected">
                            CONNECTED
                        </div>

                    </div>

                </>

            )}

        </div>
    );
}
