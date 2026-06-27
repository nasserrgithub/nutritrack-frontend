import { useState } from "react"
import { getTodayDate } from "../utils/date"
import { logFood } from "../api/logs"

const LogFoodForm = ({ onLogged }) => {
    const [foodName, setFoodName] = useState("")
    const [weightG, setWeightG] = useState("")
    const [mealSlot, setMealSlot] = useState("unspecified")
    const loggedDate = getTodayDate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await logFood({
                food_name: foodName,
                weight_g: parseFloat(weightG),
                meal_slot: mealSlot,
                logged_date: loggedDate,
            })
            setFoodName("")
            setWeightG("")
            setMealSlot("unspecified")
            onLogged()
        } catch (err) {
            console.log(err)
            setError("Could not log food.")
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
                    type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={(event) => setFoodName(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="number"
                    placeholder="Weight (g)"
                    value={weightG}
                    onChange={(event) => setWeightG(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <select
                    name="mealSlot"
                    value={mealSlot}
                    onChange={(event) => setMealSlot(event.target.value)}
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
                    {loading ? "Logging..." : "Log food"}
                </button>
            </div>
        </form>
    )
}

export default LogFoodForm
