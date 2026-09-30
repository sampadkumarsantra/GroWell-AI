const axios = require("axios");


/*
 * =====================================================
 * SECOND GOVERNMENT SOURCE — DOCA PRICE MONITORING
 * =====================================================
 *
 * The Agmarknet feed behind data.gov.in is the only source of
 * market-level (per mandi) prices, and its gateway goes down
 * regularly. The Department of Consumer Affairs publishes its
 * own daily price monitoring figures on fcainfoweb.nic.in,
 * which is a different ministry and a different server.
 *
 * This is deliberately NOT a substitute for mandi data and is
 * never presented as one. DOCA publishes all-India average
 * wholesale prices in rupees per quintal, so it is a genuine
 * government number but a different measurement. The response
 * carries its own source label and the interface says so.
 *
 * DOCA only publishes a fixed basket of commodities, so a crop
 * it does not track has no value here. That is reported as a
 * miss rather than quietly mapped onto a near-equivalent crop.
 *
 */

const DOCA_URL = "https://fcainfoweb.nic.in/";


// Which DOCA wholesale line represents each crop the app shows.
// Only exact matches are listed: substituting "Turmeric (powder)"
// for a farmer's turmeric root, or "Bajra" for maize, would be
// a different commodity and would misreport the price.
const CROP_TO_DOCA = {
    Rice: "Rice",
    Wheat: "Wheat",
    Potato: "Potato",
    Onion: "Onion",
    Tomato: "Tomato"
};


let cache = {
    prices: null,
    date: null,
    fetchedAt: 0
};

const CACHE_TTL_MS = 60 * 60 * 1000;


/**
 * DOCA renders its figures into ASP.NET grid spans with stable
 * ids. Each wholesale grid is a <table> whose rows carry a
 * commodity span followed by a price span, both in rupees per
 * quintal.
 */
function parseWholesaleTables(html) {

    const prices = {};

    const tables =
        html.match(
            /<table[^>]*id="GridViewWholesaleGroup[ABCD]"[\s\S]*?<\/table>/gi
        ) || [];

    tables.forEach((table) => {

        const cells =
            table.match(
                /lblCommName"[^>]*>([^<]+)<[\s\S]{0,400}?lblPrices"[^>]*>([^<]+)</g
            ) || [];

        cells.forEach((cell) => {

            const name =
                cell.match(
                    /lblCommName"[^>]*>([^<]+)</
                );

            const value =
                cell.match(
                    /lblPrices"[^>]*>([^<]+)</
                );

            if (!name || !value) {
                return;
            }

            const commodity =
                name[1].trim();

            const price =
                Number(
                    value[1].replace(/,/g, "").trim()
                );

            if (
                commodity &&
                Number.isFinite(price) &&
                price > 0
            ) {
                prices[commodity] = price;
            }
        });
    });

    return prices;
}


function parseDate(html) {

    const match =
        html.match(
            /id="lblDate2"[^>]*>([^<]+)</
        );

    if (!match) {
        return null;
    }

    const raw = match[1].trim();

    // DOCA uses dd/mm/yyyy.
    const parts =
        raw.split("/").map(Number);

    if (
        parts.length !== 3 ||
        parts.some(Number.isNaN)
    ) {
        return null;
    }

    const [day, month, year] = parts;

    return new Date(
        Date.UTC(year, month - 1, day)
    ).toISOString().slice(0, 10);
}


/**
 * Returns { prices, date, fetchedAt } for the whole DOCA basket,
 * or throws. The basket is fetched once and reused for a short
 * period so a page load that needs twelve crops makes a single
 * request to a government server.
 */
async function fetchBasket() {

    if (
        cache.prices &&
        Date.now() - cache.fetchedAt < CACHE_TTL_MS
    ) {
        return cache;
    }

    const response =
        await axios.get(DOCA_URL, {
            timeout: 20000,
            responseType: "text",
            headers: {
                "User-Agent":
                    "GroWell-AI/1.0 (+agricultural advisory)"
            }
        });

    const html = String(
        response.data || ""
    );

    const prices =
        parseWholesaleTables(html);

    if (Object.keys(prices).length === 0) {
        throw new Error(
            "DOCA returned no parsable wholesale prices."
        );
    }

    cache = {
        prices,
        date: parseDate(html),
        fetchedAt: Date.now()
    };

    console.log(
        `🏛️  DOCA price monitoring: ${Object.keys(prices).length} commodities as on ${cache.date}`
    );

    return cache;
}


/**
 * Returns the DOCA wholesale price for one crop, or null when
 * DOCA does not track it.
 */
async function fetchCropWholesale(crop) {

    const commodity =
        CROP_TO_DOCA[crop];

    if (!commodity) {
        return null;
    }

    const basket = await fetchBasket();

    const price =
        basket.prices[commodity];

    if (!price) {
        return null;
    }

    return {
        crop,
        commodity,
        price: Math.round(price),
        unit: "₹/quintal",
        basis: "All-India average wholesale",
        asOn: basket.date,
        source: "DOCA Price Monitoring System",
        sourceUrl: DOCA_URL
    };
}


function supports(crop) {
    return Boolean(CROP_TO_DOCA[crop]);
}


module.exports = {
    fetchCropWholesale,
    supports,
    DOCA_URL
};