const express = require("express");
const router = express.Router();

const marketService = require("../services/marketService");

// Curated commodity list shown on the GroWell Market section.
router.get("/commodities", async (req, res) => {

    try {

        const result = await marketService.getCommodityList();

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// Daily mandi price series for a commodity.
// Query params:
//   commodity - commodity name (required)
//   days      - number of days of history (default 30)
//   state     - optional state filter
//   market    - optional mandi filter
router.get("/history", async (req, res) => {

    try {

        const commodity = (req.query.commodity || "").trim();

        const days = parseInt(req.query.days, 10) || 30;

        const state = (req.query.state || "").trim();

        const market = (req.query.market || "").trim();

        if (!commodity) {
            return res.status(400).json({
                success: false,
                message: "Commodity is required."
            });
        }

        const result = await marketService.getHistory({
            commodity,
            days,
            state,
            mandi: market
        });

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// All India (national) market statistics for a commodity.
router.get("/national", async (req, res) => {

    try {

        const commodity = (req.query.commodity || "").trim();

        const days = parseInt(req.query.days, 10) || 30;

        if (!commodity) {
            return res.status(400).json({
                success: false,
                message: "Commodity is required."
            });
        }

        const result = await marketService.getNationalStats({
            commodity,
            days
        });

        res.json(result);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;
