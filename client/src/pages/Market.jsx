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
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    Search,
    RefreshCw,
    Store,
    Calendar,
    MapPin,
    AlertCircle
} from "lucide-react";

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
        num.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
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

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function ChangeBadge({ change, percent }) {
    const value = Number(change) || 0;
    const growth = Number(percent) || 0;
    const isUp = value >= 0;

    const Icon = isUp ? TrendingUp : TrendingDown;

    return (
        <span className={"market-change " + (isUp ? "up" : "down")}>
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

const CATEGORIES = ["All", "Food Grain", "Oilseed", "Pulse", "Cash Crop"];

function Market() {
    const [commodities, setCommodities] = useState([]);
    const [nationalByCommodity, setNationalByCommodity] = useState({});
    const [selected, setSelected] = useState("");
    const [history, setHistory] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    async function loadMarketData() {
        try {
            setLoading(true);
            setError("");

            // Try fast unified summary endpoint first
            let list = [];
            const statsMap = {};

            try {
                const response = await apiRequest("/api/market/summary");
                const data = await response.json();

                if (response.ok && data.success && Array.isArray(data.commodities)) {
                    list = data.commodities;
                    list.forEach((item) => {
                        if (item.stats) {
                            statsMap[item.commodity] = item.stats;
                        }
                    });
                }
            } catch {
                // If summary fails, fall back to /commodities
            }

            if (list.length === 0) {
                const response = await apiRequest("/api/market/commodities");
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load market commodities."
                    );
                }

                list = data.commodities || [];

                // Fetch national stats defensively
                await Promise.all(
                    list.map(async (item) => {
                        try {
                            const statsResponse = await apiRequest(
                                `/api/market/national?commodity=${encodeURIComponent(
                                    item.commodity
                                )}&days=30`
                            );
                            const statsData = await statsResponse.json();
                            if (statsResponse.ok && (statsData.success || statsData.stats)) {
                                statsMap[item.commodity] =
                                    statsData.stats || statsData;
                            }
                        } catch {
                            // Defensive: keep fallback item.stats if present
                            if (item.stats) {
                                statsMap[item.commodity] = item.stats;
                            }
                        }
                    })
                );
            }

            setCommodities(list);
            setNationalByCommodity(statsMap);

            if (list.length > 0) {
                setSelected((prev) => prev || list[0].commodity);
            }
        } catch (err) {
            console.error("MARKET LOAD ERROR:", err);
            setError(
                err.message ||
                    "GroWell Market could not load commodity data. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMarketData();
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
                        data.message || "Failed to load market history."
                    );
                }

                if (active) {
                    setHistory(data);
                }
            } catch (err) {
                console.error("MARKET HISTORY ERROR:", err);
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

    // Defensively resolve stats object whether nested in .stats or at top level
    const rawSelected = nationalByCommodity[selected];
    const selectedStats = rawSelected?.stats || rawSelected;

    const filteredCommodities = useMemo(() => {
        return commodities.filter((item) => {
            const matchesCategory =
                activeCategory === "All" || item.category === activeCategory;
            const matchesSearch =
                !searchQuery ||
                (item.label || item.commodity)
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (item.category || "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [commodities, activeCategory, searchQuery]);

    const chartData = useMemo(() => {
        if (!history?.data || !Array.isArray(history.data)) {
            return [];
        }

        return history.data.map((point) => ({
            date: point.date,
            price: point.price,
            minPrice: point.minPrice,
            maxPrice: point.maxPrice
        }));
    }, [history]);

    const mandisToday = history?.mandisToday || [];

    return (
        <div className="market-page">
            {/* Header */}
            <div className="market-header">
                <div>
                    <span>Market Intelligence</span>
                    <h1>📈 GroWell Market</h1>
                    <p>
                        Daily agricultural commodity prices sourced from data.gov.in —
                        AGMARKNET reports by the Ministry of Agriculture &amp; Farmers
                        Welfare. All India mandis aggregated.
                    </p>
                </div>
                <button
                    type="button"
                    className="market-refresh-btn"
                    onClick={loadMarketData}
                    disabled={loading}
                    title="Refresh market data"
                >
                    <RefreshCw size={15} className={loading ? "spin" : ""} />
                    <span>Refresh</span>
                </button>
            </div>

            {loading && commodities.length === 0 && (
                <div className="info-card loading-card">
                    <RefreshCw size={24} className="spin" />
                    <h3>Loading agricultural market intelligence...</h3>
                    <p>Fetching latest mandi arrivals across India.</p>
                </div>
            )}

            {error && commodities.length === 0 && (
                <div className="info-card error-card">
                    <AlertCircle size={28} />
                    <h3>{error}</h3>
                    <button
                        type="button"
                        className="market-retry-btn"
                        onClick={loadMarketData}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {commodities.length > 0 && (
                <div>
                    {/* Commodity Selection Section */}
                    <div className="market-section">
                        <div className="market-section-head">
                            <div>
                                <h2>🌾 Commodity Markets</h2>
                                <span>
                                    All India baseline prices · 30-day window · AGMARKNET
                                </span>
                            </div>

                            {/* Search and Filters */}
                            <div className="market-controls">
                                <div className="market-search-box">
                                    <Search size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search crop..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="category-pills">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={
                                                "category-pill" +
                                                (activeCategory === cat
                                                    ? " active"
                                                    : "")
                                            }
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Commodity Cards Grid */}
                        <div className="commodity-grid">
                            {filteredCommodities.map((item) => {
                                const raw = nationalByCommodity[item.commodity];
                                const stats = raw?.stats || raw;
                                const isSelected = selected === item.commodity;

                                return (
                                    <button
                                        key={item.commodity}
                                        type="button"
                                        className={
                                            "commodity-card" +
                                            (isSelected ? " selected" : "")
                                        }
                                        onClick={() => setSelected(item.commodity)}
                                    >
                                        <div className="commodity-card-top">
                                            <span className="commodity-category">
                                                {item.category}
                                            </span>
                                            {stats?.mandisCount && (
                                                <span className="commodity-mandi-tag">
                                                    {stats.mandisCount} mandis
                                                </span>
                                            )}
                                        </div>

                                        <strong className="commodity-name">
                                            {item.label || item.commodity}
                                        </strong>

                                        <span className="commodity-price">
                                            {formatPrice(stats?.latest)}
                                            <small>/qtl</small>
                                        </span>

                                        {stats && stats.change != null && (
                                            <ChangeBadge
                                                change={stats.change}
                                                percent={stats.changePercent}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected Commodity Detailed Analysis */}
                    {selected && (
                        <div className="market-section analysis-section">
                            <div className="market-section-head">
                                <div>
                                    <h2>
                                        📊 {getCommodityLabel(commodities, selected)}{" "}
                                        — Market Analysis
                                    </h2>
                                    <span>
                                        Detailed price graph · 30-day trend series · All
                                        India Mandis
                                    </span>
                                </div>
                            </div>

                            {/* 4 Stat Cards */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span>Latest Modal Price</span>
                                    <strong>
                                        {formatPrice(selectedStats?.latest)}
                                        <small>/qtl</small>
                                    </strong>
                                    {selectedStats && selectedStats.change != null && (
                                        <ChangeBadge
                                            change={selectedStats.change}
                                            percent={selectedStats.changePercent}
                                        />
                                    )}
                                </div>

                                <div className="stat-card">
                                    <span>30-Day Average</span>
                                    <strong>
                                        {formatPrice(selectedStats?.average)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Avg of last {selectedStats?.days || 30} trading
                                        days
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>30-Day Lowest</span>
                                    <strong>
                                        {formatPrice(selectedStats?.min)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Minimum mandi price in window
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>30-Day Highest</span>
                                    <strong>
                                        {formatPrice(selectedStats?.max)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Maximum mandi price in window
                                    </span>
                                </div>
                            </div>

                            {/* Chart Card */}
                            <div className="chart-card">
                                <div className="chart-header">
                                    <span className="chart-label">
                                        Price Trend — Last 30 Days (₹ / Quintal)
                                    </span>
                                    <span className="chart-subtitle">
                                        <Calendar size={13} />
                                        Daily Mandi Average Price
                                    </span>
                                </div>

                                <div className="chart-container">
                                    {historyLoading ? (
                                        <div className="chart-loading">
                                            <RefreshCw size={20} className="spin" />
                                            <span>Loading price trend graph...</span>
                                        </div>
                                    ) : chartData.length > 0 ? (
                                        <ResponsiveContainer
                                            width="100%"
                                            height={340}
                                        >
                                            <LineChart
                                                data={chartData}
                                                margin={{
                                                    top: 16,
                                                    right: 24,
                                                    left: 10,
                                                    bottom: 0
                                                }}
                                            >
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    stroke="#e4dcc9"
                                                    vertical={false}
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tickFormatter={formatDate}
                                                    tick={{
                                                        fontSize: 11,
                                                        fill: "#66705f"
                                                    }}
                                                    stroke="#96a08e"
                                                    tickLine={false}
                                                    axisLine={{
                                                        stroke: "#cfc5ac"
                                                    }}
                                                    minTickGap={35}
                                                />
                                                <YAxis
                                                    domain={["auto", "auto"]}
                                                    tickFormatter={(value) =>
                                                        `₹${Number(
                                                            value
                                                        ).toLocaleString("en-IN")}`
                                                    }
                                                    tick={{
                                                        fontSize: 11,
                                                        fill: "#66705f"
                                                    }}
                                                    stroke="#96a08e"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    width={78}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        background: "#fffdf7",
                                                        border:
                                                            "1px solid #e4dcc9",
                                                        borderRadius: "12px",
                                                        fontSize: "12px",
                                                        boxShadow:
                                                            "0 6px 18px rgba(20,43,33,0.08)"
                                                    }}
                                                    labelFormatter={(label) =>
                                                        formatDate(label)
                                                    }
                                                    formatter={(value, name) => [
                                                        formatPrice(value),
                                                        name === "price"
                                                            ? "Avg Modal Price"
                                                            : name
                                                    ]}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke="#1e513b"
                                                    strokeWidth={2.8}
                                                    dot={{
                                                        r: 3,
                                                        fill: "#1e513b",
                                                        strokeWidth: 0
                                                    }}
                                                    activeDot={{
                                                        r: 6,
                                                        fill: "#b08d57",
                                                        stroke: "#1e513b",
                                                        strokeWidth: 2
                                                    }}
                                                    name="Avg Modal Price"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="chart-loading">
                                            No price history available.
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Today's Reporting Mandis Table */}
                            {mandisToday.length > 0 && (
                                <div className="mandis-section">
                                    <div className="mandis-header">
                                        <div className="mandis-title">
                                            <Store size={18} />
                                            <h3>
                                                Today's Mandi Arrivals &amp; Spot Prices —{" "}
                                                {getCommodityLabel(commodities, selected)}
                                            </h3>
                                        </div>
                                        <span className="mandis-count">
                                            {mandisToday.length} mandis reporting
                                        </span>
                                    </div>

                                    <div className="mandis-table-wrap">
                                        <table className="mandis-table">
                                            <thead>
                                                <tr>
                                                    <th>Mandi / Market</th>
                                                    <th>Location</th>
                                                    <th>Variety</th>
                                                    <th>Min Price</th>
                                                    <th>Modal Price</th>
                                                    <th>Max Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mandisToday.map((mandi, idx) => (
                                                    <tr key={idx}>
                                                        <td>
                                                            <strong>{mandi.mandi}</strong>
                                                        </td>
                                                        <td>
                                                            <span className="mandi-location">
                                                                <MapPin size={12} />
                                                                {mandi.district},{" "}
                                                                {mandi.state}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="mandi-variety">
                                                                {mandi.variety}
                                                            </span>
                                                        </td>
                                                        <td className="price-muted">
                                                            {formatPrice(mandi.minPrice)}
                                                        </td>
                                                        <td className="price-highlight">
                                                            {formatPrice(
                                                                mandi.modalPrice ||
                                                                    mandi.price
                                                            )}
                                                            <small>/qtl</small>
                                                        </td>
                                                        <td className="price-muted">
                                                            {formatPrice(mandi.maxPrice)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Source Attribution */}
                            <div className="market-source">
                                <BarChart3 size={15} />
                                <span>
                                    Source: data.gov.in — AGMARKNET daily commodity
                                    prices (Ministry of Agriculture &amp; Farmers
                                    Welfare). All India mandis aggregated.
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
