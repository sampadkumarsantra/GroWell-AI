const db = require("../database/pool");


/*
 * =====================================================
 * MANDI RECORD STORE
 * =====================================================
 *
 * Reads and writes the Agmarknet record set: the place index,
 * every published price record, and the log of which trading
 * days the sweep has walked.
 *
 * Two conventions run through this file.
 *
 * First, NUMERIC and DATE come back from node-postgres as
 * strings and Date objects. Every numeric column is cast to
 * float8 in SQL and every date to text, so nothing downstream
 * has to know that.
 *
 * Second, nothing here filters by price unit on write. A report
 * carries Rs./Quintal, Rs./Bundle and Rs./Unit lines together,
 * and a bundle is a count of baskets rather than a weight, so
 * the writer stores the unit as published and the reader picks
 * the comparable set.
 */

const QUINTAL = "Rs./Quintal";


function describe(error) {
    return (
        error?.message ||
        (Array.isArray(error?.errors) &&
            error.errors
                .map((inner) => inner.message)
                .join("; ")) ||
        String(error) ||
        "unknown error"
    );
}


function isMissingTable(error) {
    return (
        error?.code === "42P01" ||
        /does not exist/i.test(
            error?.message || ""
        )
    );
}


// =====================================================
// WRITE
// =====================================================


/**
 * Stores the place index. market_id is Agmarknet's own, so a
 * market that appears in two reports is one row, not two.
 */
async function saveMarkets(entries) {

    // market_id is the primary key, so an entry without one
    // cannot be keyed and an id repeated within one call would
    // be the same row twice. Agmarknet always supplies both,
    // but a duplicate in one statement is rejected outright, so
    // neither is allowed through.
    const seen = new Set();

    const rows = entries
        .map((entry) => [
            toId(entry.market_id),
            String(entry.market_name || "").trim(),
            toId(entry.district_id),
            String(entry.district_name || "").trim(),
            toId(entry.state_id),
            String(entry.state_name || "").trim()
        ])
        .filter((row) => {
            if (!row[1] || row[0] === null) {
                return false;
            }

            if (seen.has(row[0])) {
                return false;
            }

            seen.add(row[0]);
            return true;
        });

    if (rows.length === 0) {
        return 0;
    }

    try {

        await db.run(
            `INSERT INTO mandi_markets
                (market_id, market_name, district_id,
                 district_name, state_id, state_name)
             SELECT * FROM UNNEST(
                 $1::int[], $2::text[], $3::int[],
                 $4::text[], $5::int[], $6::text[]
             )
             ON CONFLICT (market_id) DO UPDATE SET
                market_name = EXCLUDED.market_name,
                district_id = EXCLUDED.district_id,
                district_name =
                    EXCLUDED.district_name,
                state_id = EXCLUDED.state_id,
                state_name = EXCLUDED.state_name,
                synced_at = NOW()`,
            [
                rows.map((row) => row[0]),
                rows.map((row) => row[1]),
                rows.map((row) => row[2]),
                rows.map((row) => row[3]),
                rows.map((row) => row[4]),
                rows.map((row) => row[5])
            ]
        );

        return rows.length;

    } catch (error) {
        console.warn(
            "⚠️  Could not store mandi place index:",
            describe(error)
        );
        return 0;
    }
}


function toId(value) {

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : null;
}


/**
 * Stores one state's report for one day.
 *
 * Written in chunks because a single Maharashtra report is
 * several thousand rows and Postgres caps a statement at
 * 65535 bound parameters.
 *
 * A report can repeat the same market, commodity and variety
 * more than once, and two such rows in one statement is not
 * something Postgres will accept: ON CONFLICT DO UPDATE
 * cannot touch the same row twice. The last one wins, which is
 * the one carrying the latest figure the market reported.
 */
async function saveReportRows(
    tradeDate,
    rows,
    master
) {

const deduped = new Map();

    rows.forEach((row) => {

        // JSON-stringified rather than joined on a delimiter:
        // a commodity or market name can contain almost any
        // character, and a separator that collides with the data
        // would silently fold two different records into one.
        deduped.set(
            JSON.stringify([
                row.commodity,
                row.variety,
                row.market,
                row.priceUnit
            ]),
            row
        );

    });

    const values = [...deduped.values()].map(
        (row) => {

            const place =
                master?.get(row.marketKey);

            return [
                tradeDate,
                row.commodityGroup || "",
                row.commodity,
                row.variety || "",
                toId(place?.market_id),
                row.market,
                place?.district_name || "",
                toId(place?.district_id),
                place?.state_name || row.state || "",
                toId(place?.state_id),
                row.minPrice,
                row.maxPrice,
                row.modalPrice,
                row.priceUnit || "",
                row.arrivals,
                row.arrivalsUnit || "",
                row.totalArrivals
            ];

        }
    );

    if (values.length === 0) {
        return 0;
    }

    const COLUMNS = 17;
    const CHUNK = 2000;

    let written = 0;

    for (
        let start = 0;
        start < values.length;
        start += CHUNK
    ) {

        const slice =
            values.slice(start, start + CHUNK);

        const params = [];
        const tuples = [];

        slice.forEach((value, rowIndex) => {

            const offset =
                rowIndex * COLUMNS;

            const placeholders =
                value
                    .map(
                        (_, columnIndex) =>
                            `$${offset + columnIndex + 1}`
                    )
                    .join(", ");

            tuples.push(
                `(${placeholders})`
            );

            value.forEach((entry) =>
                params.push(entry)
            );

        });

        try {

            await db.run(
                `INSERT INTO mandi_prices
                    (trade_date, commodity_group,
                     commodity, variety, market_id,
                     market, district, district_id,
                     state, state_id, min_price,
                     max_price, modal_price,
                     price_unit, arrivals,
                     arrivals_unit, total_arrivals)
                 VALUES ${tuples.join(", ")}
                 ON CONFLICT (
                     trade_date, commodity, variety,
                     market, price_unit
                 ) DO UPDATE SET
                    commodity_group =
                        EXCLUDED.commodity_group,
                    market_id = EXCLUDED.market_id,
                    district = EXCLUDED.district,
                    district_id = EXCLUDED.district_id,
                    state = EXCLUDED.state,
                    state_id = EXCLUDED.state_id,
                    min_price = EXCLUDED.min_price,
                    max_price = EXCLUDED.max_price,
                    modal_price = EXCLUDED.modal_price,
                    arrivals = EXCLUDED.arrivals,
                    arrivals_unit =
                        EXCLUDED.arrivals_unit,
                    total_arrivals =
                        EXCLUDED.total_arrivals,
                    collected_at = NOW()`,
                params
            );

            written += slice.length;

        } catch (error) {
            console.warn(
                "⚠️  Could not store mandi records:",
                describe(error)
            );
            return written;
        }

    }

    return written;
}


async function markDateCollected(
    tradeDate,
    statesOk,
    statesTotal,
    rows
) {

    try {

        await db.run(
            `INSERT INTO mandi_collection_log
                (trade_date, states_ok, states_total,
                 rows, completed_at)
             VALUES ($1, $2, $3, $4, NOW())
             ON CONFLICT (trade_date) DO UPDATE SET
                states_ok = EXCLUDED.states_ok,
                states_total = EXCLUDED.states_total,
                rows = EXCLUDED.rows,
                completed_at = NOW()`,
            [
                tradeDate,
                statesOk,
                statesTotal,
                rows
            ]
        );

        return true;

    } catch (error) {
        console.warn(
            "⚠️  Could not record collection state:",
            describe(error)
        );
        return false;
    }
}


async function collectedDates() {

    try {

        const rows = await db.all(
            `SELECT trade_date::text AS trade_date
             FROM mandi_collection_log
             ORDER BY trade_date DESC`
        );

        return rows.map(
            (row) => row.trade_date
        );

    } catch (error) {
        return [];
    }
}


// =====================================================
// READ
// =====================================================


/**
 * What the explorer opens on: which days are stored, how much
 * is in them, and the filter vocabulary.
 */
async function readStatus() {

    const empty = {
        ready: false,
        dates: [],
        latestDate: null,
        totals: {
            records: 0,
            commodities: 0,
            varieties: 0,
            markets: 0,
            states: 0,
            districts: 0,
            groups: 0,
            days: 0
        },
        marketsInIndex: 0,
        states: [],
        districts: [],
        groups: [],
        commodities: [],
        lastCollectedAt: null,
        error: null
    };

    let dates;

    try {

        dates = await db.all(
            `SELECT trade_date::text AS trade_date,
                    COUNT(*)::int AS records,
                    MAX(collected_at) AS collected_at
             FROM mandi_prices
             GROUP BY trade_date
             ORDER BY trade_date DESC
             LIMIT 90`
        );
    } catch (error) {

        if (isMissingTable(error)) {
            return empty;
        }

        console.warn(
            "⚠️  Could not read mandi status:",
            describe(error)
        );

        // A read that failed is not the same thing as a table
        // that has not been collected into yet. Reporting both
        // as "still collecting" leaves the explorer waiting on
        // a sweep that can never fix a broken query, so the
        // reason is passed up and shown instead.
        return {
            ...empty,
            error: describe(error)
        };

    }

    if (dates.length === 0) {
        return empty;
    }

    const dateList = dates.map(
        (row) => row.trade_date
    );

    const inList = dateList
        .map((_, index) => `$${index + 1}`)
        .join(", ");

    const [totals, marketsInIndex, states,
        districts, groups, commodities] =
        await Promise.all([
            db.get(
                `SELECT
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT commodity)::int
                        AS commodities,
                    COUNT(DISTINCT variety)::int
                        AS varieties,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    COUNT(DISTINCT state)::int
                        AS states,
                    COUNT(DISTINCT district)::int
                        AS districts,
                    COUNT(DISTINCT commodity_group)::int
                        AS groups
                 FROM mandi_prices
                 WHERE trade_date IN (${inList})`,
                dateList
            ),
            db.get(
                `SELECT COUNT(*)::int AS total
                 FROM mandi_markets`
            ).catch(() => ({ total: 0 })),
            db.all(
                `SELECT DISTINCT state
                 FROM mandi_prices
                 WHERE state <> ''
                 ORDER BY state`
            ),
            db.all(
                `SELECT DISTINCT district
                 FROM mandi_prices
                 WHERE district <> ''
                 ORDER BY district`
            ),
            db.all(
                `SELECT DISTINCT commodity_group
                 FROM mandi_prices
                 WHERE commodity_group <> ''
                 ORDER BY commodity_group`
            ),
            db.all(
                `SELECT DISTINCT commodity
                 FROM mandi_prices
                 ORDER BY commodity`
            )
        ]);

    return {
        ready: true,
        dates: dates.map((row) => ({
            date: row.trade_date,
            records: row.records,
            collectedAt: row.completed_at
        })),
        latestDate: dateList[0] || null,
        totals,
        marketsInIndex: marketsInIndex?.total || 0,
        states: states.map((row) => row.state),
        districts: districts.map(
            (row) => row.district
        ),
        groups: groups.map(
            (row) => row.commodity_group
        ),
        commodities: commodities.map(
            (row) => row.commodity
        ),
        lastCollectedAt: dates[0]?.collected_at || null
    };


}


/**
 * The national view for one trading day: what was traded, where,
 * in what volume, and how the prices are spread.
 */
async function readOverview({
    date,
    group,
    state
}) {

    const filters = ["trade_date = $1"];
    const params = [date];

    if (group) {
        params.push(group);
        filters.push(`commodity_group = $${params.length}`);
    }

    if (state) {
        params.push(state);
        filters.push(`state = $${params.length}`);
    }

    const where = filters.join(" AND ");

    const [headline, byState, byGroup,
        topCommodities, topStatesByArrivals] =
        await Promise.all([

            db.get(
                `SELECT
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT commodity)::int
                        AS commodities,
                    COUNT(DISTINCT variety)::int
                        AS varieties,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    COUNT(DISTINCT state)::int
                        AS states,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8
                        AS lowestPrice,
                    MAX(modal_price)::float8
                        AS highestPrice,
                    SUM(arrivals)::float8 AS arrivals,
                    COUNT(DISTINCT price_unit)::int
                        AS priceUnits
                 FROM mandi_prices
                 WHERE ${where}
                   AND price_unit = ${
                       params.length + 1
                   }`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT state,
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT commodity)::int
                        AS commodities,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8
                        AS lowestPrice,
                    MAX(modal_price)::float8
                        AS highestPrice,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${where}
                   AND price_unit = ${
                       params.length + 1
                   }
                 GROUP BY state
                 ORDER BY records DESC`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT commodity_group,
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT commodity)::int
                        AS commodities,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${where}
                   AND price_unit = ${
                       params.length + 1
                   }
                 GROUP BY commodity_group
                 ORDER BY records DESC`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT commodity,
                    commodity_group,
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8
                        AS lowestPrice,
                    MAX(modal_price)::float8
                        AS highestPrice,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${where}
                   AND price_unit = ${
                       params.length + 1
                   }
                 GROUP BY commodity, commodity_group
                 ORDER BY records DESC
                 LIMIT 20`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT state,
                    ROUND(SUM(arrivals)::numeric, 1)
                        AS arrivals
                 FROM mandi_prices
                 WHERE ${where}
                   AND arrivals_unit = 'Metric Tonnes'
                 GROUP BY state
                 ORDER BY arrivals DESC
                 LIMIT 15`,
                params
            )
        ]);

    return {
        date,
        headline,
        byState,
        byGroup,
        topCommodities,
        topStatesByArrivals
    };
}


/**
 * Everything one commodity says across the stored days and
 * mandis: its trend, its geography, its varieties, and the
 * mandis quoting it.
 */
async function readCommodity({
    commodity,
    days,
    state
}) {

    const filters = ["commodity = $1"];
    const params = [commodity];

    if (days) {
        params.push(days);
        filters.push(
            `trade_date >= (
                SELECT MAX(trade_date)
                FROM mandi_prices
             ) - (
                $${params.length}::int
                * INTERVAL '1 day'
             )`
        );
    }

    if (state) {
        params.push(state);
        filters.push(`state = $${params.length}`);
    }

    const where = filters.join(" AND ");

    const quintalWhere = `${where} AND price_unit = $${
        params.length + 1
    }`;

    const [series, byState, byVariety, byGroup,
        markets, headline] =
        await Promise.all([

            db.all(
                `SELECT trade_date::text AS date,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8 AS low,
                    MAX(modal_price)::float8 AS high,
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${quintalWhere}
                 GROUP BY trade_date
                 ORDER BY trade_date`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT state,
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8 AS low,
                    MAX(modal_price)::float8 AS high,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${quintalWhere}
                 GROUP BY state
                 ORDER BY records DESC`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT variety,
                    COUNT(*)::int AS records,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8 AS low,
                    MAX(modal_price)::float8 AS high
                 FROM mandi_prices
                 WHERE ${quintalWhere}
                   AND variety <> ''
                 GROUP BY variety
                 ORDER BY records DESC
                 LIMIT 30`,
                [...params, QUINTAL]
            ),

            db.all(
                `SELECT commodity_group,
                    COUNT(*)::int AS records
                 FROM mandi_prices
                 WHERE ${where}
                 GROUP BY commodity_group`,
                params
            ),

            db.all(
                `SELECT trade_date::text AS date,
                    market, district, state,
                    variety,
                    modal_price::float8 AS modalPrice,
                    min_price::float8 AS minPrice,
                    max_price::float8 AS maxPrice,
                    price_unit AS priceUnit,
                    arrivals::float8 AS arrivals,
                    arrivals_unit AS arrivalsUnit
                 FROM mandi_prices
                 WHERE ${where}
                   AND modal_price IS NOT NULL
                 ORDER BY modal_price DESC
                 LIMIT 400`,
                params
            ),

            db.get(
                `SELECT
                    COUNT(*)::int AS records,
                    COUNT(DISTINCT trade_date)::int
                        AS days,
                    COUNT(DISTINCT market)::int
                        AS markets,
                    COUNT(DISTINCT state)::int
                        AS states,
                    COUNT(DISTINCT variety)::int
                        AS varieties,
                    ROUND(AVG(modal_price)::numeric, 2)
                        AS averagePrice,
                    MIN(modal_price)::float8
                        AS lowestPrice,
                    MAX(modal_price)::float8
                        AS highestPrice,
                    SUM(arrivals)::float8 AS arrivals
                 FROM mandi_prices
                 WHERE ${quintalWhere}`,
                [...params, QUINTAL]
            )
        ]);

    return {
        commodity,
        headline,
        series,
        byState,
        byVariety,
        byGroup,
        markets
    };
}


/**
 * A price distribution as buckets, computed in SQL so a
 * commodity with forty thousand records does not have to be
 * walked to the client to be counted.
 */
async function readDistribution({
    commodity,
    date,
    buckets
}) {

    const filters = [];
    const params = [];

    if (commodity) {
        params.push(commodity);
        filters.push(
            `commodity = $${params.length}`
        );
    }

    if (date) {
        params.push(date);
        filters.push(
            `trade_date = $${params.length}`
        );
    }

    const where = [
        ...filters,
        `price_unit = $${params.length + 1}`,
        "modal_price IS NOT NULL"
    ].join(" AND ");

    const bound =
        Math.max(
            4,
            Math.min(Number(buckets) || 20, 40)
        );

    let bounds;

    try {

        bounds = await db.get(
            `SELECT MIN(modal_price)::float8 AS low,
                    MAX(modal_price)::float8 AS high
             FROM mandi_prices
             WHERE ${where}`,
            [...params, QUINTAL]
        );

    } catch (error) {
        return [];
    }

    const low = Number(bounds?.low);
    const high = Number(bounds?.high);

    if (
        !Number.isFinite(low) ||
        !Number.isFinite(high) ||
        high <= low
    ) {
        return [];
    }

    const width = (high - low) / bound;

    const rows = await db.all(
        `SELECT
            width_bucket(
                modal_price,
                $${params.length + 2}::float8,
                $${params.length + 3}::float8,
                $${params.length + 4}::int
            ) AS bucket,
            COUNT(*)::int AS records
         FROM mandi_prices
         WHERE ${where}
         GROUP BY bucket
         ORDER BY bucket`,
        [
            ...params,
            QUINTAL,
            low,
            high,
            bound
        ]
    );

    const counts = new Map(
        rows.map((row) => [
            Number(row.bucket),
            Number(row.records)
        ])
    );

    return Array.from(
        { length: bound },
        (_, index) => {

            const position = index + 1;

            return {
                bucket: position,
                from: Math.round(
                    low + width * index
                ),
                to: Math.round(
                    low + width * (index + 1)
                ),
                records:
                    counts.get(position) || 0
            };

        }
    );
}


/**
 * The market ledger: every stored record for a day, filtered
 * and paged, for the table view.
 */
async function readMandis({
    date,
    commodity,
    state,
    district,
    search,
    limit,
    offset
}) {

    const filters = ["trade_date = $1"];
    const params = [date];

    if (commodity) {
        params.push(commodity);
        filters.push(`commodity = $${params.length}`);
    }

    if (state) {
        params.push(state);
        filters.push(`state = $${params.length}`);
    }

    if (district) {
        params.push(district);
        filters.push(`district = $${params.length}`);
    }

    if (search) {
        params.push(`%${search}%`);
        filters.push(
            `market ILIKE $${params.length}`
        );
    }

    const where = filters.join(" AND ");

// LIMIT and OFFSET are interpolated rather than bound, because
// Postgres will not accept a parameter there. Both are floored:
// a fractional one is a syntax error, not a shorter page.
const capped = Math.floor(
    Math.max(
        1,
        Math.min(Number(limit) || 50, 200)
    )
);

const start = Math.floor(
    Math.max(0, Number(offset) || 0)
);

    const rows = await db.all(
        `SELECT market, district, state,
            commodity, variety,
            modal_price::float8 AS modalPrice,
            min_price::float8 AS minPrice,
            max_price::float8 AS maxPrice,
            price_unit AS priceUnit,
            arrivals::float8 AS arrivals,
            arrivals_unit AS arrivalsUnit
         FROM mandi_prices
         WHERE ${where}
         ORDER BY state, district, market,
            modal_price DESC NULLS LAST
         LIMIT ${capped}
         OFFSET ${start}`,
        params
    );

    const total = await db.get(
        `SELECT COUNT(*)::int AS count
         FROM mandi_prices
         WHERE ${where}`,
        params
    );

    return {
        rows,
        total: Number(total?.count) || 0
    };
}


/**
 * The most recent trading day actually stored, which is what
 * every view defaults to. Asking for today would show an empty
 * national picture on a morning when the sweep has not run yet.
 */
async function latestTradeDate() {

    try {

        const row = await db.get(
            `SELECT MAX(trade_date)::text AS trade_date
             FROM mandi_prices`
        );

        return row?.trade_date || null;

    } catch (error) {
        return null;
    }
}


module.exports = {
    QUINTAL,
    saveMarkets,
    saveReportRows,
    markDateCollected,
    collectedDates,
    latestTradeDate,
    readStatus,
    readOverview,
    readCommodity,
    readDistribution,
    readMandis
};