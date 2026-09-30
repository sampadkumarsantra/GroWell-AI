const axios = require("axios");


/*
 * =====================================================
 * MANDI MIRROR (fallback source)
 * =====================================================
 *
 * Both government mandi feeds have been unreachable at the
 * same time: the data.gov.in gateway answers 502/503, and
 * Agmarknet's own host returns 503 for every path. When that
 * happens the only source still answering is DOCA, and DOCA
 * publishes a fixed basket that cannot honestly cover maize,
 * groundnut, mustard, soybean, cotton or turmeric. It lists
 * Groundnut and Mustard only as refined oils and Turmeric only
 * as powder, which are different commodities, and this project
 * refuses to report a different product's price as the seed's.
 *
 * This source is a community mirror that re-publishes the same
 * Agmarknet mandi records. It is consulted only after both
 * official hosts and DOCA have failed, so it is a gap filler
 * during an outage rather than a replacement for the
 * authoritative feed. The moment Agmarknet answers again this
 * source is not reached.
 *
 * What it costs and what it guarantees:
 *
 *   - It is a third-party service with no uptime promise, so
 *     every failure mode here is a fall-through, never a
 *     guess. An unrecognised payload yields no price.
 *   - It rate limits hard (100 requests per 15 minutes per
 *     IP, shared across every instance behind the same egress
 *     address). The cache, the single-flight map and the
 *     cooldown below exist so that a page of twelve crops
 *     costs one request per crop rather than one per viewer.
 *   - Its prices carry the arrival date the mirror recorded,
 *     not today. That date is passed through to the response
 *     and never replaced with the fetch time.
 *   - Each crop is matched against an explicit list of the
 *     commodity names that crop is published under. A row whose
 *     commodity is not on that list is discarded, so a
 *     loosely filtered response cannot put a neighbouring
 *     commodity's price on a farmer's screen.
 *
 */

const MIRROR_URL =
    process.env.MANDI_MIRROR_URL ||
    "https://mandi-api.onrender.com";

const MIRROR_SOURCE =
    "Agmarknet mirror";

// The commodity names the mirror publishes for each crop the
// app shows, as Agmarknet itself spells them. Matching is
// exact: "Soybean" is queried as "Soyabean" because that is
// the published name, and a response carrying anything not
// listed here is rejected rather than approximately matched.
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
    Cotton: ["Cotton"],
    Turmeric: ["Turmeric"]
};

// Chilli is absent because the mirror does not carry it. It is
// left out rather than pointed at "Red Chillies", since that
// line is the DOCA retail basket's, not this source's.


const REQUEST_TIMEOUT_MS = 8000;

// A mandi price per quintal outside this range is a parsing
// error rather than a real price.
const MIN_PLAUSIBLE_PRICE = 1;
const MAX_PLAUSIBLE_PRICE = 500000;

// Long, because the shared rate limit is the scarce resource
// here rather than latency. One request per crop every half
// hour is twelve requests per window against a budget of
// roughly four hundred per hour.
const CACHE_TTL_MS = 30 * 60 * 1000;

const MAX_ROWS = 200;


function enabled() {

    return (
        process.env.MANDI_MIRROR_ENABLED ||
        "true"
    ).toLowerCase() !== "false";

}

function supports(crop) {
    return Boolean(CROP_ALIASES[crop]);
}


// =====================================================
// COOLDOWN
// =====================================================
//
// A rate limit is not a transient blip: continuing to ask
// through it burns the whole window and locks the source out
// longer. The reset time the server reports is used when it
// sends one, so the source is retried when it is actually
// available again rather than on a guessed schedule.
//

let cooldownUntil = 0;

let consecutiveFailures = 0;

const FAILURES_BEFORE_COOLDOWN = 3;


function isCoolingDown() {
    return Date.now() < cooldownUntil;
}

function cooldownRemainingMs() {
    return Math.max(0, cooldownUntil - Date.now());
}


function openCooldown(ms) {

    cooldownUntil =
        Math.max(cooldownUntil, Date.now() + ms);

}

function noteSuccess() {

    consecutiveFailures = 0;
    cooldownUntil = 0;

}

function noteFailure(error) {

    consecutiveFailures += 1;

    const status = error?.response?.status;

    if (status === 429) {

        const retryAfter = Number(
            error.response?.headers?.["retry-after"]
        );

        // The server states its own reset window. Fall back to
        // a full window when it does not, because guessing a
        // shorter pause just spends more of the same budget.
        openCooldown(
            Number.isFinite(retryAfter) && retryAfter > 0
                ? retryAfter * 1000
                : 15 * 60 * 1000
        );

        return;
    }

    if (consecutiveFailures >= FAILURES_BEFORE_COOLDOWN) {
        openCooldown(10 * 60 * 1000);
    }
}


// =====================================================
// CACHE AND SINGLE FLIGHT
// =====================================================
//
// Without the in-flight map a cold cache with several farmers
// on the Analytics page at once would send one request each,
// which is exactly what the rate limit cannot absorb. The map
// makes concurrent callers share a single request.
//

const cache = new Map();

const inFlight = new Map();


function readCache(crop) {

    const entry = cache.get(crop);

    if (!entry) {
        return null;
    }

    if (Date.now() - entry.fetchedAt >= CACHE_TTL_MS) {
        return null;
    }

    return entry.result;

}

function writeCache(crop, result) {

    cache.set(crop, { result, fetchedAt: Date.now() });

}


// =====================================================
// PARSING
// =====================================================

function normaliseName(value) {
    return String(value || "")
        .trim()
        .toLowerCase();
}

function toPrice(value) {

    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") {
        return null;
    }

    const parsed = Number(
        value.replace(/,/g, "").trim()
    );

    return Number.isFinite(parsed) ? parsed : null;
}


