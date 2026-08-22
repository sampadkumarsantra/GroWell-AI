import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

export default function MarketCandlestick({ data, selectedCrop }) {

    if (!data || !data.history || data.history.length === 0) {
        return (
            <div className="market-chart-empty">
                Loading market data...
            </div>
        );
    }

    const chartData = data.history.map((price, index) => ({
        index: index + 1,
        price: Number(price) || 0
    }));

    return (
        <div className="market-chart-wrapper">

            <div className="market-chart-inner">

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <ComposedChart
                        data={chartData}
                        margin={{
                            top: 15,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="index"
                            tick={{ fontSize: 11 }}
                        />

                        <YAxis
                            domain={["auto", "auto"]}
                            tick={{ fontSize: 11 }}
                            width={65}
                        />

                        <Tooltip
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "Price"
                            ]}
                            labelFormatter={(label) =>
                                `${selectedCrop} observation ${label}`
                            }
                        />

                        <Line
                            type="monotone"
                            dataKey="price"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 5 }}
                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}