const express = require("express");

const sources = require("../services/marketSources");
const store = require("../services/marketStore");
const portal = require("../services/agmarknetPortal");
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
    // Read from Agmarknet's own API, which is the authority
    // behind every other source in this list.

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


/*
 * =====================================================
 * AGMARKNET PORTAL
 * =====================================================
 *
 * The whole published picture for every crop the app shows, in
 * one request.
 *
 * Kept apart from /analytics on purpose. That route answers one
 * crop with one national average, which is the right shape for a
 * chat reply and a price line. A portal needs the shape of the
 * market underneath it: states, districts, mandis, varieties,
 * arrivals and how the prices spread. Re-asking /analytics once
 * per crop cannot produce that, because each call re-derives the
 * same average and drops the rows holding the detail.
 *
 * The answer is cached upstream, so opening the page repeatedly
 * costs one grouping over rows already held rather than a fresh
 * walk of a shared government host.
 */

router.get("/portal", async (req, res) => {

    try {

        const payload = await portal.buildPortal();

        return res.json({
            success: true,
            ...payload
        });

    } catch (error) {

        /*
         * The portal is a read-only view, so a failure here is
         * reported in the body rather than as a status code.
         * A 500 would replace the page with a browser error and
         * lose the fact that the per-crop prices on the same
         * screen may still be perfectly good.
         */
        console.error(
            "❌ PORTAL ERROR:",
            error.message
        );

        return res.json({
            success: false,
            available: false,
            source: portal.SOURCE,
            message:
                "The full market report could not be assembled just now. The per-crop prices on this page come from a separate feed and may still be current.",
            crops: []
        });

    }

});


/*
 * History for one crop.
 *
 * Split out from the portal payload on purpose. Building a
 * six-day series means six days of state reports, and the portal
 * itself needs only the most recent. Pulling the whole series for
 * all twelve crops on every page open would ask the upstream for
 * seventy-two reports to draw one line the reader has not
 * scrolled to yet.
 */

router.get("/portal/history", async (req, res) => {

    const crop = String(
        req.query.crop || ""
    ).trim();

    if (!crop || !portal.hasCrop(crop)) {
        return res.json({
            success: false,
            crop,
            history: [],
            message: `Agmarknet publishes no ${crop || "named"} line, so there is no official price history for it.`
        });
    }

    try {

        const history = await portal.fetchCropHistory(
            crop,
            Number(req.query.days) ||
                portal.HISTORY_DAYS
        );

        return res.json({
            success: true,
            crop,
            unit: "Rs. per quintal",
            history
        });

    } catch (error) {

        console.error(
            `❌ PORTAL HISTORY ERROR (${crop}):`,
            error.message
        );

        return res.json({
            success: false,
            crop,
            history: [],
            message:
                "The price history could not be loaded just now."
        });

    }

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
                source: AGMARKNET_SOURCE,
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

        /*
         * A source failing is an ordinary event and each one is
         * already caught on its own. Reaching here means something
         * unexpected threw, and the one thing that must not happen
         * is a 500: a farmer who taps a crop gets an error page
         * instead of a price, and a whole outage then reads as a
         * broken app rather than a temporary gap.
         *
         * So the stored copy is tried once more. It is a real
         * price with the date it was recorded, which is the most
         * useful thing that can honestly be shown. Only when there
         * is nothing stored at all does this report unavailable.
         */
        try {

            const snapshot =
                await store.readSnapshot(crop);

            if (snapshot) {

                const recordedOn =
                    snapshot.priceDate ||
                    new Date(
                        snapshot.capturedAt
                    ).toLocaleDateString("en-IN");

                return res.json({
                    ...snapshot.payload,
                    stale: true,
                    recordedOn,
                    message:
                        `The live feed could not be reached just now. These are the last prices GroWell recorded for ${crop}, as on ${recordedOn} from ${snapshot.source}. Check with your mandi before selling.`
                });

            }

        } catch (storeError) {

            console.error(
                "❌ SNAPSHOT FALLBACK FAILED:",
                storeError.message
            );

        }

        return res.json({
            success: false,
            available: false,
            crop,
            source: AGMARKNET_SOURCE,
            message:
                `No government price record was available for ${crop} from any source.`,
            records: []
        });

    }
});


module.exports = router;