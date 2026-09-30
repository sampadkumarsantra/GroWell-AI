const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;

// =====================================================
// CONNECTION POOL
// =====================================================

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl:
        process.env.DATABASE_SSL === "false"
            ? false
            : {
                  rejectUnauthorized: false
              },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});

pool.on("error", (error) => {
    console.error(
        "❌ Unexpected PostgreSQL pool error:",
        error
    );
});


// =====================================================
// QUERY HELPERS
// =====================================================

/**
 * Runs a SELECT and returns every row.
 */
async function all(text, params = []) {
    const result = await pool.query(text, params);
    return result.rows;
}

/**
 * Runs a SELECT and returns the first row, or null.
 */
async function get(text, params = []) {
    const result = await pool.query(text, params);
    return result.rows[0] || null;
}

/**
 * Runs an INSERT / UPDATE / DELETE and returns the affected row count.
 */
async function run(text, params = []) {
    const result = await pool.query(text, params);
    return result.rowCount;
}

module.exports = {
    pool,
    all,
    get,
    run
};
