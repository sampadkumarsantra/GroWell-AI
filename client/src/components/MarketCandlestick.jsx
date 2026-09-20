import {
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import {
    createChart,
    AreaSeries,
    ColorType,
    CrosshairMode,
    LineStyle
} from "lightweight-charts";


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


function parseArrivalDate(value) {

    if (!value) {
        return null;
    }

    const text =
        String(value).trim();

    if (!text) {
        return null;
    }

    let match =
        text.match(/^(\d{4})[-/.\s](\d{1,2})[-/.\s](\d{1,2})/);

    if (match) {

        return {
            year: Number(match[1]),
            month: Number(match[2]),
            day: Number(match[3])
        };
    }

    match =
        text.match(/^(\d{1,2})[-/.\s](\d{1,2})[-/.\s](\d{2,4})/);

    if (match) {

        let first = Number(match[1]);
        let second = Number(match[2]);
        let year = Number(match[3]);

        if (year < 100) {
            year += 2000;
        }

        if (first > 12) {
            return { year, month: second, day: first };
        }

        if (second > 12) {
            return { year, month: first, day: second };
        }

        return { year, month: second, day: first };
    }

    return null;
}


function isValidCalendarDay(day) {

    if (!day) {
        return false;
    }

    const date = new Date(
        Date.UTC(
            day.year,
            day.month - 1,
            day.day
        )
    );

    return (
        date.getUTCFullYear() === day.year &&
        date.getUTCMonth() === day.month - 1 &&
        date.getUTCDate() === day.day
    );
}


function toUtcSeconds(day) {

    return Math.floor(
        Date.UTC(
            day.year,
            day.month - 1,
            day.day
        ) / 1000
    );
}


const DAY_SECONDS = 86400;


// =====================================================
// COMPONENT
// =====================================================

export default function MarketCandlestick({ data, selectedCrop }) {

    const containerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);
    const priceLineRef = useRef(null);

    const [range, setRange] =
        useState("ALL");

    const [tip, setTip] =
        useState(null);


    // =================================================
    // BUILD SERIES POINTS
    // =================================================

    const chartData =
        useMemo(() => {

            const history =
                data?.history || [];

            if (history.length === 0) {
                return [];
            }

            const today =
                Math.floor(
                    Date.now() /
                    (DAY_SECONDS * 1000)
                ) * DAY_SECONDS;

            let syntheticIndex = 0;

            const points =
                history
                    .map(item => {

                        const price =
                            Number(item.price);

                        if (
                            !Number.isFinite(price) ||
                            price <= 0
                        ) {
                            return null;
                        }

                        const calendarDay =
                            parseArrivalDate(item.date);

                        if (
                            calendarDay &&
                            isValidCalendarDay(calendarDay)
                        ) {

                            return {
                                time: toUtcSeconds(calendarDay),
                                price
                            };
                        }

                        const time =
                            today -
                            (
                                history.length -
                                1 -
                                syntheticIndex
                            ) * DAY_SECONDS;

                        syntheticIndex += 1;

                        return {
                            time,
                            price
                        };
                    })
                    .filter(Boolean);


            // Sort ascending so the chart renders correctly.
            points.sort(
                (a, b) => a.time - b.time
            );

            // Multiple mandi records can share a single
            // arrival date; collapse them into one daily
            // observation using the average price.
            const grouped = {};

            points.forEach(point => {

                const existing =
                    grouped[point.time];

                if (!existing) {

                    grouped[point.time] = {
                        time: point.time,
                        sum: point.price,
                        count: 1
                    };

                    return;
                }

                existing.sum += point.price;
                existing.count += 1;
            });

            const series = Object
                .values(grouped)
                .map(group => ({
                    time: group.time,
                    price: group.sum / group.count
                }))
                .sort(
                    (a, b) =>
                        a.time - b.time
                );

            // A single observation alone renders as a
            // lone dot; mirror it one day earlier so a
            // flat steady line is visible.
            if (series.length === 1) {

                const only =
                    series[0];

                return [
                    {
                        time: only.time - DAY_SECONDS,
                        price: only.price
                    },
                    only
                ];
            }

            return series;

        }, [data]);


    // =================================================
    // CREATE CHART (once)
    // =================================================

    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) {
            return;
        }

        const chart =
            createChart(
                container,
                {
                    autoSize: true,
                    layout: {
                        background: {
                            type: ColorType.Solid,
                            color: "#10150f"
                        },
                        textColor: "#7b887f",
                        fontSize: 11,
                        attributionLogo: false
                    },
                    grid: {
                        vertLines: {
                            color: "rgba(201, 168, 114, 0.09)"
                        },
                        horzLines: {
                            color: "rgba(201, 168, 114, 0.09)"
                        }
                    },
                    rightPriceScale: {
                        borderColor: "rgba(201, 168, 114, 0.18)"
                    },
                    timeScale: {
                        borderColor: "rgba(201, 168, 114, 0.18)",
                        timeVisible: false,
                        rightOffset: 4,
                        barSpacing: 12
                    },
                    crosshair: {
                        mode: CrosshairMode.Normal,
                        vertLine: {
                            color: "rgba(201, 168, 114, 0.4)",
                            width: 1,
                            style: LineStyle.Dashed,
                            labelBackgroundColor: "#24312a"
                        },
                        horzLine: {
                            color: "rgba(201, 168, 114, 0.4)",
                            width: 1,
                            style: LineStyle.Dashed,
                            labelBackgroundColor: "#24312a"
                        }
                    },
                    localization: {
                        locale: "en-IN",
                        priceFormatter: (price) => {

                            if (!Number.isFinite(price)) {
                                return "₹—";
                            }

                            return `₹${Math.round(price).toLocaleString("en-IN")}`;
                        }
                    }
                }
            );

        const series =
            chart.addSeries(
                AreaSeries,
                {
                    lineColor: "#c9a872",
                    topColor: "rgba(201, 168, 114, 0.32)",
                    bottomColor: "rgba(201, 168, 114, 0.02)",
                    lineWidth: 2,
                    priceLineVisible: false,
                    lastValueVisible: false,
                    crosshairMarkerRadius: 4,
                    crosshairMarkerBackgroundColor: "#c9a872",
                    crosshairMarkerBorderColor: "#10150f"
                }
            );

        chartRef.current = chart;
        seriesRef.current = series;

        // =========================================
        // CROSSHAIR LEGEND
        // =========================================

        chart.subscribeCrosshairMove(param => {

            if (!param?.time || !param?.point) {

                setTip(null);

                return;
            }

            const item =
                param.seriesData?.get(series);

            if (!item) {

                setTip(null);

                return;
            }

            setTip({
                time: param.time,
                value: item.value
            });

        });

        return () => {

            chart.unsubscribeCrosshairMove();

            chart.remove();

            chartRef.current = null;
            seriesRef.current = null;
            priceLineRef.current = null;
        };

    }, []);


    // =================================================
    // APPLY SERIES DATA
    // =================================================

    useEffect(() => {

        const chart =
            chartRef.current;

        const series =
            seriesRef.current;

        if (!chart || !series) {
            return;
        }

        const maxPoints =
            range === "ALL"
                ? chartData.length
                : Number(range);

        const visible =
            chartData.slice(
                -maxPoints
            );

        if (visible.length === 0) {
            return;
        }

        series.setData(
            visible.map(point => ({
                time: point.time,
                value: point.price
            }))
        );

        // =========================================
        // LATEST PRICE LINE
        // =========================================

        if (priceLineRef.current) {

            series.removePriceLine(
                priceLineRef.current
            );

            priceLineRef.current = null;
        }

        const latest =
            visible[visible.length - 1];

        priceLineRef.current =
            series.createPriceLine({
                price: latest.price,
                color: "rgba(201, 168, 114, 0.55)",
                lineWidth: 1,
                lineStyle: LineStyle.Dotted,
                axisLabelVisible: true,
                title: "LATEST"
            });

        chart.timeScale().fitContent();

        setTip(null);

    }, [chartData, range]);


    // =================================================
    // EMPTY STATE
    // =================================================

    if (
        !data ||
        chartData.length === 0
    ) {

        return (
            <div className="market-chart-empty">
                Loading market data...
            </div>
        );
    }


    const latestPoint =
        chartData[chartData.length - 1];

    const lastPrice =
        Number(data.price) > 0
            ? Number(data.price)
            : latestPoint.price;


    return (
        <div className="market-chart-shell">

            {/* =========================================
                TOOLBAR
            ========================================= */}

            <div className="market-chart-toolbar">

                <div className="chart-instrument">

                    {selectedCrop.toUpperCase()}
                    {" "}· IN

                </div>

                <div className="chart-info">

                    GOV MANDI OBSERVATIONS

                </div>

                <div className="chart-timeframes">

                    {["10", "20", "ALL"].map(key => (

                        <button
                            key={key}
                            className={
                                range === key
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setRange(key)
                            }
                        >
                            {key}
                        </button>

                    ))}

                </div>

            </div>


            {/* =========================================
                OHLC STRIP
            ========================================= */}

            <div className="chart-ohlc">

                <div>
                    <span>LAST</span>
                    <strong>
                        {formatPrice(lastPrice)}
                    </strong>
                </div>

                <div>
                    <span>CHG</span>
                    <strong
                        className={
                            data.direction === "up"
                                ? "ohlc-positive"
                                : "ohlc-negative"
                        }
                    >
                        {formatPercent(data.priceVsAverage)}
                    </strong>
                </div>

                <div>
                    <span>HIGH</span>
                    <strong>
                        {formatPrice(data.highestPrice)}
                    </strong>
                </div>

                <div>
                    <span>LOW</span>
                    <strong>
                        {formatPrice(data.lowestPrice)}
                    </strong>
                </div>

                <div>
                    <span>AVG</span>
                    <strong>
                        {formatPrice(data.averagePrice)}
                    </strong>
                </div>

            </div>


            {/* =========================================
                CHART
            ========================================= */}

            <div className="market-candlestick-wrapper">

                <div
                    ref={containerRef}
                    className="market-trading-chart"
                />

                {tip && (

                    <div
                        className="chart-legend"
                    >

                        <span>
                            {new Date(
                                tip.time * 1000
                            ).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                }
                            )}
                        </span>

                        <strong>
                            {formatPrice(tip.value)}
                        </strong>

                    </div>

                )}

            </div>

        </div>
    );
}