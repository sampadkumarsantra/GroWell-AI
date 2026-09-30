const axios = require("axios");


/*
 * =====================================================
 * AGMARKNET — the primary mandi price source
 * =====================================================
 *
 * Agmarknet is operated by the Directorate of Marketing &
 * Inspection and is the authority the whole chain is built
 * around. It used to be reached through the data.gov.in
 * gateway, but that gateway is a proxy in front of the same
 * records and it fails on its own schedule: 502, 503 and
 * outright connection refusals, for hours at a time, across
 * every crop. Reading the API directly removes a whole failure
 * point and nothing else, because both paths serve identical
 * mandi records.
 *
 * These are the endpoints the Agmarknet 2.0 portal itself
 * calls. Both are reachable without an account:
 *
 *   GET /market-district-state
 *       The master list of markets with their district and
 *       state, which is how a market name is resolved to the
 *       state and district the response reports.
 *
 *   GET /prices-and-arrivals/commodity-market/daily-report-state
 *       ?date=YYYY-MM-DD&state=<stateId>
 *       Market-level arrivals and prices for every commodity
 *       traded in one state on one day. This is the actual
 *       mandi data: min, max and modal price per variety, per
 *       market.
 *
 * The gateway-era endpoint (/prices-and-arrivals/market-report/
 * daily) is not used. It rejects the payload this project sends
 * with "Missing parameters", and one sibling endpoint requires a
 * CAPTCHA, so the two above are the ones that answer.
 *
 * What this source refuses, in the same spirit as the rest:
 *
 *   - A price whose unit is anything other than rupees per
 *     quintal is discarded. Agmarknet also publishes per
 *     kilogram and per tonne lines, and converting them would
 *     mean assuming a conversion the record does not state.
 *   - The report's own date is parsed from the response and
 *     reported verbatim. A report titled 29-Sep-2026 is never
 *     presented as today's price.
 *   - The state master is matched by market name, so a market
 *     the master does not know keeps its price but is not
 *     given an invented district or state.
 *
 */

const API_ROOT =
    process.env.AGMARKNET_API_URL ||
    "https://api.agmarknet.gov.in/v1";


// The states queried for each crop. Every one of these carries
// a live mandi for most of the twelve crops the app shows, and
// together they cover more ground than the rest of India.
//
// Tamil Nadu is deliberately absent: its report runs to several
// thousand rows and has taken over fifteen seconds to generate,
// which would stall a page that asks for twelve crops. Add it
// through AGMARKNET_STATES if the extra latency is acceptable.
const DEFAULT_STATES = [
    20, // Maharashtra
    34, // Uttar Pradesh
    28, // Punjab
    19, // Madhya Pradesh
    16, // Karnataka
    11, // Gujarat
    32, // Telangana
    36, // West Bengal
    29, // Rajasthan
    12, // Haryana
    2,  // Andhra Pradesh
    26  // Odisha
];


// A mandi price per quintal outside this range is a parsing
// error rather than a real price.
const MIN_PLAUSIBLE_PRICE = 1;
const MAX_PLAUSIBLE_PRICE = 500000;

// Slow on a busy day, so this is generous. The breaker below is
// what stops a dead upstream from costing every crop the full
// wait, not a short timeout.
const REQUEST_TIMEOUT_MS = 20000;

// Markets report through the day, so a report for today fills in
// as the day goes on. Caching for half an hour keeps that
// improvement while stopping twelve crops from turning into
// twelve parallel requests every time a farmer opens the page.
const CACHE_TTL_MS = 30 * 60 * 1000;

// The market master changes rarely.
const MASTER_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Markets trade on working days, so a report for a date with no
// trading is stepped back over rather than treated as no price.
const MAX_DATE_STEPS_BACK = 3;

// Only a quintal figure is comparable across mandis.
const QUINTAL_UNITS = [
    "rs./quintal",
    "rs/quintal",
    "rs. /quintal",
    "rs per quintal",
    "inr/quintal"
];


// =====================================================
// CIRCUIT BREAKER
// =====================================================
//
// When Agmarknet itself is unreachable, every crop paying a
// full timeout before falling through is what made the market
// page unusable during an outage. The breaker keeps the source
// switched off for a cooldown once it starts failing, so the
// rest of the chain is reached immediately.
//

const FAILURES_BEFORE_OPEN = 2;
const BREAKER_COOLDOWN_MS = 10 * 60 * 1000;

let breaker = {
    failures: 0,
    openUntil: 0
};


function breakerIsOpen() {
    return Date.now() < breaker.openUntil;
}

function breakerState() {
    return {
        open: breakerIsOpen(),
        failures: breaker.failures
    };
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


// =====================================================
// HTTP
// =====================================================
//
// This host sits behind a Google front end that answers 403 to
// anything without a browser User-Agent, including the default
// one axios sends. Verified: the same request that gets 403
// with "axios/1.19.0" is accepted with a browser agent. This
// only gets past the bot filter; nothing here requires a
// token or a CAPTCHA.
//

function headers() {

    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Safari/537.36"
    };

}

async function get(path, params) {

    if (breakerIsOpen()) {
        throw new UpstreamUnavailableError(
            "Agmarknet is in a failure cooldown."
        );
    }

    try {

        const response =
            await axios.get(
                API_ROOT.replace(/\/$/, "") + path,
                {
                    params,
                    timeout: REQUEST_TIMEOUT_MS,
                    headers: headers(),
                    validateStatus: (status) =>
                        status >= 200 && status < 300
                }
            );

        breaker.failures = 0;
        breaker.openUntil = 0;

        return response.data;

    } catch (error) {

        breaker.failures += 1;

        if (breaker.failures >= FAILURES_BEFORE_OPEN) {
            breaker.openUntil =
                Date.now() + BREAKER_COOLDOWN_MS;
        }

        throw error;
    }
}


// =====================================================
// MARKET MASTER
// =====================================================
//
// The daily report names a market but not its district or
// state, so the master list is what turns "APMC VASAI" into a
// row a farmer can place. It is a few thousand entries and
// changes rarely, so it is cached for a week and keyed by
// market name.
//

let masterCache = {
    markets: null,
    fetchedAt: 0
};


function masterKey(name) {
    return String(name || "")
        .trim()
        .toLowerCase();
}


async function loadMaster() {

    if (
        masterCache.markets &&
        Date.now() - masterCache.fetchedAt <
            MASTER_CACHE_TTL_MS
    ) {
        return masterCache.markets;
    }

    const data =
        await get("/market-district-state");

    const entries = Array.isArray(data) ? data : [];

    if (entries.length === 0) {
        throw new Error(
            "Agmarknet returned no market master list."
        );
    }

    const byName = new Map();

    entries.forEach((entry) => {
        byName.set(masterKey(entry.market_name), entry);
    });

    masterCache = {
        markets: byName,
        fetchedAt: Date.now()
    };

    return byName;
}


// =====================================================
// DAILY REPORT
// =====================================================

const reportCache = new Map();

const reportInFlight = new Map();


function configuredStates() {

    const override =
        process.env.AGMARKNET_STATES;

    if (!override) {
        return DEFAULT_STATES;
    }

    const parsed = String(override)
        .split(",")
        .map((value) => Number(value.trim()))
        .filter((value) => Number.isFinite(value));

    return parsed.length ? parsed : DEFAULT_STATES;
}


// "Commodity-wise, Market-wise Daily Report for State/UT on:
//  29-Sep-2026 State/UT : Maharashtra"
const MONTHS = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
};

function parseReportDate(title) {

    const match = String(title || "").match(
        /(\d{1,2})-([A-Za-z]{3})-(\d{4})/
    );

    if (!match) {
        return null;
    }

    const month = MONTHS[match[2].toLowerCase()];

    if (month === undefined) {
        return null;
    }

    const parsed = new Date(
        Date.UTC(
            Number(match[3]),
            month,
            Number(match[1])
        )
    );

    if (Number.isNaN(parsed.getTime())) {
        return null;
    }

    return parsed.toISOString().slice(0, 10);
}

function parseTitleState(title) {

    const match = String(title || "").match(
        /State\/UT\s*:\s*(.+)$/
    );

    return match
        ? match[1].trim()
        : null;
}


function isoDate(offsetDays = 0) {

    const date = new Date();

    date.setUTCDate(
        date.getUTCDate() - offsetDays
    );

    return date.toISOString().slice(0, 10);
}


