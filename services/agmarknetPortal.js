const agmarknet = require("./agmarknetService");

const mirror = require("./mandiMirrorService");


/*
 * =====================================================
 * AGMARKNET PORTAL
 * =====================================================
 *
 * One payload describing the whole published picture for every
 * crop the app shows, built from Agmarknet's daily state report.
 *
 * Why this is separate from the per-crop answer:
 *
 *   The per-crop answer is one national figure, which is what a
 *   chat reply needs and all a price-over-time line needs. An
 *   Agmarknet-style portal needs the shape of the market instead
 *   of its middle: which state pays most, which district inside
 *   it, which mandi, how many varieties, how much arrived, and
 *   where the price sits in its own range.
 *
 *   Asking the per-crop endpoint twelve times cannot produce
 *   those answers, because each call re-derives the same national
 *   average and discards the rows that hold the detail.
 *
 *   The daily state report is the opposite shape. One request per
 *   state returns every commodity, variety, mandi, price range and
 *   arrival figure for that day, so the twelve crops become a
 *   grouping over one set of requests rather than twelve parallel
 *   walks of the same government host.
 *
 * What each crop carries:
 *
 *   summary      the national picture, one line per figure
 *   states       average, range and volume by state
 *   districts    the same one level down
 *   mandis       the ledger, ranked, for the table and export
 *   varieties    what each variety fetched
 *   arrivals     volume by state, where published
 *   distribution how the mandis spread across price bands
 *   history      the national average per trading day
 *
 * Rules that shape the numbers:
 *
 *   - Only quintal prices are averaged. A tonne or per-piece
 *     figure is not comparable, and folding it into a national
 *     average would pull the number toward nonsense. Those rows
 *     are counted and named, never silently mixed in.
 *   - Averages weight one voice per reporting mandi, not per row.
 *     A mandi listing four varieties is one observation of its
 *     market's price level; counting it four times lets a single
 *     busy mandi decide the national figure.
 *   - The trade date is the date the rows carry, never the fetch
 *     time. Mandi reporting lags the calendar, and "just updated"
 *     printed over last week's price costs a farmer money.
 *   - Every crop answers on its own. One state whose report
 *     fails costs that state's figures rather than the page, and a
 *     crop Agmarknet does not publish carries a stated reason
 *     instead of an empty object that reads as a quiet market.
 */

const SOURCE =
    "Agmarknet (Directorate of Marketing & Inspection)";

const BASIS =
    "Daily commodity & market-wise report, DMI";

const AGMARKNET_ORIGIN =
    "Agmarknet (Directorate of Marketing & Inspection)";

// A crop answered by the mirror rather than by Agmarknet, named on
// the card so the figures are never read as the government record.
const MIRROR_ORIGIN =
    "Mandi mirror (third-party republication of Agmarknet)";

// Markets trade on working days, so a week of calendar is
// usually five figures.
const HISTORY_DAYS = 6;

// The ledger for a large crop runs past a thousand mandis, more
// than any table uses and more than a phone renders. What exists
// is counted separately so a truncated list never reads as scarce
// supply.
const LEDGER_LIMIT = 400;

const DISTRIBUTION_BUCKETS = 18;

/*
 * Plausible Rs./quintal band per crop.
 *
 * The upstream guard only rejects a price below Rs 1 or above
 * Rs 5,00,000, which stops a parsing error but not a unit that
 * was mislabelled upstream: Rania APMC publishes its tomato at
 * "Rs./Quintal" for Rs 1.29, a per-kg figure wearing a quintal
 * label. Left in, one such row drags a national average down by
 * hundreds of rupees.
 *
 * The band is a guard, not a filter to hide behind. Anything
 * outside it is counted, the count travels with the crop, and the
 * ledger marks the row rather than dropping it silently, so a
 * genuinely unusual market can still be inspected and the
 * exclusion is visible rather than implied.
 *
 * Ranges are wide where the crop genuinely trades across a wide
 * band (chilli runs from Byadgi powder to Guntur export) and tight
 * where a figure outside it is a mistake.
 */
const PLAUSIBLE = {
    Rice: [1200, 12000],
    Wheat: [1100, 8000],
    Maize: [900, 7000],
    Turmeric: [4000, 60000],
    Chilli: [5000, 90000],
    Cotton: [3000, 30000],
    Groundnut: [2500, 25000],
    Mustard: [2500, 25000],
    Soybean: [1800, 20000],
    Onion: [400, 25000],
    Tomato: [150, 15000],
    Potato: [150, 10000]
};

// Short of the upstream report cache, because the portal only
// re-groups rows the reports already hold.
const PORTAL_TTL_MS = 20 * 60 * 1000;

// Matches the report cache in the upstream service, so the portal
// does not hold a history series that the reports behind it have
// already expired.
const HISTORY_TTL_MS = 30 * 60 * 1000;


let portalCache = null;

let portalInFlight = null;

const historyCache = new Map();

const historyInFlight = new Map();


// =====================================================
// SMALL HELPERS
// =====================================================


function isoDate(offsetDays = 0) {

    const date = new Date();

    date.setDate(
        date.getDate() - offsetDays
    );

    return date.toISOString().slice(0, 10);
}


function isQuintal(row) {
    return agmarknet.isQuintalUnit(row.priceUnit);
}


/**
 * Whether a row's price sits inside the crop's own band.
 *
 * Checked against the modal, since that is the figure every
 * average here rests on. A range that disagrees with its own
 * modal has already been collapsed to the modal upstream.
 */
function isPlausible(crop, row) {

    const band = PLAUSIBLE[crop];

    if (!band || row.modalPrice === null) {
        return true;
    }

    return (
        row.modalPrice >= band[0] &&
        row.modalPrice <= band[1]
    );
}


function round(value, places = 0) {

    if (value === null || value === undefined) {
        return null;
    }

    const factor = 10 ** places;

    return Math.round(value * factor) / factor;
}


function mean(values) {

    if (!values.length) {
        return null;
    }

    return values.reduce(
        (sum, value) => sum + value,
        0
    ) / values.length;
}


/**
 * One average per reporting mandi.
 *
 * Weighting by mandi rather than by row is the whole point: four
 * varieties from one market are one voice about that market, and
 * a national average has to say so or let a single reporter
 * speak for the country.
 */
function mandiAverages(rows) {

    const byMarket = new Map();

    rows.forEach((row) => {

        if (row.modalPrice === null) {
            return;
        }

        if (!byMarket.has(row.market)) {
            byMarket.set(row.market, []);
        }

        byMarket.get(row.market).push(
            row.modalPrice
        );
    });

    const points = [];

    byMarket.forEach((prices, market) => {
        points.push({
            market,
            price: mean(prices)
        });
    });

    return points;
}


/**
 * The national picture for a set of per-mandi points.
 *
 * Returns null rather than zeros when there is nothing to
 * measure, so a caller can tell an absent figure from a real
 * zero instead of charting a floor that was never reported.
 */
function summarise(points) {

    if (!points.length) {
        return null;
    }

    const prices = points.map(
        (point) => point.price
    );

    const average = mean(prices);

    const deviation = Math.sqrt(
        mean(
            prices.map(
                (price) => (price - average) ** 2
            )
        )
    );

    const high = points.reduce(
        (top, point) =>
            point.price > top.price ? point : top
    );

    const low = points.reduce(
        (bottom, point) =>
            point.price < bottom.price
                ? point
                : bottom
    );

    return {
        mandis: points.length,
        average: round(average),
        low: round(low.price),
        high: round(high.price),
        spread: round(high.price - low.price),
        deviation: round(deviation),
        // How far the mandis disagree, as a share of the average.
        // A wide figure means the headline average is describing
        // two different markets rather than one.
        dispersion: round(
            average > 0
                ? (deviation / average) * 100
                : 0,
            1
        ),
        highMandi: high.market,
        lowMandi: low.market
    };
}


/** Summarises rows under each value of `keyOf`. */
function groupBy(
    rows,
    keyOf,
    { volume = false, extra } = {}
) {

    const groups = new Map();

    rows.forEach((row) => {

        const key = keyOf(row);

        if (!key) {
            return;
        }

        if (!groups.has(key)) {
            groups.set(key, []);
        }

        groups.get(key).push(row);
    });

    const out = [];

    groups.forEach((entries, name) => {

        const stats = summarise(
            mandiAverages(entries)
        );

        if (!stats) {
            return;
        }

        const tonnes = volume
            ? entries.reduce(
                  (sum, entry) =>
                      sum +
                      (entry.tonnes || 0),
                  0
              )
            : null;

        out.push({
            name,
            ...stats,
            ...(volume
                ? { arrivals: round(tonnes, 1) }
                : {}),
            varieties: new Set(
                entries
                    .map(
                        (entry) => entry.variety
                    )
                    .filter(Boolean)
            ).size,
            ...(extra
                ? extra(entries, name)
                : {})
        });
    });

    return out.sort(
        (a, b) => b.average - a.average
    );
}


/**
 * Splits the mandis into price bands.
 *
 * Bands are cut from the data's own low and high rather than
 * fixed rupee steps, because these crops span three orders of
 * magnitude: a fixed step would stack every onion into one bar
 * and leave turmeric with none.
 */
function distribution(
    points,
    buckets = DISTRIBUTION_BUCKETS
) {

    const stats = summarise(points);

    if (!stats || stats.high <= stats.low) {
        return [];
    }

    const width =
        (stats.high - stats.low) / buckets;

    const counts = new Array(buckets).fill(0);

    points.forEach((point) => {

        const index = Math.max(
            0,
            Math.min(
                buckets - 1,
                Math.floor(
                    (point.price - stats.low) /
                        width
                )
            )
        );

        counts[index] += 1;
    });

    return counts.map((records, index) => ({
        bucket: index + 1,
        from: round(stats.low + width * index),
        to: round(
            stats.low + width * (index + 1)
        ),
        records
    }));
}


/**
 * Arrivals arrive in several units and only tonnes compare.
 *
 * Bundles, bags and pieces are kept as their own tally rather
 * than converted, because a converter would be a guess and a
 * guessed tonnage is worse than a stated "not comparable".
 */
function toTonnes(row) {

    const value = agmarknet.toNumber(
        row.arrivals
    );

    if (value === null) {
        return 0;
    }

    const unit = String(
        row.arrivalsUnit || ""
    )
        .trim()
        .toLowerCase();

    if (unit === "metric tonnes") {
        return value;
    }

    return 0;
}


// =====================================================
// ONE CROP
// =====================================================


function buildCrop(
    crop,
    rows,
    asOn,
    origin = {
        origin: AGMARKNET_ORIGIN,
        mirrorRows: 0
    },
    feedDown = false
) {

    const published = rows.length;

    const official = published - (origin.mirrorRows || 0);

    /*
     * Only quintal rows, and only rows whose modal sits inside
     * this crop's own price band, may be averaged. Rows outside it
     * are kept in `excluded` with the reason attached, so the
     * guard is visible and a reader can disagree with it.
     */
    const quintal = rows.filter(isQuintal);

    const excluded = quintal.filter(
        (row) => !isPlausible(crop, row)
    );

    const comparable = quintal.filter((row) =>
        isPlausible(crop, row)
    );

    const points = mandiAverages(comparable);

    const stats = summarise(points);

    const missing = missingCrop(crop, rows);

    /*
     * Rows that traded but were published outside Rs./Quintal are
     * a different situation from a crop with no rows at all, and
     * the portal says which it is. A crop that did trade must not
     * look identical to a crop nobody reported.
     */
    if (!stats) {
        return {
            crop,
            available: false,
            asOn,
            rows: published,
            /*
             * Carried on both branches so the page can read one
             * shape. `compared` is the honest count here: no row
             * survived the unit and plausibility checks, so none
             * were compared.
             */
            officialRows: published,
            compared: 0,
            skippedUnits: published,
            reason:
                missing ||
                /*
                 * An empty crop and an unreachable feed are two
                 * different facts. Saying "no record for this
                 * trading day" about a state set that never
                 * answered would tell a farmer the market was
                 * still, when the truth is that nobody reported
                 * it because the feed refused to answer. The
                 * caller passes `upstreamFailed` so this reads
                 * as a gap in the feed rather than a quiet
                 * market.
                 */
                (feedDown
                    ? "The Agmarknet report could not be reached just now, so this crop's figures are not shown. This is a gap in the feed, not a market with no trading."
                    : published
                      ? `Published for ${published} mandi row(s), but not in Rs./Quintal, so the figures cannot be compared across mandis.`
                      : "Agmarknet published no record for this trading day."),
            summary: null,
            /*
             * Carried empty rather than absent. The page reads
             * these on every card, and a field that is missing on
             * the unavailable case but present on the available
             * one is a field the page has to guard against
             * instead of one it can rely on.
             */
            excluded: [],
            states: [],
            districts: [],
            mandis: [],
            mandisTotal: 0,
            varieties: [],
            arrivals: [],
            distribution: []
        };
    }

    const ledger = comparable
        .map((row) => ({
            market: row.market,
            district: row.district,
            state: row.state,
            variety: row.variety || "Unspecified",
            min: round(row.minPrice),
            modal: round(row.modalPrice),
            max: round(row.maxPrice),
            /*
             * Only tonnes reach the table's volume column. A
             * figure in bundles stays out rather than being
             * summed into something the column cannot mean.
             */
            arrivals: toTonnes(row) || null
        }))
        .sort((a, b) => b.modal - a.modal);

    return {
        crop,
        available: true,
        asOn,
        source: origin.origin,
        rows: published,
        officialRows: official,
        compared: comparable.length,
        skippedUnits: published - comparable.length,
        excluded: excluded.map((row) => ({
            market: row.market,
            district: row.district,
            state: row.state,
            variety: row.variety || "Unspecified",
            modal: round(row.modalPrice),
            reason: `Outside the plausible ${crop} band of Rs.${PLAUSIBLE[crop][0]} to Rs.${PLAUSIBLE[crop][1]} per quintal.`
        })),
        summary: stats,
        states: groupBy(
            comparable,
            (row) => row.state,
            { volume: true }
        ),
        districts: groupBy(
            comparable,
            (row) =>
                row.district
                    ? `${row.state} / ${row.district}`
                    : "",
            {
                volume: true,
                extra: (entries) => ({
                    state: entries[0].state,
                    district: entries[0].district
                })
            }
        ),
        mandis: ledger.slice(0, LEDGER_LIMIT),
        mandisTotal: ledger.length,
        varieties: groupBy(
            comparable,
            (row) => row.variety || "Unspecified"
        ),
        arrivals: groupBy(
            comparable,
            (row) => row.state,
            { volume: true }
        )
            .filter(
                (entry) => entry.arrivals > 0
            )
            .map((entry) => ({
                state: entry.name,
                arrivals: entry.arrivals
            })),
        distribution: distribution(points),
        note: missing || mirrorNote(origin)
    };
}


/**
 * Why a crop has no rows, in the portal's own words.
 *
 * Only for the crops Agmarknet genuinely does not publish, so the
 * card can explain itself instead of sitting blank.
 */
/**
 * Why a crop is answered by the mirror rather than Agmarknet.
 *
 * Stated on the card, because the portal's whole promise is that a
 * reader knows which body published the number they are about to
 * act on.
 */
function mirrorNote(origin) {

    if (origin.origin !== MIRROR_ORIGIN) {
        return null;
    }

    return "Agmarknet publishes no turmeric line, so these figures come from a third-party mirror of Agmarknet. It is not an official source, it republishes price only with no arrivals, and it lags the current day, so confirm the rate at your mandi before selling.";
}


function missingCrop(crop, rows) {

    if (rows.length || agmarknet.supports(crop)) {
        return null;
    }

    return "Agmarknet publishes no turmeric line, so these figures come from a third-party mirror of Agmarknet. It is not an official source and it lags the current day, so confirm the rate at your mandi before selling.";
}


/**
 * Fills a crop Agmarknet does not publish from the mirror.
 *
 * Turmeric is the whole reason this exists. Agmarknet carries no
 * turmeric line at all, so the portal would show it as a blank
 * card next to eleven real ones, and a blank reads as "nothing
 * traded" when the truth is "nobody publishes this".
 *
 * The mirror rows are reshaped into the same row shape the
 * official report produces so every chart and table below can
 * treat the crop like any other. What is not reshaped is the
 * attribution: `origin` travels with the crop so the page can
 * label the source, and the mirror has no arrivals to give, so
 * the volume columns say so rather than showing zero.
 */
async function fillFromMirror(crop) {

    if (!mirror.supports(crop)) {
        return null;
    }

    const result = await mirror.fetchCrop(crop);

    const rows = result.markets.map((row) => ({
        tradeDate: row.date || result.asOn,
        state: row.state,
        district: row.district,
        market: row.market,
        commodity: row.commodity,
        variety: row.variety,
        minPrice: row.minPrice,
        maxPrice: row.maxPrice,
        modalPrice: row.modalPrice,
        /*
         * The mirror republishes a quintal price with no unit
         * field, so the unit is marked as carried over rather
         * than published. The crop's `origin` travels with the
         * card so the page can say which body published it, and
         * the reason string on the card repeats it, so the
         * assumption is visible instead of implied.
         */
        priceUnit: "Rs./Quintal",
        unitAssumed: true,
        origin: MIRROR_ORIGIN,
        arrivals: null,
        arrivalsUnit: "",
        tonnes: 0
    }));

    if (!rows.length) {
        return null;
    }

    return { rows, asOn: result.asOn };
}


// =====================================================
// STATE REPORTS
// =====================================================


/**
 * Every published row for the most recent trading day.
 *
 * Walks the calendar back the same way the per-crop fetch does,
 * so the portal and the crop prices on the same screen cannot
 * disagree about which day it is. A state whose report fails is
 * dropped and named in `statesMissing` rather than quietly
 * shrinking the national figure.
 */
async function collectDay() {

    const stateIds = agmarknet.configuredStates();

    for (let step = 0; step <= 3; step += 1) {

        const date = isoDate(step);

        const settled =
            await Promise.all(
                stateIds.map((stateId) =>
                    agmarknet
                        .fetchStateReport(
                            date,
                            stateId
                        )
                        .catch(() => null)
                )
            );

        const usable = settled.filter(Boolean);

        const rows = [];

        usable.forEach((report) => {
            rows.push(...report.rows);
        });

        if (rows.length) {
            return {
                date,
                rows,
                statesReported: usable.length,
                statesMissing: stateIds.length -
                    usable.length,
                feedDown: false
            };
        }

        /*
         * No state answered for this date.
         *
         * Whether that is a holiday or a refused feed is told
         * apart here, because the two produce the same empty
         * result and the reader deserves the truth: a refused feed
         * is not a market that did not trade. Remembering the
         * failures lets the crop cards say so instead of
         * reporting a national average nobody published.
         */
        const refused = settled.filter(
            (report) => report === null
        ).length;

        if (refused === settled.length) {
            return {
                date,
                rows: [],
                statesReported: 0,
                statesMissing: stateIds.length,
                feedDown: true
            };
        }
    }

    /*
     * Every date walked, and every one of them answered with rows
     * on the way past. Only reachable when a date produced no
     * usable rows at all, which upstream reports should not do.
     */
    return {
        date: null,
        rows: [],
        statesReported: 0,
        statesMissing: stateIds.length,
        feedDown: false
    };
}


/**
 * Fills in the district each mandi sits in.
 *
 * The daily report names the mandi and its state; the district
 * lives in Agmarknet's separate market master. Resolving it here
 * is what lets the portal rank districts rather than only
 * states. A mandi the master does not know keeps its price with
 * an empty district, never a guessed one.
 */
async function withDistricts(rows) {

    if (!rows.length) {
        return rows;
    }

    const master =
        await agmarknet.fetchMarketMaster().catch(
            () => null
        );

    if (!master) {
        return rows.map((row) => ({
            ...row,
            district: ""
        }));
    }

    const districts = new Map();

    master.forEach((entry) => {
        districts.set(
            String(entry.market_name || "")
                .trim()
                .toLowerCase(),
            entry.district_name || ""
        );
    });

    return rows.map((row) => ({
        ...row,
        district:
            districts.get(
                String(row.market || "")
                    .trim()
                    .toLowerCase()
            ) || "",
        tonnes: toTonnes(row)
    }));
}


// =====================================================
// HISTORY
// =====================================================


/**
 * The national average per trading day for one crop.
 *
 * Carries the number of contributing mandis beside every point,
 * because an average drawn from three mandis and one drawn from
 * four hundred are not the same claim. A line that hid that would
 * look steady precisely when the coverage was thin.
 */
async function buildHistory(crop, days = HISTORY_DAYS) {

    const aliases = agmarknet.CROP_ALIASES[crop];

    if (!aliases || !aliases.length) {
        return [];
    }

    const wanted = aliases.map((alias) =>
        alias.toLowerCase()
    );

    const stateIds = agmarknet.configuredStates();

    const history = [];

    for (let step = 0; step < days; step += 1) {

        const date = isoDate(step);

        const reports =
            await Promise.all(
                stateIds.map((stateId) =>
                    agmarknet
                        .fetchStateReport(
                            date,
                            stateId
                        )
                        .catch(() => null)
                )
            );

        const rows = [];

        reports.filter(Boolean).forEach((report) => {
            report.rows.forEach((row) => {
                if (
                    wanted.includes(
                        row.commodity.toLowerCase()
                    )
                ) {
                    rows.push(row);
                }
            });
        });

        const stats = summarise(
            mandiAverages(
                rows.filter(
                    (row) =>
                        isQuintal(row) &&
                        isPlausible(crop, row)
                )
            )
        );

        if (stats) {
            history.push({
                date,
                average: stats.average,
                low: stats.low,
                high: stats.high,
                mandis: stats.mandis
            });
        }
    }

    return history.reverse();
}


