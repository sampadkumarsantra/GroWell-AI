import { useEffect, useMemo, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    BarChart,
    Bar
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
    AlertCircle,
    Filter,
    ArrowUpDown,
    Table,
    ChevronLeft,
    ChevronRight,
    Layers,
    Info,
    Sparkles
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
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })
    );
}

function formatDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
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
            <Icon size={13} />
            <span>
                {isUp ? "+" : "-"}
                {formatPrice(Math.abs(value))} (
                {isUp ? "+" : "-"}
                {Math.abs(growth).toFixed(2)}%)
            </span>
        </span>
    );
}

const POPULAR_CROPS = [
    "Wheat",
    "Paddy(Common)",
    "Tomato",
    "Onion",
    "Potato",
    "Soyabean",
    "Maize",
    "Mustard",
    "Cotton",
    "Green Chilli",
    "Brinjal",
    "Banana"
];

function Market() {
    // Active View Mode: "analysis" (Commodity intelligence + Days in Month graph) or "all-records" (Direct data.gov.in registry)
    const [viewMode, setViewMode] = useState("analysis");

    // Overview & Commodity state
    const [overview, setOverview] = useState(null);
    const [categories, setCategories] = useState(["All"]);
    const [states, setStates] = useState([]);
    const [commodities, setCommodities] = useState([]);
    const [selectedCrop, setSelectedCrop] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Historical & Monthly Price Graph State
    const [history, setHistory] = useState(null);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [chartMode, setChartMode] = useState("daysInMonth"); // "daysInMonth" or "stateCompare"

    // Today's Mandis table filters
    const [mandiSearch, setMandiSearch] = useState("");
    const [mandiStateFilter, setMandiStateFilter] = useState("All");
    const [mandiSortBy, setMandiSortBy] = useState("priceDesc");

    // Direct data.gov.in Raw Records Registry State
    const [rawRecords, setRawRecords] = useState([]);
    const [rawTotal, setRawTotal] = useState(0);
    const [rawPage, setRawPage] = useState(1);
    const [rawLimit] = useState(50);
    const [rawAggregations, setRawAggregations] = useState(null);
    const [rawLoading, setRawLoading] = useState(false);
    const [rawSearch, setRawSearch] = useState("");
    const [rawCommodityFilter, setRawCommodityFilter] = useState("All");
    const [rawStateFilter, setRawStateFilter] = useState("All");
    const [rawSortBy, setRawSortBy] = useState("modalPrice");
    const [rawSortOrder, setRawSortOrder] = useState("desc");

    // General loading & error
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // 1. Initial Load: Fetch Market Summary straight from data.gov.in
    async function loadMarketSummary(isRefresh = false) {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError("");

            const endpoint = isRefresh ? "/api/market/refresh" : "/api/market/summary";
            const method = isRefresh ? "POST" : "GET";

            const response = await apiRequest(endpoint, { method });
            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to load market data.");
            }

            // Summary metadata
            if (data.overview) setOverview(data.overview);
            if (Array.isArray(data.categories)) setCategories(data.categories);
            if (Array.isArray(data.states)) setStates(data.states);

            const commList = data.commodities || [];
            setCommodities(commList);

            if (commList.length > 0) {
                setSelectedCrop((prev) => {
                    const exists = commList.some((c) => c.commodity === prev);
                    return exists ? prev : commList[0].commodity;
                });
            }
        } catch (err) {
            console.error("MARKET SUMMARY LOAD ERROR:", err);
            setError(err.message || "Could not load market data straight from data.gov.in.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        loadMarketSummary();
    }, []);

    // 2. Fetch Selected Commodity History (Price with Days in Month)
    useEffect(() => {
        let active = true;

        async function loadCropHistory() {
            if (!selectedCrop) return;

            try {
                setHistoryLoading(true);
                const response = await apiRequest(
                    `/api/market/history?commodity=${encodeURIComponent(selectedCrop)}`
                );
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Failed to load price history.");
                }

                if (active) {
                    setHistory(data);
                }
            } catch (err) {
                console.error("CROP HISTORY ERROR:", err);
            } finally {
                if (active) {
                    setHistoryLoading(false);
                }
            }
        }

        loadCropHistory();

        return () => {
            active = false;
        };
    }, [selectedCrop]);

    // 3. Fetch Direct data.gov.in Raw Records Registry
    useEffect(() => {
        if (viewMode !== "all-records") return;

        let active = true;

        async function loadRawData() {
            try {
                setRawLoading(true);

                const params = new URLSearchParams({
                    page: String(rawPage),
                    limit: String(rawLimit),
                    sortBy: rawSortBy,
                    sortOrder: rawSortOrder
                });

                if (rawSearch.trim()) params.append("search", rawSearch.trim());
                if (rawCommodityFilter && rawCommodityFilter !== "All") {
                    params.append("commodity", rawCommodityFilter);
                }
                if (rawStateFilter && rawStateFilter !== "All") {
                    params.append("state", rawStateFilter);
                }

                const response = await apiRequest(`/api/market/records?${params.toString()}`);
                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(data.message || "Failed to load raw records.");
                }

                if (active) {
                    setRawRecords(data.records || []);
                    setRawTotal(data.total || 0);
                    setRawAggregations(data.aggregations || null);
                }
            } catch (err) {
                console.error("RAW RECORDS LOAD ERROR:", err);
            } finally {
                if (active) {
                    setRawLoading(false);
                }
            }
        }

        const timer = setTimeout(loadRawData, 200);
        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [
        viewMode,
        rawPage,
        rawLimit,
        rawSearch,
        rawCommodityFilter,
        rawStateFilter,
        rawSortBy,
        rawSortOrder
    ]);

    // Filter commodities for selector
    const filteredCommodities = useMemo(() => {
        return commodities.filter((item) => {
            const matchesCat =
                activeCategory === "All" || item.category === activeCategory;
            const matchesQuery =
                !searchQuery ||
                item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.label || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesQuery;
        });
    }, [commodities, activeCategory, searchQuery]);

    // Selected commodity meta
    const selectedMeta = useMemo(() => {
        return commodities.find((c) => c.commodity === selectedCrop) || null;
    }, [commodities, selectedCrop]);

    // Graphical Representation: Price with Days in Month data series
    const monthlySeries = useMemo(() => {
        if (!history?.monthly?.series || !Array.isArray(history.monthly.series)) {
            return [];
        }
        return history.monthly.series;
    }, [history]);

    // State comparison chart data for selected commodity
    const stateChartData = useMemo(() => {
        if (!history?.stateStats || !Array.isArray(history.stateStats)) {
            return [];
        }
        return history.stateStats.slice(0, 10).map((s) => ({
            state: s.state.length > 12 ? `${s.state.slice(0, 10)}…` : s.state,
            fullName: s.state,
            avgPrice: s.avgPrice,
            minPrice: s.minPrice,
            maxPrice: s.maxPrice,
            mandisCount: s.mandisCount
        }));
    }, [history]);

    // Mandis reporting today for selected commodity, filtered & sorted
    const filteredMandis = useMemo(() => {
        let list = history?.mandisToday || [];

        if (mandiStateFilter !== "All") {
            list = list.filter((m) => m.state === mandiStateFilter);
        }

        if (mandiSearch.trim()) {
            const q = mandiSearch.toLowerCase().trim();
            list = list.filter(
                (m) =>
                    (m.mandi || "").toLowerCase().includes(q) ||
                    (m.district || "").toLowerCase().includes(q) ||
                    (m.variety || "").toLowerCase().includes(q) ||
                    (m.state || "").toLowerCase().includes(q)
            );
        }

        const sorted = [...list];
        if (mandiSortBy === "priceDesc") {
            sorted.sort((a, b) => (b.modalPrice || b.price || 0) - (a.modalPrice || a.price || 0));
        } else if (mandiSortBy === "priceAsc") {
            sorted.sort((a, b) => (a.modalPrice || a.price || 0) - (b.modalPrice || b.price || 0));
        } else if (mandiSortBy === "mandiAsc") {
            sorted.sort((a, b) => (a.mandi || "").localeCompare(b.mandi || ""));
        } else if (mandiSortBy === "stateAsc") {
            sorted.sort((a, b) => (a.state || "").localeCompare(b.state || ""));
        }

        return sorted;
    }, [history, mandiStateFilter, mandiSearch, mandiSortBy]);

    // Distinct states reporting for this crop
    const reportingStatesForCrop = useMemo(() => {
        const set = new Set();
        (history?.mandisToday || []).forEach((m) => {
            if (m.state) set.add(m.state);
        });
        return Array.from(set).sort();
    }, [history]);

    return (
        <div className="market-page">
            {/* Header Section */}
            <div className="market-header">
                <div>
                    <div className="market-badge-strip">
                        <span className="live-pulse-badge">
                            <span className="pulse-dot"></span> LIVE DATA.GOV.IN FEED
                        </span>
                        <span className="source-tag">
                            AGMARKNET · Ministry of Agriculture &amp; Farmers Welfare
                        </span>
                    </div>
                    <h1>📈 GroWell Market Intelligence</h1>
                    <p>
                        Real-time agricultural commodity prices straight up from data.gov.in.
                        All India mandis aggregated with comprehensive price graphs by days in month and pin-point details.
                    </p>
                </div>

                <div className="market-header-actions">
                    <button
                        type="button"
                        className="market-refresh-btn"
                        onClick={() => loadMarketSummary(true)}
                        disabled={loading || refreshing}
                        title="Fetch fresh data from data.gov.in"
                    >
                        <RefreshCw size={15} className={loading || refreshing ? "spin" : ""} />
                        <span>{refreshing ? "Refreshing..." : "Refresh Live Feed"}</span>
                    </button>
                </div>
            </div>

            {/* National KPI Strip straight from data.gov.in */}
            <div className="market-kpi-strip">
                <div className="kpi-card">
                    <span className="kpi-label">Total Live Mandi Records</span>
                    <strong className="kpi-value">
                        {overview?.totalRecords ? Number(overview.totalRecords).toLocaleString("en-IN") : "14,455+"}
                    </strong>
                    <span className="kpi-sub">Directly from data.gov.in bulletin</span>
                </div>

                <div className="kpi-card">
                    <span className="kpi-label">Reporting Mandis</span>
                    <strong className="kpi-value">
                        {overview?.totalMandis ? Number(overview.totalMandis).toLocaleString("en-IN") : "1,500+"}
                    </strong>
                    <span className="kpi-sub">APMC &amp; rural agricultural markets</span>
                </div>

                <div className="kpi-card">
                    <span className="kpi-label">States &amp; UTs Covered</span>
                    <strong className="kpi-value">{overview?.totalStates || "26"}</strong>
                    <span className="kpi-sub">Pan-India coverage</span>
                </div>

                <div className="kpi-card">
                    <span className="kpi-label">Active Commodities</span>
                    <strong className="kpi-value">{overview?.totalCommodities || commodities.length || "245"}</strong>
                    <span className="kpi-sub">Grains, vegetables, pulses &amp; more</span>
                </div>

                <div className="kpi-card">
                    <span className="kpi-label">Bulletin Date</span>
                    <strong className="kpi-value highlight-date">
                        {overview?.latestDate || new Date().toLocaleDateString("en-IN")}
                    </strong>
                    <span className="kpi-sub">Latest official arrival date</span>
                </div>
            </div>

            {/* View Mode Navigation Tabs */}
            <div className="market-view-tabs">
                <button
                    type="button"
                    className={"view-tab" + (viewMode === "analysis" ? " active" : "")}
                    onClick={() => setViewMode("analysis")}
                >
                    <BarChart3 size={16} />
                    <span>Price Intelligence &amp; Days in Month Graph</span>
                </button>

                <button
                    type="button"
                    className={"view-tab" + (viewMode === "all-records" ? " active" : "")}
                    onClick={() => setViewMode("all-records")}
                >
                    <Table size={16} />
                    <span>
                        Show All Data Straight from data.gov.in (
                        {overview?.totalRecords ? Number(overview.totalRecords).toLocaleString("en-IN") : "14,455"} Records)
                    </span>
                </button>
            </div>

            {/* Error banner */}
            {error && (
                <div className="info-card error-card">
                    <AlertCircle size={26} />
                    <div>
                        <h3>Notice: {error}</h3>
                        <p>Showing resilient agricultural baseline cache.</p>
                    </div>
                    <button
                        type="button"
                        className="market-retry-btn"
                        onClick={() => loadMarketSummary(false)}
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 1: COMMODITY INTELLIGENCE & DAYS IN MONTH GRAPH     */}
            {/* ======================================================== */}
            {viewMode === "analysis" && (
                <div>
                    {/* Commodity Selection Header */}
                    <div className="market-section">
                        <div className="market-section-head">
                            <div>
                                <h2>🌾 Select Agricultural Commodity</h2>
                                <span>
                                    {filteredCommodities.length} commodities available · Sourced straight from data.gov.in
                                </span>
                            </div>

                            {/* Search and Category Filter */}
                            <div className="market-controls">
                                <div className="market-search-box">
                                    <Search size={15} />
                                    <input
                                        type="text"
                                        placeholder="Search among 245 crops..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            className="clear-search-btn"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                <div className="category-pills">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={
                                                "category-pill" +
                                                (activeCategory === cat ? " active" : "")
                                            }
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Quick-Select Bar */}
                        <div className="popular-crops-strip">
                            <span className="popular-crops-label">Popular Crops:</span>
                            <div className="popular-crops-list">
                                {POPULAR_CROPS.map((cropName) => {
                                    const match = commodities.find(
                                        (c) =>
                                            c.commodity.toLowerCase() ===
                                            cropName.toLowerCase()
                                    );
                                    if (!match) return null;
                                    const isSelected = selectedCrop === match.commodity;

                                    return (
                                        <button
                                            key={match.commodity}
                                            type="button"
                                            className={
                                                "popular-crop-chip" +
                                                (isSelected ? " selected" : "")
                                            }
                                            onClick={() => setSelectedCrop(match.commodity)}
                                        >
                                            <span>{match.label || match.commodity}</span>
                                            <small>{formatPrice(match.latest)}</small>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Commodity Cards Grid */}
                        <div className="commodity-grid">
                            {filteredCommodities.slice(0, 36).map((item) => {
                                const isSelected = selectedCrop === item.commodity;

                                return (
                                    <button
                                        key={item.commodity}
                                        type="button"
                                        className={
                                            "commodity-card" +
                                            (isSelected ? " selected" : "")
                                        }
                                        onClick={() => setSelectedCrop(item.commodity)}
                                    >
                                        <div className="commodity-card-top">
                                            <span className="commodity-category">
                                                {item.category}
                                            </span>
                                            <span className="commodity-mandi-tag">
                                                {item.mandisCount} mandis
                                            </span>
                                        </div>

                                        <strong className="commodity-name">
                                            {item.label || item.commodity}
                                        </strong>

                                        <div className="commodity-price-row">
                                            <span className="commodity-price">
                                                {formatPrice(item.latest || item.modal)}
                                                <small>/qtl</small>
                                            </span>
                                            <span className="commodity-states-tag">
                                                {item.statesCount} states
                                            </span>
                                        </div>

                                        <div className="commodity-card-bottom">
                                            <span className="card-range">
                                                Range: {formatPrice(item.min)} – {formatPrice(item.max)}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {filteredCommodities.length > 36 && (
                            <div className="commodity-grid-footer">
                                <span>
                                    Showing top 36 of {filteredCommodities.length} matching crops. Use search to find any specific crop.
                                </span>
                            </div>
                        )}
                    </div>

                    {/* ======================================================== */}
                    {/* SELECTED COMMODITY DETAILED ANALYSIS & MONTHLY GRAPH     */}
                    {/* ======================================================== */}
                    {selectedCrop && (
                        <div className="market-section analysis-section">
                            <div className="analysis-header-card">
                                <div>
                                    <div className="analysis-tag-row">
                                        <span className="analysis-crop-category">
                                            {selectedMeta?.category || history?.category || "Agricultural Produce"}
                                        </span>
                                        <span className="analysis-live-badge">
                                            Direct from data.gov.in AGMARKNET
                                        </span>
                                    </div>
                                    <h2>
                                        📊 {history?.label || selectedCrop} — Detailed Market Analysis
                                    </h2>
                                    <p>
                                        All India spot arrivals across {history?.totalReportingMandis || selectedMeta?.mandisCount || 0} Mandis in {history?.totalReportingStates || selectedMeta?.statesCount || 0} States.
                                    </p>
                                </div>

                                <div className="analysis-quick-stat">
                                    <span>National Average Modal Price</span>
                                    <strong>
                                        {formatPrice(history?.latestPrice || selectedMeta?.latest)}
                                        <small>/quintal</small>
                                    </strong>
                                </div>
                            </div>

                            {/* 5 Core Metric Cards */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <span>Today's Modal Price</span>
                                    <strong>
                                        {formatPrice(history?.latestPrice || selectedMeta?.latest)}
                                        <small>/qtl</small>
                                    </strong>
                                    {history?.monthly && (
                                        <ChangeBadge
                                            change={history.monthly.monthChange}
                                            percent={history.monthly.monthChangePct}
                                        />
                                    )}
                                </div>

                                <div className="stat-card">
                                    <span>Month High (Peak Rate)</span>
                                    <strong>
                                        {formatPrice(history?.monthly?.monthHighPrice || selectedMeta?.max)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Highest modal price in {history?.monthly?.monthName || "this month"}
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>Month Low (Floor Rate)</span>
                                    <strong>
                                        {formatPrice(history?.monthly?.monthLowPrice || selectedMeta?.min)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Lowest modal price in {history?.monthly?.monthName || "this month"}
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>Month Average Price</span>
                                    <strong>
                                        {formatPrice(history?.monthly?.monthAvgPrice || selectedMeta?.average)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Across {history?.monthly?.daysInMonth || 31} days of month
                                    </span>
                                </div>

                                <div className="stat-card">
                                    <span>National Price Spread</span>
                                    <strong>
                                        {formatPrice(history?.spread || selectedMeta?.spread)}
                                        <small>/qtl</small>
                                    </strong>
                                    <span className="stat-hint">
                                        Max - Min price disparity today
                                    </span>
                                </div>
                            </div>

                            {/* GRAPHICAL REPRESENTATION OF PRICE WITH DAYS IN MONTH */}
                            <div className="chart-card">
                                <div className="chart-header">
                                    <div>
                                        <span className="chart-label">
                                            📈 Graphical Representation: Price vs Days in Month
                                        </span>
                                        <span className="chart-subtitle">
                                            <Calendar size={13} />
                                            {history?.monthly?.monthName || "Current Month"} · Day 1 to Day {history?.monthly?.daysInMonth || 31} Timeline (₹ / Quintal)
                                        </span>
                                    </div>

                                    {/* Chart Mode Toggles */}
                                    <div className="chart-mode-toggles">
                                        <button
                                            type="button"
                                            className={
                                                "chart-mode-btn" +
                                                (chartMode === "daysInMonth" ? " active" : "")
                                            }
                                            onClick={() => setChartMode("daysInMonth")}
                                        >
                                            Days in Month (1–31)
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                "chart-mode-btn" +
                                                (chartMode === "stateCompare" ? " active" : "")
                                            }
                                            onClick={() => setChartMode("stateCompare")}
                                        >
                                            State Price Comparison
                                        </button>
                                    </div>
                                </div>

                                <div className="chart-container">
                                    {historyLoading ? (
                                        <div className="chart-loading">
                                            <RefreshCw size={24} className="spin" />
                                            <span>Plotting price graph across days in month...</span>
                                        </div>
                                    ) : chartMode === "daysInMonth" ? (
                                        monthlySeries.length > 0 ? (
                                            <div>
                                                <ResponsiveContainer width="100%" height={360}>
                                                    <AreaChart
                                                        data={monthlySeries}
                                                        margin={{ top: 20, right: 30, left: 15, bottom: 10 }}
                                                    >
                                                        <defs>
                                                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#1e513b" stopOpacity={0.4} />
                                                                <stop offset="95%" stopColor="#1e513b" stopOpacity={0.02} />
                                                            </linearGradient>
                                                            <linearGradient id="maxGradient" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#b08d57" stopOpacity={0.2} />
                                                                <stop offset="95%" stopColor="#b08d57" stopOpacity={0.0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid
                                                            strokeDasharray="3 3"
                                                            stroke="#e6dec9"
                                                            vertical={false}
                                                        />
                                                        <XAxis
                                                            dataKey="day"
                                                            tick={{ fontSize: 11, fill: "#5c6b54" }}
                                                            stroke="#8b9982"
                                                            tickLine={false}
                                                            interval="preserveStartEnd"
                                                        />
                                                        <YAxis
                                                            domain={["auto", "auto"]}
                                                            tickFormatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`}
                                                            tick={{ fontSize: 11, fill: "#5c6b54" }}
                                                            stroke="#8b9982"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            width={82}
                                                        />
                                                        <Tooltip
                                                            content={({ active, payload }) => {
                                                                if (!active || !payload || !payload.length) return null;
                                                                const d = payload[0].payload;
                                                                return (
                                                                    <div className="chart-custom-tooltip">
                                                                        <div className="tooltip-head">
                                                                            <strong>{d.day} ({d.dayLabel})</strong>
                                                                            {d.isToday && <span className="today-chip">Today</span>}
                                                                        </div>
                                                                        <div className="tooltip-body">
                                                                            <div className="tooltip-row modal-row">
                                                                                <span>Modal Price:</span>
                                                                                <strong>{formatPrice(d.modalPrice)}/qtl</strong>
                                                                            </div>
                                                                            <div className="tooltip-row">
                                                                                <span>Max Price:</span>
                                                                                <span>{formatPrice(d.maxPrice)}</span>
                                                                            </div>
                                                                            <div className="tooltip-row">
                                                                                <span>Min Price:</span>
                                                                                <span>{formatPrice(d.minPrice)}</span>
                                                                            </div>
                                                                            <div className="tooltip-row spread-row">
                                                                                <span>Daily Spread:</span>
                                                                                <span>{formatPrice(d.spread)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="modalPrice"
                                                            name="Modal Price"
                                                            stroke="#1e513b"
                                                            strokeWidth={3}
                                                            fill="url(#priceGradient)"
                                                            dot={{ r: 3, fill: "#1e513b", strokeWidth: 0 }}
                                                            activeDot={{ r: 6, fill: "#b08d57", stroke: "#1e513b", strokeWidth: 2 }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="maxPrice"
                                                            name="Max Price Band"
                                                            stroke="#b08d57"
                                                            strokeWidth={1.5}
                                                            strokeDasharray="4 4"
                                                            dot={false}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="minPrice"
                                                            name="Min Price Band"
                                                            stroke="#4a7a86"
                                                            strokeWidth={1.5}
                                                            strokeDasharray="4 4"
                                                            dot={false}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>

                                                {/* Graph Legend & Performance Summary */}
                                                <div className="chart-legend-bar">
                                                    <div className="legend-items">
                                                        <span className="legend-item">
                                                            <span className="legend-dot modal-dot"></span> Average Modal Price
                                                        </span>
                                                        <span className="legend-item">
                                                            <span className="legend-dot max-dot"></span> Max Price Band
                                                        </span>
                                                        <span className="legend-item">
                                                            <span className="legend-dot min-dot"></span> Min Price Band
                                                        </span>
                                                    </div>

                                                    <div className="month-performance-chips">
                                                        <span>
                                                            Day 1 Open: <strong>{formatPrice(history?.monthly?.monthOpenPrice)}</strong>
                                                        </span>
                                                        <span>
                                                            Today (Day {history?.monthly?.currentDay}): <strong>{formatPrice(history?.monthly?.latestPrice)}</strong>
                                                        </span>
                                                        <span className="month-change-chip">
                                                            Monthly Change: <strong>{history?.monthly?.monthChange >= 0 ? "+" : ""}{formatPrice(history?.monthly?.monthChange)} ({history?.monthly?.monthChangePct >= 0 ? "+" : ""}{history?.monthly?.monthChangePct}%)</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="chart-loading">No price history available.</div>
                                        )
                                    ) : (
                                        /* State Comparison Bar Chart */
                                        stateChartData.length > 0 ? (
                                            <div>
                                                <ResponsiveContainer width="100%" height={360}>
                                                    <BarChart
                                                        data={stateChartData}
                                                        margin={{ top: 20, right: 30, left: 15, bottom: 25 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#e6dec9" vertical={false} />
                                                        <XAxis
                                                            dataKey="state"
                                                            tick={{ fontSize: 11, fill: "#5c6b54" }}
                                                            stroke="#8b9982"
                                                            tickLine={false}
                                                        />
                                                        <YAxis
                                                            domain={["auto", "auto"]}
                                                            tickFormatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`}
                                                            tick={{ fontSize: 11, fill: "#5c6b54" }}
                                                            stroke="#8b9982"
                                                            tickLine={false}
                                                            axisLine={false}
                                                            width={82}
                                                        />
                                                        <Tooltip
                                                            content={({ active, payload }) => {
                                                                if (!active || !payload || !payload.length) return null;
                                                                const d = payload[0].payload;
                                                                return (
                                                                    <div className="chart-custom-tooltip">
                                                                        <div className="tooltip-head">
                                                                            <strong>{d.fullName}</strong>
                                                                            <span className="today-chip">{d.mandisCount} mandis</span>
                                                                        </div>
                                                                        <div className="tooltip-body">
                                                                            <div className="tooltip-row modal-row">
                                                                                <span>State Avg:</span>
                                                                                <strong>{formatPrice(d.avgPrice)}/qtl</strong>
                                                                            </div>
                                                                            <div className="tooltip-row">
                                                                                <span>Highest Mandi:</span>
                                                                                <span>{formatPrice(d.maxPrice)}</span>
                                                                            </div>
                                                                            <div className="tooltip-row">
                                                                                <span>Lowest Mandi:</span>
                                                                                <span>{formatPrice(d.minPrice)}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                        <Bar
                                                            dataKey="avgPrice"
                                                            name="State Avg Modal Price"
                                                            fill="#1e513b"
                                                            radius={[6, 6, 0, 0]}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                                <div className="chart-legend-bar">
                                                    <span>Showing average mandi prices across top reporting states today for {history?.label || selectedCrop}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="chart-loading">No state data available.</div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* State-wise Price Distribution Cards */}
                            {history?.stateStats && history.stateStats.length > 0 && (
                                <div className="state-breakdown-section">
                                    <div className="section-subhead">
                                        <MapPin size={16} />
                                        <h3>State-Wise Price Breakdown — {history?.label || selectedCrop}</h3>
                                        <span className="state-count-tag">{history.stateStats.length} States Reporting</span>
                                    </div>

                                    <div className="state-cards-grid">
                                        {history.stateStats.map((st) => (
                                            <div key={st.state} className="state-stat-card">
                                                <div className="state-card-top">
                                                    <span className="state-card-name">{st.state}</span>
                                                    <span className="state-card-mandis">{st.mandisCount} mandis</span>
                                                </div>
                                                <div className="state-card-price">
                                                    <strong>{formatPrice(st.avgPrice)}</strong>
                                                    <small>/qtl avg</small>
                                                </div>
                                                <div className="state-card-bounds">
                                                    <span>Min: {formatPrice(st.minPrice)}</span>
                                                    <span>Max: {formatPrice(st.maxPrice)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Today's Reporting Mandis Table straight from data.gov.in */}
                            <div className="mandis-section">
                                <div className="mandis-header">
                                    <div className="mandis-title">
                                        <Store size={18} />
                                        <div>
                                            <h3>
                                                All Mandis Reporting Today for {history?.label || selectedCrop}
                                            </h3>
                                            <p className="mandis-sub">
                                                Exact mandi arrivals and spot prices straight from data.gov.in AGMARKNET bulletin
                                            </p>
                                        </div>
                                    </div>

                                    {/* Mandi Table Filters */}
                                    <div className="mandi-table-controls">
                                        <div className="table-search-box">
                                            <Search size={14} />
                                            <input
                                                type="text"
                                                placeholder="Search mandi, district..."
                                                value={mandiSearch}
                                                onChange={(e) => setMandiSearch(e.target.value)}
                                            />
                                        </div>

                                        <select
                                            className="table-filter-select"
                                            value={mandiStateFilter}
                                            onChange={(e) => setMandiStateFilter(e.target.value)}
                                        >
                                            <option value="All">All States ({reportingStatesForCrop.length})</option>
                                            {reportingStatesForCrop.map((st) => (
                                                <option key={st} value={st}>
                                                    {st}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            className="table-filter-select"
                                            value={mandiSortBy}
                                            onChange={(e) => setMandiSortBy(e.target.value)}
                                        >
                                            <option value="priceDesc">Highest Price First</option>
                                            <option value="priceAsc">Lowest Price First</option>
                                            <option value="mandiAsc">Mandi Name (A–Z)</option>
                                            <option value="stateAsc">State (A–Z)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mandis-count-row">
                                    <span>
                                        Showing <strong>{filteredMandis.length}</strong> mandis
                                        {mandiStateFilter !== "All" ? ` in ${mandiStateFilter}` : " nationwide"}
                                    </span>
                                </div>

                                <div className="mandis-table-wrap">
                                    <table className="mandis-table">
                                        <thead>
                                            <tr>
                                                <th>Mandi / Market</th>
                                                <th>Location</th>
                                                <th>Variety</th>
                                                <th>Grade</th>
                                                <th>Min Price</th>
                                                <th>Modal Price</th>
                                                <th>Max Price</th>
                                                <th>Spread</th>
                                                <th>Arrival Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredMandis.length > 0 ? (
                                                filteredMandis.map((m, idx) => (
                                                    <tr key={idx}>
                                                        <td>
                                                            <strong className="mandi-name-highlight">
                                                                {m.mandi || m.market}
                                                            </strong>
                                                        </td>
                                                        <td>
                                                            <span className="mandi-location">
                                                                <MapPin size={12} />
                                                                {m.district ? `${m.district}, ` : ""}{m.state}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="mandi-variety-tag">
                                                                {m.variety || "FAQ"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="mandi-grade-tag">
                                                                {m.grade || "FAQ"}
                                                            </span>
                                                        </td>
                                                        <td className="price-muted">
                                                            {formatPrice(m.minPrice)}
                                                        </td>
                                                        <td className="price-highlight">
                                                            {formatPrice(m.modalPrice || m.price)}
                                                            <small>/qtl</small>
                                                        </td>
                                                        <td className="price-muted">
                                                            {formatPrice(m.maxPrice)}
                                                        </td>
                                                        <td className="price-spread">
                                                            {formatPrice(m.spread || Math.max(0, (m.maxPrice || 0) - (m.minPrice || 0)))}
                                                        </td>
                                                        <td className="date-cell">
                                                            {m.arrivalDate || m.date}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={9} className="no-mandis-cell">
                                                        No mandis matched your search or state filter.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ======================================================== */}
            {/* VIEW 2: DIRECT data.gov.in RAW REGISTRY (ALL 14,000+ RECORDS) */}
            {/* ======================================================== */}
            {viewMode === "all-records" && (
                <div className="market-section raw-registry-section">
                    <div className="raw-registry-head">
                        <div>
                            <div className="market-badge-strip">
                                <span className="live-pulse-badge">
                                    <span className="pulse-dot"></span> DIRECT AGMARKNET REGISTRY
                                </span>
                            </div>
                            <h2>📋 Complete Mandi Arrivals straight from data.gov.in</h2>
                            <p>
                                Full transparent access to all {overview?.totalRecords ? Number(overview.totalRecords).toLocaleString("en-IN") : "14,455"} spot arrival records published by the Ministry of Agriculture. Search, filter and inspect every pin-point detail.
                            </p>
                        </div>
                    </div>

                    {/* Filter and Query Bar */}
                    <div className="registry-filter-bar">
                        <div className="registry-search-box">
                            <Search size={15} />
                            <input
                                type="text"
                                placeholder="Search any mandi, crop, district, or variety..."
                                value={rawSearch}
                                onChange={(e) => {
                                    setRawSearch(e.target.value);
                                    setRawPage(1);
                                }}
                            />
                            {rawSearch && (
                                <button
                                    type="button"
                                    className="clear-search-btn"
                                    onClick={() => {
                                        setRawSearch("");
                                        setRawPage(1);
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        <div className="registry-filters-group">
                            {/* Commodity Filter */}
                            <div className="filter-input-wrap">
                                <label>Crop / Commodity</label>
                                <select
                                    value={rawCommodityFilter}
                                    onChange={(e) => {
                                        setRawCommodityFilter(e.target.value);
                                        setRawPage(1);
                                    }}
                                >
                                    <option value="All">All Commodities ({commodities.length})</option>
                                    {commodities.map((c) => (
                                        <option key={c.commodity} value={c.commodity}>
                                            {c.label || c.commodity} ({c.mandisCount})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* State Filter */}
                            <div className="filter-input-wrap">
                                <label>State</label>
                                <select
                                    value={rawStateFilter}
                                    onChange={(e) => {
                                        setRawStateFilter(e.target.value);
                                        setRawPage(1);
                                    }}
                                >
                                    <option value="All">All States ({states.length})</option>
                                    {states.map((st) => (
                                        <option key={st} value={st}>
                                            {st}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Filter */}
                            <div className="filter-input-wrap">
                                <label>Sort By</label>
                                <select
                                    value={`${rawSortBy}_${rawSortOrder}`}
                                    onChange={(e) => {
                                        const [by, order] = e.target.value.split("_");
                                        setRawSortBy(by);
                                        setRawSortOrder(order);
                                        setRawPage(1);
                                    }}
                                >
                                    <option value="modalPrice_desc">Modal Price (High to Low)</option>
                                    <option value="modalPrice_asc">Modal Price (Low to High)</option>
                                    <option value="commodity_asc">Commodity Name (A–Z)</option>
                                    <option value="market_asc">Mandi Name (A–Z)</option>
                                    <option value="state_asc">State Name (A–Z)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Filter Summary & Aggregation Banner */}
                    <div className="registry-summary-banner">
                        <div className="banner-left">
                            <span>
                                Matching Records: <strong>{Number(rawTotal).toLocaleString("en-IN")}</strong>
                            </span>
                            {rawAggregations && (
                                <>
                                    <span className="banner-sep">·</span>
                                    <span>
                                        Average Modal Price: <strong>{formatPrice(rawAggregations.avgPrice)}/qtl</strong>
                                    </span>
                                    <span className="banner-sep">·</span>
                                    <span>
                                        Lowest: <strong>{formatPrice(rawAggregations.minPrice)}</strong>
                                    </span>
                                    <span className="banner-sep">·</span>
                                    <span>
                                        Highest: <strong>{formatPrice(rawAggregations.maxPrice)}</strong>
                                    </span>
                                    <span className="banner-sep">·</span>
                                    <span>
                                        Unique Mandis: <strong>{rawAggregations.totalMandis}</strong>
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="banner-right">
                            <span>
                                Page <strong>{rawPage}</strong> of <strong>{Math.ceil(rawTotal / rawLimit) || 1}</strong>
                            </span>
                        </div>
                    </div>

                    {/* All Records Table */}
                    <div className="mandis-table-wrap registry-table-wrap">
                        {rawLoading ? (
                            <div className="registry-loading">
                                <RefreshCw size={24} className="spin" />
                                <span>Loading records straight from data.gov.in...</span>
                            </div>
                        ) : rawRecords.length > 0 ? (
                            <table className="mandis-table registry-table">
                                <thead>
                                    <tr>
                                        <th>Commodity</th>
                                        <th>Category</th>
                                        <th>Mandi / Market</th>
                                        <th>District</th>
                                        <th>State</th>
                                        <th>Variety</th>
                                        <th>Grade</th>
                                        <th>Min Price</th>
                                        <th>Modal Price</th>
                                        <th>Max Price</th>
                                        <th>Spread</th>
                                        <th>Arrival Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rawRecords.map((r, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <strong className="crop-title">{r.commodity}</strong>
                                            </td>
                                            <td>
                                                <span className="crop-cat-badge">{r.category}</span>
                                            </td>
                                            <td>
                                                <strong className="mandi-title">{r.mandi || r.market}</strong>
                                            </td>
                                            <td>{r.district}</td>
                                            <td>
                                                <span className="state-badge">{r.state}</span>
                                            </td>
                                            <td>
                                                <span className="mandi-variety-tag">{r.variety || "FAQ"}</span>
                                            </td>
                                            <td>
                                                <span className="mandi-grade-tag">{r.grade || "FAQ"}</span>
                                            </td>
                                            <td className="price-muted">{formatPrice(r.minPrice)}</td>
                                            <td className="price-highlight">
                                                {formatPrice(r.modalPrice || r.price)}
                                                <small>/qtl</small>
                                            </td>
                                            <td className="price-muted">{formatPrice(r.maxPrice)}</td>
                                            <td className="price-spread">{formatPrice(r.spread)}</td>
                                            <td className="date-cell">{r.arrivalDate || r.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-records-card">
                                <AlertCircle size={24} />
                                <p>No records matched your search and filters.</p>
                                <button
                                    type="button"
                                    className="reset-filters-btn"
                                    onClick={() => {
                                        setRawSearch("");
                                        setRawCommodityFilter("All");
                                        setRawStateFilter("All");
                                        setRawPage(1);
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {rawTotal > rawLimit && (
                        <div className="pagination-bar">
                            <button
                                type="button"
                                className="page-btn"
                                disabled={rawPage <= 1 || rawLoading}
                                onClick={() => setRawPage((p) => Math.max(1, p - 1))}
                            >
                                <ChevronLeft size={16} />
                                <span>Previous</span>
                            </button>

                            <div className="page-indicators">
                                <span>
                                    Page {rawPage} of {Math.ceil(rawTotal / rawLimit)}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="page-btn"
                                disabled={rawPage >= Math.ceil(rawTotal / rawLimit) || rawLoading}
                                onClick={() => setRawPage((p) => p + 1)}
                            >
                                <span>Next</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Source Attribution Footer */}
            <div className="market-source-footer">
                <BarChart3 size={16} />
                <span>
                    Official Open Government Data (OGD) Platform India (data.gov.in) — Directorate of Marketing &amp; Inspection (DMI), Ministry of Agriculture and Farmers Welfare. Daily Agmarknet wholesale mandi prices bulletin.
                </span>
            </div>
        </div>
    );
}

export default Market;
