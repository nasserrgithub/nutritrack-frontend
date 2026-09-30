import { logNaturalMeal } from "../api/logs"
import { useState } from "react"

const NaturalLanguageForm = ({ onLogged }) => {
    const [mealData, setMealData] = useState("")
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

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            await logNaturalMeal({
                text: mealData,
                estimate_mode: estimateMode,
            })
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
                        style={{ fontSize: 10, color: "var(--nt-text-muted)" }}
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

            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Parsing meal..." : "Log meal"}
            </button>
        </form>
    )
}

export default NaturalLanguageForm
