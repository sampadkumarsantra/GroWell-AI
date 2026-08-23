const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "growell.db");

const db = new Database(dbPath);

console.log("SQLite database connected");

db.pragma("journal_mode = WAL");

module.exports = db;