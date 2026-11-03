/*
 * Refresh the committed mandi price cache (services/mandi_cache.json)
 * from data.gov.in AGMARKNET.
 *
 * The production server cannot reach data.gov.in from its US region
 * (connection refused/unreachable), so the Market page is served from
 * this cache. Run this on a machine that can reach data.gov.in (e.g.
 * your laptop in India), then commit and push the updated cache:
 *
 *   npm run market:refresh
 *   git add services/mandi_cache.json
 *   git commit -m "Update mandi cache"
 *   git push
 *
 * The script never touches the existing cache unless a complete,
 * validated fetch succeeds. A failed run simply reports the error and
 * leaves the old cache intact:
 *
 *   npm run market:refresh -- --dry-run
 *
 * --dry-run fetches and validates everything but writes nothing.
 */

require("dotenv").config();

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const axios = require("axios");

const DATA_GOV_API_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const CACHE_FILE_PATH = path.join(__dirname, "..", "services", "mandi_cache.json");
const REQUEST_TIMEOUT_MS = 60000;
const CHUNK_LIMIT = 10000;
const MAX_RETRIES = 4;
const RETRY_DELAYS_MS = [3000, 8000, 15000];

// Sanity floor: refuse to overwrite the cache with a suspiciously
// small payload. The full dataset is ~16,000 records.
const MIN_EXPECTED_RECORDS = 5000;

const isDryRun = process.argv.includes("--dry-run");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchChunk(offset) {
    let lastError = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await axios.get(DATA_GOV_API_URL, {
                params: {
                    "api-key": process.env.DATA_GOV_API_KEY,
                    format: "json",
                    limit: CHUNK_LIMIT,
                    offset
                },
                timeout: REQUEST_TIMEOUT_MS
            });

            return response.data?.records || [];
        } catch (error) {
            lastError = error;
            const status = error.response?.status;
            const retryable = !status || status === 400 || status === 429 || status >= 500;

            if (!retryable || attempt === MAX_RETRIES) {
                break;
            }

            const delay = RETRY_DELAYS_MS[Math.min(attempt, RETRY_DELAYS_MS.length - 1)];
            console.warn(
                `Chunk offset=${offset} attempt ${attempt + 1} failed` +
                (status ? ` (HTTP ${status})` : ` (${error.message})`) +
                ` — retrying in ${delay / 1000}s...`
            );
            await sleep(delay);
        }
    }

    const status = lastError?.response?.status;
    const detail = lastError?.response?.data
        ? JSON.stringify(lastError.response.data)
        : lastError?.message;
    throw new Error(`Failed to fetch chunk offset=${offset}${status ? ` (HTTP ${status})` : ""}: ${detail}`);
}

function stableRecordKey(r) {
    return [
        r.state, r.district, r.market || r.mandi, r.commodity,
        r.variety, r.grade,
        r.arrival_date || r.date,
        r.min_price, r.max_price, r.modal_price
    ].map((v) => String(v ?? "").trim()).join("|");
}

// Fingerprint of the record set, independent of row order and of the
// volatile "timestamp" field — lets us detect "nothing changed today".
function fingerprintRecords(records) {
    const keys = records.map(stableRecordKey).sort();
    const hash = crypto.createHash("sha256");
    hash.update(keys.join("\n"));
    return hash.digest("hex");
}

function existingCacheFingerprint() {
    try {
        if (!fs.existsSync(CACHE_FILE_PATH)) {
            return null;
        }

        const parsed = JSON.parse(fs.readFileSync(CACHE_FILE_PATH, "utf8"));

        if (!Array.isArray(parsed.records) || parsed.records.length === 0) {
            return null;
        }

        return fingerprintRecords(parsed.records);
    } catch {
        return null;
    }
}

function validateRecords(records) {
    const usable = records.filter((r) =>
        r &&
        String(r.commodity || "").trim() &&
        Number(r.modal_price) > 0 &&
        String(r.state || "").trim() &&
        String(r.market || "").trim()
    );

    return usable;
}

async function main() {
    if (!process.env.DATA_GOV_API_KEY) {
        throw new Error("DATA_GOV_API_KEY is missing from .env");
    }

    const apiKeyState = process.env.DATA_GOV_API_KEY.trim().length > 0 ? "set" : "empty";
    console.log(`data.gov.in key: ${apiKeyState}`);
    console.log("Fetching chunk 1/2 (offset 0)...");
    const first = await fetchChunk(0);
    console.log(`  -> ${first.length} records`);

    // The second chunk only exists when the first one is full.
    let second = [];
    if (first.length >= CHUNK_LIMIT) {
        console.log("Fetching chunk 2/2 (offset 10000)...");
        second = await fetchChunk(CHUNK_LIMIT);
        console.log(`  -> ${second.length} records`);
    }

    const combined = [...first, ...second];
    const usable = validateRecords(combined);

    if (usable.length < MIN_EXPECTED_RECORDS) {
        throw new Error(
            `Only ${usable.length} usable records (expected at least ${MIN_EXPECTED_RECORDS}). ` +
            "Refusing to overwrite the cache."
        );
    }

    const payload = {
        timestamp: Date.now(),
        total: combined.length,
        records: combined
    };

    const arrivalDate = combined.find((r) => r.arrival_date)?.arrival_date || "unknown";
    const commodities = new Set(combined.map((r) => (r.commodity || "").trim()).filter(Boolean));
    const states = new Set(combined.map((r) => (r.state || "").trim()).filter(Boolean));

    console.log("");
    console.log("Fetch summary");
    console.log("─────────────");
    console.log(`Total records   : ${combined.length}`);
    console.log(`Usable records  : ${usable.length}`);
    console.log(`Commodities     : ${commodities.size}`);
    console.log(`States          : ${states.size}`);
    console.log(`Arrival date    : ${arrivalDate}`);

    const newFingerprint = fingerprintRecords(combined);
    const oldFingerprint = existingCacheFingerprint();

    if (oldFingerprint && oldFingerprint === newFingerprint) {
        console.log("\nNo price changes since the last refresh — cache left as-is.");
        return;
    }

    if (isDryRun) {
        console.log("\n--dry-run: changes detected (or no cache yet), nothing written.");
        return;
    }

    // Write atomically so a crash mid-write can never corrupt the cache.
    const tmpPath = CACHE_FILE_PATH + ".tmp";
    fs.writeFileSync(tmpPath, JSON.stringify(payload), "utf8");
    fs.renameSync(tmpPath, CACHE_FILE_PATH);

    const sizeMb = (fs.statSync(CACHE_FILE_PATH).size / (1024 * 1024)).toFixed(2);
    console.log(`\nCache written to ${path.relative(process.cwd(), CACHE_FILE_PATH)} (${sizeMb} MB)`);
    console.log("Now commit and push it:");
    console.log("  git add services/mandi_cache.json && git commit -m \"Update mandi cache\" && git push");
}

main().catch((error) => {
    console.error("");
    console.error("Market cache refresh FAILED — existing cache left untouched.");
    console.error(error.message);
    process.exit(1);
});
