const express = require("express");
const axios = require("axios");

const router = express.Router();

const DATA_GOV_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

// A snapshot older than this is too old to present as today's
// price — the UI goes back to "Unavailable" instead of showing
// an obsolete number as if it were current.
const STALE_MAX_AGE_MS =
    3 * 24 * 60 * 60 * 1000;

console.log("🔥 MARKET ROUTER LOADED");


// =====================================================
// CACHE — LAST GOOD PRICES PER CROP
//
// The government feed is frequently down or throttled. On a
// failure we keep serving the last successful snapshot for a
// few days instead of showing "Unavailable". The response is
// flagged `stale` so the UI can label it honestly.
// =====================================================

const marketCache = new Map();

function cacheKey(crop) {
    return String(crop).trim().toLowerCase();
}

function cacheResponse(crop, payload) {
    marketCache.set(cacheKey(crop), {
        payload,
        cachedAt: new Date().toISOString()
    });
}

function cachedResponse(crop) {

    const entry =
        marketCache.get(cacheKey(crop));

    if (!entry) {
        return null;
    }

    const age =
        Date.now() -
        new Date(entry.cachedAt).getTime();

    if (age > STALE_MAX_AGE_MS) {
        return null;
    }

    return entry.payload;
}


// =====================================================
// RESPONSE BUILDER
// =====================================================

function buildMarketResponse(crop, markets) {

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

    const bestMarket =
        markets.reduce(
            (best, current) => {

                return current.modalPrice >
                    best.modalPrice
                    ? current
                    : best;

            }
        );

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

    return {
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
    };
}


function unavailableResponse(
    crop,
    message
) {

    return {
        success: false,
        available: false,
        crop,
        message,
        source: "data.gov.in",
        records: []
    };
}


function staleResponse(crop, message) {

    const stale = cachedResponse(crop);

    if (!stale) {
        return null;
    }

    return {
        ...stale,
        stale: true,
        message
    };
}


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

    const crop = String(
        req.query.crop || "Rice"
    ).trim();

    try {

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
        // NO LIVE DATA — FALL BACK TO CACHE
        // ------------------------------------------

        if (markets.length === 0) {

            const stale = staleResponse(
                crop,
                "The government market data service returned no records right now. Showing the last known prices."
            );

            if (stale) {

                console.log(
                    `⚠️ USING CACHED (STALE) DATA FOR ${crop}`
                );

                return res.json(stale);

            }

            console.log(
                `⚠️ NO CURRENT DATA FOR ${crop}`
            );

            return res.json(
                unavailableResponse(
                    crop,
                    `No current government mandi records were found for ${crop}.`
                )
            );

        }

        // ------------------------------------------
        // LIVE DATA AVAILABLE — BUILD AND CACHE
        // ------------------------------------------

        const payload =
            buildMarketResponse(
                crop,
                markets
            );

        cacheResponse(crop, payload);

        return res.json(payload);

    } catch (error) {

        console.error(
            "❌ MARKET ERROR:",
            error.response?.data ||
            error.message
        );

        // ------------------------------------------
        // UPSTREAM UNREACHABLE — FALL BACK TO CACHE
        // ------------------------------------------

        const stale = staleResponse(
            crop,
            "The government market data service is unreachable right now. Showing the last known prices."
        );

        if (stale) {

            console.log(
                `⚠️ USING CACHED (STALE) DATA FOR ${crop}`
            );

            return res.json(stale);

        }

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