const db = require("../database/pool");


/*
 * =====================================================
 * MARKET SNAPSHOT STORE
 * =====================================================
 *
 * Holds the last good price payload per crop in Postgres.
 *
 * The in-memory cache is fast but dies with the process, and on
 * a platform that redeploys or scales that means losing every
 * price during a government outage — exactly when the farmer
 * most needs to see the number he already had. This is the
 * durable copy.
 *
*/

// node-postgres reports a refused connection as an
// AggregateError with an empty message, which produces a
// useless warning. Fall back to a stringified form so a
// database problem is always legible in the logs.
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


async function saveSnapshot(
    crop,
    payload,
    source,
    priceDate
) {

    try {

        await db.run(
            `INSERT INTO market_snapshots
                (crop, payload, source, price_date,
                 captured_at)
             VALUES ($1, $2::jsonb, $3, $4, NOW())
             ON CONFLICT (crop) DO UPDATE SET
                payload = EXCLUDED.payload,
                source = EXCLUDED.source,
                price_date = EXCLUDED.price_date,
                captured_at = NOW()`,
            [
                crop,
                JSON.stringify(payload),
                source,
                priceDate || null
            ]
        );

        return true;

    } catch (error) {

        console.warn(
            "⚠️  Could not store market snapshot:",
            describe(error)
        );

        return false;
    }
}


async function readSnapshot(crop) {

    try {

        const row = await db.get(
            `SELECT payload, source, price_date,
                    captured_at
             FROM market_snapshots
             WHERE crop = $1`,
            [crop]
        );

        if (!row) {
            return null;
        }

        return {
            payload: row.payload,
            source: row.source,
            priceDate: row.price_date,
            capturedAt: row.captured_at
        };

    } catch (error) {

        // A missing table must not break the page; the caller
        // falls through to "unavailable".
        console.warn(
            "⚠️  Could not read market snapshot:",
            describe(error)
        );

        return null;
    }
}


module.exports = {
    saveSnapshot,
    readSnapshot
};