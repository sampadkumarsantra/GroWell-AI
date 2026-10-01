import { useCallback, useEffect, useMemo, useState } from "react";

import {
    ResponsiveContainer,
    ComposedChart,
    Area,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

import {
    Activity,
    AlertTriangle,
    BarChart3,
    CalendarDays,
    Database,
    Download,
    Layers,
    MapPin,
    Package,
    RefreshCw,
    Scale,
    Sprout,
    TrendingUp,
    Wheat
} from "lucide-react";

import "./AgmarknetExplorer.css";

import {
    apiRequest,
    readJson
} from "../services/api";


/*
 * =====================================================
 * AGMARKNET RECORD EXPLORER
 * =====================================================
 *
 * The per-crop view beside this one answers "what is my crop
 * selling for". Agmarknet publishes rather more than the twelve
 * crops the product screens were built around: roughly four
 * thousand mandis, a hundred commodities per state across
 * fifteen groups, a variety on every price line, and arrivals in
 * tonnes alongside the price.
 *
 * None of that was stored. It is now, whole, in mandi_prices,
 * and this is the view over it — the national picture, one
 * commodity's trend and geography, and the market ledger.
 *
 * Every figure here is read from the database rather than
 * fetched live, because Agmarknet's unit of publication is one
 * state on one day: a national day is around thirty requests
 * and cannot sit behind a page load. The collector owns the
 * network and this view owns the questions.
 */

// =====================================================
// ERRORS
// =====================================================

/*
 * The browser's own message for a request that never reached
 * the server is the flat string "Failed to fetch", which says
 * nothing about what to do next. The overwhelmingly common cause
 * here is that the API is not running, so it is spelled out. The
 * other case worth separating is an HTML or empty body, which
 * means something answered but not the API: a proxy, or the
 * client dev server standing in for it.
 *
 * Chat.jsx treats the same two conditions as noise and hides
 * them, which is right for a chat bubble and wrong for a view
 * whose whole purpose is to show what has been collected.
 */
function readableError(error) {

    const detail = String(
        error?.message || ""
    ).trim();

    if (
        !detail ||
        detail === "Failed to fetch" ||
        detail.includes(
            "NetworkError"
        ) ||
        detail.includes(
            "Load failed"
        )
    ) {
        return "Could not reach the GroWell API. The server is not running or is not reachable from this device.";
    }

    if (
        detail.includes(
            "Unexpected token"
        ) ||
        detail.includes(
            "<!DOCTYPE"
        )
    ) {
        return "The server answered with something that is not the API. Check that the client is pointed at the backend.";
    }

    return detail;
}


// =====================================================
// FORMATTING
// =====================================================

function rupees(value) {

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return "₹—";
    }

    return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}


function count(value) {

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return "—";
    }

    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(1)}M`;
    }

    if (amount >= 1000) {
        return `${(amount / 1000).toFixed(1)}k`;
    }

    return Math.round(amount).toLocaleString("en-IN");
}


function exact(value) {

    const amount = Number(value);

    return Number.isFinite(amount)
        ? Math.round(amount).toLocaleString("en-IN")
        : "—";
}


function tonnes(value) {

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return "—";
    }

    if (amount >= 100000) {
        return `${(amount / 1000).toFixed(1)}k t`;
    }

    return `${Math.round(amount).toLocaleString("en-IN")} t`;
}


function shortDate(iso) {

    if (!iso) {
        return "—";
    }

    const parsed = new Date(`${iso}T00:00:00Z`);

    if (Number.isNaN(parsed.getTime())) {
        return iso;
    }

    return parsed.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        timeZone: "UTC"
    });
}


// A categorical ramp drawn from the page's own palette, so a
// chart sits inside the design rather than on top of it.
const SERIES_COLORS = [
    "var(--gw-forest)",
    "var(--gw-brass)",
    "var(--gw-ok)",
    "var(--gw-info)",
    "var(--gw-warn)",
    "var(--gw-forest-2)",
    "var(--gw-danger)",
    "var(--gw-faint)"
];

// A shared empty array so a payload with no rows does not hand
// every useMemo a fresh reference and re-run it each render.
const NO_ROWS = [];

const AXIS_STYLE = {
    fontSize: 10,
    fill: "var(--gw-faint)"
};


// =====================================================
// REQUESTS
// =====================================================
//
// apiRequest hands back the raw Response so a caller can decide
// what to do with a 402, which is how the rest of the app opens
// the upgrade sheet. Nothing here is paid-only, so a body and a
// status check is all that is needed.
//

async function getJson(path) {

    const response = await apiRequest(path, {
        method: "GET",
        cache: "no-store"
    });

    const body = await readJson(response);

    if (!response.ok) {
        throw new Error(
            body?.message ||
                `The record set could not be read (${response.status}).`
        );
    }

    return body;
}


// =====================================================
// SHARED CHROME
// =====================================================

function Panel({ title, icon: Icon, meta, children, className = "" }) {

    return (

        <section className={`agm-panel ${className}`}>

            <div className="agm-panel-title">

                <span>
                    {Icon && <Icon size={13} />}
                    {title}
                </span>

                {meta && (
                    <em>{meta}</em>
                )}

            </div>

            {children}

        </section>

    );

}


function Tile({ label, value, hint }) {

    return (

        <div className="agm-tile">

            <span>{label}</span>

            <strong>{value}</strong>

            {hint && (
                <small>{hint}</small>
            )}

        </div>

    );

}


function Empty({ message }) {

    return (

        <div className="agm-empty">
            {message}
        </div>

    );

}


// =====================================================
// TOOLTIP
// =====================================================

function ChartTip({ active, payload, label, render }) {

    if (!active || !payload?.length) {
        return null;
    }

    return (

        <div className="agm-tip">

            {label !== undefined && (
                <strong>{label}</strong>
            )}

            {render
                ? render(payload[0].payload)
                : payload.map((entry) => (
                    <span key={entry.dataKey}>
                        {entry.name}: {entry.value}
                    </span>
                ))
            }

        </div>

    );

}


// =====================================================
// NATIONAL OVERVIEW
// =====================================================

function NationalOverview({ overview, date }) {

    const headline = overview?.headline;
    const byState = overview?.byState ?? NO_ROWS;
    const byGroup = overview?.byGroup ?? NO_ROWS;
    const topCommodities =
        overview?.topCommodities ?? NO_ROWS;
    const arrivals =
        overview?.topStatesByArrivals ?? NO_ROWS;
    const distribution =
        overview?.distribution ?? NO_ROWS;

    const stateChart = useMemo(
        () =>
            byState
                .slice(0, 16)
                .map(row => ({
                    state: row.state,
                    records: Number(row.records),
                    mandis: Number(row.markets),
                    averagePrice: Number(
                        row.averagePrice
                    )
                })),
        [byState]
    );

    const groupChart = useMemo(
        () =>
            byGroup.map(row => ({
                group: row.commodity_group,
                records: Number(row.records),
                commodities: Number(row.commodities),
                averagePrice: Number(
                    row.averagePrice
                )
            })),
        [byGroup]
    );

    const commodityChart = useMemo(
        () =>
            topCommodities.slice(0, 14).map(
                row => ({
                    commodity: row.commodity,
                    records: Number(row.records),
                    mandis: Number(row.markets),
                    averagePrice: Number(
                        row.averagePrice
                    ),
                    lowestPrice: Number(
                        row.lowestPrice
                    ),
                    highestPrice: Number(
                        row.highestPrice
                    )
                })
            ),
        [topCommodities]
    );

    const arrivalsChart = useMemo(
        () =>
            arrivals.map(row => ({
                state: row.state,
                arrivals: Number(row.arrivals)
            })),
        [arrivals]
    );

    const distributionChart = useMemo(
        () =>
            distribution
                .filter(bucket => bucket.records > 0)
                .map(bucket => ({
                    label:
                        `${count(bucket.from)}–${count(bucket.to)}`,
                    records: bucket.records
                })),
        [distribution]
    );

    const totalRecords =
        byState.reduce(
            (sum, row) => sum + Number(row.records),
            0
        );

    return (

        <div className="agm-section">

            {/* ---- Headline tiles ---- */}

            <div className="agm-tiles">

                <Tile
                    label="Price records"
                    value={count(headline?.records)}
                    hint={`as on ${shortDate(date)}`}
                />

                <Tile
                    label="Commodities"
                    value={count(headline?.commodities)}
                    hint={`${count(headline?.varieties)} varieties`}
                />

                <Tile
                    label="Mandis reporting"
                    value={count(headline?.markets)}
                    hint={`${count(headline?.states)} states`}
                />

                <Tile
                    label="Average modal price"
                    value={rupees(headline?.averagePrice)}
                    hint="per quintal"
                />

                <Tile
                    label="Price range"
                    value={`${rupees(headline?.lowestPrice)} – ${rupees(headline?.highestPrice)}`}
                    hint="lowest to highest mandi"
                />

                <Tile
                    label="Arrivals"
                    value={tonnes(headline?.arrivals)}
                    hint="metric tonnes reported"
                />

            </div>


            {/* ---- Coverage + groups ---- */}

            <div className="agm-grid-2">

                <Panel
                    title="Records by state"
                    icon={MapPin}
                    meta={count(totalRecords)}
                >

                    {stateChart.length === 0
                        ? <Empty message="No state records for this day." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={280}
                            >

                                <BarChart
                                    data={stateChart}
                                    layout="vertical"
                                    margin={{
                                        top: 4,
                                        right: 16,
                                        bottom: 4,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        horizontal={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="state"
                                        width={104}
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <>
                                                        <span>
                                                            Records:{" "}
                                                            {exact(payload.records)}
                                                        </span>
                                                        <span>
                                                            Mandis:{" "}
                                                            {exact(payload.mandis)}
                                                        </span>
                                                        <span>
                                                            Average:{" "}
                                                            {rupees(payload.averagePrice)}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="records"
                                        fill="var(--gw-forest)"
                                        radius={[
                                            0, 4, 4, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                </Panel>

                <Panel
                    title="Records by commodity group"
                    icon={Layers}
                    meta={`${groupChart.length} groups`}
                >

                    {groupChart.length === 0
                        ? <Empty message="No group records for this day." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={280}
                            >

                                <BarChart
                                    data={groupChart}
                                    layout="vertical"
                                    margin={{
                                        top: 4,
                                        right: 16,
                                        bottom: 4,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        horizontal={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="group"
                                        width={120}
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <>
                                                        <span>
                                                            Records:{" "}
                                                            {exact(payload.records)}
                                                        </span>
                                                        <span>
                                                            Commodities:{" "}
                                                            {exact(payload.commodities)}
                                                        </span>
                                                        <span>
                                                            Average:{" "}
                                                            {rupees(payload.averagePrice)}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="records"
                                        radius={[
                                            0, 4, 4, 0
                                        ]}
                                    >

                                        {groupChart.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={
                                                        entry.group
                                                    }
                                                    fill={
                                                        SERIES_COLORS[
                                                            index %
                                                            SERIES_COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                    </Bar>

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                </Panel>

            </div>


            {/* ---- Distribution + arrivals ---- */}

            <div className="agm-grid-2">

                <Panel
                    title="Modal price distribution"
                    icon={Scale}
                    meta="mandis per ₹ band"
                >

                    {distributionChart.length === 0
                        ? <Empty message="No comparable quintal prices for this day." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={230}
                            >

                                <BarChart
                                    data={distributionChart}
                                    margin={{
                                        top: 6,
                                        right: 12,
                                        bottom: 4,
                                        left: 4
                                    }}
                                >

                                    <CartesianGrid
                                        vertical={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        dataKey="label"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        interval="preserveStartEnd"
                                    />

                                    <YAxis
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <span>
                                                        Mandis:{" "}
                                                        {exact(payload.records)}
                                                    </span>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="records"
                                        fill="var(--gw-brass)"
                                        radius={[
                                            3, 3, 0, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                    <p className="agm-footnote">
                        Rupees per quintal only. Agmarknet
                        also publishes Rs./Bundle and
                        Rs./Unit lines in the same report;
                        a bundle is a count of baskets,
                        not a weight, so those are held
                        back from the axis rather than
                        converted onto it.
                    </p>

                </Panel>

                <Panel
                    title="Arrivals by state"
                    icon={Package}
                    meta="metric tonnes"
                >

                    {arrivalsChart.length === 0
                        ? <Empty message="No tonnage reported for this day." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={230}
                            >

                                <BarChart
                                    data={arrivalsChart}
                                    layout="vertical"
                                    margin={{
                                        top: 4,
                                        right: 16,
                                        bottom: 4,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        horizontal={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={
                                            count
                                        }
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="state"
                                        width={104}
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <span>
                                                        {tonnes(payload.arrivals)}
                                                    </span>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="arrivals"
                                        fill="var(--gw-ok)"
                                        radius={[
                                            0, 4, 4, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                </Panel>

            </div>


            {/* ---- Top commodities ---- */}

            <Panel
                title="Most reported commodities"
                icon={Wheat}
                meta="by number of mandi records"
            >

                {commodityChart.length === 0
                    ? <Empty message="No commodity records for this day." />
                    : (
                        <>
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <ComposedChart
                                    data={commodityChart}
                                    margin={{
                                        top: 8,
                                        right: 8,
                                        bottom: 60,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        vertical={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        dataKey="commodity"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        angle={-28}
                                        textAnchor="end"
                                        height={58}
                                        interval={0}
                                    />

                                    <YAxis
                                        yAxisId="records"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={
                                            count
                                        }
                                    />

                                    <YAxis
                                        yAxisId="price"
                                        orientation="right"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={
                                            value =>
                                                `₹${count(value)}`
                                        }
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <>
                                                        <span>
                                                            Records:{" "}
                                                            {exact(payload.records)}
                                                        </span>
                                                        <span>
                                                            Mandis:{" "}
                                                            {exact(payload.mandis)}
                                                        </span>
                                                        <span>
                                                            Average:{" "}
                                                            {rupees(payload.averagePrice)}
                                                        </span>
                                                        <span>
                                                            Range:{" "}
                                                            {rupees(payload.lowestPrice)}
                                                            {" – "}
                                                            {rupees(payload.highestPrice)}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        yAxisId="records"
                                        dataKey="records"
                                        fill="var(--gw-forest)"
                                        radius={[
                                            3, 3, 0, 0
                                        ]}
                                    />

                                    <Line
                                        yAxisId="price"
                                        type="monotone"
                                        dataKey="averagePrice"
                                        stroke="var(--gw-brass)"
                                        strokeWidth={2}
                                        dot={false}
                                    />

                                </ComposedChart>

                            </ResponsiveContainer>
                        </>
                    )}

                <p className="agm-footnote">
                    Bars are how many mandis reported the
                    commodity. The line is its average modal
                    price, on the right-hand axis — a
                    different unit, so it is drawn
                    separately rather than against the bars.
                </p>

            </Panel>

        </div>

    );

}


// =====================================================
// COMMODITY DRILLDOWN
// =====================================================

function CommodityDetail({ detail }) {

    const headline = detail?.headline;

    const series = useMemo(
        () =>
            (detail?.series ?? NO_ROWS).map(
                row => ({
                    date: row.date,
                    label: shortDate(row.date),
                    averagePrice: Number(
                        row.averagePrice
                    ),
                    low: Number(row.low),
                    high: Number(row.high),
                    records: Number(row.records),
                    mandis: Number(row.markets),
                    arrivals: Number(row.arrivals)
                })
            ),
        [detail]
    );

    const byState = useMemo(
        () =>
            (detail?.byState ?? NO_ROWS).map(
                row => ({
                    state: row.state,
                    averagePrice: Number(
                        row.averagePrice
                    ),
                    low: Number(row.low),
                    high: Number(row.high),
                    records: Number(row.records),
                    mandis: Number(row.markets),
                    arrivals: Number(row.arrivals)
                })
            ),
        [detail]
    );

    const byVariety = useMemo(
        () =>
            (detail?.byVariety ?? NO_ROWS)
                .slice(0, 16)
                .map(row => ({
                    variety: row.variety,
                    averagePrice: Number(
                        row.averagePrice
                    ),
                    low: Number(row.low),
                    high: Number(row.high),
                    records: Number(row.records)
                })),
        [detail]
    );

    const markets = detail?.markets ?? NO_ROWS;

    const distribution = useMemo(
        () =>
            (detail?.distribution ?? NO_ROWS)
                .filter(bucket => bucket.records > 0)
                .map(bucket => ({
                    label:
                        `${count(bucket.from)}–${count(bucket.to)}`,
                    records: bucket.records
                })),
        [detail]
    );

    return (

        <div className="agm-section">

            <div className="agm-tiles">

                <Tile
                    label="Average modal price"
                    value={rupees(headline?.averagePrice)}
                    hint="per quintal"
                />

                <Tile
                    label="Mandis reporting"
                    value={count(headline?.markets)}
                    hint={`across ${count(headline?.states)} states`}
                />

                <Tile
                    label="Trading days stored"
                    value={count(headline?.days)}
                    hint={`${exact(headline?.records)} records`}
                />

                <Tile
                    label="Varieties"
                    value={count(headline?.varieties)}
                    hint="as published"
                />

                <Tile
                    label="Price range"
                    value={`${rupees(headline?.lowestPrice)} – ${rupees(headline?.highestPrice)}`}
                    hint="lowest to highest"
                />

                <Tile
                    label="Arrivals"
                    value={tonnes(headline?.arrivals)}
                    hint="metric tonnes"
                />

            </div>


            {/* ---- Trend ---- */}

            <Panel
                title="Daily price trend"
                icon={TrendingUp}
                meta={`${series.length} trading day${series.length === 1 ? "" : "s"}`}
            >

                {series.length === 0
                    ? <Empty message="No stored days for this commodity yet." />
                    : (
                        <ResponsiveContainer
                            width="100%"
                            height={290}
                        >

                            <ComposedChart
                                data={series}
                                margin={{
                                    top: 8,
                                    right: 12,
                                    bottom: 4,
                                    left: 4
                                }}
                            >

                                <CartesianGrid
                                    vertical={false}
                                    stroke="rgba(201,168,114,0.14)"
                                />

                                <XAxis
                                    dataKey="label"
                                    tick={AXIS_STYLE}
                                    tickLine={false}
                                    axisLine={false}
                                />

                                <YAxis
                                    tick={AXIS_STYLE}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={
                                        value =>
                                            `₹${count(value)}`
                                    }
                                    domain={[
                                        "dataMin",
                                        "dataMax"
                                    ]}
                                />

                                <Tooltip
                                    content={
                                        <ChartTip
                                            render={payload => (
                                                <>
                                                    <span>
                                                        Average:{" "}
                                                        {rupees(payload.averagePrice)}
                                                    </span>
                                                    <span>
                                                        Range:{" "}
                                                        {rupees(payload.low)}
                                                        {" – "}
                                                        {rupees(payload.high)}
                                                    </span>
                                                    <span>
                                                        Mandis:{" "}
                                                        {exact(payload.mandis)}
                                                    </span>
                                                    <span>
                                                        Arrivals:{" "}
                                                        {tonnes(payload.arrivals)}
                                                    </span>
                                                </>
                                            )}
                                        />
                                    }
                                />

                                <Area
                                    type="monotone"
                                    dataKey="high"
                                    stroke="none"
                                    fill="rgba(30,81,59,0.10)"
                                />

                                <Area
                                    type="monotone"
                                    dataKey="low"
                                    stroke="none"
                                    fill="var(--gw-paper)"
                                />

                                <Line
                                    type="monotone"
                                    dataKey="averagePrice"
                                    stroke="var(--gw-forest)"
                                    strokeWidth={2}
                                    dot={{
                                        r: 3,
                                        fill:
                                            "var(--gw-forest)"
                                    }}
                                />

                            </ComposedChart>

                        </ResponsiveContainer>
                    )}

                <p className="agm-footnote">
                    The shaded band is the spread between
                    the cheapest and dearest mandi that day;
                    the line is the average modal price
                    across them.
                </p>

            </Panel>


            {/* ---- State + variety ---- */}

            <div className="agm-grid-2">

                <Panel
                    title="Average price by state"
                    icon={MapPin}
                    meta={`${byState.length} states`}
                >

                    {byState.length === 0
                        ? <Empty message="No state records." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart
                                    data={byState.slice(
                                        0, 14
                                    )}
                                    layout="vertical"
                                    margin={{
                                        top: 4,
                                        right: 16,
                                        bottom: 4,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        horizontal={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={
                                            value =>
                                                `₹${count(value)}`
                                        }
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="state"
                                        width={104}
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <>
                                                        <span>
                                                            Average:{" "}
                                                            {rupees(payload.averagePrice)}
                                                        </span>
                                                        <span>
                                                            Range:{" "}
                                                            {rupees(payload.low)}
                                                            {" – "}
                                                            {rupees(payload.high)}
                                                        </span>
                                                        <span>
                                                            Mandis:{" "}
                                                            {exact(payload.mandis)}
                                                        </span>
                                                        <span>
                                                            Arrivals:{" "}
                                                            {tonnes(payload.arrivals)}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="averagePrice"
                                        fill="var(--gw-forest)"
                                        radius={[
                                            0, 4, 4, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                </Panel>

                <Panel
                    title="Price by variety"
                    icon={Sprout}
                    meta={`${count(headline?.varieties)} published`}
                >

                    {byVariety.length === 0
                        ? <Empty message="This commodity reports no variety." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart
                                    data={byVariety}
                                    layout="vertical"
                                    margin={{
                                        top: 4,
                                        right: 16,
                                        bottom: 4,
                                        left: 8
                                    }}
                                >

                                    <CartesianGrid
                                        horizontal={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        type="number"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={
                                            value =>
                                                `₹${count(value)}`
                                        }
                                    />

                                    <YAxis
                                        type="category"
                                        dataKey="variety"
                                        width={118}
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <>
                                                        <span>
                                                            Average:{" "}
                                                            {rupees(payload.averagePrice)}
                                                        </span>
                                                        <span>
                                                            Range:{" "}
                                                            {rupees(payload.low)}
                                                            {" – "}
                                                            {rupees(payload.high)}
                                                        </span>
                                                        <span>
                                                            Records:{" "}
                                                            {exact(payload.records)}
                                                        </span>
                                                    </>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="averagePrice"
                                        fill="var(--gw-brass)"
                                        radius={[
                                            0, 4, 4, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                </Panel>

                <Panel
                    title="Modal price distribution"
                    icon={Scale}
                    meta="mandis per ₹ band"
                >

                    {distribution.length === 0
                        ? <Empty message="No comparable quintal prices for this commodity." />
                        : (
                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <BarChart
                                    data={distribution}
                                    margin={{
                                        top: 6,
                                        right: 12,
                                        bottom: 4,
                                        left: 4
                                    }}
                                >

                                    <CartesianGrid
                                        vertical={false}
                                        stroke="rgba(201,168,114,0.14)"
                                    />

                                    <XAxis
                                        dataKey="label"
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                        interval="preserveStartEnd"
                                    />

                                    <YAxis
                                        tick={AXIS_STYLE}
                                        tickLine={false}
                                        axisLine={false}
                                    />

                                    <Tooltip
                                        cursor={{
                                            fill:
                                                "rgba(30,81,59,0.05)"
                                        }}
                                        content={
                                            <ChartTip
                                                render={payload => (
                                                    <span>
                                                        Mandis:{" "}
                                                        {exact(payload.records)}
                                                    </span>
                                                )}
                                            />
                                        }
                                    />

                                    <Bar
                                        dataKey="records"
                                        fill="var(--gw-brass)"
                                        radius={[
                                            3, 3, 0, 0
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>
                        )}

                    <p className="agm-footnote">
                        A wide band means mandis
                        disagree about this crop on the
                        same day, which is exactly where
                        a price can be beaten by
                        travelling further.
                    </p>

                </Panel>

            </div>


            {/* ---- Mandi list ---- */}

            <Panel
                title="Mandis quoting this commodity"
                icon={MapPin}
                meta={`${count(headline?.records)} records, highest first`}
                className="agm-panel-table"
            >

                {markets.length === 0
                    ? <Empty message="No mandi records." />
                    : (
                        <div className="agm-table-scroll">

                            <table className="agm-table">

                                <thead>
                                    <tr>
                                        <th>Market</th>
                                        <th>District</th>
                                        <th>State</th>
                                        <th>Variety</th>
                                        <th className="num">
                                            Modal
                                        </th>
                                        <th className="num">
                                            Range
                                        </th>
                                        <th className="num">
                                            Arrivals
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {markets.map(
                                        (row, index) => (
                                            <tr
                                                key={`${row.market}-${row.variety}-${row.date}-${index}`}
                                            >

                                                <td className="agm-strong">
                                                    {row.market}
                                                </td>

                                                <td>
                                                    {row.district || "—"}
                                                </td>

                                                <td>
                                                    {row.state || "—"}
                                                </td>

                                                <td className="agm-muted">
                                                    {row.variety || "—"}
                                                </td>

                                                <td className="num">
                                                    {row.priceUnit === "Rs./Quintal"
                                                        ? rupees(row.modalPrice)
                                                        : `${exact(row.modalPrice)} ${row.priceUnit}`}
                                                </td>

                                                <td className="num agm-muted">
                                                    {row.priceUnit === "Rs./Quintal" && row.minPrice !== row.maxPrice
                                                        ? `${rupees(row.minPrice)} – ${rupees(row.maxPrice)}`
                                                        : "—"}
                                                </td>

                                                <td className="num">
                                                    {row.arrivals === null
                                                        ? "—"
                                                        : `${exact(row.arrivals)} ${row.arrivalsUnit}`}
                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

            </Panel>

        </div>

    );

}


// =====================================================
// COMPONENT
// =====================================================

export default function AgmarknetExplorer() {

    const [status, setStatus] =
        useState(null);

    const [statusLoading, setStatusLoading] =
        useState(true);

    const [notice, setNotice] =
        useState("");

    const [date, setDate] = useState("");

    const [group, setGroup] = useState("");
    const [state, setState] = useState("");

    const [commodity, setCommodity] =
        useState("");

    const [overview, setOverview] =
        useState(null);

    const [overviewLoading, setOverviewLoading] =
        useState(false);

    const [detail, setDetail] =
        useState(null);

    const [detailLoading, setDetailLoading] =
        useState(false);

    const [tab, setTab] = useState("national");

    const [sweeping, setSweeping] =
        useState(false);

    const [commoditySearch, setCommoditySearch] =
        useState("");


    // =================================================
    // STATUS
    // =================================================

    /*
     * Bumped every time status reports a different volume of
     * stored rows.
     *
     * The overview and commodity queries below depend on this
     * rather than on the record counts themselves. They used to
     * depend on `status.ready` alone, which is a boolean: a sweep
     * that landed ten thousand new rows for the same latest date
     * flipped no dependency, so the coverage strip updated while
     * every chart kept drawing the old aggregates. Watching the
     * totals is what makes a finished sweep actually repaint.
     */
    const [dataVersion, setDataVersion] =
        useState(0);


    const loadStatus = useCallback(async () => {

        try {

            const result =
                await getJson(
                    "/api/market/agmarknet/status"
                );

            setStatus(result);

            setDataVersion(
                (previous) =>
                    result?.totals?.records ??
                    previous
            );

            /*
             * Seeded only while still empty.
             *
             * These read the previous value through the updater
             * instead of closing over `date` and `commodity`. As
             * dependencies they would change identity on every
             * selection, tearing down and rebuilding the poll
             * interval underneath the farmer's feet and leaving
             * it permanently one tick behind the selection they
             * just made.
             */
            if (result?.ready) {
                setDate((previous) =>
                    previous || result.latestDate || ""
                );

                if (result.commodities?.length) {
                    setCommodity((previous) =>
                        previous || result.commodities[0]
                    );
                }
            }

        } catch (error) {

            const message =
                readableError(error);

            /*
             * Recorded on the status as well as the banner.
             *
             * A status that failed to load left `status` null, and
             * a null status is indistinguishable from a record set
             * that has not been collected yet — so a missing route
             * rendered as "Collecting the national record set"
             * with no error anywhere on the page, which is what a
             * 404 from the server looked like to a visitor.
             */
            setStatus((previous) => ({
                ...(previous || {}),
                ready: false,
                error: message
            }));

            setNotice(message);

        } finally {
            setStatusLoading(false);
        }

    }, []);


    /*
     * The record set is written by a background sweep that runs
     * every few hours, so this view has to re-read on its own.
     * Without it the page sat on whatever landed at mount and
     * never noticed the next sweep arriving, and the empty state
     * it may be showing could not heal itself once the first
     * sweep finished. Sixty seconds keeps the status row honest
     * without turning the database into the bottleneck.
     */
    useEffect(() => {

        /*
         * Re-read immediately on mount. Deferring this to the
         * first interval tick would leave the view blank for a
         * minute on every visit, and the first read is what
         * reveals whether there is anything to show at all.
         */
        loadStatus();


        const timer =
            setInterval(() => {

                if (document.hidden) {
                    return;
                }

                loadStatus();

            }, 60000);

        return () => clearInterval(timer);

    }, [loadStatus]);


    // =================================================
    // OVERVIEW
    // =================================================

    useEffect(() => {

        if (!date || !status?.ready) {
            return;
        }

        let cancelled = false;

        setOverviewLoading(true);

        const params =
            new URLSearchParams({ date });

        if (group) {
            params.set("group", group);
        }

        if (state) {
            params.set("state", state);
        }

        getJson(
            `/api/market/agmarknet/overview?${params}`
        )
            .then(result => {
                if (!cancelled) {
                    setOverview(result);
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setNotice(
                        readableError(error)
                    );
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setOverviewLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };

    }, [date, group, state, status?.ready, dataVersion]);


    // =================================================
    // COMMODITY DETAIL
    // =================================================

    useEffect(() => {

        if (!commodity || !status?.ready) {
            return;
        }

        let cancelled = false;

        setDetailLoading(true);

        getJson(
            "/api/market/agmarknet/commodity" +
                `?commodity=${encodeURIComponent(commodity)}`
        )
            .then(result => {
                if (!cancelled) {
                    setDetail(result);
                }
            })
            .catch(error => {
                if (!cancelled) {
                    setNotice(
                        readableError(error)
                    );
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setDetailLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };

    }, [commodity, status?.ready, dataVersion]);


    // =================================================
    // ACTIONS
    // =================================================

    async function runSweep() {

        setSweeping(true);

        try {

            const response =
                await apiRequest(
                    "/api/market/agmarknet/sweep",
                    { method: "POST" }
                );

            const body =
                await readJson(response);

            if (!response.ok) {
                throw new Error(
                    body?.message ||
                        "Collection could not be started."
                );
            }

            setNotice(
                body.message ||
                    "Collection started. The national view fills in as each day lands — give it a few minutes."
            );

            /*
             * Follow the sweep instead of reading status once.
             *
             * A single re-read after a minute was useless: a
             * full seven-day backfill runs for roughly twenty
             * minutes, so that read landed long before any rows
             * existed and the screen showed the same empty state
             * it started with. The interval below keeps reading
             * for the life of the sweep. The regular poll is
             * already doing this, so nothing extra is needed
             * here beyond re-reading immediately to show the
             * sweep has started.
             */
            loadStatus();

        } catch (error) {
            setNotice(
                readableError(error)
            );
        } finally {
            setSweeping(false);
        }

    }


    function download() {

        const rows = detail?.markets || [];

        if (rows.length === 0) {
            return;
        }

        const header = [
            "date", "market", "district", "state",
            "commodity", "variety", "modal_price",
            "min_price", "max_price", "price_unit",
            "arrivals", "arrivals_unit"
        ];

        const body = rows.map(row =>
            [
                row.date,
                row.market,
                row.district,
                row.state,
                commodity,
                row.variety,
                row.modalPrice,
                row.minPrice,
                row.maxPrice,
                row.priceUnit,
                row.arrivals ?? "",
                row.arrivalsUnit
            ]
                .map(value =>
                    `"${String(value ?? "").replace(/"/g, '""')}"`
                )
                .join(",")
        );

        const blob =
            new Blob(
                [
                    [
                        header.join(","),
                        ...body
                    ].join("\n")
                ],
                { type: "text/csv" }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            `agmarknet-${commodity.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.csv`;

        link.click();

        URL.revokeObjectURL(url);
    }


    // =================================================
    // DERIVED
    // =================================================

    const filteredCommodities =
        useMemo(() => {

            const list =
                status?.commodities || [];

            const search =
                commoditySearch
                    .trim()
                    .toLowerCase();

            if (!search) {
                return list;
            }

            return list.filter(name =>
                name.toLowerCase().includes(search)
            );

        }, [status, commoditySearch]);

    const isEmpty =
        status?.ready === false;


    // =================================================
    // RENDER
    // =================================================

    if (statusLoading) {

        return (

            <div className="market-loading">
                <RefreshCw
                    size={18}
                    className="spin"
                />
                Reading the national record set…
            </div>

        );

    }


    /*
     * A read that failed is not a collection that has not
     * finished. The two used to share this branch, so a broken
     * query read as "still collecting" and the screen sat on that
     * message indefinitely — offering a button whose only job
     * was to trigger the sweep that could never fix it.
     */
    const statusError = status?.error;


    /*
     * The sweep's own report of itself, kept apart from
     * statusError because the two call for different things.
     *
     * A stored read that failed is not fixed by collecting, and a
     * source that refused to answer is not fixed by retrying the
     * read. Both present as an empty record set, and telling them
     * apart is the difference between a page that explains itself
     * and one that says "still collecting" indefinitely.
     */
    const sweepError =
        status?.sweep?.error;


    if (isEmpty && sweepError) {

        /*
         * Only offered when the status endpoint itself answered.
         * If this branch is showing because the route is missing,
         * a "Try again" would just fail identically and the page
         * would look stuck rather than broken.
         */
        const routeMissing =
            /route not found|404/i.test(
                sweepError
            );

        return (

            <div className="agm-waiting">

                <AlertTriangle size={26} />

                <h2>
                    {routeMissing
                        ? "The Agmarknet API is not deployed"
                        : "The price source is not answering"}
                </h2>

                <p>
                    {routeMissing
                        ? "This server does not expose the Agmarknet routes yet, so the explorer has nothing to read. A redeploy is required."
                        : sweepError}
                </p>

                <p className="agm-waiting-detail">
                    {routeMissing
                        ? "Nothing is wrong with the data. The running build predates the Agmarknet endpoints."
                        : "Prices appear here once a sweep succeeds. This is retried on its own every few hours, and the panels below stay empty until then because there are no verified prices to show."}
                </p>

                {
                    !routeMissing && (

                        <button onClick={loadStatus}>

                            <RefreshCw size={16} />

                            Check again

                        </button>

                    )
                }

            </div>

        );

    }


    if (isEmpty && statusError) {

        return (

            <div className="agm-waiting">

                <AlertTriangle size={26} />

                <h2>
                    The record set could not be read
                </h2>

                <p>
                    This is a problem with the stored data, not
                    with collection, so running a sweep will not
                    clear it.
                </p>

                <p className="agm-waiting-detail">
                    {statusError}
                </p>

                <button onClick={loadStatus}>

                    <RefreshCw size={16} />

                    Try again

                </button>

            </div>

        );

    }


    if (isEmpty) {

        return (

            <div className="agm-waiting">

                <Database size={26} />

                <h2>
                    Collecting the national record set
                </h2>

                <p>
                    {status?.message ||
                        "GroWell walks Agmarknet's whole dataset — every state, every commodity, every mandi — into the database so this view never has to make thirty requests to draw a chart. The first sweep takes a few minutes and then refreshes every few hours."}
                </p>

                <button
                    onClick={runSweep}
                    disabled={sweeping}
                >

                    {sweeping
                        ? <RefreshCw
                            size={16}
                            className="spin"
                        />
                        : <Database size={16} />}

                    {sweeping
                        ? "Starting…"
                        : "Collect now"}

                </button>

            </div>

        );

    }


    return (

        <div className="agm">

            {/* =================================================
                TOOLBAR
            ================================================= */}

            <div className="agm-toolbar">

                <div className="agm-select">

                    <CalendarDays size={15} />

                    <select
                        value={date}
                        onChange={event =>
                            setDate(event.target.value)
                        }
                    >

                        {(status?.dates || []).map(
                            entry => (
                                <option
                                    key={entry.date}
                                    value={entry.date}
                                >
                                    {shortDate(entry.date)}
                                    {" · "}
                                    {count(entry.records)}
                                    {" records"}
                                </option>
                            )
                        )}

                    </select>

                </div>

                <div className="agm-select">

                    <Layers size={15} />

                    <select
                        value={group}
                        onChange={event =>
                            setGroup(event.target.value)
                        }
                    >

                        <option value="">
                            All commodity groups
                        </option>

                        {(status?.groups || []).map(
                            name => (
                                <option
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </option>
                            )
                        )}

                    </select>

                </div>

                <div className="agm-select">

                    <MapPin size={15} />

                    <select
                        value={state}
                        onChange={event =>
                            setState(event.target.value)
                        }
                    >

                        <option value="">
                            All states
                        </option>

                        {(status?.states || []).map(
                            name => (
                                <option
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </option>
                            )
                        )}

                    </select>

                </div>

                <button
                    className="agm-button"
                    onClick={loadStatus}
                >
                    <RefreshCw size={15} />
                    Refresh
                </button>

                <button
                    className="agm-button agm-button-quiet"
                    onClick={runSweep}
                    disabled={sweeping}
                >
                    <Database size={15} />
                    {sweeping
                        ? "Collecting…"
                        : "Collect now"}
                </button>

            </div>


            {/* ---- Coverage strip ---- */}

            <div className="agm-coverage">

                <span>
                    <strong>
                        {exact(status?.totals?.records)}
                    </strong>
                    {" records"}
                </span>

                <span>
                    <strong>
                        {count(status?.totals?.commodities)}
                    </strong>
                    {" commodities"}
                </span>

                <span>
                    <strong>
                        {count(status?.totals?.markets)}
                    </strong>
                    {" mandis"}
                </span>

                <span>
                    <strong>
                        {count(status?.totals?.states)}
                    </strong>
                    {" states"}
                </span>

                <span>
                    <strong>
                        {count(status?.totals?.districts)}
                    </strong>
                    {" districts"}
                </span>

                <span>
                    <strong>
                        {exact(status?.marketsInIndex)}
                    </strong>
                    {" mandis in the Agmarknet place index"}
                </span>

                <span>
                    <strong>
                        {status?.dates?.length || 0}
                    </strong>
                    {" trading days stored"}
                </span>

            </div>


            {/* ---- Notice ---- */}

            {notice && (

                <div className="market-warning">

                    <Activity size={17} />

                    <div>
                        <strong>NOTICE</strong>
                        <span>{notice}</span>
                    </div>

                </div>

            )}


            {/* =================================================
                TABS
            ================================================= */}

            <div className="agm-tabs">

                <button
                    className={
                        tab === "national"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setTab("national")
                    }
                >
                    <BarChart3 size={14} />
                    National picture
                </button>

                <button
                    className={
                        tab === "commodity"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setTab("commodity")
                    }
                >
                    <Wheat size={14} />
                    Commodity drilldown
                </button>

            </div>


            {/* =================================================
                NATIONAL
            ================================================= */}

            {tab === "national" && (

                overviewLoading
                    ? (
                        <div className="agm-loading">
                            <RefreshCw
                                size={16}
                                className="spin"
                            />
                            Aggregating {shortDate(date)}…
                        </div>
                    )
                    : (
                        <NationalOverview
                            overview={overview}
                            date={date}
                        />
                    )

            )}


            {/* =================================================
                COMMODITY
            ================================================= */}

            {tab === "commodity" && (

                <>

                    <div className="agm-picker">

                        <div className="agm-search">

                            <Wheat size={15} />

                            <input
                                value={commoditySearch}
                                onChange={event =>
                                    setCommoditySearch(
                                        event.target.value
                                    )
                                }
                                placeholder={`Filter ${exact(filteredCommodities.length)} commodities…`}
                            />

                        </div>

                        <div className="agm-select agm-select-wide">

                            <select
                                value={commodity}
                                onChange={event =>
                                    setCommodity(
                                        event.target.value
                                    )
                                }
                            >

                                {filteredCommodities.map(
                                    name => (
                                        <option
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        <button
                            className="agm-button"
                            onClick={download}
                            disabled={
                                !detail?.markets?.length
                            }
                        >
                            <Download size={15} />
                            CSV
                        </button>

                    </div>

                    {detailLoading
                        ? (
                            <div className="agm-loading">
                                <RefreshCw
                                    size={16}
                                    className="spin"
                                />
                                Reading {commodity}…
                            </div>
                        )
                        : (
                            <CommodityDetail
                                detail={detail}
                            />
                        )}

                </>

            )}

        </div>

    );

}