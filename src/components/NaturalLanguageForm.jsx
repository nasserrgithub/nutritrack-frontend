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
            style={{
                background: "var(--nt-card)",
                borderRadius: "var(--nt-radius)",
                border: "0.5px solid var(--nt-border)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            {error && <p style={{ color: "#e53e3e", fontSize: 13 }}>{error}</p>}

            <textarea
                placeholder="Describe what you ate (e.g. '99g rice and 27g fried chicken breast')"
                value={mealData}
                onChange={(e) => setMealData(e.target.value)}
                rows={5}
                style={{
                    width: "100%",
                    border: "0.5px solid var(--nt-border)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "var(--nt-text)",
                    background: "var(--nt-bg)",
                    outline: "none",
                    resize: "none",
                    overflowY: "auto",
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                }}
            />

            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Parsing meal..." : "Log meal"}
            </button>
        </form>
    )
}

export default NaturalLanguageForm
