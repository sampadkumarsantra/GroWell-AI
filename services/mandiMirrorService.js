const axios = require("axios");


/*
 * =====================================================
 * MANDI MIRROR (fallback source)
 * =====================================================
 *
 * Agmarknet's own API is the primary source and answers every
 * crop the app shows except one. Turmeric is the exception:
 * Agmarknet publishes no turmeric line at all, and DOCA does
 * not either, so turmeric has no official price on any day.
 * DOCA also lists Groundnut and Mustard only as refined oils and
 * Turmeric only as powder, which are different commodities, and
 * this project refuses to report a different product's price as
 * the seed's.
 *
 * This source is a community mirror that re-publishes the same
 * Agmarknet mandi records. It is consulted for turmeric only,
 * after Agmarknet has been asked and had nothing, which is the
 * one case where turmeric would otherwise have no price at all.
 * It is a gap filler, never a replacement for the authoritative
 * feed, and it is not reached for any other crop.
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
    "Agmarknet community mirror";

// Agmarknet's own API is now the primary source and answers
// every crop except turmeric, for which it publishes no line at
// all, and DOCA does not either. The mirror therefore exists for
// turmeric alone and is not consulted for anything else, so a
// stale third-party figure can never displace a live official
// one.
//
// Only turmeric is listed. Matching stays exact: "Soyabean" and
// the rest were the published spellings of the other crops, but
// those crops no longer need this source.
const CROP_ALIASES = {
    Turmeric: ["Turmeric"]
};


/*
 * The crops the mirror publishes under a name of their own, and
 * the state list it carries.
 *
 * These exist for the national record set, not for the
 * per-crop screen. The sweep's first source is Agmarknet's own
 * API, which is authoritative and covers every state. When that
 * API cannot be reached — it is a government host behind a bot
 * filter, and it has refused connections outright — the sweep
 * would store nothing at all and the whole explorer would sit
 * empty, which is what a farmer sees as "no data" rather than
 * "our upstream is down".
 *
 * So the collector has a second way in. It is deliberately
 * narrower than the official source: five states, and only the
 * crops the mirror names exactly. It fills the record set with
 * real published prices when the primary source is unavailable
 * and never displaces it when the primary source answers. The
 * rows are labelled with this source's name so stored data is
 * traceable to where it actually came from.
 */
const COLLECTION_CROPS = {
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
    Turmeric: ["Turmeric"]
};


const COLLECTION_STATES = [
    "Maharashtra",
    "Uttar Pradesh",
    "Punjab",
    "Madhya Pradesh",
    "Karnataka"
];


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

// The unit the stored record set is read with. See collectState.
const QUINTAL = "Rs./Quintal";


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

