const express = require("express");
const router = express.Router();
const { getWeather, getWeatherByCoords, getAQI } = require("../services/weatherService");

// GET /api/weather/coords?lat=XX&lon=XX
router.get("/coords", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ success: false, message: "lat and lon required" });
        const result = await getWeatherByCoords(parseFloat(lat), parseFloat(lon));
        res.json(result);
    } catch (err) {
        console.error("WEATHER COORDS ERROR:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/weather/aqi?lat=XX&lon=XX
router.get("/aqi", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ success: false, message: "lat and lon required" });
        const result = await getAQI(parseFloat(lat), parseFloat(lon));
        res.json({ success: true, ...result });
    } catch (err) {
        console.error("AQI ERROR:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/weather/:city
router.get("/:city", async (req, res) => {
    try {
        const result = await getWeather(req.params.city);
        res.json(result);
    } catch (err) {
        console.error("WEATHER CITY ERROR:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
