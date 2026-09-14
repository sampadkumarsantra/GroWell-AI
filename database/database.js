const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "growell.db");

const db = new sqlite3.Database(
    dbPath,
    (err) => {
        if (err) {
            console.error("❌ Database connection failed:", err);
        } else {
            console.log("✅ SQLite database connected");
        }
    }
);


// Create users table

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`);


module.exports = db;