const sources = require("./marketSources");
const store = require("./marketStore");
const {
    buildAgmarknetResponse,
    buildDocaResponse
} = require("./marketResponse");


/*
 * =====================================================
 * BACKGROUND REFRESHER
 * =====================================================
 *
 * Captures every crop on a schedule, quietly, so the database
 * holds a current price before a farmer ever asks for one.
 *
 * Without this the stored snapshot only ever gets written in
 * response to a page view, which means the first farmer to
 * open Analytics during a government outage still sees
 * nothing. Proactively refreshing means the outage is already
 * covered by the time anyone looks.
 *
 */

const INTERVAL_MS = 2 * 60 * 60 * 1000;

// Give the server a moment to finish booting and accepting
// traffic before the first sweep.
const STARTUP_DELAY_MS = 30 * 1000;

let timer = null;
let running = false;


function logResult(crop, ok, detail) {

    if (ok) {
        console.log(
            `   ✅ ${crop}: ${detail}`
        );
    } else {
        console.log(
            `   ⏭️  ${crop}: ${detail}`
        );
    }
}


/**
 * Refreshes one crop and stores whatever the sources can
 * currently offer, using the same payload the request path
 * returns so a stored snapshot can be served verbatim.
 *
 * A crop that no source tracks is left alone rather than
 * written as empty, so a previously good snapshot for it
 * survives a bad sweep.
 */
async function refreshCrop(crop) {

    try {

        const markets =
            await sources.fetchAgmarknet(crop);

        const payload =
            buildAgmarknetResponse(
                crop,
                markets
            );

        await store.saveSnapshot(
            crop,
            payload,
            payload.source,
            markets[0]?.date || null
        );

        logResult(
            crop,
            true,
            `${markets.length} mandi records`
        );

        return true;

    } catch (agmarknetError) {

        // Fall back to DOCA for the crops it tracks, so the
        // sweep still leaves a usable price behind.
        try {

            const quote =
                await sources.fetchDoca(crop);

            if (quote) {

                const payload =
                    buildDocaResponse(quote);

                await store.saveSnapshot(
                    crop,
                    payload,
                    payload.source,
                    quote.asOn || null
                );

                logResult(
                    crop,
                    true,
                    `DOCA all-India average ₹${quote.price}`
                );

                return true;
            }

        } catch (docaError) {
            // fall through to the combined report
        }

        logResult(
            crop,
            false,
            agmarknetError.message
        );

        return false;
    }
}


async function refreshAll() {

    if (running) {
        return;
    }

    running = true;

    console.log("");
    console.log("======================================");
    console.log("🌾 MARKET REFRESH SWEEP");
    console.log("======================================");

    for (const crop of sources.CROPS) {
        await refreshCrop(crop);
    }

    console.log("======================================");
    console.log("");

    running = false;
}


function start() {

    if (timer) {
        return;
    }

    setTimeout(() => {

        refreshAll().catch((error) =>
            console.warn(
                "⚠️  Market sweep failed:",
                error.message
            )
        );

        timer = setInterval(
            () => {
                refreshAll().catch(
                    (error) =>
                        console.warn(
                            "⚠️  Market sweep failed:",
                            error.message
                        )
                );
            },
            INTERVAL_MS
        );

        // A repeating sweep must not hold the process open.
        if (timer.unref) {
            timer.unref();
        }

    }, STARTUP_DELAY_MS);
}


function stop() {

    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}


module.exports = {
    start,
    stop,
    refreshAll,
    refreshCrop
};