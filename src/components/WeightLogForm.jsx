import { useState } from "react"
import { logWeight } from "../api/weight"
import { getTodayDate } from "../utils/date"

const WeightLogForm = ({ onLogged }) => {
    const [weightKg, setWeightKg] = useState("")
    const [note, setNote] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await logWeight({
                weight_kg: parseFloat(weightKg),
                logged_date: getTodayDate(),
                note: note,
            })
            setWeightKg("")
            setNote("")
            onLogged()
        } catch (err) {
            console.log(err)
            setError("Could not log weight.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow flex flex-col h-full"
        >
            <div className="flex-1">
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weightKg}
                    onChange={(event) => setWeightKg(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Logging..." : "Log weight"}
                </button>
            </div>
        </form>
    )
}

export default WeightLogForm
