const agmarknet = require("./agmarknetService");
const mirror = require("./mandiMirrorService");
const store = require("./mandiStore");


/*
 * =====================================================
 * MANDI RECORD COLLECTOR
 * =====================================================
 *
 * Walks Agmarknet's national dataset into Postgres so the
 * analytics explorer can graph what the source publishes
 * rather than the twelve-crop slice the product screens use.
 *
 * The shape of the problem is that Agmarknet's unit of
 * publication is one state on one day, so a national day is
 * around thirty requests and a national week is a couple of
 * hundred. That is far too much to do inside a request, so it
 * happens here, in the background, before anyone asks.
 *
 * What this will not do:
 *
 *   - Assume a date had trading. A state asked for a Sunday
 *     either errors or answers with an older report, and the
 *     response title is what decides the date the rows are
 *     filed under. A requested date is never trusted over the
 *     date the report says it is.
 *   - Walk the whole calendar. Only the most recent trading
 *     days are collected, and only days not already logged are
 *     attempted, so an interrupted sweep resumes instead of
 *     repeating itself.
 *   - Hammer the source. States are pulled through a small
 *     worker pool rather than all at once, and a sweep that
 *     loses most of its states is left unlogged so it is
 *     retried later rather than recorded as done.
 *
 */

// One full day of history, by default. Enough for a trend
// line without a first run taking the better part of an hour.
const DEFAULT_BACKFILL_DAYS = 7;

// How many calendar days to look back for a trading day at all.
// Markets close on Sundays and national holidays, so a single
// quiet day is not an absence of data.
const MAX_CALENDAR_STEPS = 45;

// The daily refresh. Mandis report through the working day, so
// this re-walks today often enough to pick up mandis that
// reported after the last pass.
const SWEEP_INTERVAL_MS = 4 * 60 * 60 * 1000;

const STARTUP_DELAY_MS = 45 * 1000;

// States are pulled this many at a time. The reports are large
// and the host is a shared government one; three keeps a sweep
// to a few minutes without being the reason it gets blocked.
const DEFAULT_CONCURRENCY = 3;

// How many of the mirror's own most recent trading days are stored
// when it holds none of the days the sweep asked for. Small on
// purpose: this runs only while the official source is down, and
// the point is to have real rows for the explorer to read rather
// than to build a full history from the thinner source.
const FALLBACK_DAYS = 3;

let timer = null;

// The deferred first sweep is tracked separately from the repeat
// interval so a start/stop pair during the startup delay is a real
// cancel rather than a no-op.
let startupTimer = null;

let running = false;

// What the last sweep actually managed, so the status endpoint can
// say why a panel is empty instead of the panel being simply empty.
let lastSweep = {
    ranAt: null,
    rows: 0,
    usedMirror: false,
    error: null
};


function backfillDays() {

    const override =
        Number(
            process.env
                .AGMARKNET_BACKFILL_DAYS
        );

    return Number.isFinite(override) &&
        override > 0
        ? Math.min(Math.floor(override), 90)
        : DEFAULT_BACKFILL_DAYS;
}


function concurrency() {

    const override =
        Number(
            process.env
                .AGMARKNET_CONCURRENCY
        );

    return Number.isFinite(override) &&
        override > 0
        ? Math.min(Math.floor(override), 8)
        : DEFAULT_CONCURRENCY;
}


function isoDate(offsetDays = 0) {

    const date = new Date();

    date.setUTCDate(
        date.getUTCDate() - offsetDays
    );

    return date.toISOString().slice(0, 10);
}


function masterKey(name) {
    return String(name || "")
        .trim()
        .toLowerCase();
}


/**
 * Pulls the place index and keys it by market name, which is
 * how a report row is matched to a district and state.
 */
async function syncMarketIndex() {

    const entries =
        await agmarknet.fetchMarketMaster();

    const written =
        await store.saveMarkets(entries);

    const master = new Map();

    entries.forEach((entry) => {
        master.set(
            masterKey(entry.market_name),
            entry
        );
    });

    console.log(
        `   📍 place index: ${entries.length} mandis (${written} written)`
    );

    return master;
}


/**
 * The states worth asking, taken from the place index itself
 * rather than a hardcoded list, so a new state appears the
 * day Agmarknet adds it.
 */
