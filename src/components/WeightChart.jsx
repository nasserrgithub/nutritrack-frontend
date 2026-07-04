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
        <div className="bg-white border border-gray-200 rounded p-2 text-sm shadow max-w-xs">
            <p className="font-medium text-gray-800 mb-1">{label}</p>
            {entry.entries.map((e, i) => (
                <div
                    key={i}
                    className={
                        i > 0 ? "mt-1 pt-1 border-t border-gray-100" : ""
                    }
                >
                    <p className="text-blue-600">{e.weight_kg} kg</p>
                    {e.note && (
                        <p className="text-gray-500 text-xs italic">{e.note}</p>
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
                const entries = await getWeightHistory(30)
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

    if (loading) return <p className="p-4">Loading chart...</p>
    if (error) return <p className="p-4 text-red-500">{error}</p>
    if (data.length === 0)
        return <p className="p-4">No weight entries logged yet</p>

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-4">
                Weight history (last 30 days)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="logged_date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="weight_kg"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeightChart
