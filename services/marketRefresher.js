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

        // Agmarknet's own API is the primary source for the
        // sweep.
        const result =
            await sources.fetchAgmarknet(crop);

        const sourceLabel =
            "Agmarknet (api.agmarknet.gov.in)";

        const payload =
            buildAgmarknetResponse(
                crop,
                result.markets,
                {
                    source: sourceLabel,
                    basis:
                        "Market-level mandi prices",
                    sourceNote:
                        `Market-level mandi prices from Agmarknet, the Directorate of Marketing & Inspection's own record, as on ${result.asOn || "the latest trading day"}, covering ${result.states.length} state${result.states.length === 1 ? "" : "s"} (${result.states.join(", ")}). Mandis report through the day, so this is what had arrived by the time of the sweep.`
                }
            );

        await store.saveSnapshot(
            crop,
            payload,
            sourceLabel,
            result.asOn || null
        );

        logResult(
            crop,
            true,
            `${result.markets.length} mandi records via ${sourceLabel}`
        );

        return true;

    } catch (agmarknetError) {

        // Fall back in the same order the request route uses:
        // DOCA wholesale, then DOCA retail, then the mirror for
        // turmeric, which has no official line on any source. The
        // sweep still leaves a usable price behind for as many
        // crops as possible.
        const fallbacks = [
            {
                label: "DOCA all-India wholesale average",
                run: async () => {
                    const quote = await sources.fetchDoca(crop);
                    if (!quote) return null;
                    return {
                        payload: buildDocaResponse(quote),
                        asOn: quote.asOn || null
                    };
                }
            },
            {
                label: "DOCA all-India retail average",
                run: async () => {
                    const quote = await sources.fetchDocaRetail(crop);
                    if (!quote) return null;
                    return {
                        payload: buildDocaResponse(quote),
                        asOn: quote.asOn || null
                    };
                }
            },
            {
                label: "Agmarknet community mirror",
                run: async () => {
                    if (!sources.mirrorSupports(crop)) {
                        return null;
                    }
                    const result = await sources.fetchMandiMirror(crop);
                    return {
                        payload: buildAgmarknetResponse(
                            crop,
                            result.markets,
                            {
                                source: sources.mirrorSource,
                                basis: "Market-level mandi prices",
                                sourceNote:
                                    `Agmarknet publishes no ${crop.toLowerCase()} record and neither does DOCA, so these are the same mandi figures republished by a third-party mirror of Agmarknet, as on ${result.asOn || "the latest trading day"}, covering ${result.states.length} state${result.states.length === 1 ? "" : "s"} (${result.states.join(", ")}). The mirror is not an official source and its figures lag by days, so confirm the rate at your mandi before selling.`
                            }
                        ),
                        asOn: result.asOn || null
                    };
                }
            }
        ];

        for (const fallback of fallbacks) {

            try {

                const outcome = await fallback.run();

                if (!outcome) {
                    continue;
                }

                await store.saveSnapshot(
                    crop,
                    outcome.payload,
                    outcome.payload.source,
                    outcome.asOn
                );

                logResult(crop, true, fallback.label);

                return true;

            } catch (fallbackError) {
                // try the next source
            }
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