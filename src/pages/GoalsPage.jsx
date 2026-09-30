import { useState, useEffect } from "react"
import { getActiveGoal } from "../api/goals"
import GoalForm from "../components/GoalForm"

const GoalsPage = () => {
    const [currentGoal, setCurrentGoal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const goal = await getActiveGoal()
                setCurrentGoal(goal)
            } catch (err) {
                console.log(err)
                setCurrentGoal(null)
            } finally {
                setLoading(false)
            }
        }
        fetchGoal()
    }, [refreshKey])

    const handleGoalCreated = () => {
        setRefreshKey((prev) => prev + 1)
    }

    const macroRows = currentGoal ? [
        { label: "Calories", value: `${currentGoal.calories} kcal` },
        { label: "Protein", value: `${currentGoal.protein_g}g` },
        { label: "Carbs", value: `${currentGoal.carbs_g}g` },
        { label: "Fat", value: `${currentGoal.fat_g}g` },
    ] : []

    return (
        <div style={{ minHeight: "100vh", background: "var(--nt-bg)", padding: "20px 16px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--nt-text)", marginBottom: 16 }}>
                    Macro Goals
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GoalForm onLogged={handleGoalCreated} />

                    <div style={{ background: "var(--nt-card)", borderRadius: "var(--nt-radius)", border: "0.5px solid var(--nt-border)", padding: 16 }}>
                        <h2 style={{ fontSize: 13, fontWeight: 500, color: "var(--nt-text-muted)", marginBottom: 12 }}>
                            Current goal
                        </h2>

                        {loading ? (
                            <p style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>Loading...</p>
                        ) : currentGoal ? (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {macroRows.map((row) => (
                                        <div
                                            key={row.label}
                                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "var(--nt-green-50)", borderRadius: 10 }}
                                        >
                                            <span style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>{row.label}</span>
                                            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--nt-green-900)" }}>{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontSize: 11, color: "var(--nt-text-muted)", marginTop: 12 }}>
                                    Effective since {currentGoal.effective_date}
                                </p>
                            </>
                        ) : (
                            <p style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>
                                No active goal set yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoalsPage