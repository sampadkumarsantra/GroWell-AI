import { useEffect, useMemo, useState } from "react";

import {
    Search,
    TrendingUp,
    TrendingDown,
    RefreshCw,
    BarChart3,
    Newspaper,
    CalendarDays,
    MapPin,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    ShoppingCart,
    Brain
} from "lucide-react";

import "./Analytics.css";

import MarketCandlestick
    from "../components/MarketCandlestick";


// =====================================================
// COMMODITIES
// =====================================================

const cropConfig = {

    Rice: {
        demand: "High",
        supply: "Moderate"
    },

    Wheat: {
        demand: "High",
        supply: "High"
    },

    Maize: {
        demand: "Moderate",
        supply: "High"
    },

    Potato: {
        demand: "Very High",
        supply: "Moderate"
    },

    Tomato: {
        demand: "Very High",
        supply: "Low"
    },

    Onion: {
        demand: "Very High",
        supply: "Moderate"
    },

    Groundnut: {
        demand: "Moderate",
        supply: "High"
    },

    Mustard: {
        demand: "High",
        supply: "Moderate"
    },

    Soybean: {
        demand: "High",
        supply: "Moderate"
    },

    Chilli: {
        demand: "High",
        supply: "Moderate"
    },

    Cotton: {
        demand: "High",
        supply: "Moderate"
    },

    Turmeric: {
        demand: "Moderate",
        supply: "Moderate"
    }
};


// =====================================================
// HELPERS
// =====================================================

function formatPrice(value) {

    const number = Number(value);

    if (!Number.isFinite(number) || number <= 0) {
        return "₹—";
    }

    return `₹${Math.round(number).toLocaleString("en-IN")}`;
}


function formatPercent(value) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
}


// =====================================================
// EMPTY MARKET OBJECT
// =====================================================

function createUnavailableData(crop, message = "") {

    return {

        available: false,

        price: null,

        averagePrice: null,

        highestPrice: null,

        lowestPrice: null,

        priceVsAverage: 0,

        change: 0,

        direction: "neutral",

        open: null,

        high: null,

        low: null,

        arrivals: 0,

        demand:
            cropConfig[crop]?.demand ||
            "Unknown",

        supply:
            cropConfig[crop]?.supply ||
            "Unknown",

        signal: "Unavailable",

        history: [],

        market: "",

        district: "",

        state: "",

        source: "data.gov.in",

        updatedAt: null,

        volatility: 0,

        volatilityLevel: "Unavailable",

        priceSpread: 0,

        markets: [],

        message:
            message ||
            `No current government mandi records were found for ${crop}.`
    };
}


// =====================================================
// COMPONENT
// =====================================================

