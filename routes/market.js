const express = require("express");
const axios = require("axios");

const router = express.Router();

const DATA_GOV_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

console.log("🔥 MARKET ROUTER LOADED");

// --------------------------------------------------
// TEST
// --------------------------------------------------

router.get("/hello", (req, res) => {
    res.json({
        success: true,
        message: "GroWell Market API is working"
    });
});

// --------------------------------------------------
// MARKET ANALYTICS
// --------------------------------------------------

router.get("/analytics", async (req, res) => {

    try {

        const crop = String(
            req.query.crop || "Rice"
        ).trim();

        console.log("");
        console.log("=================================");
        console.log("🌾 MARKET ANALYTICS");
        console.log("🌾 CROP:", crop);
        console.log("=================================");

        // ------------------------------------------
        // FETCH SPECIFIC COMMODITY
        // ------------------------------------------

        const response = await axios.get(
            DATA_GOV_URL,
            {
                params: {
                    "api-key":
                        process.env.DATA_GOV_API_KEY,

                    format: "json",

                    limit: 100,

                    "filters[commodity]": crop
                },

                timeout: 30000
            }
        );

        console.log(
            "📡 DATA.GOV STATUS:",
            response.status
        );

        const records =
            response.data?.records || [];

        console.log(
            `📊 ${crop} RECORDS:`,
            records.length
        );

        // ------------------------------------------
        // NO DATA
        // ------------------------------------------

        if (records.length === 0) {

            console.log(
                `⚠️ NO CURRENT DATA FOR ${crop}`
            );

            return res.json({

                success: false,

                available: false,

                crop,

                message:
                    `No current government mandi records were found for ${crop}.`,

                source: "data.gov.in",

                records: []

            });
        }

        // ------------------------------------------
        // NORMALIZE RECORDS
        // ------------------------------------------

        const markets = records
            .map(record => ({

                state:
                    record.state || "",

                district:
                    record.district || "",

                market:
                    record.market || "",

                commodity:
                    record.commodity || crop,

                variety:
                    record.variety || "",

                grade:
                    record.grade || "",

                date:
                    record.arrival_date || "",

                minPrice:
                    Number(
                        record.min_price
                    ) || 0,

                maxPrice:
                    Number(
                        record.max_price
                    ) || 0,

                modalPrice:
                    Number(
                        record.modal_price
                    ) || 0

            }))
            .filter(
                record =>
                    record.modalPrice > 0
            );

        console.log(
            "💰 VALID PRICE RECORDS:",
            markets.length
        );

        // ------------------------------------------
        // NO VALID PRICES
        // ------------------------------------------

        if (markets.length === 0) {

            return res.json({

                success: false,

                available: false,

                crop,

                message:
                    `Government records for ${crop} contain no valid prices.`,

                source: "data.gov.in",

                records: []

            });
        }

        // ------------------------------------------
        // PRICE CALCULATIONS
        // ------------------------------------------

        const prices =
            markets.map(
                market =>
                    market.modalPrice
            );

        const highestPrice =
            Math.max(...prices);

        const lowestPrice =
            Math.min(...prices);

        const averagePrice =
            prices.reduce(
                (sum, price) =>
                    sum + price,
                0
            ) / prices.length;

        // ------------------------------------------
        // BEST MARKET
        // ------------------------------------------

        const bestMarket =
            markets.reduce(
                (best, current) => {

                    return current.modalPrice >
                        best.modalPrice
                        ? current
                        : best;

                }
            );

        // ------------------------------------------
        // VOLATILITY
        // ------------------------------------------

        const variance =
            prices.reduce(
                (sum, price) => {

                    return (
                        sum +
                        Math.pow(
                            price -
                            averagePrice,
                            2
                        )
                    );

                },
                0
            ) / prices.length;

        const standardDeviation =
            Math.sqrt(variance);

        const volatility =
            averagePrice > 0
                ? (
                    standardDeviation /
                    averagePrice
                ) * 100
                : 0;

        let volatilityLevel = "Low";

        if (volatility >= 10) {

            volatilityLevel = "High";

        } else if (volatility >= 5) {

            volatilityLevel = "Moderate";

        }

        // ------------------------------------------
        // RESPONSE
        // ------------------------------------------

        return res.json({

            success: true,

            available: true,

            source: "data.gov.in",

            crop,

            updatedAt:
                new Date().toISOString(),

            summary: {

                price:
                    Math.round(
                        bestMarket.modalPrice
                    ),

                averagePrice:
                    Math.round(
                        averagePrice
                    ),

                highestPrice:
                    Math.round(
                        highestPrice
                    ),

                lowestPrice:
                    Math.round(
                        lowestPrice
                    ),

                volatility:
                    Number(
                        volatility.toFixed(2)
                    ),

                volatilityLevel,

                priceSpread:
                    Math.round(
                        highestPrice -
                        lowestPrice
                    )

            },

            bestMarket: {

                market:
                    bestMarket.market,

                district:
                    bestMarket.district,

                state:
                    bestMarket.state,

                modalPrice:
                    bestMarket.modalPrice,

                minPrice:
                    bestMarket.minPrice,

                maxPrice:
                    bestMarket.maxPrice

            },

            markets

        });

    } catch (error) {

        console.error(
            "❌ MARKET ERROR:"
        );

        console.error(
            error.response?.data ||
            error.message
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch government market data.",

            error:
                error.response?.data ||
                error.message

        });

    }

});

module.exports = router;