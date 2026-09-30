const express = require("express");

const sources = require("../services/marketSources");
const store = require("../services/marketStore");
const {
    buildAgmarknetResponse,
    buildDocaResponse
} = require("../services/marketResponse");

const router = express.Router();


// A stored snapshot is served for as long as one exists, but
// never as a current price: the response always carries the
// date it was recorded and is flagged stale. Dropping it after a
// few days just replaced a dated real price with a blank
// screen, which is worse for a farmer trying to decide whether
// to sell.
const SNAPSHOT_MAX_AGE_MS =
    365 * 24 * 60 * 60 * 1000;

// Agmarknet is slow to answer when it is degraded, and the page
// asks for twelve crops at once. A short in-process cache keeps
// a burst of traffic from turning into twelve upstream calls per
// farmer.
const LIVE_TTL_MS = 5 * 60 * 1000;

const liveCache = new Map();


function cacheKey(crop) {
    return String(crop).trim().toLowerCase();
}

function readLiveCache(crop) {

    const entry =
        liveCache.get(cacheKey(crop));

    if (!entry) {
        return null;
    }

    if (
        Date.now() - entry.fetchedAt > LIVE_TTL_MS
    ) {
        return null;
    }

    return entry.payload;
}

function writeLiveCache(crop, payload) {

    liveCache.set(cacheKey(crop), {
        payload,
        fetchedAt: Date.now()
    });
}


// =====================================================
// RESOLUTION ORDER
// =====================================================
//
// 1. Agmarknet gateway — live, market level (preferred)
// 2. Agmarknet direct  — live, market level, separate host
// 3. DOCA              — live, all-India average
// 4. Stored snapshot   — last good payload, marked stale
// 5. Unavailable       — only when no source has ever answered
//

async function resolveCrop(crop) {

    const cached = readLiveCache(crop);

    if (cached) {
        return { payload: cached, origin: "cache" };
    }

    // ------------------------------------------
    // 1. AGMARKNET
    // ------------------------------------------

    try {

        const markets =
            await sources.fetchAgmarknet(crop);

        const payload =
            buildAgmarknetResponse(
                crop,
                markets
            );

        writeLiveCache(crop, payload);

        store.saveSnapshot(
            crop,
            payload,
            payload.source,
            markets[0]?.date || null
        );

        return { payload, origin: "agmarknet" };

    } catch (agmarknetError) {

        // A breaker fast-fail is expected during an outage and
        // says nothing new, so it is not logged per crop.
        if (!agmarknetError.isUpstreamUnavailable) {
            console.warn(
                `⚠️  Agmarknet unavailable for ${crop}: ${agmarknetError.message}`
            );
        }
    }

    // ------------------------------------------
    // 2. AGMARKNET DIRECT API
    // ------------------------------------------
    //
    // Agmarknet's own host, which serves the same mandi prices
    // as the gateway above and stays up when the gateway is
    // down. It covers every crop, unlike DOCA.

    try {

        const markets =
            await sources.fetchAgmarknetDirect(
                crop
            );

        const payload =
            buildAgmarknetResponse(
                crop,
                markets.map((market) => ({
                    ...market,
                    variety:
                        market.variety || "",
                    grade:
                        market.grade || "",
                    date:
                        market.date || ""
                }))
            );

        writeLiveCache(crop, payload);

        store.saveSnapshot(
            crop,
            payload,
            payload.source,
            markets[0]?.date || null
        );

        return { payload, origin: "agmarknet-direct" };

    } catch (directError) {

        if (!directError.isUpstreamUnavailable) {
            console.warn(
                `⚠️  Agmarknet direct unavailable for ${crop}: ${directError.message}`
            );
        }
    }

    // ------------------------------------------
    // 3. DOCA
    // ------------------------------------------

    try {

        const quote =
            await sources.fetchDoca(crop);

        if (quote) {

            const payload =
                buildDocaResponse(quote);

            writeLiveCache(crop, payload);

            store.saveSnapshot(
                crop,
                payload,
                payload.source,
                quote.asOn || null
            );

            return { payload, origin: "doca" };
        }

    } catch (docaError) {

        console.warn(
            `⚠️  DOCA unavailable for ${crop}: ${docaError.message}`
        );
    }

    // ------------------------------------------
    // 4. STORED SNAPSHOT
    // ------------------------------------------

    const snapshot =
        await store.readSnapshot(crop);

    if (snapshot) {

        const age =
            Date.now() -
            new Date(
                snapshot.capturedAt
            ).getTime();

        if (age <= SNAPSHOT_MAX_AGE_MS) {

            const recordedOn =
                snapshot.priceDate ||
                new Date(
                    snapshot.capturedAt
                ).toLocaleDateString("en-IN");

            console.log(
                `🗄️  Serving stored snapshot for ${crop} (recorded ${recordedOn})`
            );

            return {
                payload: {
                    ...snapshot.payload,
                    stale: true,
                    recordedOn,
                    message:
                        `The live government feed is unavailable. These are the last prices GroWell recorded for ${crop}, as on ${recordedOn} from ${snapshot.source}. Check with your mandi before selling.`
                },
                origin: "snapshot"
            };
        }
    }

    return { payload: null, origin: "none" };
}


// =====================================================
// ROUTES
// =====================================================

router.get("/hello", (req, res) => {
    res.json({
        success: true,
        message: "GroWell Market API is working"
    });
});


router.get("/analytics", async (req, res) => {

    const crop = String(
        req.query.crop || "Rice"
    ).trim();

    try {

        const { payload } =
            await resolveCrop(crop);

        if (!payload) {

            return res.json({
                success: false,
                available: false,
                crop,
                source:
                    "Agmarknet (data.gov.in)",
                message:
                    `No government price record was available for ${crop} from any source.`,
                records: []
            });
        }

        return res.json(payload);

    } catch (error) {

        console.error(
            "❌ MARKET ERROR:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch government market data.",
            error: error.message
        });
    }
});


module.exports = router;