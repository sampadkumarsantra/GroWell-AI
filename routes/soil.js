const express = require("express");
const router = express.Router();

const { analyzeSoil } = require("../services/soilAnalysis");

router.post("/analyze", (req, res) => {
    try {
        const result = analyzeSoil(req.body);

        res.json(result);

    } catch (error) {
        console.error("Soil analysis error:", error);

        res.status(400).json({
            success: false,
            message:
                error?.message ||
                "Unable to analyze soil. Please check the entered values."
        });
    }
});

module.exports = router;