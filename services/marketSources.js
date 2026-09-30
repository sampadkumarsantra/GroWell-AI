const axios = require("axios");

const doca = require("./docaService");
const agmarknetDirect =
    require("./agmarknetDirectService");
const mandiMirror =
    require("./mandiMirrorService");


/*
 * =====================================================
 * MARKET SOURCES
 * =====================================================
 *
 * Two independent government sources, tried in order:
 *
 *   1. Agmarknet via data.gov.in — market-level prices per
 *      mandi. This is the real, preferred number.
 *   2. DOCA Price Monitoring System — all-India average
 *      wholesale prices. A different measurement from a
 *      different ministry, used only when Agmarknet cannot be
 *      reached, and always labelled as such.
 *
 * A price is only ever reported from one of these. Nothing is
 * estimated, carried across from another crop, or invented.
 *
 */

// The commodities the app displays. Kept in step with the
// client-side crop list; the two are not shared because the
// client also carries demand and supply copy for each crop.
const CROPS = [
    "Rice",
    "Wheat",
    "Maize",
    "Potato",
    "Tomato",
    "Onion",
    "Groundnut",
    "Mustard",
    "Soybean",
    "Chilli",
    "Cotton",
    "Turmeric"
];

const AGMARKNET_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";


// =====================================================
// CIRCUIT BREAKER
// =====================================================
//
// The data.gov.in gateway does two different things when it is
// broken: it either answers 502/503 quickly, or it accepts the
// connection and then hangs. The hanging case is why the page
// used to take 25 seconds per crop to give up.
//
// Without a breaker every one of the twelve parallel requests
// pays that full timeout before falling through to a source
// that would have answered instantly. The breaker stops
// paying for the same failure repeatedly, so the fallback
// chain is reached immediately.
//

const FAILURES_BEFORE_OPEN = 2;
const BREAKER_COOLDOWN_MS = 10 * 60 * 1000;

// Long enough to fail fast, short enough that a farmer waiting
// on the page is not left staring at a spinner.
const AGMARKNET_TIMEOUT_MS = 6000;

let breaker = {
    failures: 0,
    openUntil: 0
};


function breakerIsOpen() {
    return Date.now() < breaker.openUntil;
}


function recordSuccess() {
    breaker.failures = 0;
    breaker.openUntil = 0;
}


function recordFailure() {

    breaker.failures += 1;

    if (
        breaker.failures >=
        FAILURES_BEFORE_OPEN
    ) {

        // Only the first request after the window probes the
        // upstream; every other request during the window
        // returns without touching the network at all.
        breaker.openUntil =
            Date.now() +
            BREAKER_COOLDOWN_MS;
    }
}


/**
 * Thrown when the upstream is known to be down. The route
 * treats this as a fast miss and moves to the next source.
 */
class UpstreamUnavailableError extends Error {

    constructor(message) {
        super(message);
        this.name = "UpstreamUnavailableError";
        this.isUpstreamUnavailable = true;
    }
}


function breakerState() {

    return {
        open: breakerIsOpen(),
        failures: breaker.failures,
        openUntil: breaker.openUntil
    };
}


/**
 * Fetches Agmarknet mandi records for one crop. Returns an
 * array of normalised market rows, or throws when the feed is
 * unreachable or has nothing for that crop.
 */
async function fetchAgmarknet(crop) {

    if (breakerIsOpen()) {
        throw new UpstreamUnavailableError(
            "data.gov.in is in a failure cooldown."
        );
    }

    const apiKey =
        process.env.DATA_GOV_API_KEY;

    if (!apiKey) {
        throw new Error(
            "DATA_GOV_API_KEY is not configured."
        );
    }

    let records;

    try {

        const response =
            await axios.get(AGMARKNET_URL, {
                params: {
                    "api-key": apiKey,
                    format: "json",
                    limit: 100,
                    "filters[commodity]": crop
                },
                timeout: AGMARKNET_TIMEOUT_MS
            });

        records = response.data?.records || [];

    } catch (error) {

        recordFailure();

        throw error;
    }

    const markets = records
        .map((record) => ({

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
                Number(record.min_price) || 0,

            maxPrice:
                Number(record.max_price) || 0,

            modalPrice:
                Number(record.modal_price) || 0
        }))
        .filter(
            (record) =>
                record.modalPrice > 0
        );

    if (markets.length === 0) {
        throw new Error(
            `Agmarknet returned no priced records for ${crop}.`
        );
    }

    recordSuccess();

    return markets;
}


/**
 * Fetches the DOCA all-India average wholesale price for one
 * crop. Returns null when DOCA does not track that crop.
 */
async function fetchDoca(crop) {
    return doca.fetchCropWholesale(crop);
}


/**
 * Fetches the DOCA all-India average retail price for one crop,
 * converted to a quintal. Returns null when DOCA does not price
 * that crop at retail.
 *
 * Only a handful of crops have this, and it is a retail rate
 * rather than a wholesale one, so it is used strictly as a last
 * resort after both Agmarknet hosts and the wholesale figures
 * have all failed. The response reports its own basis.
 */
async function fetchDocaRetail(crop) {
    return doca.fetchCropRetail(crop);
}


/**
 * Fetches mandi-level prices from Agmarknet's own API, which is
 * a different host from the data.gov.in gateway and stays up
 * when the gateway is down. Same authoritative source, same
 * market-level figures, covering every crop.
 */
async function fetchAgmarknetDirect(crop) {
    return agmarknetDirect.fetchCrop(crop);
}


/**
 * Fetches market-level prices from the community Agmarknet
 * mirror. Consulted only once both official Agmarknet hosts
 * and DOCA have all failed, so it covers the crops DOCA cannot
 * price honestly during a government outage.
 */
async function fetchMandiMirror(crop) {
    return mandiMirror.fetchCrop(crop);
}


module.exports = {
    CROPS,
    fetchAgmarknet,
    fetchAgmarknetDirect,
    fetchDoca,
    fetchDocaRetail,
    fetchMandiMirror,
    docaSupports: doca.supports,
    docaSupportsRetail: doca.supportsRetail,
    mirrorSupports: mandiMirror.supports,
    mirrorSource: mandiMirror.MIRROR_SOURCE,
    breakerState,
    UpstreamUnavailableError,
    AGMARKNET_URL
};