const axios = require("axios");

const DATA_GOV_SEARCH_URL =
    "https://api.data.gov.in/api/3/action/datastore_search";

const DEFAULT_RESOURCE_ID =
    process.env.DATAGOV_AGMARKNET_RESOURCE_ID ||
    "9ef84268-d588-465a-a308-a864a43d0070";

const CACHE_TTL_MS = 1000 * 60 * 60 * 24;

const cache = new Map();

function buildCacheKey(filters, limit) {
    return JSON.stringify({ filters, limit });
}

async function getRecords(filters = {}, limit = 1000) {
    const key = buildCacheKey(filters, limit);

    const cached = cache.get(key);

    if (
        cached &&
        Date.now() - cached.fetchedAt < CACHE_TTL_MS
    ) {
        return cached.records;
    }

    const response = await axios.get(
        DATA_GOV_SEARCH_URL,
        {
            params: {
                resource_id: DEFAULT_RESOURCE_ID,
                limit,
                filters: JSON.stringify(filters)
            }
        }
    );

    const result = response.data?.result;

    if (!result) {
        throw new Error(
            "Invalid response from data.gov.in."
        );
    }

    const records = result.records || [];

    cache.set(key, {
        fetchedAt: Date.now(),
        records
    });

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

    // AGMARKNET sends dates like "31/10/2026" (dd/mm/yyyy).
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
    const filters = { commodity };

    if (state) {
        filters.state = state;
    }

    if (mandi) {
        filters.market = mandi;
    }

    const rawRecords = await getRecords(
        filters,
        1000
    );

    const records = sortByDateAsc(
        rawRecords
            .map(normalizeRecord)
            .filter(
                (record) =>
                    record.date && record.price != null
            )
    );

    const windowed =
        days > 0
            ? records.slice(-days)
            : records;

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
