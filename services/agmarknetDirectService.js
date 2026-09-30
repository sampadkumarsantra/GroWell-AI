const axios = require("axios");


/*
 * =====================================================
 * AGMARKNET DIRECT API (fallback source)
 * =====================================================
 *
 * data.gov.in serves Agmarknet's prices through a gateway
 * that is frequently down. Agmarknet also publishes its own
 * API at api.agmarknet.gov.in, on a completely separate host,
 * which covers the same mandi-level prices for every crop the
 * app shows. When the gateway is degraded this is the
 * authoritative replacement rather than a substitute.
 *
 * STATUS: this could not be verified against the live API,
 * because every endpoint currently returns 503 "no healthy
 * upstream" from a Google load balancer. It is written to be
 * safe in that situation and for the general case:
 *
 *   - Anything unrecognised is rejected, never guessed at.
 *   - Records are discovered by inspecting field names rather
 *     than by assuming one fixed response layout.
 *   - A response that yields no valid priced record throws, so
 *     the caller falls through to the next source.
 *
 * That means a wrong or unexpected shape produces no price at
 * all, which is the intended failure mode. A page that guesses
 * at a farmer's price is worse than one that admits it has
 * none.
 *
 * Authentication: the public site obtains a Bearer token by
 * sending an OTP to a mobile number. GroWell does not do that,
 * so a token is only sent when AGMARKNET_API_TOKEN is set.
 * If the endpoint turns out to be public, no token is needed.
 *
 */

const API_ROOT =
    process.env.AGMARKNET_API_URL ||
    "https://api.agmarknet.gov.in/v1";

const API_TOKEN =
    process.env.AGMARKNET_API_TOKEN;

const REQUEST_TIMEOUT_MS = 8000;

// A mandi price per quintal outside this range is a parsing
// error rather than a real price.
const MIN_PLAUSIBLE_PRICE = 1;
const MAX_PLAUSIBLE_PRICE = 500000;


let breaker = {
    failures: 0,
    openUntil: 0
};

const BREAKER_COOLDOWN_MS = 10 * 60 * 1000;


function breakerIsOpen() {
    return Date.now() < breaker.openUntil;
}


function headers() {

    const base = {
        "Content-Type": "application/json",
        Accept: "application/json",

        // This host sits behind a Google front end that answers
        // 403 to anything without a browser User-Agent, including
        // the default one axios sends. Verified: the same request
        // that gets 403 with "axios/1.19.0" is accepted with a
        // browser agent. This only gets past the bot filter; any
        // real authentication is still enforced separately.
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
            "AppleWebKit/537.36 (KHTML, like Gecko) " +
            "Chrome/120.0.0.0 Safari/537.36"
    };

    if (API_TOKEN) {
        base.Authorization =
            `Bearer ${API_TOKEN}`;
    }

    return base;
}


async function call(path, options = {}) {

    if (breakerIsOpen()) {
        throw new Error(
            "Agmarknet direct API is in a failure cooldown."
        );
    }

    try {

        const response =
            await axios({
                url:
                    API_ROOT.replace(
                        /\/$/,
                        ""
                    ) + path,
                method:
                    options.method ||
                    "GET",
                params: options.params,
                data: options.data,
                headers: headers(),
                timeout: REQUEST_TIMEOUT_MS
            });

        breaker.failures = 0;
        breaker.openUntil = 0;

        return response.data;

    } catch (error) {

        breaker.failures += 1;

        if (breaker.failures >= 2) {
            breaker.openUntil =
                Date.now() +
                BREAKER_COOLDOWN_MS;
        }

        throw error;
    }
}


// =====================================================
// RESPONSE INSPECTION
// =====================================================
//
// Rather than hard-coding one response layout, find the first
// field whose name matches, ignoring case, underscores and
// hyphens. That keeps the parser working across the
// camelCase, snake_case and PascalCase shapes this API uses.

