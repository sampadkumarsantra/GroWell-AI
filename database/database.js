const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "growell.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("🌱 GroWell AI database connected");
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {

        if (err) {
            console.error(
                "❌ Users table creation failed:",
                err.message
            );
        } else {
            console.log("✅ Users table ready");
        }

    });

});

module.exports = db;