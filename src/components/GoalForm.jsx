import { useState } from "react"
import { getTodayDate } from "../utils/date"
import { createGoal } from "../api/goals"

const GoalForm = ({ onLogged }) => {
    const [calories, setCalories] = useState("")
    const [proteinG, setProteinG] = useState("")
    const [carbsG, setCarbsG] = useState("")
    const [fatG, setFatG] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await createGoal({
                calories: parseFloat(calories),
                protein_g: parseFloat(proteinG),
                carbs_g: parseFloat(carbsG),
                fat_g: parseFloat(fatG),
                effective_date: getTodayDate(),
            })
            setCalories("")
            setProteinG("")
            setCarbsG("")
            setFatG("")
            onLogged()
        } catch (err) {
            console.log(err)
            setError("Could not create macro goal.")
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
                    placeholder="Calories"
                    value={calories}
                    onChange={(event) => setCalories(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="number"
                    placeholder="Protein (g)"
                    value={proteinG}
                    onChange={(event) => setProteinG(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={carbsG}
                    onChange={(event) => setCarbsG(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="number"
                    placeholder="Fat (g)"
                    value={fatG}
                    onChange={(event) => setFatG(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Creating goal..." : "Create"}
                </button>
            </div>
        </form>
    )
}

export default GoalForm