function stateIds(master) {

    const seen = new Map();

    master.forEach((entry) => {

        const id = Number(entry.state_id);

        if (!Number.isFinite(id)) {
            return;
        }

        if (!seen.has(id)) {
            seen.set(id, {
                id,
                name:
                    String(
                        entry.state_name || ""
                    ).trim()
            });
        }

    });

    return [...seen.values()]
        .sort((a, b) => a.id - b.id);
}


/**
 * Collects one requested date across every state the place
 * index names.
 *
 * Returns what landed, and whether the day is worth logging as
 * complete. A day where most states failed is left unlogged so
 * the next sweep tries it again rather than the explorer
 * showing a thin national picture as if it were the whole one.
 */
async function collectDate(
    date,
    master,
    states,
    onProgress
) {

    let statesOk = 0;
    let rows = 0;

    const size = concurrency();

    let cursor = 0;

    async function worker() {

        while (cursor < states.length) {

            const state =
                states[cursor];

            cursor += 1;

            try {

                const report =
                    await agmarknet.fetchStateReport(
                        date,
                        state.id
                    );

                if (
                    !report.rows.length
                ) {
                    // An empty report is a state that did not
                    // trade that day, not a failure.
                    continue;
                }

                const written =
                    await store.saveReportRows(
                        report.asOn || date,
                        report.rows,
                        master
                    );

                statesOk += 1;
                rows += written;

                onProgress?.({
                    state,
                    written
                });

            } catch (error) {

                if (
                    error?.isUpstreamUnavailable
                ) {
                    // The breaker is open. Everything left in
                    // this sweep will fail the same way, so
                    // stop rather than paying a timeout per
                    // remaining state.
                    cursor = states.length;
                    throw error;
                }

                // A single state that will not answer is
                // recorded by skipping it.
            }

        }
    }

    let fatal = null;

    try {
        await Promise.all(
            Array.from(
                { length: size },
                () => worker()
            )
        );
    } catch (error) {
        fatal = error;
    }

    const complete =
        !fatal &&
        statesOk > 0 &&
        statesOk >= states.length * 0.5;

    return {
        date,
        statesOk,
        statesTotal: states.length,
        rows,
        complete
    };
}


/**
 * The most recent days that have not been collected yet.
 *
 * Today is always included: markets report through the day, so
 * a day that was walked at dawn is incomplete by evening and is
 * worth re-walking even though it is logged.
 */
async function pendingDates(depth) {

    const done =
        new Set(
            await store.collectedDates()
        );

    const dates = [];
    let walk = 0;

    while (
        dates.length < depth &&
        walk < MAX_CALENDAR_STEPS
    ) {

        const date = isoDate(walk);

        walk += 1;

        if (
            walk > 1 &&
            done.has(date)
        ) {
            continue;
        }

        dates.push(date);

    }

    return dates;
}


/*
 * The second way in, used when Agmarknet's own API cannot be
 * reached at all.
 *
 * The official API is the authority and is always tried first.
 * It is also a government host behind a bot filter, and it has
 * been observed refusing connections outright. When it refuses,
 * the primary path collects nothing at all and the whole explorer
 * sits empty, so the farmer sees "no data" and never learns that
 * the source is down rather than the market being quiet.
 *
 * This falls back to the community mirror, which republishes the
 * same Agmarknet mandi records. It covers five states rather than
 * thirty and carries no arrivals figures, so what it produces is
 * a partial national picture and not a replacement: enough for
 * every panel to show real published prices instead of nothing,
 * and it stops the record set being empty while the primary
 * source is unreachable. Agmarknet resumes as the source as soon
 * as it answers and fills the rest in.
 */
