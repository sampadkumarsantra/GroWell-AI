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
// CROP CONFIGURATION
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
    }
};

   
   
      


// =====================================================
// HELPERS
// =====================================================

function formatPrice(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
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

    const [timeRange, setTimeRange] =
        useState("1W");

    const [loading, setLoading] =
        useState(true);

    const [marketData, setMarketData] =
        useState({});

    const [error, setError] =
        useState("");



    // =================================================
    // FETCH GOVERNMENT MARKET DATA
    // =================================================

    async function fetchCropMarket(crop) {

        const response = await fetch(
            `http://localhost:3000/api/market/analytics?crop=${encodeURIComponent(crop)}`
        );

        let result;

        try {
            result = await response.json();
        } catch {
            throw new Error(
                "Server returned an invalid response."
            );
        }


        if (!response.ok || !result.success) {

            throw new Error(
                result?.message ||
                `Unable to fetch ${crop} market data`
            );

        }


        const summary =
            result.summary || {};

        const bestMarket =
            result.bestMarket || {};


        // =================================================
        // REAL GOVERNMENT VALUES
        // =================================================

        const price =
            Number(summary.price) || 0;

        const averagePrice =
            Number(summary.averagePrice) || price;

        const highestPrice =
            Number(summary.highestPrice) || price;

        const lowestPrice =
            Number(summary.lowestPrice) || price;


        // =================================================
        // PRICE VS GOVERNMENT AVERAGE
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
        // MARKET SIGNAL
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
        // GOVERNMENT MARKET OBSERVATIONS
        // =================================================

        const history =
            (result.markets || [])
                .map(market =>
                    Number(market.modalPrice)
                )
                .filter(value =>
                    Number.isFinite(value) &&
                    value > 0
                );


        const finalHistory =
            history.length > 0
                ? history.slice(-24)
                : [price];


        // =================================================
        // RETURN NORMALIZED DATA
        // =================================================

        return {

            price,

            averagePrice,

            highestPrice,

            lowestPrice,

            priceVsAverage,

            change:
                priceVsAverage,

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

            history:
                finalHistory,

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
                Number(summary.volatility) || 0,

            volatilityLevel:
                summary.volatilityLevel ||
                "Unknown",

            priceSpread:
                Number(summary.priceSpread) || 0,

            markets:
                result.markets || []

        };

    }



    // =================================================
    // INITIAL LOAD
    // =================================================

    useEffect(() => {

        async function loadMarketData() {

            setLoading(true);
            setError("");


            const entries =
                await Promise.all(

                    crops.map(
                        async crop => {

                            try {

                                const data =
                                    await fetchCropMarket(
                                        crop
                                    );

                                return [
                                    crop,
                                    data
                                ];

                            } catch (err) {

                                console.warn(
                                    `Unable to load ${crop}:`,
                                    err.message
                                );

                                return null;

                            }

                        }
                    )

                );


            const updated = {};


            entries
                .filter(Boolean)
                .forEach(
                    ([crop, data]) => {

                        updated[crop] =
                            data;

                    }
                );


            if (
                Object.keys(updated).length === 0
            ) {

                setError(
                    "Unable to load government market data. Make sure the GroWell backend is running."
                );

            }


            setMarketData(updated);

            setLoading(false);

        }


        loadMarketData();

    }, []);



    // =================================================
    // SELECTED CROP DATA
    // =================================================

    const data =
        marketData[selectedCrop] || null;



    // =================================================
    // SEARCH
    // =================================================

    const filteredCrops =
        useMemo(() => {

            return crops.filter(
                crop =>
                    crop
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

        }, [search]);



    // =================================================
    // CHART POINTS
    // =================================================

    const chartPoints =
        useMemo(() => {

            const history =
                data?.history || [];


            if (
                history.length === 0
            ) {

                return [];

            }


            const min =
                Math.min(...history);

            const max =
                Math.max(...history);

            const range =
                max - min || 1;


            return history.map(
                value =>
                    40 +
                    (
                        (value - min) /
                        range
                    ) * 190
            );

        }, [data]);



    // =================================================
    // MANUAL REFRESH
    // =================================================

    async function refreshMarket() {

        setLoading(true);
        setError("");


        try {

            const entries =
                await Promise.all(

                    crops.map(
                        async crop => {

                            try {

                                const data =
                                    await fetchCropMarket(
                                        crop
                                    );

                                return [
                                    crop,
                                    data
                                ];

                            } catch (err) {

                                console.warn(
                                    `Unable to refresh ${crop}:`,
                                    err.message
                                );

                                return null;

                            }

                        }
                    )

                );


            const updated = {};


            entries
                .filter(Boolean)
                .forEach(
                    ([crop, data]) => {

                        updated[crop] =
                            data;

                    }
                );


            setMarketData(
                previous => ({
                    ...previous,
                    ...updated
                })
            );


        } catch (err) {

            console.error(
                "MARKET REFRESH ERROR:",
                err
            );

            setError(
                "Unable to refresh government market data."
            );

        } finally {

            setLoading(false);

        }

    }



    // =================================================
    // LOADING SCREEN
    // =================================================

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



    // =================================================
    // NO DATA SCREEN
    // =================================================

    if (!data) {

        return (

            <div className="analytics-page">

                <div className="market-loading">

                    <Activity size={25} />

                    <h2>
                        Market data unavailable
                    </h2>

                    <p>
                        {error ||
                            "No government market records are currently available."}
                    </p>

                    <button
                        onClick={refreshMarket}
                    >
                        <RefreshCw size={15} />

                        Retry

                    </button>

                </div>

            </div>

        );

    }



    // =================================================
    // MAIN UI
    // =================================================

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
                    placeholder="Search crop..."
                />

            </div>



            {/* =================================================
                ERROR
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
                MAIN LAYOUT
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


                                    {cropData ? (

                                        <div
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                gap: "5px"
                                            }}
                                        >

                                            <strong
                                                style={{
                                                    fontSize:
                                                        "11px"
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

                                        <span>
                                            —
                                        </span>

                                    )}

                                </button>

                            );

                        }
                    )}

                </aside>



                {/* =================================================
                    MAIN MARKET
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

                    </section>



                    {/* =================================================
                        DATA SOURCE NOTICE
                    ================================================= */}

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
                                data.gov.in. Values may
                                differ between mandis,
                                varieties, grades and
                                reporting dates.

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
                        MARKET METRICS
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
                        AI INTELLIGENCE
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

                                Farmers should compare
                                multiple nearby mandi
                                prices, variety, grade and
                                market date before making
                                a selling decision.

                            </p>

                        </div>

                    </section>



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
                        >

                            <RefreshCw
                                size={13}
                                className={
                                    loading
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
                                {data.market}
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                DISTRICT
                            </span>

                            <strong>
                                {data.district || "—"}
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                STATE
                            </span>

                            <strong>
                                {data.state || "—"}
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                PRICE
                            </span>

                            <strong>
                                {formatPrice(
                                    data.price
                                )}
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                AVERAGE
                            </span>

                            <strong>
                                {formatPrice(
                                    data.averagePrice
                                )}
                            </strong>

                        </div>


                        <div className="research-item">

                            <span>
                                SIGNAL
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

                    </section>



                    {/* =================================================
                        MARKET NEWS
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

                                Latest mandi
                                observations are being
                                retrieved from government
                                market records.

                            </h3>

                        </article>


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
                                {" "}–
                                {" "}
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

                                Compare multiple mandi
                                prices before selling.

                            </h3>

                        </article>

                    </section>



                    {/* =================================================
                        EVENTS
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
                        LOCATION
                    ================================================= */}

                    <section className="location-panel">

                        <div className="analytics-panel-title">

                            <span>
                                BEST REPORTED MARKET
                            </span>

                            <MapPin size={15} />

                        </div>


                        <strong>

                            {data.market}

                        </strong>


                        <span>

                            {data.district
                                ? `${data.district}, ${data.state}`
                                : "Government mandi data"
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