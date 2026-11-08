const express = require("express");
const router = express.Router();

const { analyzeSoil } = require("../services/soilAnalysis");
const { optionalAuth } = require("../middleware/auth");

/*
 * Soil Intelligence is available for all users (no login required).
 * When a session is present, it is attached for context but never gates access.
 */
router.post(
    "/analyze",
    optionalAuth,
    (req, res) => {
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
    }
);

module.exports = router;
