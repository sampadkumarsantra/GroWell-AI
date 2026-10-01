const { all, run } = require("./pool");


// =====================================================
// SCHEMA
// =====================================================

const MIGRATIONS = [
    {
        id: "001_users",
        up: `
            CREATE TABLE IF NOT EXISTS users (
                id             SERIAL PRIMARY KEY,
                name           TEXT NOT NULL,
                email          TEXT UNIQUE NOT NULL,
                password       TEXT NOT NULL,
                picture        TEXT DEFAULT '',
                google_id      TEXT UNIQUE,
                created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `
    },

    {
        id: "002_subscriptions",
        up: `
            CREATE TABLE IF NOT EXISTS subscriptions (
                id                      SERIAL PRIMARY KEY,
                user_id                 INTEGER NOT NULL UNIQUE
                                        REFERENCES users(id)
                                        ON DELETE CASCADE,

                plan                    TEXT NOT NULL
                                        DEFAULT 'free',

                status                  TEXT NOT NULL
                                        DEFAULT 'none',

                razorpay_customer_id    TEXT,
                razorpay_subscription_id TEXT,
                razorpay_plan_id        TEXT,

                current_period_start    TIMESTAMPTZ,
                current_period_end      TIMESTAMPTZ,

                cancel_at_period_end    BOOLEAN NOT NULL
                                        DEFAULT FALSE,

                created_at              TIMESTAMPTZ
                                        NOT NULL DEFAULT NOW(),

                updated_at              TIMESTAMPTZ
                                        NOT NULL DEFAULT NOW()
            )
        `
    },

    {
        id: "003_subscription_indexes",
        up: `
            CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay_sub_id
                ON subscriptions (razorpay_subscription_id);

            CREATE INDEX IF NOT EXISTS idx_subscriptions_status
                ON subscriptions (status)
        `
    },

    {
        id: "004_usage_events",
        up: `
            CREATE TABLE IF NOT EXISTS usage_events (
                id          SERIAL PRIMARY KEY,
                user_id     INTEGER NOT NULL
                            REFERENCES users(id)
                            ON DELETE CASCADE,

                kind        TEXT NOT NULL,

                created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `
    },

    {
        id: "005_usage_indexes",
        up: `
            CREATE INDEX IF NOT EXISTS idx_usage_user_kind_time
                ON usage_events (user_id, kind, created_at)
        `
    },

    {
        // The last good price per crop, kept in the database so
        // prices survive a deploy or a restart while the
        // government feed is down. The API is frequently
        // unreachable, and a farmer must never see an empty
        // price because a process bounced.
        id: "006_market_snapshots",
        up: `
            CREATE TABLE IF NOT EXISTS market_snapshots (
                crop          TEXT PRIMARY KEY,
                payload       JSONB NOT NULL,
                source        TEXT NOT NULL,
                captured_at   TIMESTAMPTZ NOT NULL
                              DEFAULT NOW(),
                price_date    TEXT
            )
        `
    },

    {
        id: "007_market_snapshot_indexes",
        up: `
            CREATE INDEX IF NOT EXISTS idx_market_snapshots_captured
                ON market_snapshots (captured_at)
        `
    },

    {
        /*
         * The place index Agmarknet publishes: every mandi it
         * knows with the state and district it sits in.
         *
         * market_snapshots holds one JSON blob per crop, which
         * is right for serving a single price but cannot answer
         * "how many mandis does Gujarat have" or back a map.
         */
        id: "008_mandi_markets",
        up: `
            CREATE TABLE IF NOT EXISTS mandi_markets (
                market_id     INTEGER PRIMARY KEY,
                market_name   TEXT NOT NULL,
                district_id   INTEGER,
                district_name TEXT NOT NULL DEFAULT '',
                state_id      INTEGER,
                state_name    TEXT NOT NULL DEFAULT '',
                synced_at     TIMESTAMPTZ NOT NULL
                              DEFAULT NOW()
            )
        `
    },

    {
        id: "009_mandi_market_indexes",
        up: `
            CREATE INDEX IF NOT EXISTS idx_mandi_markets_state
                ON mandi_markets (state_name);
            CREATE INDEX IF NOT EXISTS idx_mandi_markets_district
                ON mandi_markets (district_name)
        `
    },

    {
        /*
         * Every price record Agmarknet publishes, one row per
         * mandi per variety per day, kept as rows rather than a
         * JSON blob so it can be aggregated and graphed.
         *
         * This is the difference between a snapshot and a record.
         * A snapshot is the answer to one question asked once; a
         * record is what the source actually said, kept whole so
         * questions that have not been thought of yet can still
         * be answered.
         *
         * The price unit is stored as published and never
         * converted: one report carries Rs./Quintal, Rs./Bundle
         * and Rs./Unit lines side by side, and a weight for a
         * bundle is not in the record. Comparable reads filter
         * on price_unit rather than the writer dropping rows.
         */
        id: "010_mandi_prices",
        up: `
            CREATE TABLE IF NOT EXISTS mandi_prices (
                id              BIGSERIAL PRIMARY KEY,

                trade_date      DATE NOT NULL,

                commodity_group TEXT NOT NULL DEFAULT '',
                commodity       TEXT NOT NULL,
                variety         TEXT NOT NULL DEFAULT '',

                market_id       INTEGER,
                market          TEXT NOT NULL,
                district        TEXT NOT NULL DEFAULT '',
                district_id     INTEGER,
                state           TEXT NOT NULL DEFAULT '',
                state_id        INTEGER,

                min_price       NUMERIC,
                max_price       NUMERIC,
                modal_price     NUMERIC NOT NULL,
                price_unit      TEXT NOT NULL DEFAULT '',

                arrivals        NUMERIC,
                arrivals_unit   TEXT NOT NULL DEFAULT '',
                total_arrivals  NUMERIC,

                collected_at    TIMESTAMPTZ NOT NULL
                                DEFAULT NOW(),

                UNIQUE (
                    trade_date,
                    commodity,
                    variety,
                    market,
                    price_unit
                )
            )
        `
    },

    {
        id: "011_mandi_price_indexes",
        up: `
            CREATE INDEX IF NOT EXISTS idx_mandi_prices_date
                ON mandi_prices (trade_date);
            CREATE INDEX IF NOT EXISTS idx_mandi_prices_commodity_date
                ON mandi_prices (commodity, trade_date);
            CREATE INDEX IF NOT EXISTS idx_mandi_prices_state_date
                ON mandi_prices (state, trade_date);
            CREATE INDEX IF NOT EXISTS idx_mandi_prices_market
                ON mandi_prices (market);
            CREATE INDEX IF NOT EXISTS idx_mandi_prices_group
                ON mandi_prices (commodity_group)
        `
    },

    {
        /*
         * Which trading days the sweep has already walked.
         *
         * Agmarknet answers a date with no trading with a report
         * that is empty or absent, so the sweep has to try dates
         * rather than assume them. Recording what it did is what
         * makes a multi-day backfill resumable instead of
         * restarting the same requests on every deploy.
         */
        id: "012_mandi_collection_log",
        up: `
            CREATE TABLE IF NOT EXISTS mandi_collection_log (
                trade_date  DATE PRIMARY KEY,
                states_ok   INTEGER NOT NULL DEFAULT 0,
                states_total INTEGER NOT NULL DEFAULT 0,
                rows        INTEGER NOT NULL DEFAULT 0,
                completed_at TIMESTAMPTZ NOT NULL
                             DEFAULT NOW()
            )
        `
    }
];


// =====================================================
// RUNNER
// =====================================================

async function migrate() {

    console.log("");
    console.log("======================================");
    console.log("🗄️  GroWell AI Database");
    console.log("======================================");

    if (!process.env.DATABASE_URL) {
        throw new Error(
            "DATABASE_URL is not set. Premium billing cannot run without a durable database."
        );
    }

    await run(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id          TEXT PRIMARY KEY,
            applied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `);

    const applied = new Set(
        (
            await all("SELECT id FROM schema_migrations")
        ).map((row) => row.id)
    );

    for (const migration of MIGRATIONS) {

        if (applied.has(migration.id)) {
            continue;
        }

        await run(migration.up);
        await run(
            "INSERT INTO schema_migrations (id) VALUES ($1)",
            [migration.id]
        );

        console.log(`   ✅ applied ${migration.id}`);
    }

    console.log("✅ Database ready");
    console.log("======================================");
    console.log("");
}

module.exports = {
    migrate
};
