import { useEffect, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

import "./Market.css";
import { apiRequest } from "../services/api";

function formatPrice(value) {
    if (
        value === null ||
        value === undefined ||
        Number.isNaN(Number(value))
    ) {
        return "—";
    }

    const num = Number(value);

    return (
        "₹" +
        num.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        )
    );
}

function formatDate(value) {
    if (!value) {
        return "";
    }

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

function ChangeBadge({ change, percent }) {
    const value = Number(change) || 0;
    const growth = Number(percent) || 0;
    const isUp = value >= 0;

    const Icon = isUp ? TrendingUp : TrendingDown;

    return (
        <span
            className={
                "market-change " +
                (isUp ? "up" : "down")
            }
        >
            <Icon size={14} />

            <span>
                {isUp ? "+" : "-"}
                {formatPrice(Math.abs(value))} (
                {isUp ? "+" : "-"}
                {Math.abs(growth).toFixed(2)}%)
            </span>
        </span>
    );
}

function getCommodityLabel(commodities, commodity) {
    const found = (commodities || []).find(
        (item) => item.commodity === commodity
    );

    return (found && found.label) || commodity;
}

function Market() {
    const [commodities, setCommodities] = useState([]);

    const [nationalByCommodity, setNationalByCommodity] =
        useState({});

    const [selected, setSelected] = useState("");

    const [history, setHistory] = useState(null);

    const [historyLoading, setHistoryLoading] =
        useState(false);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        let active = true;

        async function loadCommodities() {

            try {

                setLoading(true);
                setError("");

                const response = await apiRequest(
                    "/api/market/commodities"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load market commodities."
                    );
                }

                const list = data.commodities || [];

                if (!active) {
                    return;
                }

                setCommodities(list);

                const stats = {};

                await Promise.all(
                    list.map(async (item) => {

                        const statsResponse =
                            await apiRequest(
                                `/api/market/national?commodity=${encodeURIComponent(
                                    item.commodity
                                )}&days=30`
                            );

                        const statsData =
                            await statsResponse.json();

                        if (statsResponse.ok && statsData.success) {
                            stats[item.commodity] = statsData.stats;
                        }
                    })
                );

                if (active) {
                    setNationalByCommodity(stats);

                    if (list.length > 0) {
                        setSelected(list[0].commodity);
                    }
                }

            } catch (err) {

                console.error(
                    "MARKET LOAD ERROR:",
                    err
                );

                if (active) {
                    setError(
                        err.message ||
                        "GroWell Market could not load commodity data."
                    );
                }

            } finally {

                if (active) {
                    setLoading(false);
                }

            }

        }

        loadCommodities();

        return () => {
            active = false;
        };

    }, []);

    useEffect(() => {

        let active = true;

        async function loadHistory() {

            if (!selected) {
                return;
            }

            try {

                setHistoryLoading(true);

                const response = await apiRequest(
                    `/api/market/history?commodity=${encodeURIComponent(
                        selected
                    )}&days=30`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to load market history."
                    );
                }

                if (active) {
                    setHistory(data);
                }

            } catch (err) {

                console.error(
                    "MARKET HISTORY ERROR:",
                    err
                );

                if (active) {
                    setError(
                        err.message ||
                        "GroWell Market could not load price history."
                    );
                }

            } finally {

                if (active) {
                    setHistoryLoading(false);
                }

            }

        }

        loadHistory();

        return () => {
            active = false;
        };

    }, [selected]);

    const selectedStats = nationalByCommodity[selected]?.stats;

    const chartData = useMemo(() => {

        if (!history?.data) {
            return [];
        }

        return history.data.map((point) => ({
            date: point.date,
            price: point.price,
            minPrice: point.minPrice,
            maxPrice: point.maxPrice
        }));

    }, [history]);

    return (
        <div className="market-page">
            <div className="market-header">
                <div>
                    <span>Market Intelligence</span>

                    <h1>
                        📈 GroWell Market
                    </h1>

                    <p>
                        Daily agricultural commodity
                        prices sourced from data.gov.in —
                        AGMARKNET reports by the Ministry
                        of Agriculture &amp; Farmers Welfare.
                    </p>
                </div>
            </div>

            {loading && (
                <div className="info-card">
                    <h3>
                        🌾 Loading market intelligence...
                    </h3>
                </div>
            )}

            {error && (
                <div className="info-card">
                    <h3>
                        ❌ {error}
                    </h3>
                </div>
            )}

            {!loading && !error && commodities.length > 0 && (
                <div>
                    <div className="market-section">
                        <div className="market-section-head">
                            <h2>
                                🌾 Commodity Markets
                            </h2>

                            <span>
                                All India baseline prices ·
                                30-day window
                            </span>
                        </div>

                        <div className="commodity-grid">
                            {commodities.map(
                                (item) => {

                                    const stats =
                                        nationalByCommodity[
                                            item.commodity
                                        ]?.stats;

                                    const isSelected =
                                        selected ===
                                        item.commodity;

                                    return (
                                        <button
                                            key={
                                                item.commodity
                                            }
                                            type="button"
                                            className={
                                                "commodity-card" +
                                                (isSelected
                                                    ? " selected"
                                                    : "")
                                            }
                                            onClick={() =>
                                                setSelected(
                                                    item.commodity
                                                )
                                            }
                                        >
                                            <span className="commodity-category">
                                                {item.category}
                                            </span>

                                            <strong className="commodity-name">
                                                {
                                                    item.label ||
                                                    item.commodity
                                                }
                                            </strong>

                                            <span className="commodity-price">
                                                {
                                                    formatPrice(
                                                        stats?.latest
                                                    )
                                                }
                                                    /qtl
                                            </span>

                                            {stats && (
                                                <ChangeBadge
                                                    change={
                                                        stats.change
                                                    }
                                                    percent={
                                                        stats.changePercent
                                                    }
                                                />
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {selected && (
                        <div className="market-section">
                            <div className="market-section-head">
                                <h2>
                                    📊{" "}
                                    {getCommodityLabel(
                                        commodities,
                                        selected
                                    )}{" "}
                                    — Market
                                    Analysis
                                </h2>

                                <span>
                                    Detailed price
                                    graph · 30 days · All
                                    India mandis
                                </span>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span>Latest Price</span>

                                    <strong>
                                        {formatPrice(
                                            selectedStats?.latest
                                        )}
                                            /qtl
                                    </strong>

                                    {selectedStats && (
                                        <ChangeBadge
                                            change={
                                                selectedStats.change
                                            }
                                            percent={
                                                selectedStats.changePercent
                                            }
                                        />
                                    )}
                                </div>

                                <div className="stat-card">
                                    <span>
                                        Average Price
                                    </span>

                                    <strong>
                                        {formatPrice(
                                            selectedStats?.average
                                        )}
                                            /qtl
                                    </strong>

                                    <span className="stat-hint">
                                        Avg of last{" "}
                                        {selectedStats?.days ||
                                            30}{" "}
                                        trading days
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>
                                        Lowest Price
                                    </span>

                                    <strong>
                                        {formatPrice(
                                            selectedStats?.min
                                        )}
                                            /qtl
                                    </strong>

                                    <span className="stat-hint">
                                        Minimum mandi
                                        price in window
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>
                                        Highest Price
                                    </span>

                                    <strong>
                                        {formatPrice(
                                            selectedStats?.max
                                        )}
                                            /qtl
                                    </strong>

                                    <span className="stat-hint">
                                        Maximum mandi
                                        price in window
                                    </span>
                                </div>
                            </div>

                            <div className="chart-card">
                                <span className="chart-label">
                                    Price Trend — Last 30
                                    Days
                                </span>

                                <div
                                    className="chart-container"
                                >
                                    {historyLoading ? (
                                        <div className="chart-loading">
                                            Loading price
                                            graph...
                                        </div>
                                    ) : chartData.length > 0 ? (
                                        <ResponsiveContainer
                                            width="100%"
                                            height={340}
                                        >
                                            <LineChart
                                                data={
                                                    chartData
                                                }
                                                margin={{
                                                    top: 16,
                                                    right: 24,
                                                    left: 8,
                                                    bottom: 0
                                                }}
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    stroke="#e4dcc9"
                                                />

                                                <XAxis
                                                    dataKey="date"
                                                    tickFormatter={
                                                        formatDate
                                                    }
                                                    tick={{
                                                        fontSize: 11
                                                    }}
                                                    stroke="#96a08e"
                                                    tickLine={false}
                                                    axisLine={{
                                                        stroke:
                                                            "#cfc5ac"
                                                    }}
                                                    minTickGap={40}
                                                />

                                                <YAxis
                                                    tickFormatter={
                                                        (value) =>
                                                            `₹${Number(
                                                                value
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}`
                                                    }
                                                    tick={{
                                                        fontSize: 11
                                                    }}
                                                    stroke="#96a08e"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    width={74}
                                                />

                                                <Tooltip
                                                    contentStyle={{
                                                        background:
                                                            "#fffdf7",
                                                        border:
                                                            "1px solid #e4dcc9",
                                                        borderRadius:
                                                            "12px",
                                                        fontSize:
                                                            "12px"
                                                    }}
                                                />

                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#1e513b"
                                                    strokeWidth={2.5}
                                                    dot={{
                                                        r: 3
                                                    }}
                                                    activeDot={{
                                                        r: 5
                                                    }}
                                                    name="National Avg Price"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="chart-loading">
                                            No price
                                            data available.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="market-source">
                                <BarChart3
                                    size={15}
                                />

                                <span>
                                    Source: data.gov.in —
                                    AGMARKNET daily
                                    commodity prices
                                    (Ministry of
                                    Agriculture &amp;
                                    Farmers Welfare). All India
                                    mandis aggregated.
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Market;