/** History for one crop, cached so a reopened page is instant. */
async function fetchCropHistory(
    crop,
    days = HISTORY_DAYS
) {

    const key = `${crop}:${days}`;

    const cached = historyCache.get(key);

    if (
        cached &&
        Date.now() - cached.fetchedAt <
            HISTORY_TTL_MS
    ) {
        return cached.history;
    }

    if (historyInFlight.has(key)) {
        return historyInFlight.get(key);
    }

    const request = buildHistory(crop, days)
        .then((history) => {
            historyCache.set(key, {
                history,
                fetchedAt: Date.now()
            });
            return history;
        })
        .finally(() => {
            historyInFlight.delete(key);
        });

    historyInFlight.set(key, request);

    return request;
}


// =====================================================
// PUBLIC
// =====================================================


/**
 * The whole portal, for every crop the app shows.
 *
 * Cached for the same stretch the upstream reports are, because
 * the underlying reports are cached too and a re-group over the
 * same rows would not find anything new.
 */
async function buildPortal() {

    if (
        portalCache &&
        Date.now() - portalCache.fetchedAt <
            PORTAL_TTL_MS
    ) {
        return portalCache.payload;
    }

    if (portalInFlight) {
        return portalInFlight;
    }

    const request = (async () => {

        const day = await collectDay();

        const rows = await withDistricts(day.rows);

        const aliases = agmarknet.CROP_ALIASES;

        const names = Object.keys(aliases);

        const crops = [];

        for (const crop of names) {

            const wanted = aliases[crop].map(
                (alias) => alias.toLowerCase()
            );

            let cropRows = rows.filter((row) =>
                wanted.includes(
                    row.commodity.toLowerCase()
                )
            );

            let asOn = day.date;

            let publishedBy = {
                origin: AGMARKNET_ORIGIN,
                mirrorRows: 0
            };

            /*
             * No official rows for a crop Agmarknet does not
             * publish is not the same as a quiet market. Turmeric
             * is filled from the mirror so the portal answers for
             * all twelve crops, and the card it produces says
             * which body published it.
             */
            if (
                !cropRows.length &&
                !agmarknet.supports(crop)
            ) {

                const filled =
                    await fillFromMirror(crop).catch(
                        () => null
                    );

                if (filled) {
                    cropRows = filled.rows;
                    asOn = filled.asOn;
                    publishedBy = {
                        origin: MIRROR_ORIGIN,
                        mirrorRows: cropRows.length
                    };
                }
            }

            crops.push(
                buildCrop(
                    crop,
                    cropRows,
                    asOn,
                    publishedBy,
                    day.feedDown
                )
            );
        }

        const payload = {
            source: SOURCE,
            basis: BASIS,
            unit: "Rs. per quintal",
            asOn: day.date,
            /*
             * Carried at the top level as well as per crop, so the
             * page can state the coverage once instead of
             * implying a national figure from whatever happened
             * to answer. A portal that quietly drops the states
             * which refused to report is the one thing this must
             * not be.
             */
            coverage: {
                statesReported: day.statesReported,
                statesMissing: day.statesMissing,
                feedDown: day.feedDown,
                rows: rows.length,
                mandis: new Set(
                    rows.map((row) => row.market)
                ).size,
                states: [
                    ...new Set(
                        rows
                            .map((row) => row.state)
                            .filter(Boolean)
                    )
                ].sort()
            },
            crops,
            fetchedAt: new Date().toISOString()
        };

        portalCache = {
            payload,
            fetchedAt: Date.now()
        };

        return payload;
    })().finally(() => {
        portalInFlight = null;
    });

    portalInFlight = request;

    return request;
}


function hasCrop(crop) {
    return Boolean(
        agmarknet.CROP_ALIASES[crop]
    );
}


module.exports = {
    buildPortal,
    fetchCropHistory,
    hasCrop,
    HISTORY_DAYS,
    SOURCE,
    BASIS
};