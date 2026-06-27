import { useState } from "react"
import { getSuggestions } from "../api/suggestions"
import { getTodayDate } from "../utils/date"

const SuggestionForm = ({ onSuggestions, onLoadingChange }) => {
    const [food1, setFood1] = useState("")
    const [food2, setFood2] = useState("")
    const [food3, setFood3] = useState("")
    const [food4, setFood4] = useState("")
    const [food5, setFood5] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        onLoadingChange(true)

        try {
            const foodSuggestions = await getSuggestions(
                getTodayDate(),
                `${food1},${food2},${food3},${food4},${food5}`,
            )
            setFood1("")
            setFood2("")
            setFood3("")
            setFood4("")
            setFood5("")

            onSuggestions(foodSuggestions)
        } catch (err) {
            console.log(err)
            setError("Could not generate food suggestions.")
        } finally {
            setLoading(false)
            onLoadingChange(false)
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
                    placeholder="Available food #1"
                    value={food1}
                    onChange={(event) => setFood1(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="text"
                    placeholder="Available food #2"
                    value={food2}
                    onChange={(event) => setFood2(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="text"
                    placeholder="Available food #3"
                    value={food3}
                    onChange={(event) => setFood3(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="text"
                    placeholder="Available food #4"
                    value={food4}
                    onChange={(event) => setFood4(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="text"
                    placeholder="Available food #5"
                    value={food5}
                    onChange={(event) => setFood5(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>
        </form>
    )
}

export default SuggestionForm
