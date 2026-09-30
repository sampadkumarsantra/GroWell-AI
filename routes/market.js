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


// Named in the response so a farmer can see which body
// published the figure. Agmarknet is the authority; DOCA and
// the mirror each say so separately.
const AGMARKNET_SOURCE =
    "Agmarknet (Directorate of Marketing & Inspection)";


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
// 1. Agmarknet           — live, market level (preferred)
// 2. DOCA wholesale      — live, all-India average
// 3. DOCA retail         — live, all-India average, few crops
// 4. Agmarknet mirror    — live, market level, third-party
// 5. Stored snapshot     — last good payload, marked stale
// 6. Unavailable         — only when no source has ever answered
//

async function resolveCrop(crop) {

    const cached = readLiveCache(crop);

    if (cached) {
        return { payload: cached, origin: "cache" };
    }

    // ------------------------------------------
    // 1. AGMARKNET
    // ------------------------------------------
    //
    // Read from Agmarknet's own API rather than through the
    // data.gov.in gateway, which is a proxy in front of these
    // same records and one that fails on its own schedule.

    try {

        const result =
            await sources.fetchAgmarknet(crop);

        const payload =
            buildAgmarknetResponse(
                crop,
                result.markets,
                {
                    source: AGMARKNET_SOURCE,
                    basis: "Market-level mandi prices",
                    sourceNote:
                        `Market-level mandi prices from Agmarknet, the Directorate of Marketing & Inspection's own record, as on ${result.asOn || "the latest trading day"}, covering ${result.states.length} state${result.states.length === 1 ? "" : "s"} (${result.states.join(", ")}). Mandis report through the day, so this is what had arrived by the time of the fetch.`
                }
            );

        writeLiveCache(crop, payload);

        store.saveSnapshot(
            crop,
            payload,
            payload.source,
            result.asOn || null
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
    // 2. DOCA
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
    // 3. DOCA RETAIL
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
    // 4. AGMARKNET MIRROR
    // ------------------------------------------
    //
    // A community republication of the same Agmarknet mandi
    // records, kept as the one fill-in for turmeric.
    //
    // Turmeric is the single reason this source is here. Agmarknet
    // publishes no turmeric line at all, and DOCA does not either,
    // so without the mirror turmeric would have no price on any
    // day. Every other crop is answered by Agmarknet itself, so
    // for those the mirror is not consulted and never appears in
    // the response.
    //
    // It is not an official source and its figures lag by days, so
    // the response carries its own source label and the arrival
    // date the mirror actually recorded.

    // The mirror only republishes a handful of commodities, and
    // asking it for anything else only spends its rate limit.
    if (sources.mirrorSupports(crop)) {

        try {

            const result =
                await sources.fetchMandiMirror(
                    crop
                );

            const payload =
                buildAgmarknetResponse(
                    crop,
                    result.markets,
                    {
                        source: sources.mirrorSource,
                        basis:
                            "Market-level mandi prices",
                        sourceNote:
                            `Agmarknet publishes no ${crop.toLowerCase()} record and neither does DOCA, so these are the same mandi figures republished by a third-party mirror of Agmarknet, as on ${result.asOn || "the latest trading day"}, covering ${result.states.length} state${result.states.length === 1 ? "" : "s"} (${result.states.join(", ")}). The mirror is not an official source and its figures lag by days, so confirm the rate at your mandi before selling.`
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
    }

    // ------------------------------------------
    // 5. STORED SNAPSHOT
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