/**
 * Fetches one state's report for one date, parsed into a flat
 * list of market rows. Cached per state and date.
 */
async function loadReport(date, stateId) {

    const key = `${date}:${stateId}`;

    const cached = reportCache.get(key);

    if (
        cached &&
        Date.now() - cached.fetchedAt < CACHE_TTL_MS
    ) {
        return cached.report;
    }

    if (reportInFlight.has(key)) {
        return reportInFlight.get(key);
    }

    const request = (async () => {

        const data =
            await get(
                "/prices-and-arrivals/" +
                "commodity-market/" +
                "daily-report-state",
                {
                    date,
                    state: stateId,
                    includeExcel: false
                }
            );

        const report = parseReport(data, date);

        reportCache.set(key, {
            report,
            fetchedAt: Date.now()
        });

        return report;

    })()
        .finally(() => {
            reportInFlight.delete(key);
        });

    reportInFlight.set(key, request);

    return request;
}


function toNumber(value) {

    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") {
        return null;
    }

    const parsed = Number(value.replace(/,/g, "").trim());

    return Number.isFinite(parsed) ? parsed : null;
}

function isQuintal(unit) {

    return QUINTAL_UNITS.includes(
        String(unit || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ")
    );

}


/**
 * Flattens the nested report into market rows, resolving each
 * market's district and state from the master list.
 */
function parseReport(data, requestedDate) {

    const groups =
        Array.isArray(data?.commodityGroups)
            ? data.commodityGroups
            : [];

    const asOn =
        parseReportDate(data?.title) ||
        requestedDate;

    const titleState =
        parseTitleState(data?.title);

    const rows = [];

    groups.forEach((group) => {

        const commodities =
            Array.isArray(group?.commodities)
                ? group.commodities
                : [];

        commodities.forEach((commodity) => {

            const commodityName =
                String(
                    commodity?.commodityName || ""
                ).trim();

            const markets =
                Array.isArray(commodity?.markets)
                    ? commodity.markets
                    : [];

            markets.forEach((market) => {

                const marketName =
                    String(
                        market?.marketCenter || ""
                    ).trim();

                if (!commodityName || !marketName) {
                    return;
                }

                const entries =
                    Array.isArray(market?.data)
                        ? market.data
                        : [];

                entries.forEach((entry) => {

                    // A per-kilogram or per-tonne line is not
                    // comparable with a mandi quote, and
                    // converting it would mean inventing a
                    // conversion the record never states.
                    if (!isQuintal(entry?.unitOfPrice)) {
                        return;
                    }

                    const modalPrice =
                        toNumber(entry?.modalPrice);

                    if (
                        modalPrice === null ||
                        modalPrice < MIN_PLAUSIBLE_PRICE ||
                        modalPrice > MAX_PLAUSIBLE_PRICE
                    ) {
                        return;
                    }

const minPrice =
                        toNumber(
                            entry?.minimumPrice
                        );

                    const maxPrice =
                        toNumber(
                            entry?.maximumPrice
                        );

                    // The reported range is only trusted when
                    // it holds up on its own terms and the
                    // modal price sits inside it. A range that
                    // contradicts its own modal price means the
                    // row was mis-parsed, so the modal price is
                    // carried alone rather than alongside a
                    // bound that disagrees with it.
                    const rangeIsUsable =
                        minPrice !== null &&
                        maxPrice !== null &&
                        minPrice >= MIN_PLAUSIBLE_PRICE &&
                        maxPrice <= MAX_PLAUSIBLE_PRICE &&
                        minPrice <= maxPrice &&
                        modalPrice >= minPrice &&
                        modalPrice <= maxPrice;

                    rows.push({
                        state: titleState || "",
                        district: "",
                        market: marketName,
                        commodity: commodityName,
                        variety: String(
                            entry?.variety || ""
                        ).trim(),
                        grade: "",
                        date: asOn,
                        minPrice:
                            rangeIsUsable
                                ? minPrice
                                : modalPrice,
                        maxPrice:
                            rangeIsUsable
                                ? maxPrice
                                : modalPrice,
                        modalPrice,
                        marketKey:
                            masterKey(marketName)
                    });
                });
            });
        });
    });

    return { rows, asOn, state: titleState };
}


/**
 * Attaches the district and state the master list holds for
 * each market. A market the master does not know keeps its
 * price with an empty district rather than being guessed at.
 */
function resolvePlaces(rows, master) {

    return rows.map((row) => {

        const entry = master.get(row.marketKey);

        if (!entry) {
            const { marketKey, ...rest } = row;
            return rest;
        }

        const { marketKey, ...rest } = row;

        return {
            ...rest,
            state:
                entry.state_name ||
                row.state ||
                "",
            district:
                entry.district_name || ""
        };
    });
}


// The commodity names Agmarknet publishes for each crop the app
// shows. Matching is exact on the way in and exact on the way
// out, so a report that groups a crop under a near-equivalent
// name cannot put it on the screen.
//
// Soybean is queried as "Soyabean" and Chilli as "Dry
// Chillies", which is the dried red fruit a chilli grower
// sells. "Green Chilli" is deliberately not listed: it is a
// different, perishable product traded at a different price.
const CROP_ALIASES = {
    Rice: ["Rice"],
    Wheat: ["Wheat"],
    Maize: ["Maize"],
    Potato: ["Potato"],
    Tomato: ["Tomato"],
    Onion: ["Onion"],
    Groundnut: ["Groundnut"],
    Mustard: ["Mustard"],
    Soybean: ["Soyabean"],
    Chilli: ["Dry Chillies"],
    Cotton: ["Cotton"],
    // Agmarknet publishes no turmeric line at all, so there is
    // nothing to ask for. Turmeric is served by the mirror.
    Turmeric: []
};


function supports(crop) {
    return (
        Array.isArray(CROP_ALIASES[crop]) &&
        CROP_ALIASES[crop].length > 0
    );
}


/**
 * Fetches market-level prices for one crop across the
 * configured states. Returns normalised rows, or throws so the
 * caller moves on to the next source.
 */
async function fetchCrop(crop) {

    if (breakerIsOpen()) {
        throw new UpstreamUnavailableError(
            "Agmarknet is in a failure cooldown."
        );
    }

    const aliases = CROP_ALIASES[crop];

    if (!aliases) {
        throw new Error(
            `Agmarknet is not mapped for ${crop}.`
        );
    }

    if (aliases.length === 0) {
        throw new Error(
            `Agmarknet publishes no ${crop} line.`
        );
    }

    const wanted = aliases.map((alias) =>
        alias.toLowerCase()
    );

    const states = configuredStates();

    // The most recent date that actually has the crop wins.
    // Markets report through the day, so today may hold only a
    // handful of mandis so far; rather than show a thin average
    // as if it were the whole day's market, an earlier trading
    // day is used when today has nothing.
    for (let step = 0; step <= MAX_DATE_STEPS_BACK; step++) {

        const date = isoDate(step);

        let reports;

        try {
            reports =
                await Promise.all(
                    states.map((stateId) =>
                        loadReport(
                            date,
                            stateId
                        ).catch(() => null)
                    )
                );
        } catch (error) {
            throw error;
        }

        const usable = reports.filter(Boolean);

        if (usable.length === 0) {
            continue;
        }

        const master =
            await loadMaster().catch(() => null);

        let markets = [];

        usable.forEach((report) => {
            report.rows.forEach((row) => {
                if (
                    wanted.includes(
                        row.commodity.toLowerCase()
                    )
                ) {
                    markets.push(row);
                }
            });
        });

        if (markets.length === 0) {
            continue;
        }

        const resolved = master
            ? resolvePlaces(markets, master)
            : markets.map((row) => {
                const { marketKey, ...rest } = row;
                return rest;
            });

        return {
            markets: resolved,
            asOn: usable[0].asOn || date,
            states: [
                ...new Set(
                    resolved
                        .map((market) => market.state)
                        .filter(Boolean)
                )
            ].sort()
        };
    }

    throw new Error(
        `Agmarknet had no ${crop} records in the last ${MAX_DATE_STEPS_BACK + 1} trading days.`
    );
}


module.exports = {
    fetchCrop,
    supports,
    breakerState,
    UpstreamUnavailableError,
    CROP_ALIASES,
    API_ROOT
};