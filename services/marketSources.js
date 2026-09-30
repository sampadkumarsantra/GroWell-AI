const axios = require("axios");

const doca = require("./docaService");


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


/**
 * Fetches Agmarknet mandi records for one crop. Returns an
 * array of normalised market rows, or throws when the feed is
 * unreachable or has nothing for that crop.
 */
async function fetchAgmarknet(crop) {

    const apiKey =
        process.env.DATA_GOV_API_KEY;

    if (!apiKey) {
        throw new Error(
            "DATA_GOV_API_KEY is not configured."
        );
    }

    const response = await axios.get(
        AGMARKNET_URL,
        {
            params: {
                "api-key": apiKey,
                format: "json",
                limit: 100,
                "filters[commodity]": crop
            },
            timeout: 25000
        }
    );

    const records =
        response.data?.records || [];

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

    return markets;
}


/**
 * Fetches the DOCA all-India average wholesale price for one
 * crop. Returns null when DOCA does not track that crop.
 */
async function fetchDoca(crop) {
    return doca.fetchCropWholesale(crop);
}


module.exports = {
    CROPS,
    fetchAgmarknet,
    fetchDoca,
    docaSupports: doca.supports,
    AGMARKNET_URL
};