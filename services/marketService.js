const axios = require("axios");

const DATA_GOV_API_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const DATA_GOV_API_KEY =
    process.env.DATA_GOV_API_KEY || "";

const CACHE_TTL_MS = 1000 * 60 * 60 * 24;

const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

const cache = new Map();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWithRetry(url, config, attempt = 1) {
    try {
        return await axios.get(url, config);
    } catch (error) {
        if (attempt < MAX_RETRIES) {
            const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
            await sleep(delay);
            return getWithRetry(url, config, attempt + 1);
        }
        throw error;
    }
}

async function getRecords(commodity = "") {
    const response = await getWithRetry(
        DATA_GOV_API_URL,
        {
            params: {
                "api-key": DATA_GOV_API_KEY,
                format: "json",
                limit: 1000
            }
        }
    );

    const records =
        response.data?.records || [];

    if (commodity) {
        return records.filter(
            (record) =>
                (record.commodity || "").trim() ===
                commodity
        );
    }

    return records;
}

function toNumber(value) {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

function toIsoDate(value) {
    if (!value) {
        return "";
    }

    const raw = String(value).trim();

    const slashParts = raw.split("/");

    if (slashParts.length === 3) {
        const day = slashParts[0];
        const month = slashParts[1];
        const year = slashParts[2];

        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    return raw;
}

function normalizeRecord(raw = {}) {
    const price = toNumber(
        raw.modal_price ?? raw.price ?? raw.market_price
    );

    const minPrice =
        toNumber(raw.min_price) ?? price;

    const maxPrice =
        toNumber(raw.max_price) ?? price;

    const avgPrice =
        toNumber(raw.modal_price) ?? price;

    const date = toIsoDate(
        raw.arrival_date || raw.date || raw.report_date
    );

    const commodity = (
        raw.commodity || ""
    ).trim();

    const mandi = (
        raw.market || raw.mandi || ""
    ).trim();

    const state = (
        raw.state || ""
    ).trim();

    const district = (
        raw.district || ""
    ).trim();

    return {
        date,
        commodity,
        mandi,
        state,
        district,
        minPrice,
        maxPrice,
        avgPrice,
        price
    };
}

function sortByDateAsc(records) {
    return [...records].sort((a, b) =>
        String(a.date).localeCompare(String(b.date))
    );
}

async function getHistory({
    commodity,
    days = 30,
    state = "",
    mandi = ""
} = {}) {
    const records = await getRecords(
        commodity
    );

    const filtered = records
        .map(normalizeRecord)
        .filter(
            (record) =>
                record.date && record.price != null
        );

    const filteredByStateMandi = filtered
        .filter(
            (record) =>
                (!state || record.state === state) &&
                (!mandi || record.mandi === mandi)
        );

    const windowed =
        days > 0
            ? filteredByStateMandi.slice(-days)
            : filteredByStateMandi;

    return {
        success: true,
        commodity,
        days: windowed.length,
        source: "AGMARKNET (data.gov.in)",
        data: windowed
    };
}

async function getNationalStats({
    commodity,
    days = 30
} = {}) {
    const history = await getHistory({
        commodity,
        days
    });

    const byDate = new Map();

    for (const record of history.data) {
        const bucket = byDate.get(record.date) || [];

        bucket.push(record);

        byDate.set(record.date, bucket);
    }

    const dailySeries = Array.from(
        byDate.entries()
    )
        .sort((a, b) =>
            String(a[0]).localeCompare(String(b[0]))
        )
        .map(
            ([date, mandis]) => {
                const total = mandis.reduce(
                    (sum, mandi) =>
                        sum + (
                            mandi.avgPrice ?? mandi.price ?? 0
                        ),
                    0
                );

                const nationalPrice = mandis.length
                    ? total / mandis.length
                    : null;

                return {
                    date,
                    price: nationalPrice,
                    mandis: mandis.length
                };
            }
        )
        .filter((point) => point.price != null);

    const latest = dailySeries[
        dailySeries.length - 1
    ];

    const previous = dailySeries[
        dailySeries.length - 2
    ];

    const first = dailySeries[0];

    const last = dailySeries[
        dailySeries.length - 1
    ];

    const values = dailySeries
        .map((point) => point.price)
        .filter((value) => value != null);

    const stats = {
        min: values.length
            ? Math.min(...values)
            : null,
        max: values.length
            ? Math.max(...values)
            : null,
        average: values.length
            ? values.reduce(
                (sum, value) => sum + value,
                0
            ) / values.length
            : null,
        latest: latest?.price ?? null,
        previous: previous?.price ?? null,
        first: first?.price ?? null,
        latestDate: latest?.date ?? null,
        change:
            latest && first && first.price != null
                ? latest.price - first.price
                : 0,
        changePercent:
            latest &&
            first &&
            first.price
                ? (
                    (latest.price - first.price) /
                    first.price
                ) * 100
                : 0
    };

    return {
        success: true,
        commodity,
        days: dailySeries.length,
        source: "AGMARKNET (data.gov.in)",
        stats
    };
}

async function getCommodityList() {
    const commodities = [
        { commodity: "Wheat", label: "Wheat", category: "Food Grain" },
        { commodity: "Paddy(Fine/Superfine/Grade A)", label: "Rice", category: "Food Grain" },
        { commodity: "Maize", label: "Maize", category: "Food Grain" },
        { commodity: "Bajra(Pearl Millet/Cumbu)", label: "Bajra", category: "Food Grain" },
        { commodity: "Cotton", label: "Cotton", category: "Cash Crop" },
        { commodity: "Groundnut", label: "Groundnut", category: "Oilseed" },
        { commodity: "Soybean", label: "Soybean", category: "Oilseed" },
        { commodity: "Mustard", label: "Mustard", category: "Oilseed" },
        { commodity: "Urad", label: "Urad", category: "Pulse" },
        { commodity: "Moong", label: "Moong", category: "Pulse" },
        { commodity: "Masoor", label: "Masoor", category: "Pulse" }
    ];

    return {
        success: true,
        source: "AGMARKNET (data.gov.in)",
        commodities
    };
}

module.exports = {
    getCommodityList,
    getHistory,
    getNationalStats
};
