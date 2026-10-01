/*
 * =====================================================
 * GROWell AI — MARKET INTELLIGENCE
 * =====================================================
 *
 * A view of every commodity the government publishes, at the
 * level a mandi actually reports: which state, which district,
 * which market, which variety, and how much arrived.
 *
 * What this page is careful about:
 *
 *   Every number carries the date it was recorded and the body
 *   that published it. Mandi reporting lags the calendar and a
 *   "today" label over last week's price costs a farmer money, so
 *   the trade date is never replaced by the fetch time.
 *
 *   Averages are labelled with how many mandis they rest on. A
 *   national average drawn from four mandis is not the same claim
 *   as one drawn from four hundred, and the difference is shown
 *   rather than smoothed away.
 *
 *   A missing figure says why. Turmeric has no government source
 *   and is answered from a third-party mirror, and the page says
 *   so wherever those figures appear. An unreachable feed is
 *   reported as a gap in the feed, never as a market that did not
 *   trade.
 *
 *   Rows the feed publishes outside any plausible range are
 *   listed rather than quietly dropped, so the guard is visible
 *   and can be disagreed with.
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

import {
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    Download,
    MapPin,
    RefreshCw,
    Scale,
    TrendingUp,
    Warehouse
} from "lucide-react";

import { apiRequest, readJson } from "../services/api";

import {
    arrivalsSeries,
    districtOptions,
    distributionSeries,
    filterMandis,
    historySeries,
    isThin,
    prettyDate,
    rankedCrops,
    rupees,
    rupeesShort,
    shortDate,
    stateOptions,
    stateSeries,
    tonnes,
    varietySeries
} from "./analytics/portalData";

import "./Analytics.css";


// Brass for the national line, forest for the mandis, warm red
// for the ones paying least. Three roles, three colours, used the
// same way on every chart so a reader learns them once.
const BRASS = "#b08d57";

const FOREST = "#1e513b";

const CLAY = "#b34a3f";


/*
 * Stable empty stand-ins.
 *
 * Held here rather than inline because `payload?.crops || []`
 * makes a new array on every render, and every memo below would
 * then recompute on every render for nothing. One shared
 * reference keeps the empty case as quiet as the loaded one.
 */
const NO_CROPS = [];

const NO_MANDIS = [];


function ChartTooltip({ active, payload, label, unit = "₹" }) {

    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div className="gw-tip">
            <strong>{label}</strong>

            {payload.map((entry) => (
                <span key={entry.dataKey}>
                    {entry.name}:{" "}
                    {unit === "₹"
                        ? rupees(entry.value)
                        : `${Number(entry.value).toLocaleString("en-IN")} ${entry.name.includes("arrivals") || entry.name.includes("Records") ? "t" : ""}`}
                </span>
            ))}
        </div>
    );
}


/* =====================================================
   STAT TILE
   ===================================================== */

function Stat({ label, value, hint, tone }) {

    return (
        <div className={`gw-stat gw-stat-${tone || "plain"}`}>

            <span className="gw-stat-label">
                {label}
            </span>

            <strong className="gw-stat-value">
                {value}
            </strong>

            {hint && (
                <small className="gw-stat-hint">
                    {hint}
                </small>
            )}

        </div>
    );
}


/* =====================================================
   PAGE
   ===================================================== */

function Analytics() {

    const [payload, setPayload] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [cropName, setCropName] = useState("Rice");

    const [history, setHistory] = useState([]);

    const [historyLoading, setHistoryLoading] = useState(false);

    const [filters, setFilters] = useState({
        state: "",
        district: "",
        search: ""
    });

    const [showLedger, setShowLedger] = useState(false);


    /* ================================
       LOAD PORTAL
    ================================= */

    const loadPortal = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {

            const response = await apiRequest(
                "/api/market/portal"
            );

            const data = await readJson(response);

            if (!response.ok || !data?.success) {
                setError(
                    data?.message ||
                        "The market report could not be loaded."
                );
                return;
            }

            setPayload(data);

            /*
             * Land on the crop with the widest coverage rather
             * than the first name in the list. Rice is first
             * alphabetically and would be the first thing anyone
             * wrote, but wheat covering five hundred mandis is a
             * better first screen than rice covering a hundred.
             */
            const best = rankedCrops(data.crops)[0];

            if (best) {
                setCropName(best.crop);
            }

        } catch (requestError) {
            setError(
                requestError.message ||
                    "The GroWell server could not be reached."
            );
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() => {
        loadPortal();
    }, [loadPortal]);


    /* ================================
       LOAD HISTORY
    =================================
       Only for the crop on screen. Asking for all twelve up
       front means pulling six days of state reports for eleven
       lines nobody has looked at yet, against a host that
       refuses connections when pushed.
    ================================= */

    useEffect(() => {

        if (!cropName) {
            return;
        }

        let cancelled = false;

        setHistoryLoading(true);

        apiRequest(
            `/api/market/portal/history?crop=${encodeURIComponent(cropName)}`
        )
            .then(readJson)
            .then((data) => {
                if (!cancelled) {
                    setHistory(data?.history || []);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setHistory([]);
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setHistoryLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };

    }, [cropName, payload]);


    const crops = payload?.crops || NO_CROPS;

    const ranked = useMemo(
        () => rankedCrops(crops),
        [crops]
    );

    const unavailable = useMemo(
        () => crops.filter((crop) => !crop.available),
        [crops]
    );

    const crop =
        crops.find((entry) => entry.crop === cropName) ||
        ranked[0] ||
        null;

    const mandis = crop?.mandis || NO_MANDIS;

    const filtered = useMemo(
        () => filterMandis(mandis, filters),
        [mandis, filters]
    );

    const districts = useMemo(
        () => districtOptions(mandis),
        [mandis]
    );

    const states = useMemo(
        () => stateOptions(mandis),
        [mandis]
    );

    const coverage = payload?.coverage;

    const thin = isThin(crop?.summary);


    /* ================================
       EXPORT
    =================================
       Exports what the table is showing, not the whole feed.
       A farmer who filtered to their district should get their
       district.
    ================================= */

    function exportMandis() {

        const header = [
            "Mandi",
            "District",
            "State",
            "Variety",
            "Min",
            "Modal",
            "Max",
            "Arrivals (t)"
        ];

        const lines = filtered.map((mandi) => [
            mandi.market,
            mandi.district,
            mandi.state,
            mandi.variety,
            mandi.min,
            mandi.modal,
            mandi.max,
            mandi.arrivals ?? ""
        ]);

        const csv = [header, ...lines]
            .map((row) =>
                row
                    .map((cell) =>
                        `"${String(cell ?? "").replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv"
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `growell-${crop.crop.toLowerCase()}-mandis-${crop.asOn}.csv`;

        link.click();

        URL.revokeObjectURL(url);
    }


    /* ================================
       STATES
    ================================= */

    if (loading) {
        return (
            <div className="gw-analytics">
                <div className="gw-loading">
                    <RefreshCw
                        size={22}
                        className="gw-spin"
                    />
                    <p>
                        Reading the daily mandi report from
                        Agmarknet. This usually takes a few
                        seconds.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="gw-analytics">
                <div className="gw-loading">
                    <AlertTriangle size={22} />
                    <p>{error}</p>
                    <button
                        type="button"
                        className="gw-btn"
                        onClick={loadPortal}
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }


    /* ================================
       RENDER
    ================================= */

    return (
        <div className="gw-analytics">

            {/* =========================
                HEADER
            ========================= */}

            <header className="gw-an-header">

                <div>
                    <span className="gw-an-eyebrow">
                        {payload.source}
                    </span>

                    <h1>Market Intelligence</h1>

                    <p>
                        Every commodity the government
                        publishes, at mandi level. Prices as on{" "}
                        <strong>
                            {prettyDate(payload.asOn)}
                        </strong>
                        {coverage && coverage.states?.length
                            ? `, across ${coverage.states.length} state${coverage.states.length === 1 ? "" : "s"} and ${coverage.mandis.toLocaleString("en-IN")} mandis.`
                            : "."}
                    </p>
                </div>

                <button
                    type="button"
                    className="gw-btn"
                    onClick={loadPortal}
                    disabled={loading}
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>

            </header>


            {/* A feed that refused to answer is a gap in the
                feed, not a market that did not trade. */}
            {coverage?.feedDown && (
                <div className="gw-an-alert">
                    <AlertTriangle size={18} />
                    <p>
                        The Agmarknet report could not be
                        reached just now, so today&rsquo;s
                        figures are missing. This is a gap in
                        the government feed, not a market with
                        no trading. The per-crop prices in chat
                        come from a separate feed and may still
                        be current.
                    </p>
                </div>
            )}


            {/* =========================
                CROP SELECTOR
            ========================= */}

            <nav className="gw-crops">

                {ranked.map((entry) => (
                    <button
                        key={entry.crop}
                        type="button"
                        className={
                            entry.crop === crop?.crop
                                ? "active"
                                : ""
                        }
                        onClick={() => {
                            setCropName(entry.crop);
                            setFilters({
                                state: "",
                                district: "",
                                search: ""
                            });
                            setShowLedger(false);
                        }}
                    >
                        <span>{entry.crop}</span>
                        <small>
                            {rupeesShort(
                                entry.summary.average
                            )}
                        </small>
                    </button>
                ))}

            </nav>

            {unavailable.length > 0 && (
                <p className="gw-an-note">
                    {unavailable
                        .map(
                            (entry) =>
                                `${entry.crop}: ${entry.reason}`
                        )
                        .join(" ")}
                </p>
            )}


            {!crop ? (
                <div className="gw-loading">
                    <p>No crop is available right now.</p>
                </div>
            ) : (
                <>
                    {/* =====================
                        SUMMARY
                    ===================== */}

                    {crop.note && (
                        <div className="gw-an-alert gw-an-warn">
                            <AlertTriangle size={18} />
                            <p>{crop.note}</p>
                        </div>
                    )}

                    {thin && (
                        <div className="gw-an-alert gw-an-warn">
                            <AlertTriangle size={18} />
                            <p>
                                Only {crop.summary.mandis}{" "}
                                mandi{crop.summary.mandis === 1 ? "" : "s"}{" "}
                                reported {crop.crop.toLowerCase()}{" "}
                                on this date, so the average
                                below is a thin figure. Treat it
                                as a sign of direction, not a
                                settled national price.
                            </p>
                        </div>
                    )}

                    <section className="gw-an-stats">

                        <Stat
                            label="National average"
                            value={rupees(crop.summary.average)}
                            hint={`${crop.summary.mandis} mandis reporting`}
                        />

                        <Stat
                            label="Range across mandis"
                            value={`${rupeesShort(crop.summary.low)} – ${rupeesShort(crop.summary.high)}`}
                            hint={`${rupees(crop.summary.spread)} spread`}
                        />

                        <Stat
                            label="Price dispersion"
                            value={`${crop.summary.dispersion}%`}
                            hint="Higher means mandis disagree"
                        />

                        <Stat
                            label="Varieties reported"
                            value={crop.varieties.length}
                            hint={`${crop.states.length} states, ${crop.districts.length} districts`}
                        />

                        <Stat
                            label="Volume arrived"
                            value={tonnes(
                                crop.arrivals.reduce(
                                    (total, entry) =>
                                        total +
                                        entry.arrivals,
                                    0
                                )
                            )}
                            hint={
                                crop.arrivals.length
                                    ? `Across ${crop.arrivals.length} states`
                                    : "Not published for this crop"
                            }
                        />

                        <Stat
                            label="Highest paying mandi"
                            value={rupeesShort(
                                crop.summary.high
                            )}
                            hint={crop.summary.highMandi}
                            tone="high"
                        />

                    </section>


                    {/* =====================
                        CHARTS
                    ===================== */}

                    <section className="gw-an-grid">

                        {/* ---- price over time ---- */}

                        <div className="gw-panel gw-panel-wide">

                            <div className="gw-panel-head">
                                <h2>
                                    <TrendingUp size={17} />
                                    {crop.crop} price over
                                    the last week
                                </h2>

                                {historyLoading && (
                                    <RefreshCw
                                        size={14}
                                        className="gw-spin"
                                    />
                                )}
                            </div>

                            {history.length > 1 ? (
                                <>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={260}
                                    >
                                        <LineChart
                                            data={historySeries(
                                                history
                                            )}
                                            margin={{
                                                top: 8,
                                                right: 12,
                                                bottom: 4,
                                                left: 4
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#e4dcc9"
                                                vertical={false}
                                            />

                                            <XAxis
                                                dataKey="label"
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#66705f"
                                                }}
                                            />

                                            <YAxis
                                                tick={{
                                                    fontSize: 11,
                                                    fill: "#66705f"
                                                }}
                                                tickFormatter={
                                                    rupeesShort
                                                }
                                                width={54}
                                            />

                                            <Tooltip
                                                content={
                                                    <ChartTooltip />
                                                }
                                            />

                                            <Line
                                                type="monotone"
                                                dataKey="low"
                                                stroke={CLAY}
                                                strokeDasharray="3 3"
                                                strokeWidth={1}
                                                dot={false}
                                            />

                                            <Line
                                                type="monotone"
                                                dataKey="high"
                                                stroke={FOREST}
                                                strokeDasharray="3 3"
                                                strokeWidth={1}
                                                dot={false}
                                            />

                                            <Line
                                                type="monotone"
                                                dataKey="average"
                                                stroke={BRASS}
                                                strokeWidth={2.5}
                                                dot={{
                                                    r: 3
                                                }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                    <p className="gw-panel-foot">
                                        Solid line is the national
                                        average, dashed lines
                                        the lowest and highest
                                        mandi that day. An
                                        average drawn from few
                                        mandis is not the same
                                        claim as one drawn from
                                        many.
                                    </p>
                                </>
                            ) : (
                                <div className="gw-panel-empty">
                                    <TrendingUp size={20} />
                                    <p>
                                        {historyLoading
                                            ? "Loading the price history…"
                                            : "Not enough trading days published yet to draw a price line for this crop."}
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* ---- state averages ---- */}

                        <div className="gw-panel gw-panel-wide">

                            <div className="gw-panel-head">
                                <h2>
                                    <Warehouse size={17} />
                                    Average price by state
                                </h2>
                            </div>

                            {crop.states.length ? (
                                <ResponsiveContainer
                                    width="100%"
                                    height={280}
                                >
                                    <BarChart
                                        data={stateSeries(
                                            crop.states
                                        )}
                                        margin={{
                                            top: 8,
                                            right: 12,
                                            bottom: 4,
                                            left: 4
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e4dcc9"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="name"
                                            tick={{
                                                fontSize: 11,
                                                fill: "#66705f"
                                            }}
                                            interval={0}
                                            angle={-18}
                                            textAnchor="end"
                                            height={54}
                                        />

                                        <YAxis
                                            tick={{
                                                fontSize: 11,
                                                fill: "#66705f"
                                            }}
                                            tickFormatter={
                                                rupeesShort
                                            }
                                            width={54}
                                        />

                                        <Tooltip
                                            content={
                                                <ChartTooltip />
                                            }
                                        />

                                        <ReferenceLine
                                            y={
                                                crop.summary
                                                    .average
                                            }
                                            stroke={BRASS}
                                            strokeDasharray="4 4"
                                        />

                                        <Bar
                                            dataKey="average"
                                            name="Average"
                                            radius={[
                                                4, 4, 0, 0
                                            ]}
                                        >
                                            {stateSeries(
                                                crop.states
                                            ).map((entry) => (
                                                <Cell
                                                    key={entry.name}
                                                    fill={
                                                        entry.average >=
                                                        crop.summary
                                                            .average
                                                            ? FOREST
                                                            : CLAY
                                                    }
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="gw-panel-empty">
                                    <p>
                                        No state reported{" "}
                                        {crop.crop.toLowerCase()}{" "}
                                        in Rs./Quintal for this
                                        date.
                                    </p>
                                </div>
                            )}

                            <p className="gw-panel-foot">
                                Green bars paid above the
                                national average, red below.
                                The dashed line is that
                                average. A bar over one
                                mandi is a single market,
                                not a state.
                            </p>

                        </div>

                        {/* ---- distribution ---- */}

                        <div className="gw-panel">

                            <div className="gw-panel-head">
                                <h2>
                                    <BarChart3 size={17} />
                                    How mandis spread
                                </h2>
                            </div>

                            {crop.distribution.length ? (
                                <ResponsiveContainer
                                    width="100%"
                                    height={230}
                                >
                                    <BarChart
                                        data={distributionSeries(
                                            crop.distribution
                                        )}
                                        margin={{
                                            top: 8,
                                            right: 8,
                                            bottom: 4,
                                            left: 0
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e4dcc9"
                                            vertical={false}
                                        />

                                        <XAxis
                                            dataKey="label"
                                            tick={{
                                                fontSize: 10,
                                                fill: "#66705f"
                                            }}
                                            interval="preserveStartEnd"
                                        />

                                        <YAxis
                                            tick={{
                                                fontSize: 11,
                                                fill: "#66705f"
                                            }}
                                            width={34}
                                        />

                                        <Tooltip
                                            content={
                                                <ChartTooltip />
                                            }
                                        />

                                        <Bar
                                            dataKey="records"
                                            name="Mandis"
                                            fill={FOREST}
                                            radius={[
                                                3, 3, 0, 0
                                            ]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="gw-panel-empty">
                                    <p>
                                        Every mandi is quoting
                                        the same price, so there
                                        is no spread to plot.
                                    </p>
                                </div>
                            )}

                            <p className="gw-panel-foot">
                                Bands are cut from this
                                crop&rsquo;s own low and
                                high, which is why onion
                                and chilli can sit on the
                                same page.
                            </p>

                        </div>

                        {/* ---- arrivals ---- */}

                        <div className="gw-panel">

                            <div className="gw-panel-head">
                                <h2>
                                    <Scale size={17} />
                                    Volume by state
                                </h2>
                            </div>

                            {crop.arrivals.length ? (
                                <ResponsiveContainer
                                    width="100%"
                                    height={230}
                                >
                                    <BarChart
                                        data={arrivalsSeries(
                                            crop.arrivals
                                        )}
                                        layout="vertical"
                                        margin={{
                                            top: 4,
                                            right: 12,
                                            bottom: 4,
                                            left: 4
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e4dcc9"
                                            horizontal={false}
                                        />

                                        <XAxis
                                            type="number"
                                            tick={{
                                                fontSize: 10,
                                                fill: "#66705f"
                                            }}
                                            tickFormatter={
                                                tonnes
                                            }
                                        />

                                        <YAxis
                                            type="category"
                                            dataKey="state"
                                            tick={{
                                                fontSize: 11,
                                                fill: "#66705f"
                                            }}
                                            width={104}
                                        />

                                        <Tooltip
                                            content={
                                                <ChartTooltip />
                                            }
                                        />

                                        <Bar
                                            dataKey="arrivals"
                                            name="Arrivals"
                                            fill={BRASS}
                                            radius={[
                                                0, 4, 4, 0
                                            ]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="gw-panel-empty">
                                    <p>
                                        {crop.source.startsWith(
                                            "Mandi mirror"
                                        )
                                            ? "The mirror republishes prices only, so it carries no arrivals."
                                            : `Agmarknet published no arrival volume for ${crop.crop.toLowerCase()} on this date.`}
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* ---- varieties ---- */}

                        <div className="gw-panel gw-panel-wide">

                            <div className="gw-panel-head">
                                <h2>
                                    What each variety fetched
                                </h2>
                            </div>

                            {crop.varieties.length ? (
                                <div className="gw-varieties">
                                    {varietySeries(
                                        crop.varieties,
                                        16
                                    ).map((variety) => (
                                        <div
                                            className="gw-variety"
                                            key={variety.name}
                                        >
                                            <strong>
                                                {variety.name}
                                            </strong>
                                            <span>
                                                {rupees(
                                                    variety.average
                                                )}
                                            </span>
                                            <small>
                                                {variety.mandis}{" "}
                                                mandi
                                                {variety.mandis ===
                                                1
                                                    ? ""
                                                    : "s"}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="gw-panel-empty">
                                    <p>
                                        No variety names were
                                        published for this crop.
                                    </p>
                                </div>
                            )}

                        </div>

                    </section>


                    {/* =====================
                        TOP & BOTTOM
                    ===================== */}

                    <section className="gw-an-grid">

                        <div className="gw-panel">

                            <div className="gw-panel-head">
                                <h2>
                                    <ArrowUpRight size={17} />
                                    Paying most
                                </h2>
                            </div>

                            <div className="gw-rank">
                                {crop.states
                                    .slice(0, 6)
                                    .map((entry, index) => (
                                        <div
                                            className="gw-rank-row"
                                            key={entry.name}
                                        >
                                            <span className="gw-rank-n">
                                                {index + 1}
                                            </span>
                                            <span className="gw-rank-name">
                                                {entry.name}
                                            </span>
                                            <strong>
                                                {rupees(
                                                    entry.average
                                                )}
                                            </strong>
                                            <small>
                                                {entry.mandis}{" "}
                                                mandis
                                            </small>
                                        </div>
                                    ))}
                            </div>

                        </div>

                        <div className="gw-panel">

                            <div className="gw-panel-head">
                                <h2>
                                    <ArrowDownRight size={17} />
                                    Paying least
                                </h2>
                            </div>

                            <div className="gw-rank">
                                {[...crop.states]
                                    .sort(
                                        (a, b) =>
                                            a.average -
                                            b.average
                                    )
                                    .slice(0, 6)
                                    .map((entry, index) => (
                                        <div
                                            className="gw-rank-row"
                                            key={entry.name}
                                        >
                                            <span className="gw-rank-n">
                                                {index + 1}
                                            </span>
                                            <span className="gw-rank-name">
                                                {entry.name}
                                            </span>
                                            <strong>
                                                {rupees(
                                                    entry.average
                                                )}
                                            </strong>
                                            <small>
                                                {entry.mandis}{" "}
                                                mandis
                                            </small>
                                        </div>
                                    ))}
                            </div>

                        </div>

                    </section>


                    {/* =====================
                        LEDGER
                    ===================== */}

                    <section className="gw-panel gw-panel-table">

                        <div className="gw-panel-head">

                            <h2>
                                <MapPin size={17} />
                                Mandi ledger
                            </h2>

                            <div className="gw-filters">

                                <input
                                    type="search"
                                    placeholder="Search mandi, district or variety"
                                    value={filters.search}
                                    onChange={(event) =>
                                        setFilters({
                                            ...filters,
                                            search: event
                                                .target
                                                .value
                                        })
                                    }
                                />

                                <select
                                    value={filters.state}
                                    onChange={(event) =>
                                        setFilters({
                                            ...filters,
                                            state: event
                                                .target
                                                .value,
                                            district: ""
                                        })
                                    }
                                >
                                    <option value="">
                                        All states
                                    </option>
                                    {states.map((state) => (
                                        <option
                                            key={state}
                                            value={state}
                                        >
                                            {state}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={filters.district}
                                    onChange={(event) =>
                                        setFilters({
                                            ...filters,
                                            district:
                                                event.target
                                                    .value
                                        })
                                    }
                                >
                                    <option value="">
                                        All districts
                                    </option>
                                    {districts.map(
                                        (district) => (
                                            <option
                                                key={district}
                                                value={district}
                                            >
                                                {district}
                                            </option>
                                        )
                                    )}
                                </select>

                                <button
                                    type="button"
                                    className="gw-btn gw-btn-ghost"
                                    onClick={exportMandis}
                                    disabled={!filtered.length}
                                >
                                    <Download size={15} />
                                    CSV
                                </button>

                            </div>

                        </div>

                        <p className="gw-panel-foot">
                            Showing{" "}
                            {filtered.length.toLocaleString(
                                "en-IN"
                            )}{" "}
                            of{" "}
                            {crop.mandisTotal.toLocaleString(
                                "en-IN"
                            )}{" "}
                            mandis
                            {crop.mandisTotal >
                            crop.mandis.length
                                ? `, the ${crop.mandis.length.toLocaleString("en-IN")} highest of which are carried here.`
                                : "."}{" "}
                            Prices as on{" "}
                            {shortDate(crop.asOn)}.
                        </p>

                        {crop.excluded.length > 0 && (
                            <details className="gw-excluded">
                                <summary>
                                    {crop.excluded.length}{" "}
                                    row
                                    {crop.excluded.length ===
                                    1
                                        ? ""
                                        : "s"}{" "}
                                    left out of the average as
                                    implausible
                                </summary>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mandi</th>
                                            <th>Variety</th>
                                            <th>Quoted</th>
                                            <th>Why</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {crop.excluded.map(
                                            (row) => (
                                                <tr
                                                    key={`${row.market}-${row.variety}`}
                                                >
                                                    <td>
                                                        {
                                                            row.market
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            row.variety
                                                        }
                                                    </td>
                                                    <td>
                                                        {rupees(
                                                            row.modal
                                                        )}
                                                    </td>
                                                    <td className="gw-dim">
                                                        {
                                                            row.reason
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </details>
                        )}

                        <div className="gw-table-scroll">

                            <table className="gw-table">

                                <thead>
                                    <tr>
                                        <th>Mandi</th>
                                        <th>District</th>
                                        <th>State</th>
                                        <th>Variety</th>
                                        <th className="num">
                                            Min
                                        </th>
                                        <th className="num">
                                            Modal
                                        </th>
                                        <th className="num">
                                            Max
                                        </th>
                                        <th className="num">
                                            Arrivals
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filtered
                                        .slice(
                                            0,
                                            showLedger
                                                ? filtered.length
                                                : 40
                                        )
                                        .map((mandi, index) => (
                                            <tr
                                                key={`${mandi.market}-${index}`}
                                            >
                                                <td>
                                                    {
                                                        mandi.market
                                                    }
                                                </td>
                                                <td>
                                                    {mandi.district ||
                                                        "—"}
                                                </td>
                                                <td>
                                                    {
                                                        mandi.state
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        mandi.variety
                                                    }
                                                </td>
                                                <td className="num">
                                                    {rupeesShort(
                                                        mandi.min
                                                    )}
                                                </td>
                                                <td className="num gw-strong">
                                                    {rupees(
                                                        mandi.modal
                                                    )}
                                                </td>
                                                <td className="num">
                                                    {rupeesShort(
                                                        mandi.max
                                                    )}
                                                </td>
                                                <td className="num">
                                                    {mandi.arrivals
                                                        ? tonnes(
                                                              mandi.arrivals
                                                          )
                                                        : "—"}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>

                            </table>

                        </div>

                        {filtered.length > 40 && (
                            <button
                                type="button"
                                className="gw-btn gw-btn-ghost gw-more"
                                onClick={() =>
                                    setShowLedger(
                                        !showLedger
                                    )
                                }
                            >
                                {showLedger
                                    ? "Show fewer"
                                    : `Show all ${filtered.length.toLocaleString("en-IN")} mandis`}
                            </button>
                        )}

                    </section>


                    {/* =====================
                        FOOTER
                    ===================== */}

                    <footer className="gw-an-foot">

                        <p>
                            {payload.basis}. Prices in{" "}
                            {payload.unit}. Fetched{" "}
                            {prettyDate(
                                payload.fetchedAt?.slice(0, 10)
                            )}
                            .
                        </p>

                        <p>
                            Mandis report through the day, so
                            this is what had arrived when the
                            report was generated. Confirm the
                            rate at your own mandi before
                            selling.
                        </p>

                    </footer>

                </>
            )}

        </div>
    );
}

export default Analytics;