export default function Analytics() {

    const crops = Object.keys(cropConfig);


    // =================================================
    // STATE
    // =================================================

    const [selectedCrop, setSelectedCrop] =
        useState("Rice");

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [marketData, setMarketData] =
        useState({});

    const [error, setError] =
        useState("");


    // =================================================
    // FETCH ONE COMMODITY
    // =================================================

    async function fetchCropMarket(crop) {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/market/analytics?crop=${encodeURIComponent(crop)}`,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );


            let result = null;


            try {

                result = await response.json();

            } catch {

                throw new Error(
                    "Server returned an invalid response."
                );

            }


            // =================================================
            // IMPORTANT
            //
            // NO DATA IS NOT A FATAL ERROR
            // =================================================

            if (
                result?.available === false ||
                result?.success === false &&
                result?.records?.length === 0
            ) {

                return createUnavailableData(
                    crop,
                    result?.message
                );

            }


            // =================================================
            // REAL SERVER ERROR
            // =================================================

            if (!response.ok || !result?.success) {

                throw new Error(
                    result?.message ||
                    `Unable to fetch ${crop} market data`
                );

            }


            // =================================================
            // SERVER DATA
            // =================================================

            const summary =
                result.summary || {};

            const bestMarket =
                result.bestMarket || {};


            const price =
                Number(summary.price) || 0;

            const averagePrice =
                Number(summary.averagePrice) ||
                price;

            const highestPrice =
                Number(summary.highestPrice) ||
                price;

            const lowestPrice =
                Number(summary.lowestPrice) ||
                price;


            // =================================================
            // PRICE VS AVERAGE
            // =================================================

            const priceVsAverage =
                averagePrice > 0
                    ? (
                        (
                            price -
                            averagePrice
                        ) /
                        averagePrice
                    ) * 100
                    : 0;


            // =================================================
            // SIGNAL
            // =================================================

            let signal = "Neutral";


            if (priceVsAverage > 10) {

                signal = "Strong Bullish";

            } else if (priceVsAverage > 2) {

                signal = "Bullish";

            } else if (priceVsAverage < -10) {

                signal = "Bearish";

            } else if (priceVsAverage < -2) {

                signal = "Weak";

            }


            // =================================================
            // HISTORY
            // =================================================

            const history =
                (result.markets || [])
                    .map(item =>
                        Number(item.modalPrice)
                    )
                    .filter(
                        value =>
                            Number.isFinite(value) &&
                            value > 0
                    );


            const finalHistory =
                history.length > 0
                    ? history.slice(-30)
                    : [price];


            // =================================================
            // NORMALIZED RESULT
            // =================================================

            return {

                available: true,

                price,

                averagePrice,

                highestPrice,

                lowestPrice,

                priceVsAverage,

                change: priceVsAverage,

                direction:
                    priceVsAverage >= 0
                        ? "up"
                        : "down",

                open:
                    averagePrice,

                high:
                    highestPrice,

                low:
                    lowestPrice,

                arrivals:
                    Number(
                        bestMarket?.arrivals
                    ) || 0,

                demand:
                    cropConfig[crop]?.demand ||
                    "Unknown",

                supply:
                    cropConfig[crop]?.supply ||
                    "Unknown",

                signal,

                history: finalHistory,

                market:
                    bestMarket?.market ||
                    "Government mandi data",

                district:
                    bestMarket?.district ||
                    "",

                state:
                    bestMarket?.state ||
                    "",

                source:
                    result.source ||
                    "data.gov.in",

                updatedAt:
                    result.updatedAt ||
                    null,

                volatility:
                    Number(
                        summary.volatility
                    ) || 0,

                volatilityLevel:
                    summary.volatilityLevel ||
                    "Unknown",

                priceSpread:
                    Number(
                        summary.priceSpread
                    ) || 0,

                markets:
                    result.markets || [],

                message: ""

            };

        } catch (error) {

            console.warn(
                `Market error for ${crop}:`,
                error.message
            );


            // =================================================
            // IMPORTANT
            //
            // ONE FAILED COMMODITY MUST NOT CRASH PAGE
            // =================================================

            return createUnavailableData(
                crop,
                error.message
            );

        }

    }


    // =====================================================
    // LOAD ALL COMMODITIES
    // =====================================================

    async function loadMarketData() {

        setError("");


        const results =
            await Promise.all(

                crops.map(
                    async crop => {

                        const data =
                            await fetchCropMarket(
                                crop
                            );

                        return [
                            crop,
                            data
                        ];

                    }
                )

            );


        const updated = {};


        results.forEach(
            ([crop, data]) => {

                updated[crop] =
                    data;

            }
        );


        setMarketData(updated);


        const availableCount =
            Object.values(updated)
                .filter(
                    item =>
                        item?.available
                )
                .length;


        if (availableCount === 0) {

            setError(
                "No current government market records are available right now."
            );

        }

    }


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        let mounted = true;


        async function initialLoad() {

            setLoading(true);


            try {

                if (mounted) {
                    await loadMarketData();
                }

            } catch (error) {

                console.error(
                    "MARKET LOAD ERROR:",
                    error
                );

                if (mounted) {

                    setError(
                        "Unable to load market data. Please make sure the GroWell backend is running."
                    );

                }

            } finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        }


        initialLoad();


        return () => {

            mounted = false;

        };

    }, []);


    // =====================================================
    // SELECTED CROP
    // =====================================================

    const data =
        marketData[selectedCrop] ||
        createUnavailableData(
            selectedCrop
        );


    const dataAvailable =
        data.available === true &&
        Number.isFinite(
            Number(data.price)
        ) &&
        Number(data.price) > 0;


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredCrops =
        useMemo(() => {

            return crops.filter(
                crop =>
                    crop
                        .toLowerCase()
                        .includes(
                            search
                                .toLowerCase()
                        )
            );

        }, [search]);


    // =====================================================
    // REFRESH
    // =====================================================

    async function refreshMarket() {

        setRefreshing(true);

        setError("");


        try {

            await loadMarketData();

        } catch (error) {

            console.error(
                "MARKET REFRESH ERROR:",
                error
            );

            setError(
                "Unable to refresh government market data."
            );

        } finally {

            setRefreshing(false);

        }

    }


    // =====================================================
    // LOADING
    // =====================================================

    if (
        loading &&
        Object.keys(marketData).length === 0
    ) {

        return (

            <div className="analytics-page">

                <div className="market-loading">

                    <RefreshCw
                        size={25}
                        className="spin"
                    />

                    <h2>
                        Loading market intelligence...
                    </h2>

                    <p>
                        Fetching the latest government
                        mandi records.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <div className="analytics-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="analytics-header">

                <div>

                    <span className="analytics-eyebrow">

                        GROWELL MARKET INTELLIGENCE

                    </span>


                    <h1>
                        Agricultural Market
                    </h1>


                    <p>

                        Track government-reported
                        crop prices, mandi activity,
                        demand and market conditions.

                    </p>

                </div>


                <div className="analytics-live">

                    <Activity size={13} />

                    LIVE GOVERNMENT DATA

                </div>

            </header>


            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="analytics-search">

                <Search size={17} />

                <input
                    value={search}
                    onChange={event =>
                        setSearch(
                            event.target.value
                        )
                    }
                    placeholder="Search commodity..."
                />

            </div>


            {/* =================================================
                GENERAL ERROR
            ================================================= */}

            {error && (

                <div className="market-warning">

                    <Activity size={17} />

                    <div>

                        <strong>
                            MARKET DATA NOTICE
                        </strong>

                        <span>
                            {error}
                        </span>

                    </div>

                </div>

            )}


            {/* =================================================
                LAYOUT
            ================================================= */}

            <div className="analytics-layout">


                {/* =================================================
                    WATCHLIST
                ================================================= */}

                <aside className="analytics-watchlist">

                    <div className="analytics-panel-title">

                        <span>
                            MARKET WATCHLIST
                        </span>

                    </div>


                    {filteredCrops.map(
                        crop => {

                            const cropData =
                                marketData[crop];


                            const available =
                                cropData?.available === true;


                            return (

                                <button
                                    key={crop}

                                    className={
                                        selectedCrop === crop
                                            ? "watch-item active"
                                            : "watch-item"
                                    }

                                    onClick={() =>
                                        setSelectedCrop(
                                            crop
                                        )
                                    }
                                >

                                    <span>
                                        {crop}
                                    </span>


                                    {available ? (

                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px"
                                            }}
                                        >

                                            <strong
                                                style={{
                                                    fontSize: "11px"
                                                }}
                                            >

                                                {formatPrice(
                                                    cropData.price
                                                )}

                                            </strong>


                                            {cropData.direction ===
                                            "up" ? (

                                                <TrendingUp
                                                    size={14}
                                                />

                                            ) : (

                                                <TrendingDown
                                                    size={14}
                                                />

                                            )}

                                        </div>

                                    ) : (

                                        <span
                                            style={{
                                                fontSize: "10px",
                                                opacity: 0.65
                                            }}
                                        >
                                            Unavailable
                                        </span>

                                    )}

                                </button>

                            );

                        }
                    )}

                </aside>


                {/* =================================================
                    MAIN
                ================================================= */}

                <main className="analytics-main">


                    {/* =================================================
                        PRICE HEADER
                    ================================================= */}

                    <section className="price-header">

                        <div>

                            <span>

                                {selectedCrop.toUpperCase()}
                                {" "}MARKET

                            </span>


                            <h2>
                                {selectedCrop}
                            </h2>

                        </div>


                        {dataAvailable && (

                            <div className="current-price">

                                <strong>

                                    {formatPrice(
                                        data.price
                                    )}

                                </strong>


                                <span
                                    className={
                                        data.direction === "up"
                                            ? "positive"
                                            : "negative"
                                    }
                                >

                                    {data.direction ===
                                    "up" ? (

                                        <ArrowUpRight
                                            size={16}
                                        />

                                    ) : (

                                        <ArrowDownRight
                                            size={16}
                                        />

                                    )}


                                    {formatPercent(
                                        data.priceVsAverage
                                    )}

                                </span>

                            </div>

                        )}

                    </section>


                    {/* =================================================
                        AVAILABLE DATA
                    ================================================= */}

                    {dataAvailable ? (

                        <>

                            {/* GOVERNMENT NOTICE */}

                            <div className="market-warning">

                                <Activity size={17} />

                                <div>

                                    <strong>
                                        GOVERNMENT MARKET DATA
                                    </strong>

                                    <span>

                                        Prices are sourced from
                                        government mandi market
                                        records through
                                        data.gov.in.

                                    </span>

                                </div>

                            </div>


                            {/* =================================================
                                CHART
                            ================================================= */}

                            <section className="price-chart-card">

                                <div className="chart-heading">

                                    <div>

                                        <span>
                                            PRICE MOVEMENT
                                        </span>

                                        <h3>
                                            {selectedCrop}
                                            {" "}Market Observations
                                        </h3>

                                    </div>

                                </div>


                                <div className="live-chart">

                                    <MarketCandlestick
                                        data={data}
                                        selectedCrop={
                                            selectedCrop
                                        }
                                    />

                                </div>

                            </section>


                            {/* =================================================
                                METRICS
                            ================================================= */}

                            <section className="market-metrics">

                                <div>

                                    <span>
                                        GOVERNMENT AVERAGE
                                    </span>

                                    <strong>

                                        {formatPrice(
                                            data.averagePrice
                                        )}

                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        HIGHEST
                                    </span>

                                    <strong>

                                        {formatPrice(
                                            data.highestPrice
                                        )}

                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        LOWEST
                                    </span>

                                    <strong>

                                        {formatPrice(
                                            data.lowestPrice
                                        )}

                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        PRICE SPREAD
                                    </span>

                                    <strong>

                                        {formatPrice(
                                            data.priceSpread
                                        )}

                                    </strong>

                                </div>

                            </section>


                            {/* =================================================
                                DEMAND SUPPLY
                            ================================================= */}

                            <section className="demand-panel">

                                <div className="analytics-panel-title">

                                    <span>
                                        DEMAND & SUPPLY
                                    </span>

                                    <Package size={15} />

                                </div>


                                <div className="demand-grid">

                                    <div>

                                        <span>
                                            DEMAND
                                        </span>

                                        <strong className="positive">

                                            {data.demand}

                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            SUPPLY
                                        </span>

                                        <strong>

                                            {data.supply}

                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            MARKET SIGNAL
                                        </span>

                                        <strong
                                            className={
                                                data.direction === "up"
                                                    ? "positive"
                                                    : "negative"
                                            }
                                        >

                                            {data.signal}

                                        </strong>

                                    </div>

                                </div>

                            </section>


                            {/* =================================================
                                AI
                            ================================================= */}

                            <section className="ai-market-card">

                                <div className="ai-icon">

                                    <Brain size={21} />

                                </div>


                                <div>

                                    <span>
                                        GROWELL AI MARKET INTELLIGENCE
                                    </span>


                                    <h3>

                                        {data.direction === "up"

                                            ? `${selectedCrop} is trading above the reported government average`

                                            : `${selectedCrop} is trading below the reported government average`

                                        }

                                    </h3>


                                    <p>

                                        Current government-reported
                                        market price:

                                        {" "}

                                        <strong>
                                            {formatPrice(
                                                data.price
                                            )}
                                        </strong>

                                        {" "}per quintal.

                                        {" "}

                                        Government-reported
                                        average:

                                        {" "}

                                        <strong>
                                            {formatPrice(
                                                data.averagePrice
                                            )}
                                        </strong>

                                        {" "}per quintal.

                                    </p>

                                </div>

                            </section>

                        </>

                    ) : (

                        /* =================================================
                            UNAVAILABLE STATE
                        ================================================= */

                        <section className="price-chart-card">

                            <div className="market-empty-state">

                                <Activity
                                    size={35}
                                />


                                <h2>

                                    Price currently unavailable

                                </h2>


                                <p>

                                    No current government
                                    mandi record was returned
                                    for{" "}

                                    <strong>
                                        {selectedCrop}
                                    </strong>.

                                </p>


                                <p>

                                    GroWell AI will not substitute
                                    another commodity's price.

                                </p>


                                <button
                                    onClick={
                                        refreshMarket
                                    }
                                    disabled={
                                        refreshing
                                    }
                                >

                                    <RefreshCw
                                        size={15}
                                        className={
                                            refreshing
                                                ? "spin"
                                                : ""
                                        }
                                    />

                                    {refreshing
                                        ? "Checking..."
                                        : "Check again"
                                    }

                                </button>

                            </div>

                        </section>

                    )}


                    {/* =================================================
                        LAST UPDATED
                    ================================================= */}

                    <div className="last-updated">

                        <span>

                            Source:{" "}
                            {data.source}

                            {" • "}

                            Last updated:{" "}

                            {data.updatedAt

                                ? new Date(
                                    data.updatedAt
                                ).toLocaleString(
                                    "en-IN"
                                )

                                : "Unavailable"

                            }

                        </span>


                        <button
                            onClick={
                                refreshMarket
                            }
                            title="Refresh government market data"
                            disabled={
                                refreshing
                            }
                        >

                            <RefreshCw
                                size={13}
                                className={
                                    refreshing
                                        ? "spin"
                                        : ""
                                }
                            />

                        </button>

                    </div>

                </main>


                {/* =================================================
                    RIGHT PANEL
                ================================================= */}

                <aside className="analytics-right">


                    {/* =================================================
                        MARKET RESEARCH
                    ================================================= */}

                    <section className="research-panel">

                        <div className="analytics-panel-title">

                            <span>
                                MARKET RESEARCH
                            </span>

                            <BarChart3 size={15} />

                        </div>


                        <div className="research-item">

                            <span>
                                MARKET
                            </span>

                            <strong>
                                {dataAvailable
                                    ? data.market
                                    : "Unavailable"
                                }
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                DISTRICT
                            </span>

                            <strong>
                                {dataAvailable
                                    ? data.district || "—"
                                    : "—"
                                }
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                STATE
                            </span>

                            <strong>
                                {dataAvailable
                                    ? data.state || "—"
                                    : "—"
                                }
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                PRICE
                            </span>

                            <strong>

                                {dataAvailable
                                    ? formatPrice(
                                        data.price
                                    )
                                    : "Unavailable"
                                }

                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                AVERAGE
                            </span>

                            <strong>

                                {dataAvailable
                                    ? formatPrice(
                                        data.averagePrice
                                    )
                                    : "—"
                                }

                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                SIGNAL
                            </span>

                            <strong>

                                {dataAvailable
                                    ? data.signal
                                    : "Unavailable"
                                }

                            </strong>

                        </div>

                    </section>


                    {/* =================================================
                        MARKET INFORMATION
                    ================================================= */}

                    <section className="news-panel">

                        <div className="analytics-panel-title">

                            <span>
                                MARKET INFORMATION
                            </span>

                            <Newspaper size={15} />

                        </div>


                        <article>

                            <small>
                                GOVERNMENT DATA
                            </small>

                            <h3>

                                {dataAvailable

                                    ? "Latest mandi observations are being retrieved from government market records."

                                    : `No current government mandi observation is available for ${selectedCrop}.`

                                }

                            </h3>

                        </article>


                        {dataAvailable && (

                            <>

                                <article>

                                    <small>
                                        PRICE RANGE
                                    </small>

                                    <h3>

                                        Current reported range:

                                        {" "}

                                        {formatPrice(
                                            data.lowestPrice
                                        )}

                                        {" "}–{" "}

                                        {formatPrice(
                                            data.highestPrice
                                        )}

                                    </h3>

                                </article>


                                <article>

                                    <small>
                                        FARMER ALERT
                                    </small>

                                    <h3>

                                        Compare multiple
                                        mandi prices before
                                        selling.

                                    </h3>

                                </article>

                            </>

                        )}

                    </section>


                    {/* =================================================
                        MARKET ACTIVITY
                    ================================================= */}

                    <section className="events-panel">

                        <div className="analytics-panel-title">

                            <span>
                                AGRI MARKET ACTIVITY
                            </span>

                            <CalendarDays size={15} />

                        </div>


                        <div className="event-row">

                            <CalendarDays size={14} />

                            <span>

                                Government mandi
                                reporting activity

                            </span>

                        </div>


                        <div className="event-row">

                            <ShoppingCart size={14} />

                            <span>

                                Agricultural procurement
                                and trading activity

                            </span>

                        </div>

                    </section>


                    {/* =================================================
                        BEST MARKET
                    ================================================= */}

                    <section className="location-panel">

                        <div className="analytics-panel-title">

                            <span>
                                BEST REPORTED MARKET
                            </span>

                            <MapPin size={15} />

                        </div>


                        <strong>

                            {dataAvailable
                                ? data.market
                                : "Unavailable"
                            }

                        </strong>


                        <span>

                            {dataAvailable && data.district

                                ? `${data.district}, ${data.state}`

                                : "No current government record"

                            }

                        </span>

                    </section>


                    {/* =================================================
                        SOURCE
                    ================================================= */}

                    <section className="location-panel">

                        <div className="analytics-panel-title">

                            <span>
                                DATA SOURCE
                            </span>

                            <Activity size={15} />

                        </div>


                        <strong>
                            data.gov.in
                        </strong>


                        <span>

                            Government market records
                            retrieved through GroWell AI.

                        </span>

                    </section>

                </aside>

            </div>

        </div>

    );

}