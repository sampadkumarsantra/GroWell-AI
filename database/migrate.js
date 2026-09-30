const { get, run } = require("./pool");


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
