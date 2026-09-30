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

    const inputStyle = {
        width: "100%",
        border: "0.5px solid var(--nt-border)",
        borderRadius: 10,
        padding: "8px 12px",
        fontSize: 13,
        color: "var(--nt-text)",
        background: "var(--nt-bg)",
        marginBottom: 10,
        outline: "none",
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: "var(--nt-card)",
                borderRadius: "var(--nt-radius)",
                border: "0.5px solid var(--nt-border)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{ flex: 1 }}>
                {error && (
                    <p
                        style={{
                            color: "#e53e3e",
                            fontSize: 13,
                            marginBottom: 12,
                        }}
                    >
                        {error}
                    </p>
                )}

                {[
                    {
                        value: food1,
                        setter: setFood1,
                        placeholder: "Available food #1",
                    },
                    {
                        value: food2,
                        setter: setFood2,
                        placeholder: "Available food #2",
                    },
                    {
                        value: food3,
                        setter: setFood3,
                        placeholder: "Available food #3",
                    },
                    {
                        value: food4,
                        setter: setFood4,
                        placeholder: "Available food #4",
                    },
                    {
                        value: food5,
                        setter: setFood5,
                        placeholder: "Available food #5",
                    },
                ].map((f, i) => (
                    <input
                        key={i}
                        type="text"
                        placeholder={f.placeholder}
                        value={f.value}
                        onChange={(e) => f.setter(e.target.value)}
                        style={inputStyle}
                    />
                ))}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{ marginTop: 4 }}
                >
                    {loading ? "Generating..." : "Generate suggestions"}
                </button>
            </div>
        </form>
    )
}

export default SuggestionForm
