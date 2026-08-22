
const axios = require("axios");

async function getWeather(city) {

    // =========================================================
    // 1. GET LOCATION
    // =========================================================

    const geo = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
            params: {
                name: city,
                count: 1,
                language: "en",
                format: "json"
            }
        }
    );

    if (
        !geo.data.results ||
        geo.data.results.length === 0
    ) {
        throw new Error("Location not found.");
    }

    const place = geo.data.results[0];


    // =========================================================
    // 2. GET WEATHER
    // =========================================================

    const weatherResponse = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {

                latitude: place.latitude,

                longitude: place.longitude,

                current: [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "apparent_temperature",
                    "precipitation",
                    "wind_speed_10m"
                ].join(","),

                daily: [
                    "temperature_2m_max",
                    "temperature_2m_min",
                    "precipitation_probability_max",
                    "precipitation_sum"
                ].join(","),

                forecast_days: 7,

                timezone: "auto"

            }
        }
    );


    const data = weatherResponse.data;


    // =========================================================
    // 3. CURRENT WEATHER
    // =========================================================

    const current = {

        temperature:
            data.current?.temperature_2m ?? "",

        feelsLike:
            data.current?.apparent_temperature ?? "",

        humidity:
            data.current?.relative_humidity_2m ?? "",

        rainfall:
            data.current?.precipitation ?? 0,

        windSpeed:
            data.current?.wind_speed_10m ?? "",

        condition:
            "Current conditions"

    };


    // =========================================================
    // 4. SEVEN DAY FORECAST
    // =========================================================

    const next7Days =
        (data.daily?.time || []).map(
            (date, index) => ({

                day: new Date(date).toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long"
                    }
                ),

                date,

                minTemp:
                    data.daily?.temperature_2m_min?.[index] ?? "",

                maxTemp:
                    data.daily?.temperature_2m_max?.[index] ?? "",

                rainProbability:
                    data.daily
                        ?.precipitation_probability_max?.[index] ?? "",

                rainfall:
                    data.daily
                        ?.precipitation_sum?.[index] ?? ""

            })
        );


    // =========================================================
    // 5. AGRICULTURAL RISK
    // =========================================================

    let diseaseRisk = "Low";

    if (
        Number(current.humidity) > 85 &&
        Number(next7Days[0]?.rainProbability || 0) > 50
    ) {

        diseaseRisk = "High";

    } else if (
        Number(current.humidity) > 70
    ) {

        diseaseRisk = "Medium";

    }


    // =========================================================
    // 6. RETURN ONE CONSISTENT WEATHER OBJECT
    // =========================================================

    return {

        success: true,

        location:
            `${place.name}, ${place.country}`,

        coordinates: {

            latitude:
                place.latitude,

            longitude:
                place.longitude

        },

        current,

        // IMPORTANT:
        // This is what Weather.jsx and Decision Center use.

        rainfall: {

            today:
                next7Days[0]?.rainfall ?? 0,

            tomorrow:
                next7Days[1]?.rainfall ?? 0,

            next7Days

        },

        forecast: next7Days,

        risk: {

            disease: diseaseRisk

        }

    };

}


module.exports = {
    getWeather
};