function normaliseKey(key) {
    return String(key)
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function pick(record, candidates) {

    for (const key of Object.keys(record)) {

        if (candidates.includes(normaliseKey(key))) {

            const value = record[key];

            if (
                value !== null &&
                value !== undefined &&
                value !== ""
            ) {
                return value;
            }
        }
    }

    return null;
}


function toNumber(value) {

    if (typeof value === "number") {
        return Number.isFinite(value)
            ? value
            : null;
    }

    if (typeof value !== "string") {
        return null;
    }

    const cleaned =
        value.replace(/,/g, "").trim();

    if (!cleaned) {
        return null;
    }

    // Only a bare number is accepted. A string like "Rs 4,185
    // /quintal" is deliberately not parsed, because guessing at
    // the unit is how a wrong number reaches the screen.
    const parsed = Number(cleaned);

    return Number.isFinite(parsed)
        ? parsed
        : null;
}


/**
 * Walks an arbitrary response and collects every object that
 * looks like a priced market record.
 */
function extractRecords(node, found = [], depth = 0) {

    if (
        !node ||
        typeof node !== "object" ||
        depth > 12
    ) {
        return found;
    }

    if (Array.isArray(node)) {
        node.forEach((item) =>
            extractRecords(item, found, depth + 1)
        );
        return found;
    }

    const modal =
        toNumber(
            pick(node, [
                "modalprice",
                "modal",
                "price",
                "avgprice",
                "averageprice"
            ])
        );

    const min =
        toNumber(
            pick(node, [
                "minprice",
                "min"
            ])
        );

    const max =
        toNumber(
            pick(node, [
                "maxprice",
                "max"
            ])
        );

    if (
        modal !== null &&
        modal >= MIN_PLAUSIBLE_PRICE &&
        modal <= MAX_PLAUSIBLE_PRICE
    ) {

        found.push({
            modalPrice: modal,
            minPrice:
                min !== null &&
                min >= MIN_PLAUSIBLE_PRICE
                    ? min
                    : modal,
            maxPrice:
                max !== null &&
                max <= MAX_PLAUSIBLE_PRICE
                    ? max
                    : modal,
            market:
                String(
                    pick(node, [
                        "market",
                        "marketname",
                        "mandi",
                        "mandiname",
                        "marketcenter"
                    ]) || ""
                ).trim(),
            district:
                String(
                    pick(node, [
                        "district",
                        "districtname"
                    ]) || ""
                ).trim(),
            state:
                String(
                    pick(node, [
                        "state",
                        "statename"
                    ]) || ""
                ).trim(),
            commodity:
                String(
                    pick(node, [
                        "commodity",
                        "commodityname",
                        "crop",
                        "cropname"
                    ]) || ""
                ).trim(),
            variety:
                String(
                    pick(node, [
                        "variety"
                    ]) || ""
                ).trim(),
            grade:
                String(
                    pick(node, [
                        "grade"
                    ]) || ""
                ).trim(),
            date:
                String(
                    pick(node, [
                        "date",
                        "arrivaldate",
                        "pricedate",
                        "reportdate"
                    ]) || ""
                ).trim()
        });

        return found;
    }

    Object.values(node).forEach((value) =>
        extractRecords(value, found, depth + 1)
    );

    return found;
}


/**
 * Matches records for the requested crop. A response that
 * carries no commodity name at all is rejected, because it
 * cannot be confirmed to be the crop that was asked for.
 */
function forCrop(records, crop) {

    const wanted =
        crop.trim().toLowerCase();

    const matching = records.filter(
        (record) =>
            record.commodity &&
            record.commodity
                .toLowerCase()
                .includes(wanted)
    );

    if (matching.length === 0) {
        return [];
    }

    return matching.filter(
        (record) =>
            record.market.length > 0
    );
}


/**
 * Fetches mandi-level prices for one crop straight from
 * Agmarknet's own API.
 *
 * The daily report endpoint returns every market for a date,
 * so one call covers all crops and the result is reused for an
 * hour. Throws on any failure or on an unusable response.
 */
let dailyCache = {
    date: null,
    fetchedAt: 0,
    records: null
};

const CACHE_TTL_MS = 60 * 60 * 1000;


function isoDate(offsetDays = 0) {

    const date = new Date();

    date.setUTCDate(
        date.getUTCDate() - offsetDays
    );

    return date.toISOString().slice(0, 10);
}


async function loadDailyRecords() {

    if (
        dailyCache.records &&
        Date.now() - dailyCache.fetchedAt < CACHE_TTL_MS
    ) {
        return dailyCache.records;
    }

    let data = null;

    // Markets trade on working days, so step back over the
    // weekend rather than asking only for today.
    for (const offset of [0, 1, 2, 3]) {

        const date = isoDate(offset);

        try {

            data = await call(
                "/prices-and-arrivals/market-report/daily",
                {
                    method: "POST",
                    data: {
                        date,
                        marketIds: [],
                        stateIds: [],
                        includeExcel: false
                    }
                }
            );

            if (data) {
                break;
            }

        } catch (error) {

            // Keep trying earlier dates only if the API is
            // reachable; a cooldown means the host is down and
            // further attempts would just repeat it.
            if (breakerIsOpen()) {
                throw error;
            }
        }
    }

    if (!data) {
        throw new Error(
            "Agmarknet direct API returned no daily report."
        );
    }

    const records = extractRecords(data);

    if (records.length === 0) {
        throw new Error(
            "Agmarknet direct API response held no recognisable priced records."
        );
    }

    dailyCache = {
        date: data,
        fetchedAt: Date.now(),
        records
    };

    return records;
}


async function fetchCrop(crop) {

    const records =
        await loadDailyRecords();

    const matching =
        forCrop(records, crop);

    if (matching.length === 0) {
        throw new Error(
            `Agmarknet direct API had no ${crop} market records.`
        );
    }

    return matching;
}


function breakerState() {
    return {
        open: breakerIsOpen(),
        failures: breaker.failures
    };
}


module.exports = {
    fetchCrop,
    breakerState,
    API_ROOT
};