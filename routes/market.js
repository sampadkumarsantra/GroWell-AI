const express = require("express");
const router = express.Router();

const marketService = require("../services/marketService");

// Complete market summary straight from data.gov.in
router.get("/summary", async (req, res) => {
    try {
        const result = await marketService.getMarketSummary();
        res.json(result);
    } catch (err) {
        console.error("Market summary error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// All commodities list from data.gov.in with search & category filtering
router.get("/commodities", async (req, res) => {
    try {
        const query = (req.query.search || req.query.q || "").trim();
        const category = (req.query.category || "").trim();
        const result = await marketService.getCommodityList(query, category);
        res.json(result);
    } catch (err) {
        console.error("Market commodities error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Monthly day-by-day price timeline ("price with days in month") and reporting mandis
router.get("/history", async (req, res) => {
    try {
        const commodity = (req.query.commodity || "").trim();
        const month = req.query.month !== undefined ? parseInt(req.query.month, 10) : undefined;
        const year = req.query.year !== undefined ? parseInt(req.query.year, 10) : undefined;
        const state = (req.query.state || "").trim();
        const market = (req.query.market || req.query.mandi || "").trim();

        if (!commodity) {
            return res.status(400).json({
                success: false,
                message: "Commodity is required."
            });
        }

        const result = await marketService.getHistory({
            commodity,
            month,
            year,
            state,
            mandi: market
        });

        res.json(result);
    } catch (err) {
        console.error("Market history error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// All raw/normalized records straight up from data.gov.in with pin-point details
router.get("/records", async (req, res) => {
    try {
        const {
            commodity = "",
            state = "",
            district = "",
            market = "",
            variety = "",
            grade = "",
            search = "",
            page = 1,
            limit = 50,
            sortBy = "modalPrice",
            sortOrder = "desc"
        } = req.query;

        const result = await marketService.getRawRecords({
            commodity,
            state,
            district,
            market,
            variety,
            grade,
            search,
            page,
            limit,
            sortBy,
            sortOrder
        });

        res.json(result);
    } catch (err) {
        console.error("Market records error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// National stats for a commodity
router.get("/national", async (req, res) => {
    try {
        const commodity = (req.query.commodity || "").trim();

        if (!commodity) {
            return res.status(400).json({
                success: false,
                message: "Commodity is required."
            });
        }

        const result = await marketService.getNationalStats({ commodity });
        res.json(result);
    } catch (err) {
        console.error("Market national stats error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// Force refresh data from data.gov.in
router.post("/refresh", async (req, res) => {
    try {
        await marketService.fetchAgmarknetRecords(true);
        const summary = await marketService.getMarketSummary();
        res.json({
            success: true,
            message: "Market data successfully refreshed from data.gov.in.",
            overview: summary.overview
        });
    } catch (err) {
        console.error("Market refresh error:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;
