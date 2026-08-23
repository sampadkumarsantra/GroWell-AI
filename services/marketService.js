const axios = require("axios");

const DATA_GOV_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

async function fetchMarketData(crop = "Rice") {

    const apiKey = process.env.DATA_GOV_API_KEY;

    if (!apiKey) {
        throw new Error("DATA_GOV_API_KEY is missing");
    }

    console.log("========================================");
    console.log("🌾 GROWELL MARKET SERVICE");
    console.log("🌾 Requested crop:", crop);
    console.log("========================================");

    const response = await axios.get(DATA_GOV_URL, {
        params: {
            "api-key": apiKey,
            format: "json",
            limit: 100
        },
        timeout: 30000
    });

    console.log("📡 Government API:", response.status);

    const records = response.data?.records || [];

    console.log("📊 Total records received:", records.length);

    if (!records.length) {
        console.log("❌ Government API returned zero records");
        return [];
    }

    console.log(
        "🌾 First commodity:",
        records[0].commodity
    );

    // Filter AFTER receiving the government records
    const requestedCrop = String(crop)
        .trim()
        .toLowerCase();

    const filtered = records.filter(record => {

        const commodity = String(
            record.commodity || ""
        )
            .trim()
            .toLowerCase();

        return commodity === requestedCrop;
    });

    console.log(
        `🔎 ${crop} records found:`,
        filtered.length
    );

    if (filtered.length > 0) {
        console.log(
            "✅ First matching record:",
            JSON.stringify(filtered[0], null, 2)
        );
    }

    return filtered;
}

module.exports = {
    fetchMarketData
};