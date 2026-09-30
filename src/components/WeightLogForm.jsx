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
                    placeholder="Weight (kg)"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    style={inputStyle}
                />
                <input
                    type="text"
                    placeholder="Note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{ ...inputStyle, marginBottom: 14 }}
                />

                <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? "Logging..." : "Log weight"}
                </button>
            </div>
        </form>
    )
}

export default WeightLogForm