async function collectViaMirror(dates) {

    /*
     * Rows are grouped by the day they traded, not by whichever
     * day the sweep asked about. The mirror answers with whatever
     * it holds, which is often a month of trading days, and the
     * arrival date on each row is the only thing that says which
     * day it belongs to.
     */
    const byDate = new Map();

    /*
     * Set when the mirror would not answer, either because its
     * rate limit stopped the walk outright or because it returned
     * empty replies across most of it. The second is the common
     * one and it is silent: the mirror answers a request it has no
     * budget for with a success and no rows, which reads exactly
     * like a market that did not trade.
     */
    let limited = false;
    let collected;

    try {

        collected =
            await mirror.collectAll();

    } catch (error) {

        console.warn(
            `      mirror unavailable: ${error.message}`
        );

        return {
            dates: [],
            rows: 0,
            limited: true
        };
    }

    const {
        rows,
        asked,
        empty,
        failed,
        throttled
    } = collected;

    if (throttled) {
        limited = true;

        console.warn(
            failed > 0
                ? `      mirror refused ${failed} crop queries, treating as rate limited`
                : `      mirror returned nothing for ${empty} of ${asked} crop queries, treating as unavailable`
        );
    } else {
        console.log(
            `      mirror answered ${asked - empty}/${asked} crop queries`
        );
    }

    for (const row of rows) {

        if (!row.tradeDate) {
            continue;
        }

        if (!byDate.has(row.tradeDate)) {
            byDate.set(
                row.tradeDate,
                []
            );
        }

        byDate.get(
            row.tradeDate
        ).push(row);
    }

    /*
     * Days this sweep is trying to fill, and how many of them the
     * mirror can actually serve.
     *
     * The mirror republishes on its own schedule rather than
     * Agmarknet's, so the day it happens to hold is often a day or
     * two behind the window this sweep is asking about. Writing
     * nothing in that case leaves the explorer exactly as empty as
     * it was before the fallback ran, which defeats the point of
     * having one.
     *
     * So when the window comes back empty, the most recent days
     * the mirror does hold are stored instead. Those rows carry
     * their own trade date and the explorer reports that date as
     * its as-of, so an older-but-real reading is shown as an older
     * reading and never as today's.
     */
    const wanted = new Set(dates);

    let target = [...wanted];

    const inWindow =
        [...byDate.keys()].filter(
            (tradeDate) =>
                wanted.has(tradeDate)
        );

    if (inWindow.length === 0) {

        target = [
            ...byDate.keys()
        ]
            .sort()
            .reverse()
            .slice(0, FALLBACK_DAYS);

        if (target.length) {
            console.log(
                `      mirror holds none of the ${dates.length} requested day(s), using its most recent: ${target.join(", ")}`
            );
        }
    }

    const selected = new Set(target);

    let written = 0;

    for (const [tradeDate, rows] of byDate.entries()) {

        if (!selected.has(tradeDate)) {
            continue;
        }

        // The mirror carries no market ids, so there is no place
        // index to match against. The row keeps the district and
        // state the mirror published rather than being filed with
        // blanks and guessed-at geography.
        const count =
            await store.saveReportRows(
                tradeDate,
                rows,
                null
            );

        written += count;

        console.log(
            `      ${tradeDate}: ${count} records via mirror`
        );
    }

    return {
        dates: target.filter((tradeDate) =>
            byDate.has(tradeDate)
        ),
        rows: written,
        limited
    };
}


async function runSweep() {

    if (running) {
        return;
    }

    running = true;

    console.log("");
    console.log("======================================");
    console.log("🌐 MANDI RECORD SWEEP");
    console.log("======================================");

    try {

        const dates =
            await pendingDates(
                backfillDays()
            );

        console.log(
            `   📅 ${dates.length} day(s) to collect`
        );

        let collectedTotal = 0;

        /*
         * The place index and the state list both come from
         * Agmarknet, so a source that cannot be reached takes the
         * entire primary path with it. That failure used to end
         * the sweep, which is why the record set stayed empty.
         */
        let master = null;
        let states = [];

        try {

            master =
                await syncMarketIndex();

            states = stateIds(master);

        } catch (error) {

            console.warn(
                "   ⚠️  Agmarknet unreachable, falling back to the community mirror:",
                error.message
            );

        }

        if (master && states.length) {

            console.log(
                `   📍 ${states.length} states from the place index`
            );

            let collected = 0;

            for (const date of dates) {

                const result =
                    await collectDate(
                        date,
                        master,
                        states,
                        progress => {
                            console.log(
                                `      ${progress.state.name}: ${progress.written} records`
                            );
                        }
                    );

                if (result.complete) {
                    await store.markDateCollected(
                        result.date,
                        result.statesOk,
                        result.statesTotal,
                        result.rows
                    );
                }

                collected += result.rows;

                console.log(
                    `   ${result.date}: ${result.rows} records from ${result.statesOk}/${result.statesTotal} states${result.complete ? "" : " (incomplete, will retry)"}`
                );
            }

            collectedTotal = collected;
        }

        lastSweep = {
            ranAt: new Date().toISOString(),
            rows: collectedTotal,
            usedMirror: false,
            error: null
        };

        /*
         * No rows from the official source is the one outcome the
         * record set cannot recover from on its own: every panel
         * in the explorer reads from those rows and each would
         * render empty with nothing to say why. The mirror is asked
         * only in that case, so a normal sweep is never diluted by
         * a partial second source, and never pays its rate limit.
         */
        if (collectedTotal === 0) {

            console.log(
                "   ↩️  Nothing from Agmarknet, trying the community mirror"
            );

            const fallback =
                await collectViaMirror(dates);

            if (fallback.rows > 0) {

                console.log(
                    `   ✅ Mirror stored ${fallback.rows} records across ${fallback.dates.length} day(s)`
                );

                /*
                 * These days are deliberately not marked collected.
                 *
                 * Marking them would stop pendingDates asking for
                 * them again, which would freeze the mirror's five
                 * states in place forever and leave the other
                 * thirty-one states permanently empty even after
                 * Agmarknet started answering. Leaving them
                 * unlogged means the next sweep retries them, fills
                 * them properly from the official source when it is
                 * reachable, and the mirror rows are then superseded
                 * rather than being the permanent answer.
                 */
                console.log(
                    "   ↻️  Days left unlogged so the official source can supersede them"
                );

                lastSweep = {
                    ranAt: lastSweep.ranAt,
                    rows: fallback.rows,
                    usedMirror: true,
                    error: null
                };

            } else {

                console.warn(
                    fallback.limited
                        ? "   ⚠️  Agmarknet was unreachable and the community mirror is rate limited."
                        : "   ⚠️  Both sources returned nothing for these days"
                );

                lastSweep = {
                    ranAt: lastSweep.ranAt,
                    rows: 0,
                    usedMirror: true,
                    error: fallback.limited
                        ? "Agmarknet could not be reached and the community mirror is rate limited. The next sweep retries."
                        : "Neither Agmarknet nor the community mirror returned records for these days."
                };
            }
        }

    } catch (error) {

        console.warn(
            "⚠️  Mandi sweep failed:",
            error.message
        );

        lastSweep = {
            ranAt: new Date().toISOString(),
            rows: 0,
            usedMirror: false,
            error: error.message
        };
    }

    console.log("======================================");
    console.log("");

    running = false;
}


/**
 * Starts the sweep, once per process.
 *
 * The handle is taken before the delay rather than inside it.
 * The first sweep is deliberately deferred so it does not compete
 * with boot for the database, and because the handle was only
 * claimed once that delay had elapsed, two starts landing in the
 * same window both passed the guard and queued a second sweep and
 * a second interval — two walks of the same upstream at once.
 */
function start() {

    if (timer || startupTimer) {
        return;
    }

    startupTimer = setTimeout(() => {

        startupTimer = null;

        runSweep().catch((error) =>
            console.warn(
                "⚠️  Mandi sweep failed:",
                error.message
            )
        );

        timer = setInterval(() => {
            runSweep().catch((error) =>
                console.warn(
                    "⚠️  Mandi sweep failed:",
                    error.message
                )
            );
        }, SWEEP_INTERVAL_MS);

        if (timer.unref) {
            timer.unref();
        }

    }, STARTUP_DELAY_MS);

    if (startupTimer.unref) {
        startupTimer.unref();
    }
}


/**
 * Cancels both the deferred first sweep and the repeat interval.
 *
 * Clearing only the interval left the deferred sweep free to fire
 * after a stop, so a shutdown could still be followed by a full
 * upstream walk.
 */
function stop() {

    if (startupTimer) {
        clearTimeout(startupTimer);
        startupTimer = null;
    }

    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}


/**
 * Whether a sweep is in flight, so a caller can decline a
 * second one instead of starting a competing walk of the same
 * upstream.
 */
function isRunning() {
    return running;
}


/**
 * What the sweep last managed, for the status endpoint.
 *
 * A record set that is empty because the upstream is down and one
 * that is empty because no market traded look identical to a
 * visitor otherwise, and the second reading sends people looking
 * for a market problem that is not there.
 */
function sweepState() {
    return { ...lastSweep };
}


module.exports = {
    start,
    sweepState,
    stop,
    runSweep,
    pendingDates,
    collectDate,
    syncMarketIndex,
    isRunning
};