/**
 * Turns a mirror record into the market row shape the rest of
 * the app uses, or returns null when the row cannot be trusted.
 */
function toMarketRow(record, aliases) {

    const modalPrice = toPrice(record.modal_price);

    if (
        modalPrice === null ||
        modalPrice < MIN_PLAUSIBLE_PRICE ||
        modalPrice > MAX_PLAUSIBLE_PRICE
    ) {
        return null;
    }

    // Exact match on a published name. This is the guard that
    // stops a loose upstream filter from substituting a
    // neighbouring commodity.
    if (!aliases.includes(normaliseName(record.commodity))) {
        return null;
    }

    const market = String(record.market || "").trim();

    if (!market) {
        return null;
    }

const minPrice = toPrice(record.min_price);
    const maxPrice = toPrice(record.max_price);

    const hasRange =
        minPrice !== null &&
        maxPrice !== null &&
        minPrice >= MIN_PLAUSIBLE_PRICE &&
        maxPrice <= MAX_PLAUSIBLE_PRICE;

    // A modal price outside its own reported range is a
    // mis-parsed or truncated record. The mirror carries at
    // least one such row per crop, so the range is used as a
    // consistency test rather than trusted as a bound.
    if (
        hasRange &&
        (modalPrice < minPrice ||
            modalPrice > maxPrice)
    ) {
        return null;
    }

    return {
        state: String(record.state || "").trim(),
        district: String(record.district || "").trim(),
        market,
        commodity: String(record.commodity || "").trim(),
        variety: String(record.variety || "").trim(),
        grade: String(record.grade || "").trim(),
        date: String(record.arrival_date || "").trim(),
        minPrice: hasRange ? minPrice : modalPrice,
        maxPrice: hasRange ? maxPrice : modalPrice,
        modalPrice
    };
}


// =====================================================
// FETCH
// =====================================================

async function requestRows(commodity) {

    const response = await axios.get(
        MIRROR_URL.replace(/\/$/, "") + "/v1/prices",
        {
            params: {
                commodity,
                limit: MAX_ROWS
            },
            timeout: REQUEST_TIMEOUT_MS,
            headers: {
                Accept: "application/json",
                "User-Agent":
                    "GroWell-AI/1.0 (+agricultural advisory)"
            },
            validateStatus: (status) =>
                status >= 200 && status < 300
        }
    );

    const rows = response.data?.data;

    if (!Array.isArray(rows)) {
        throw new Error(
            "Mandi mirror returned an unrecognised payload."
        );
    }

    return rows;
}


/**
 * Fetches market-level mandi rows for one crop from the
 * mirror. Returns { markets, asOn, states } or throws so the
 * caller moves on to the next source.
 */
async function loadCrop(crop) {

    const aliases = CROP_ALIASES[crop];

    if (!aliases) {
        throw new Error(
            `Mandi mirror is not mapped for ${crop}.`
        );
    }

    const normalisedAliases =
        aliases.map(normaliseName);

    const markets = [];

    for (const commodity of aliases) {

        const rows = await requestRows(commodity);

        rows.forEach((record) => {

            const row = toMarketRow(
                record,
                normalisedAliases
            );

            if (row) {
                markets.push(row);
            }
        });
    }

    if (markets.length === 0) {
        throw new Error(
            `Mandi mirror had no usable ${crop} records.`
        );
    }

    // The price date is the mirror's own arrival date, which
    // lags the current day. It is reported as-is.
    const dated = markets
        .map((market) => market.date)
        .filter(Boolean)
        .sort();

    const asOn = dated.length
        ? dated[dated.length - 1]
        : null;

    // A response is paginated by record rather than by trading
    // day, so a thinly traded crop arrives spread across a
    // month of trading days: one Turmeric response carried
    // thirty-one distinct dates. Averaging those together
    // would compress a month of trading into a single "current"
    // figure, so only the most recent trading day is kept.
    // This matches the single-day report the official feeds
    // return, and asking for the date explicitly costs an extra
    // request for the same rows.
    const onLatestDate = markets.filter(
        (market) =>
            asOn === null ||
            market.date === asOn
    );

    return {
        markets: onLatestDate,
        asOn,
        states: [
            ...new Set(
                onLatestDate
                    .map((market) => market.state)
                    .filter(Boolean)
            )
        ].sort()
    };
}


async function fetchCrop(crop) {

    if (!enabled()) {
        throw new Error(
            "Mandi mirror is disabled by configuration."
        );
    }

    if (!supports(crop)) {
        throw new Error(
            `Mandi mirror is not mapped for ${crop}.`
        );
    }

    const cached = readCache(crop);

    if (cached) {
        return cached;
    }

    if (isCoolingDown()) {
        throw new Error(
            `Mandi mirror is in a rate-limit cooldown for another ${Math.ceil(cooldownRemainingMs() / 1000)}s.`
        );
    }

    // A crop already in flight is joined rather than duplicated.
    if (inFlight.has(crop)) {
        return inFlight.get(crop);
    }

    const request = loadCrop(crop)
        .then((result) => {

            noteSuccess();
            writeCache(crop, result);

            return result;

        })
        .catch((error) => {

            noteFailure(error);

            throw error;

        })
        .finally(() => {
            inFlight.delete(crop);
        });

    inFlight.set(crop, request);

    return request;
}


function state() {
    return {
        coolingDown: isCoolingDown(),
        cooldownRemainingMs: cooldownRemainingMs(),
        consecutiveFailures,
        cachedCrops: cache.size
    };
}


module.exports = {
    fetchCrop,
    supports,
    state,
    MIRROR_URL,
    MIRROR_SOURCE,
    CROP_ALIASES
};