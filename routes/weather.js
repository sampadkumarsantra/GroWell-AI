const express = require("express");
const router = express.Router();

const { getWeather } = require("../services/weatherService");

router.get("/:city", async (req, res) => {

    try {

        const result = await getWeather(req.params.city);

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

});

module.exports = router;