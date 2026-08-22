function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, Math.round(value)));
}

function calculateDiseaseRisk(weather) {

    const temp = weather.current.temperature;
    const humidity = weather.current.humidity;
    const wind = weather.current.wind_speed;
    const rain = weather.rainfall.today;

    let fungal = 20;
    let bacterial = 20;
    let pest = 20;

    // Fungal Disease
    if (humidity > 80) fungal += 35;
    if (temp >= 20 && temp <= 30) fungal += 25;
    if (rain > 60) fungal += 20;

    // Bacterial Disease
    if (humidity > 70) bacterial += 25;
    if (rain > 40) bacterial += 20;
    if (temp >= 24 && temp <= 34) bacterial += 15;

    // Pest Activity
    if (temp > 28) pest += 20;
    if (humidity > 60) pest += 10;
    if (wind < 10) pest += 15;

    return {
        fungal: clamp(fungal),
        bacterial: clamp(bacterial),
        pest: clamp(pest)
    };
}

function irrigationAdvisor(weather) {

    const rain = weather.rainfall.tomorrow;
    const humidity = weather.current.humidity;

    if (rain >= 70) {
        return {
            status: "Not Required",
            color: "green",
            reason: "Rain is expected tomorrow."
        };
    }

    if (humidity < 40) {
        return {
            status: "Required",
            color: "red",
            reason: "Low humidity may dry the soil quickly."
        };
    }

    return {
        status: "Monitor",
        color: "orange",
        reason: "Check soil moisture before irrigating."
    };
}

function heatStress(weather) {

    const temp = weather.current.temperature;

    if (temp >= 38) {
        return {
            level: "High",
            livestock: "Provide shade and drinking water.",
            crop: "High heat stress likely."
        };
    }

    if (temp >= 32) {
        return {
            level: "Moderate",
            livestock: "Ensure adequate water.",
            crop: "Monitor crops during afternoon."
        };
    }

    return {
        level: "Low",
        livestock: "Safe",
        crop: "Suitable conditions."
    };
}

function generateDecision(weather) {

    return {

        disease: calculateDiseaseRisk(weather),

        irrigation: irrigationAdvisor(weather),

        heatStress: heatStress(weather)

    };

}

module.exports = {
    generateDecision
};