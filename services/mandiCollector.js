const agmarknet = require("./agmarknetService");
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

let timer = null;
let running = false;


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

        const master =
            await syncMarketIndex();

        const states =
            stateIds(master);

        const dates =
            await pendingDates(
                backfillDays()
            );

        console.log(
            `   📅 ${dates.length} day(s) to collect across ${states.length} states`
        );

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

            console.log(
                `   ${result.date}: ${result.rows} records from ${result.statesOk}/${result.statesTotal} states${result.complete ? "" : " (incomplete, will retry)"}`
            );

        }

    } catch (error) {
        console.warn(
            "⚠️  Mandi sweep failed:",
            error.message
        );
    }

    console.log("======================================");
    console.log("");

    running = false;
}


function start() {

    if (timer) {
        return;
    }

    setTimeout(() => {

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
}


function stop() {

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


module.exports = {
    start,
    stop,
    runSweep,
    pendingDates,
    collectDate,
    syncMarketIndex,
    isRunning
};