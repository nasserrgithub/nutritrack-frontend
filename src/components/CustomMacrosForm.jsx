import { useState } from "react"
import { getTodayDate } from "../utils/date"
import { logCustomMacros } from "../api/logs"

const CustomMacrosForm = ({ onLogged }) => {
    const [foodName, setFoodName] = useState("")
    const [weightG, setWeightG] = useState("")
    const [proteinG, setProteinG] = useState("")
    const [carbsG, setCarbsG] = useState("")
    const [fatG, setFatG] = useState("")
    const [mealSlot, setMealSlot] = useState("unspecified")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await logCustomMacros({
                food_name: foodName,
                weight_g: parseFloat(weightG),
                protein_g: parseFloat(proteinG),
                carbs_g: parseFloat(carbsG),
                fat_g: parseFloat(fatG),
                meal_slot: mealSlot,
                logged_date: getTodayDate(),
            })
            setFoodName("")
            setWeightG("")
            setProteinG("")
            setCarbsG("")
            setFatG("")
            setMealSlot("unspecified")
            onLogged()
        } catch (err) {
            console.error(err)
            setError("Could not log custom macros.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow flex flex-col h-full"
        >
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <input
                type="text"
                placeholder="Food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="w-full border rounded p-2 mb-3"
            />

            <input
                type="number"
                placeholder="Weight (g)"
                value={weightG}
                onChange={(e) => setWeightG(e.target.value)}
                className="w-full border rounded p-2 mb-3"
            />

            <div className="grid grid-cols-3 gap-2 mb-3">
                <input
                    type="number"
                    placeholder="Protein (g)"
                    value={proteinG}
                    onChange={(e) => setProteinG(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={carbsG}
                    onChange={(e) => setCarbsG(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <input
                    type="number"
                    placeholder="Fat (g)"
                    value={fatG}
                    onChange={(e) => setFatG(e.target.value)}
                    className="w-full border rounded p-2"
                />
            </div>

            <select
                value={mealSlot}
                onChange={(e) => setMealSlot(e.target.value)}
                className="w-full border rounded p-2 mb-3"
            >
                <option value="unspecified">Select meal</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Logging..." : "Log macros"}
            </button>
        </form>
    )
}

export default CustomMacrosForm
