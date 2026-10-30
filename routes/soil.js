const express = require("express");
const router = express.Router();

const { analyzeSoil } = require("../services/soilAnalysis");
const {
    authenticateToken,
    requirePremium
} = require("../middleware/auth");

/*
 * Soil Intelligence is a GroWell Premium feature.
 *
 * The premium check runs server-side through requirePremium, so the
 * gate cannot be bypassed from the client. Unauthenticated callers get a
 * 401; authenticated free-tier callers get a 403 PREMIUM_REQUIRED.
 */
router.post(
    "/analyze",
    authenticateToken,
    requirePremium,
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
