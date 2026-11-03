const express = require("express");
const router = express.Router();

const { analyzeSoil } = require("../services/soilAnalysis");
const { authenticateToken } = require("../middleware/auth");

/*
 * Soil Intelligence is now available for all users.
 */
router.post(
    "/analyze",
    authenticateToken,
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
