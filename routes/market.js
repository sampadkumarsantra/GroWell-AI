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
// 3. DOCA wholesale    — live, all-India average
// 4. DOCA retail       — live, all-India average, few crops
// 5. Agmarknet mirror  — live, market level, third-party
// 6. Stored snapshot   — last good payload, marked stale
// 7. Unavailable       — only when no source has ever answered
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
    // 4. DOCA RETAIL
    // ------------------------------------------
    //
    // A last resort for the crops DOCA only prices at retail.
    // The response is built with its own retail basis, so the
    // figure is never read as a wholesale mandi rate.

    try {

        const quote =
            await sources.fetchDocaRetail(crop);

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

            return {
                payload,
                origin: "doca-retail"
            };
        }

    } catch (retailError) {

        console.warn(
            `⚠️  DOCA retail unavailable for ${crop}: ${retailError.message}`
        );
    }

    // ------------------------------------------
    // 5. AGMARKNET MIRROR
    // ------------------------------------------
    //
    // A community mirror of the same Agmarknet mandi records,
    // on infrastructure separate from both official hosts. It
    // exists to cover an outage in which both Agmarknet hosts
    // and DOCA are down at once, which is the one case where
    // maize, groundnut, mustard, soybean, cotton and turmeric
    // would otherwise have no price at all.
    //
    // It is placed after the official sources on purpose: it is
    // never consulted while Agmarknet is answering, so it
    // disappears from the response as soon as the outage ends.
    // The response carries its own source label and the arrival
    // date the mirror actually recorded, because those prices
    // lag the current day.

    try {

        const result =
            await sources.fetchMandiMirror(crop);

        const payload =
            buildAgmarknetResponse(
                crop,
                result.markets,
                {
                    source:
                        sources.mirrorSource,
                    basis:
                        "Market-level mandi prices",
                    sourceNote:
                        `The official Agmarknet feeds are unavailable right now, so these are the same mandi records republished by a third-party mirror, as on ${result.asOn || "the latest trading day"}, covering ${result.states.length} state${result.states.length === 1 ? "" : "s"} (${result.states.join(", ")}). The mirror is not an official source and its figures lag by days, so confirm the rate at your mandi before selling.`
                }
            );

        writeLiveCache(crop, payload);

        store.saveSnapshot(
            crop,
            payload,
            payload.source,
            result.asOn || null
        );

        return { payload, origin: "mirror" };

    } catch (mirrorError) {

        console.warn(
            `⚠️  Mandi mirror unavailable for ${crop}: ${mirrorError.message}`
        );
    }

    // ------------------------------------------
    // 6. STORED SNAPSHOT
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