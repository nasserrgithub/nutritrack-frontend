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

const WeightChart = ({ refreshKey }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const entries = await getWeightHistory(30)
                setData(entries)
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
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="weight_kg"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeightChart
