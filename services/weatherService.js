const axios = require("axios");

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY || "76a1f3529fd35c171af3bbfc487d3b3d";

function wmoDescription(code) {
    const map = {
        0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast",
        45: "Foggy", 48: "Icy Fog",
        51: "Light Drizzle", 53: "Drizzle", 55: "Heavy Drizzle",
        61: "Light Rain", 63: "Rain", 65: "Heavy Rain",
        71: "Light Snow", 73: "Snow", 75: "Heavy Snow", 77: "Snow Grains",
        80: "Rain Showers", 81: "Heavy Showers", 82: "Violent Showers",
        85: "Snow Showers", 86: "Heavy Snow Showers",
        95: "Thunderstorm", 96: "Thunderstorm w/ Hail", 99: "Severe Thunderstorm"
    };
    return map[code] || "Unknown";
}

function windDirection(deg) {
    const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return dirs[Math.round(deg / 22.5) % 16];
}

async function getWeatherByCoords(lat, lon) {
    const [meteoRes, aqiRes, reverseRes] = await Promise.allSettled([
        axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
                latitude: lat,
                longitude: lon,
                current: [
                    "temperature_2m","relative_humidity_2m","apparent_temperature",
                    "precipitation","rain","weather_code","wind_speed_10m",
                    "wind_direction_10m","surface_pressure","visibility",
                    "uv_index","dew_point_2m","cloud_cover"
                ].join(","),
                hourly: [
                    "temperature_2m","precipitation_probability",
                    "weather_code","wind_speed_10m","rain"
                ].join(","),
                daily: [
                    "temperature_2m_max","temperature_2m_min","precipitation_sum",
                    "precipitation_probability_max","wind_speed_10m_max",
                    "uv_index_max","sunrise","sunset","weather_code",
                    "rain_sum","wind_gusts_10m_max"
                ].join(","),
                forecast_days: 16,
                timezone: "auto"
            },
            timeout: 15000
        }),
        axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
            params: { lat, lon, appid: OPENWEATHER_KEY },
            timeout: 8000
        }),
        axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: { lat, lon, format: "json" },
            headers: { "User-Agent": "GroWellAI/1.0" },
            timeout: 6000
        })
    ]);

    if (meteoRes.status === "rejected") {
        throw new Error("Weather data unavailable: " + meteoRes.reason?.message);
    }

    const m = meteoRes.value.data;
    const c = m.current;

    let locationName = `${parseFloat(lat).toFixed(3)}, ${parseFloat(lon).toFixed(3)}`;
    if (reverseRes.status === "fulfilled") {
        const addr = reverseRes.value.data.address || {};
        const parts = [
            addr.village || addr.town || addr.suburb || addr.city || addr.county,
            addr.state_district || addr.district,
            addr.state,
            addr.country_code?.toUpperCase()
        ].filter(Boolean);
        if (parts.length) locationName = parts.slice(0, 3).join(", ");
    }

    let aqi = null;
    if (aqiRes.status === "fulfilled") {
        const item = aqiRes.value.data?.list?.[0];
        if (item) {
            aqi = {
                index: item.main?.aqi,
                components: item.components,
                label: ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"][item.main?.aqi] || "Unknown"
            };
        }
    }

    const current = {
        temperature: c.temperature_2m,
        feelsLike: c.apparent_temperature,
        humidity: c.relative_humidity_2m,
        rainfall: c.precipitation,
        rain: c.rain,
        weatherCode: c.weather_code,
        condition: wmoDescription(c.weather_code),
        windSpeed: c.wind_speed_10m,
        windDirection: c.wind_direction_10m,
        windDirectionText: windDirection(c.wind_direction_10m || 0),
        pressure: c.surface_pressure,
        visibility: c.visibility,
        uvIndex: c.uv_index,
        dewPoint: c.dew_point_2m,
        cloudCover: c.cloud_cover
    };

    const now = new Date();
    const hourly = (m.hourly?.time || []).map((t, i) => ({
        time: t,
        temperature: m.hourly.temperature_2m?.[i],
        precipProbability: m.hourly.precipitation_probability?.[i],
        weatherCode: m.hourly.weather_code?.[i],
        condition: wmoDescription(m.hourly.weather_code?.[i]),
        windSpeed: m.hourly.wind_speed_10m?.[i],
        rain: m.hourly.rain?.[i]
    })).filter(h => new Date(h.time) >= now).slice(0, 24);

    const daily = (m.daily?.time || []).map((date, i) => ({
        date,
        day: new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" }),
        fullDay: new Date(date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
        maxTemp: m.daily.temperature_2m_max?.[i],
        minTemp: m.daily.temperature_2m_min?.[i],
        rainfall: m.daily.precipitation_sum?.[i],
        rainSum: m.daily.rain_sum?.[i],
        rainProbability: m.daily.precipitation_probability_max?.[i],
        windMax: m.daily.wind_speed_10m_max?.[i],
        windGusts: m.daily.wind_gusts_10m_max?.[i],
        uvMax: m.daily.uv_index_max?.[i],
        sunrise: m.daily.sunrise?.[i],
        sunset: m.daily.sunset?.[i],
        weatherCode: m.daily.weather_code?.[i],
        condition: wmoDescription(m.daily.weather_code?.[i])
    }));

    const humidity = current.humidity;
    const temp = current.temperature;
    let diseaseRisk = "Low";
    if (humidity > 85 && (daily[0]?.rainProbability || 0) > 50) diseaseRisk = "High";
    else if (humidity > 72) diseaseRisk = "Medium";

    const frostRisk = daily.slice(0, 3).some(d => d.minTemp < 4) ? "High" :
        daily.slice(0, 3).some(d => d.minTemp < 8) ? "Medium" : "Low";
    const heatStress = temp > 40 ? "Severe" : temp > 35 ? "High" : temp > 30 ? "Moderate" : "Low";

    let sprayWindow = "No suitable window found";
    const goodSpray = hourly.find(h => h.windSpeed < 15 && (h.precipProbability || 0) < 20);
    if (goodSpray) {
        const t = new Date(goodSpray.time);
        sprayWindow = t.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    const today = daily[0] || {};
    const sunriseStr = today.sunrise ? new Date(today.sunrise).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "";
    const sunsetStr = today.sunset ? new Date(today.sunset).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "";

    return {
        success: true,
        location: locationName,
        coordinates: { latitude: parseFloat(lat), longitude: parseFloat(lon) },
        timezone: m.timezone,
        current,
        hourly,
        daily,
        sunrise: sunriseStr,
        sunset: sunsetStr,
        aqi,
        risk: { disease: diseaseRisk, frost: frostRisk, heatStress, sprayWindow },
        rainfall: { today: today.rainfall ?? 0, tomorrow: daily[1]?.rainfall ?? 0, next7Days: daily.slice(0, 7) },
        forecast: daily.slice(0, 7).map(d => ({
            date: d.date, day: d.day, minTemp: d.minTemp, maxTemp: d.maxTemp,
            rainProbability: d.rainProbability, rainfall: d.rainfall
        }))
    };
}

async function getWeather(city) {
    const geo = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: { name: city, count: 1, language: "en", format: "json" }
    });
    if (!geo.data.results?.length) throw new Error("Location not found.");
    const place = geo.data.results[0];
    const result = await getWeatherByCoords(place.latitude, place.longitude);
    result.location = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
    return result;
}

async function getAQI(lat, lon) {
    const res = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
        params: { lat, lon, appid: OPENWEATHER_KEY },
        timeout: 8000
    });
    const item = res.data?.list?.[0];
    if (!item) return { index: null, label: "Unknown" };
    return {
        index: item.main?.aqi,
        label: ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"][item.main?.aqi] || "Unknown",
        components: item.components
    };
}

module.exports = { getWeather, getWeatherByCoords, getAQI };
