const axios = require("axios");

const DATA_GOV_URL =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

async function fetchMarketData(crop) {

    if (!process.env.DATA_GOV_API_KEY) {
        throw new Error("DATA_GOV_API_KEY is missing");
    }

    const response = await axios.get(DATA_GOV_URL, {
        params: {
            "api-key": process.env.DATA_GOV_API_KEY,
            format: "json",
            limit: 1000
        },
        timeout: 30000
    });

    const records = response.data?.records || [];

    const filtered = records.filter(record => {

        const commodity =
            String(
                record.commodity ||
                record.Commodity ||
                ""
            ).trim().toLowerCase();

        return commodity === crop.trim().toLowerCase();

    });

    return filtered;

}

module.exports = {
    fetchMarketData
};