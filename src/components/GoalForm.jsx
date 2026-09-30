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

    const inputStyle = {
        width: "100%",
        border: "0.5px solid var(--nt-border)",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 13,
        color: "var(--nt-text)",
        background: "var(--nt-bg)",
        marginBottom: 10,
        outline: "none",
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ background: "var(--nt-card)", borderRadius: "var(--nt-radius)", border: "0.5px solid var(--nt-border)", padding: 16, display: "flex", flexDirection: "column" }}
        >
            <div style={{ flex: 1 }}>
                {error && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12 }}>{error}</p>}

                <input
                    type="number"
                    placeholder="Calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Protein (g)"
                    value={proteinG}
                    onChange={(e) => setProteinG(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Carbs (g)"
                    value={carbsG}
                    onChange={(e) => setCarbsG(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="number"
                    placeholder="Fat (g)"
                    value={fatG}
                    onChange={(e) => setFatG(e.target.value)}
                    style={{ ...inputStyle, marginBottom: 14 }}
                />

                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? "Creating goal..." : "Set goal"}
                </button>
            </div>
        </form>
    )
}

export default GoalForm