import { useState, useEffect } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { getWeightHistory } from "../api/weight"

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null
    const entry = payload[0].payload
    return (
        <div
            style={{
                background: "#fff",
                border: "0.5px solid var(--nt-border)",
                borderRadius: 10,
                padding: "10px 12px",
                fontSize: 13,
                maxWidth: 200,
            }}
        >
            <p
                style={{
                    fontWeight: 500,
                    color: "var(--nt-text)",
                    marginBottom: 6,
                }}
            >
                {label}
            </p>
            {entry.entries.map((e, i) => (
                <div
                    key={i}
                    style={
                        i > 0
                            ? {
                                  marginTop: 6,
                                  paddingTop: 6,
                                  borderTop: "0.5px solid var(--nt-border)",
                              }
                            : {}
                    }
                >
                    <p
                        style={{
                            color: "var(--nt-green-700)",
                            fontWeight: 500,
                        }}
                    >
                        {e.weight_kg} kg
                    </p>
                    {e.note && (
                        <p
                            style={{
                                color: "var(--nt-text-muted)",
                                fontSize: 11,
                                fontStyle: "italic",
                                marginTop: 2,
                            }}
                        >
                            {e.note}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}

const processData = (entries) => {
    const grouped = {}
    entries.forEach((entry) => {
        if (!grouped[entry.logged_date]) {
            grouped[entry.logged_date] = {
                logged_date: entry.logged_date,
                weight_kg: entry.weight_kg,
                entries: [],
            }
        }
        grouped[entry.logged_date].entries.push(entry)
        grouped[entry.logged_date].weight_kg = entry.weight_kg
    })
    return Object.values(grouped).sort((a, b) =>
        a.logged_date.localeCompare(b.logged_date),
    )
}

const WeightChart = ({ refreshKey }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const entries = await getWeightHistory(365)
                setData(processData(entries))
            } catch (err) {
                console.log(err)
                setError("Could not load weight history.")
            } finally {
                setLoading(false)
            }
        }
        fetchHistory()
    }, [refreshKey])

    if (loading)
        return (
            <p
                style={{
                    padding: 16,
                    color: "var(--nt-text-muted)",
                    fontSize: 13,
                }}
            >
                Loading chart...
            </p>
        )
    if (error)
        return (
            <p style={{ padding: 16, color: "#e53e3e", fontSize: 13 }}>
                {error}
            </p>
        )
    if (data.length === 0)
        return (
            <p
                style={{
                    padding: 16,
                    color: "var(--nt-text-muted)",
                    fontSize: 13,
                }}
            >
                No weight entries logged yet
            </p>
        )

    return (
        <div
            style={{
                background: "var(--nt-card)",
                borderRadius: "var(--nt-radius)",
                border: "0.5px solid var(--nt-border)",
                padding: 16,
            }}
        >
            <h2 style={{ fontSize: 13, fontWeight: 500, color: "var(--nt-text-muted)", marginBottom: 16 }}>
                Weight history (last 12 months)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--nt-border)"
                    />
                    <XAxis
                        dataKey="logged_date"
                        tick={{ fontSize: 11, fill: "#5a7a45" }}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "#5a7a45" }}
                        domain={["auto", "auto"]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="weight_kg"
                        stroke="#639922"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#639922", strokeWidth: 0 }}
                        activeDot={{ r: 5, fill: "#3B6D11", strokeWidth: 0 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeightChart
