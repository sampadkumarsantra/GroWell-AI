/*
 * =====================================================
 * MARKET RESPONSE SHAPES
 * =====================================================
 *
 * Shared by the request path and the background sweep so a
 * stored snapshot is byte-for-byte the payload a farmer would
 * have received live. If the two drifted, a snapshot written
 * by the sweep could not be served as a response.
 *
 */


/**
 * Market-level response built from Agmarknet mandi records.
 * Preferred source: this is an actual mandi price.
 */
function buildAgmarknetResponse(crop, markets) {

    const prices =
        markets.map(
            (market) => market.modalPrice
        );

    const highestPrice =
        Math.max(...prices);

    const lowestPrice =
        Math.min(...prices);

    const averagePrice =
        prices.reduce(
            (sum, price) => sum + price,
            0
        ) / prices.length;

    const bestMarket =
        markets.reduce(
            (best, current) =>
                current.modalPrice >
                best.modalPrice
                    ? current
                    : best
        );

    const variance =
        prices.reduce(
            (sum, price) =>
                sum +
                Math.pow(
                    price - averagePrice,
                    2
                ),
            0
        ) / prices.length;

    const standardDeviation =
        Math.sqrt(variance);

    const volatility =
        averagePrice > 0
            ? (standardDeviation / averagePrice) *
              100
            : 0;

    let volatilityLevel = "Low";

    if (volatility >= 10) {
        volatilityLevel = "High";
    } else if (volatility >= 5) {
        volatilityLevel = "Moderate";
    }

    return {
        success: true,
        available: true,
        source: "Agmarknet (data.gov.in)",
        basis: "Market-level mandi prices",
        crop,
        updatedAt: new Date().toISOString(),
        summary: {
            price: Math.round(bestMarket.modalPrice),
            averagePrice: Math.round(averagePrice),
            highestPrice: Math.round(highestPrice),
            lowestPrice: Math.round(lowestPrice),
            volatility: Number(volatility.toFixed(2)),
            volatilityLevel,
            priceSpread:
                Math.round(
                    highestPrice - lowestPrice
                )
        },
        bestMarket: {
            market: bestMarket.market,
            district: bestMarket.district,
            state: bestMarket.state,
            modalPrice: bestMarket.modalPrice,
            minPrice: bestMarket.minPrice,
            maxPrice: bestMarket.maxPrice
        },
        markets
    };
}


/**
 * All-India average response built from the DOCA price
 * monitoring figures.
 *
 * DOCA publishes a single national average rather than a spread
 * across mandis, so the high, low and spread collapse onto the
 * same figure. That is the true shape of this data, and the
 * source is named so a national average is never shown as if
 * it were the farmer's local mandi rate.
 */
function buildDocaResponse(quote) {

    const row = {
        state: "All India",
        district: "",
        market: "All-India average",
        commodity: quote.commodity,
        variety: "",
        grade: "",
        date: quote.asOn || "",
        minPrice: quote.price,
        maxPrice: quote.price,
        modalPrice: quote.price
    };

    const asOn = quote.asOn || "the latest date";

    const isRetail =
        quote.basis.includes("retail");

    return {
        success: true,
        available: true,
        source: quote.source,
        basis: quote.basis,
        sourceNote: isRetail
            ? `The mandi feed is unavailable, so this is the ${quote.basis} price for ${quote.commodity} published by the Department of Consumer Affairs as on ${asOn}. Retail rates sit above wholesale, so treat this as an upper reference, not your mandi rate.`
            : `The mandi feed is unavailable, so this is the ${quote.basis} published by the Department of Consumer Affairs as on ${asOn}. It is not your local mandi rate.`,
        crop: quote.crop,
        updatedAt: new Date().toISOString(),
        summary: {
            price: quote.price,
            averagePrice: quote.price,
            highestPrice: quote.price,
            lowestPrice: quote.price,
            volatility: 0,
            volatilityLevel: "Nationwide",
            priceSpread: 0
        },        bestMarket: {
            market: row.market,
            district: "",
            state: row.state,
            modalPrice: row.modalPrice,
            minPrice: row.minPrice,
            maxPrice: row.maxPrice
        },
        markets: [row]
    };
}


module.exports = {
    buildAgmarknetResponse,
    buildDocaResponse
};