async function requestRows(commodity, state) {

    const params = {
        commodity,
        limit: MAX_ROWS
    };

    if (state) {
        params.state = state;
    }

    const response = await axios.get(
        MIRROR_URL.replace(/\/$/, "") + "/v1/prices",
        {
            params,
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


// =====================================================
// NATIONAL COLLECTION
// =====================================================


/*
 * Fetches the crops this mirror publishes, for one state.
 *
 * Used by the record sweep when Agmarknet's own API cannot be
 * reached. Returns rows already in the shape the store writes.
 *
 * The per-state question is asked to the mirror once per crop
 * rather than once per state-and-crop, because the budget is
 * small and shared. Walking five states across twelve crops is
 * sixty requests to collect a week that twelve requests collect in
 * full: the mirror answers a commodity query with rows from every
 * state it holds, so the states are filtered out of the reply
 * locally rather than being asked for one at a time. That is a
 * fifth of the spend against a rate limit that throttles the whole
 * service.
 *
 * The price unit is set to the quintal the record set is read
 * with. The mirror publishes rupees per quintal without saying so
 * in the payload, and a row filed under any other unit would be
 * invisible to every query in the explorer, so the unit it is
 * actually quoted in is recorded rather than left blank.
 */
async function collectState(stateName, crop) {

    const aliases = COLLECTION_CROPS[crop];

    if (!aliases) {
        return [];
    }

    /*
     * A cooldown is reported rather than returned as no rows.
     *
     * An empty array is a truthful answer about the market — it
     * says this crop did not trade. Returning that while
     * rate-limited would say the same thing about a source that
     * was never asked, and the caller would report a quiet market
     * when the truth is that the source was unavailable.
     */
    if (isCoolingDown()) {
        throw new Error(
            `Mandi mirror is in a rate-limit cooldown for another ${Math.ceil(cooldownRemainingMs() / 1000)}s.`
        );
    }

    const accepted = aliases.map(normaliseName);
    const wanted =
        normaliseName(stateName);

    const rows = [];

    for (const commodity of aliases) {

        let records;

        try {
            records =
                await requestRows(commodity);
        } catch (error) {

            noteFailure(error);

            continue;
        }

        for (const record of records) {

            const row = toMarketRow(
                record,
                accepted
            );

            if (!row) {
                continue;
            }

            /*
             * Filtered here rather than in the query.
             *
             * A state the reply does not carry is not a state
             * that was asked about, so it is dropped silently —
             * that is the normal case for most of the five.
             */
            if (
                normaliseName(row.state) !==
                wanted
            ) {
                continue;
            }

            rows.push({
                tradeDate: row.date,
                state: row.state,
                district: row.district,
                market: row.market,
                commodityGroup: "",
                commodity: row.commodity,
                variety: row.variety,
                minPrice: row.minPrice,
                maxPrice: row.maxPrice,
                modalPrice: row.modalPrice,
                priceUnit: QUINTAL,
                arrivals: null,
                arrivalsUnit: "",
                totalArrivals: null,
                marketKey:
                    normaliseName(row.market)
            });

        }

    }

    if (rows.length) {
        noteSuccess();
    }

    return rows;
}


/*
 * Fetches every collection crop in one walk, grouped by state.
 *
 * The sweep needs the whole record set, not one state at a time,
 * and the reply to a commodity query already spans the states the
 * mirror holds. Asking per crop and bucketing the result costs one
 * request per crop for the entire sweep instead of one per
 * crop-and-state.
 *
 * Throttling is worth knowing about. The mirror answers a request
 * it has no budget for with HTTP 200 and an empty array rather than
 * an error, which is indistinguishable from a commodity that did
 * not trade — and probed directly, it will return a few hundred
 * rows and then empty arrays for everything after. So a crop that
 * comes back empty is counted, and a walk in which most crops are
 * empty is reported as throttled rather than as a quiet market,
 * because the two lead to very different conclusions about
 * whether the sweep succeeded.
 */
async function collectAll() {

    if (isCoolingDown()) {
        throw new Error(
            `Mandi mirror is in a rate-limit cooldown for another ${Math.ceil(cooldownRemainingMs() / 1000)}s.`
        );
    }

    const crops =
        Object.keys(COLLECTION_CROPS);

    const rows = [];

    let asked = 0;
    let empty = 0;
    let failed = 0;

    for (const crop of crops) {

        const aliases =
            COLLECTION_CROPS[crop];

        const accepted =
            aliases.map(normaliseName);

        for (const commodity of aliases) {

            let records;

            try {
                records =
                    await requestRows(
                        commodity
                    );
            } catch (error) {

                noteFailure(error);

                failed += 1;

                /*
                 * Stopped rather than skipped.
                 *
                 * A refused request is the mirror declining to be
                 * asked again, and the rest of this walk would
                 * only be the same refusal one request at a time.
                 * Continuing spends a budget that the next sweep
                 * needs and delays that sweep's cooldown from
                 * starting.
                 */
                if (
                    error?.response
                        ?.status === 429 ||
                    isCoolingDown()
                ) {
                    return {
                        rows,
                        asked,
                        empty,
                        failed,
                        throttled: true
                    };
                }

                continue;
            }

            asked += 1;

            if (!records.length) {
                empty += 1;
                continue;
            }

            for (const record of records) {

                const row =
                    toMarketRow(
                        record,
                        accepted
                    );

                if (!row) {
                    continue;
                }

                if (
                    !COLLECTION_STATES.includes(
                        row.state
                    )
                ) {
                    continue;
                }

                rows.push({
                    tradeDate: row.date,
                    state: row.state,
                    district: row.district,
                    market: row.market,
                    commodityGroup: "",
                    commodity: row.commodity,
                    variety: row.variety,
                    minPrice: row.minPrice,
                    maxPrice: row.maxPrice,
                    modalPrice: row.modalPrice,
                    priceUnit: QUINTAL,
                    arrivals: null,
                    arrivalsUnit: "",
                    totalArrivals: null,
                    marketKey:
                        normaliseName(
                            row.market
                        )
                });
            }
        }
    }

    if (rows.length) {
        noteSuccess();
    }

    return {
        rows,
        asked,
        empty,
        failed,
        /*
         * Empty replies across the whole walk, after at least one
         * real one, is the mirror's throttle rather than a market
         * that did not trade.
         *
         * Nothing at all is read the same way: a crop that did not
         * trade still returns a successful empty array, so no rows
         * anywhere means the source did not answer rather than
         * that no mandi in five states reported.
         */
        throttled:
            failed > 0 ||
            (asked > 0 &&
             empty === asked) ||
            (rows.length > 0 &&
             empty >= Math.ceil(asked / 2))
    };
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
    collectState,
    collectAll,
    collectionCrops: COLLECTION_CROPS,
    collectionStates: COLLECTION_STATES,
    MIRROR_URL,
    MIRROR_SOURCE,
    CROP_ALIASES
};