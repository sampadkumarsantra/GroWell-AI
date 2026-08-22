const express = require("express");

const {
    fetchMarketData
} = require("../services/marketService");

const router = express.Router();
console.log("🔥 NEW MARKET ROUTER LOADED");

// =====================================================
// HEALTH CHECK
// =====================================================

router.get("/hello", (req, res) => {

    res.json({
        success: true,
        message: "GroWell Market API is working"
    });

});


// =====================================================
// LIVE MARKET DATA
// =====================================================

router.get("/analytics", async (req, res) => {

    try {

        const crop =
            req.query.crop || "Rice";

        console.log(
            `Fetching market data for: ${crop}`
        );


        const records =
            await fetchMarketData(crop);


        if (!records.length) {

            return res.status(404).json({

                success: false,

                message:
                    `No government market records found for ${crop}`,

                crop

            });

        }


        // =================================================
        // NORMALIZE RECORDS
        // =================================================

        const normalized =
            records
                .map(record => {

                    const minPrice =
                        Number(
                            record.min_price ??
                            record.Min_Price ??
                            0
                        );

                    const maxPrice =
                        Number(
                            record.max_price ??
                            record.Max_Price ??
                            0
                        );

                    const modalPrice =
                        Number(
                            record.modal_price ??
                            record.Modal_Price ??
                            0
                        );


                    return {

                        state:
                            record.state ||
                            record.State ||
                            "",

                        district:
                            record.district ||
                            record.District ||
                            "",

                        market:
                            record.market ||
                            record.Market ||
                            "",

                        commodity:
                            record.commodity ||
                            record.Commodity ||
                            crop,

                        variety:
                            record.variety ||
                            record.Variety ||
                            "",

                        grade:
                            record.grade ||
                            record.Grade ||
                            "",

                        date:
                            record.arrival_date ||
                            record.Arrival_Date ||
                            "",

                        minPrice,

                        maxPrice,

                        modalPrice,

                        arrivals:
                            Number(
                                record.arrivals ??
                                record.Arrivals ??
                                0
                            )

                    };

                })
                .filter(
                    record =>
                        record.modalPrice > 0
                );


        if (!normalized.length) {

            return res.status(404).json({

                success: false,

                message:
                    "Government API returned records, but no valid prices were found.",

                crop

            });

        }


        // =================================================
        // MARKET PRICE CALCULATIONS
        // =================================================

        const prices =
            normalized.map(
                record => record.modalPrice
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


        const bestMarket =
            normalized.reduce(
                (best, current) =>
                    current.modalPrice >
                    best.modalPrice
                        ? current
                        : best
            );


        const lowestMarket =
            normalized.reduce(
                (lowest, current) =>
                    current.modalPrice <
                    lowest.modalPrice
                        ? current
                        : lowest
            );


        // =================================================
        // PRICE SPREAD
        // =================================================

        const priceSpread =
            highestPrice -
            lowestPrice;


        // =================================================
        // VOLATILITY BETWEEN MARKETS
        // =================================================

        const variance =
            prices.reduce(
                (sum, price) =>
                    sum +
                    Math.pow(
                        price -
                        averagePrice,
                        2
                    ),
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


        let volatilityLevel =
            "Low";


        if (volatility >= 10) {

            volatilityLevel =
                "High";

        } else if (volatility >= 5) {

            volatilityLevel =
                "Moderate";

        }


        // =================================================
        // MARKET SIGNAL
        // =================================================

        let signal =
            "Neutral";


        if (
            bestMarket.modalPrice >
            averagePrice * 1.05
        ) {

            signal =
                "Bullish";

        } else if (
            lowestMarket.modalPrice <
            averagePrice * 0.95
        ) {

            signal =
                "Bearish";

        }


        // =================================================
        // RESPONSE
        // =================================================

        res.json({

            success: true,

            source:
                "data.gov.in",

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

                change:
                    0,

                direction:
                    "neutral",

                signal,

                volatility:
                    Number(
                        volatility.toFixed(2)
                    ),

                volatilityLevel,

                priceSpread:
                    Math.round(
                        priceSpread
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
                    bestMarket.maxPrice,

                arrivals:
                    bestMarket.arrivals

            },

            markets:
                normalized

        });

    } catch (error) {

        console.error(
            "MARKET API ERROR:",
            error.response?.data ||
            error.message
        );


        res.status(
            error.response?.status ||
            500
        ).json({

            success: false,

            message:
                "Unable to fetch government market data.",

            error:
                error.response?.data ||
                error.message

        });

    }

});

console.log(
    "🔥 MARKET ROUTES:",
    router.stack
        .filter(layer => layer.route)
        .map(layer => layer.route.path)
);
module.exports = router;