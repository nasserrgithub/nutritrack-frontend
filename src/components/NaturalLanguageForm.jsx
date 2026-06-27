import { logNaturalMeal } from "../api/logs"
import { useState } from "react"

const NaturalLanguageForm = ({ onLogged }) => {
    const [mealData, setMealData] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await logNaturalMeal({ text: mealData })
            setMealData("")
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
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <textarea
                placeholder="Describe what you ate, e.g. 'two eggs and toast'"
                value={mealData}
                onChange={(event) => setMealData(event.target.value)}
                className="w-full border rounded p-2 mb-3 flex-1"
                rows={3}
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Logging..." : "Log food"}
            </button>
        </form>
    )
}

export default NaturalLanguageForm
