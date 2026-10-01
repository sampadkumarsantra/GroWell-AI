const express = require("express");

const store = require("../services/mandiStore");
const collector = require("../services/mandiCollector");


/*
 * =====================================================
 * AGMARKNET RECORD ROUTES
 * =====================================================
 *
 * Serves the stored Agmarknet record set to the analytics
 * explorer.
 *
 * Every route reads the database and nothing else. The sweep
 * owns the network, so opening the explorer costs one indexed
 * query rather than thirty upstream requests, and a government
 * outage shows the last collected days instead of an error
 * page.
 *
 * These are aggregates over public price data, so none of them
 * 500: a collector that has not run yet is a normal first-load
 * state and is reported as "not collected yet" rather than as a
 * failure.
 */

const router = express.Router();


const SOURCE =
    "Agmarknet (Directorate of Marketing & Inspection)";

const NOT_COLLECTED =
    "GroWell is still collecting the national Agmarknet record. This normally finishes within a few minutes of a deploy and then refreshes every few hours. The per-crop view beside this one is live now.";


function text(value, fallback = "") {
    const trimmed =
        String(value ?? "").trim();
    return trimmed || fallback;
}


function positiveInt(value, fallback) {

    const parsed = Number(value);

    return Number.isFinite(parsed) && parsed > 0
        ? Math.floor(parsed)
        : fallback;
}


/**
 * Resolves the day a request is asking about, defaulting to the
 * latest day actually stored.
 */
async function resolveDate(requested) {

    const explicit = text(requested);

    if (explicit) {
        return explicit;
    }

    return store.latestTradeDate();
}


function unavailable(res, message = NOT_COLLECTED) {

    return res.json({
        success: true,
        available: false,
        source: SOURCE,
        message,
        records: []
    });
}


// =====================================================
// STATUS
// =====================================================

router.get("/status", async (req, res) => {

    try {

        const status =
            await store.readStatus();

        /*
         * The sweep's own account of itself rides along with the
         * stored record set.
         *
         * A record set that is empty because the upstream refused
         * the connection and one that is empty because no market
         * traded are the same payload to a visitor otherwise, and
         * the first reading is the one that matters: it says the
         * data is missing rather than that the market was quiet.
         */
        const sweep =
            collector.sweepState();

        return res.json({
            success: true,
            source: SOURCE,
            sweep: {
                running:
                    collector.isRunning(),
                ranAt: sweep.ranAt,
                rows: sweep.rows,
                usedMirror: sweep.usedMirror,
                error: sweep.error
            },
            ...status
        });

    } catch (error) {

        console.error(
            "❌ AGMARKNET STATUS ERROR:",
            error.message
        );

        return unavailable(res);

    }

});


// =====================================================
// OVERVIEW
// =====================================================

router.get("/overview", async (req, res) => {

    try {

        const date =
            await resolveDate(req.query.date);

        if (!date) {
            return unavailable(res);
        }

        const [overview, distribution] =
            await Promise.all([
                store.readOverview({
                    date,
                    group: text(req.query.group),
                    state: text(req.query.state)
                }),
                store.readDistribution({
                    date,
                    buckets: positiveInt(
                        req.query.buckets,
                        22
                    )
                })
            ]);

        if (!overview) {
            return unavailable(res);
        }

        return res.json({
            success: true,
            available: true,
            source: SOURCE,
            ...overview,
            distribution:
                distribution ?? []
        });

    } catch (error) {

        console.error(
            "❌ AGMARKNET OVERVIEW ERROR:",
            error.message
        );

        return unavailable(res);

    }

});


// =====================================================
// COMMODITY
// =====================================================

router.get("/commodity", async (req, res) => {

    try {

        const commodity =
            text(req.query.commodity);

        if (!commodity) {
            return res.status(400).json({
                success: false,
                message:
                    "A commodity is required."
            });
        }

        const days = positiveInt(
            req.query.days,
            null
        );

        const [detail, distribution] =
            await Promise.all([
                store.readCommodity({
                    commodity,
                    days,
                    state: text(req.query.state)
                }),
                store.readDistribution({
                    commodity,
                    buckets: positiveInt(
                        req.query.buckets,
                        20
                    )
                })
            ]);

        if (!detail?.headline?.records) {
            return unavailable(
                res,
                `No collected record for ${commodity} yet.`
            );
        }

        return res.json({
            success: true,
            available: true,
            source: SOURCE,
            days,
            ...detail,
            distribution
        });

    } catch (error) {

        console.error(
            "❌ AGMARKNET COMMODITY ERROR:",
            error.message
        );

        return unavailable(res);

    }

});


// =====================================================
// MARKET LEDGER
// =====================================================

router.get("/mandis", async (req, res) => {

    try {

        const date =
            await resolveDate(req.query.date);

        if (!date) {
            return unavailable(res);
        }

        const result =
            await store.readMandis({
                date,
                commodity: text(req.query.commodity),
                state: text(req.query.state),
                district: text(req.query.district),
                search: text(req.query.search),
                limit: positiveInt(
                    req.query.limit,
                    50
                ),
                offset: Math.floor(
                    Math.max(
                        0,
                        Number(req.query.offset) || 0
                    )
                )
            });

        return res.json({
            success: true,
            available: true,
            source: SOURCE,
            date,
            // The paging shape is promised even when the query
            // came back with nothing, so a client reading rows
            // never has to guard against a missing key.
            rows: result?.rows ?? [],
            total: Number(result?.total) || 0
        });

    } catch (error) {

        console.error(
            "❌ AGMARKNET MANDI LEDGER ERROR:",
            error.message
        );

        return unavailable(res);

    }

});


// =====================================================
// SWEEP CONTROL
// =====================================================
//
// The collector runs on a schedule and needs no page to
// trigger it. These exist so a deploy can be topped up
// without waiting for the timer.

router.post("/sweep", async (req, res) => {

    if (collector.isRunning()) {
        return res.json({
            success: false,
            message:
                "A collection sweep is already running."
        });
    }

    res.json({
        success: true,
        message:
            "Collection started. It runs in the background and the explorer fills in as each day lands."
    });

    collector.runSweep().catch((error) =>
        console.warn(
            "⚠️  Mandi sweep failed:",
            error.message
        )
    );

});


module.exports = router;