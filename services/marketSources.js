const agmarknet = require("./agmarknetService");
const doca = require("./docaService");
const mandiMirror = require("./mandiMirrorService");


/*
 * =====================================================
 * MARKET SOURCES
 * =====================================================
 *
 * Four sources, tried in order. Only the first that can answer
 * with a real, honest price is used.
 *
 *   1. Agmarknet — the authority. Market-level prices per
 *      mandi, read from Agmarknet's own API.
 *   2. DOCA wholesale — all-India average, a different
 *      measurement from a different ministry.
 *   3. DOCA retail — same, for the few crops DOCA only prices
 *      at retail.
 *   4. Agmarknet mirror — a community republication of the same
 *      Agmarknet records, reached only when Agmarknet itself
 *      has nothing. It exists for turmeric, which Agmarknet
 *      publishes no line for at all.
 *
 * A price is only ever reported from one of these. Nothing is
 * estimated, carried across from a similar commodity, or
 * invented.
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


/**
 * Fetches market-level mandi prices for one crop from
 * Agmarknet. Throws when the upstream is unreachable or has
 * nothing for that crop.
 */
async function fetchAgmarknet(crop) {
    return agmarknet.fetchCrop(crop);
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
 * resort after Agmarknet and the wholesale figures have all
 * failed. The response reports its own basis.
 */
async function fetchDocaRetail(crop) {
    return doca.fetchCropRetail(crop);
}


/**
 * Fetches market-level prices from the community mirror of the
 * same Agmarknet records. Consulted only after Agmarknet has
 * nothing, which in practice means turmeric.
 */
async function fetchMandiMirror(crop) {
    return mandiMirror.fetchCrop(crop);
}


module.exports = {
    CROPS,
    fetchAgmarknet,
    fetchDoca,
    fetchDocaRetail,
    fetchMandiMirror,
    agmarknetSupports: agmarknet.supports,
    agmarknetBreakerState: agmarknet.breakerState,
    UpstreamUnavailableError:
        agmarknet.UpstreamUnavailableError,
    docaSupports: doca.supports,
    docaSupportsRetail: doca.supportsRetail,
    mirrorSupports: mandiMirror.supports,
    mirrorSource: mandiMirror.MIRROR_SOURCE
};