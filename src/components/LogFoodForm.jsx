import { useState } from "react"
import { getTodayDate } from "../utils/date"
import { logFood } from "../api/logs"

const MEAL_OPTIONS = ["unspecified", "breakfast", "lunch", "dinner", "snack"]

const LogFoodForm = ({ onLogged }) => {
    const [foodName, setFoodName] = useState("")
    const [weightG, setWeightG] = useState("")
    const [mealSlot, setMealSlot] = useState("unspecified")
    const [mealSlotOpen, setMealSlotOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [estimateMode, setEstimateMode] = useState("medium")
    const [estimateModeOpen, setEstimateModeOpen] = useState(false)

    const ESTIMATE_OPTIONS = [
        {
            value: "low",
            label: "Low",
            description: "Conservative — good for bulking",
        },
        { value: "medium", label: "Medium", description: "Standard estimates" },
        {
            value: "high",
            label: "High",
            description: "Maximum — good for cutting",
        },
    ]
    const loggedDate = getTodayDate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await logFood({
                food_name: foodName,
                weight_g: parseFloat(weightG),
                meal_slot: mealSlot,
                logged_date: loggedDate,
                estimate_mode: estimateMode,
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

                <div style={{ position: "relative", marginBottom: 10 }}>
                    <button
                        type="button"
                        onClick={() => setMealSlotOpen(!mealSlotOpen)}
                        style={{
                            width: "100%",
                            border: "0.5px solid var(--nt-border)",
                            borderRadius: 10,
                            padding: "10px 12px",
                            fontSize: 13,
                            color:
                                mealSlot === "unspecified"
                                    ? "var(--nt-text-muted)"
                                    : "var(--nt-text)",
                            background: "var(--nt-bg)",
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <span style={{ textTransform: "capitalize" }}>
                            {mealSlot}
                        </span>
                        <span
                            style={{
                                fontSize: 10,
                                color: "var(--nt-text-muted)",
                            }}
                        >
                            ▼
                        </span>
                    </button>

                    {mealSlotOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% + 4px)",
                                left: 0,
                                right: 0,
                                background: "#fff",
                                border: "0.5px solid var(--nt-border)",
                                borderRadius: 10,
                                zIndex: 10,
                                overflow: "hidden",
                            }}
                        >
                            {MEAL_OPTIONS.map((opt) => (
                                <div
                                    key={opt}
                                    onClick={() => {
                                        setMealSlot(opt)
                                        setMealSlotOpen(false)
                                    }}
                                    style={{
                                        padding: "10px 12px",
                                        fontSize: 13,
                                        cursor: "pointer",
                                        textTransform: "capitalize",
                                        background:
                                            mealSlot === opt
                                                ? "var(--nt-green-50)"
                                                : "#fff",
                                        color:
                                            mealSlot === opt
                                                ? "var(--nt-green-700)"
                                                : "var(--nt-text)",
                                    }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={{ position: "relative" }}>
                    <button
                        type="button"
                        onClick={() => setEstimateModeOpen(!estimateModeOpen)}
                        style={{
                            width: "100%",
                            border: "0.5px solid var(--nt-border)",
                            borderRadius: 10,
                            padding: "10px 12px",
                            fontSize: 13,
                            color: "var(--nt-text)",
                            background: "var(--nt-bg)",
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <span>
                            Estimate:{" "}
                            <strong>
                                {estimateMode.charAt(0).toUpperCase() +
                                    estimateMode.slice(1)}
                            </strong>
                        </span>
                        <span
                            style={{
                                fontSize: 10,
                                color: "var(--nt-text-muted)",
                            }}
                        >
                            ▼
                        </span>
                    </button>

                    {estimateModeOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "calc(100% - 6px)",
                                left: 0,
                                right: 0,
                                background: "#fff",
                                border: "0.5px solid var(--nt-border)",
                                borderRadius: 10,
                                zIndex: 10,
                                overflow: "hidden",
                            }}
                        >
                            {ESTIMATE_OPTIONS.map((opt) => (
                                <div
                                    key={opt.value}
                                    onClick={() => {
                                        setEstimateMode(opt.value)
                                        setEstimateModeOpen(false)
                                    }}
                                    style={{
                                        padding: "10px 12px",
                                        cursor: "pointer",
                                        background:
                                            estimateMode === opt.value
                                                ? "var(--nt-green-50)"
                                                : "#fff",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color:
                                                estimateMode === opt.value
                                                    ? "var(--nt-green-700)"
                                                    : "var(--nt-text)",
                                        }}
                                    >
                                        {opt.label}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: 11,
                                            color: "var(--nt-text-muted)",
                                            marginTop: 1,
                                        }}
                                    >
                                        {opt.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? "Logging..." : "Log food"}
                </button>
            </div>
        </form>
    )
}

export default LogFoodForm
