import { useState } from "react"
import { getTodayDate } from "../utils/date"
import { logCustomMacros } from "../api/logs"

const MEAL_OPTIONS = ["unspecified", "breakfast", "lunch", "dinner", "snack"]

const CustomMacrosForm = ({ onLogged }) => {
    const [foodName, setFoodName] = useState("")
    const [weightG, setWeightG] = useState("")
    const [proteinG, setProteinG] = useState("")
    const [carbsG, setCarbsG] = useState("")
    const [fatG, setFatG] = useState("")
    const [mealSlot, setMealSlot] = useState("unspecified")
    const [mealSlotOpen, setMealSlotOpen] = useState(false)
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

    const inputStyle = {
        width: "100%",
        border: "0.5px solid var(--nt-border)",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 13,
        color: "var(--nt-text)",
        background: "var(--nt-bg)",
        outline: "none",
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ background: "var(--nt-card)", borderRadius: "var(--nt-radius)", border: "0.5px solid var(--nt-border)", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}
        >
            {error && <p style={{ color: "#e53e3e", fontSize: 13 }}>{error}</p>}

            <input
                type="text"
                placeholder="Food name"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                style={inputStyle}
            />

            <input
                type="number"
                placeholder="Weight (g)"
                value={weightG}
                onChange={(e) => setWeightG(e.target.value)}
                style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
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
                    style={inputStyle}
                />
            </div>

            <div style={{ position: "relative" }}>
                <button
                    type="button"
                    onClick={() => setMealSlotOpen(!mealSlotOpen)}
                    style={{
                        width: "100%",
                        border: "0.5px solid var(--nt-border)",
                        borderRadius: 10,
                        padding: "10px 12px",
                        fontSize: 13,
                        color: mealSlot === "unspecified" ? "var(--nt-text-muted)" : "var(--nt-text)",
                        background: "var(--nt-bg)",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <span style={{ textTransform: "capitalize" }}>{mealSlot}</span>
                    <span style={{ fontSize: 10, color: "var(--nt-text-muted)" }}>▼</span>
                </button>

                {mealSlotOpen && (
                    <div style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "0.5px solid var(--nt-border)",
                        borderRadius: 10,
                        zIndex: 10,
                        overflow: "hidden",
                    }}>
                        {MEAL_OPTIONS.map((opt) => (
                            <div
                                key={opt}
                                onClick={() => { setMealSlot(opt); setMealSlotOpen(false) }}
                                style={{
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    background: mealSlot === opt ? "var(--nt-green-50)" : "#fff",
                                    color: mealSlot === opt ? "var(--nt-green-700)" : "var(--nt-text)",
                                }}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Logging..." : "Log macros"}
            </button>
        </form>
    )
}

export default CustomMacrosForm