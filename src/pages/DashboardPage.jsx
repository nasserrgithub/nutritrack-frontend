import { useState, useEffect } from "react"
import { getDailySummary } from "../api/summary"
import { getActiveGoal } from "../api/goals"
import { getTodayDate } from "../utils/date"
import { Link } from "react-router-dom"
import MacroBar from "../components/MacroBar"

const DashboardPage = () => {
    const [summary, setSummary] = useState(null)
    const [goal, setGoal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [noGoal, setNoGoal] = useState(false)

    useEffect(() => {
        const today = getTodayDate()
        const fetchData = async () => {
            try {
                const summaryData = await getDailySummary(today)
                const goalData = await getActiveGoal()
                setSummary(summaryData)
                setGoal(goalData)
            } catch (err) {
                if (err.response?.status === 404) {
                    setNoGoal(true)
                } else {
                    console.log(err)
                    setError("Could not load dashboard data")
                }
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading)
        return (
            <div
                style={{
                    padding: 32,
                    textAlign: "center",
                    color: "var(--nt-text-muted)",
                }}
            >
                Loading...
            </div>
        )
    if (noGoal) {
        return (
            <div style={{ maxWidth: 480, margin: "60px auto", textAlign: "center", padding: 16 }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "var(--nt-text)", marginBottom: 8 }}>
                    Welcome to NutriTrack!
                </p>
                <p style={{ fontSize: 13, color: "var(--nt-text-muted)", marginBottom: 16 }}>
                    Set your daily macro goals to start tracking.
                </p>
                <Link to="/goals" className="btn-primary">
                    Set my goals
                </Link>
            </div>
        )
    }
    if (error)
        return (
            <div style={{ padding: 32, textAlign: "center", color: "#e53e3e" }}>
                {error}
            </div>
        )

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--nt-bg)",
                padding: "20px 16px",
            }}
        >
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <h1
                    style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: "var(--nt-text)",
                        marginBottom: 16,
                    }}
                >
                    Dashboard
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 10,
                    }}
                >
                    <MacroBar
                        label="Calories"
                        total={summary.total_calories}
                        goal={goal.calories}
                    />
                    <MacroBar
                        label="Protein (g)"
                        total={summary.total_protein}
                        goal={goal.protein_g}
                    />
                    <MacroBar
                        label="Carbs (g)"
                        total={summary.total_carbs}
                        goal={goal.carbs_g}
                    />
                    <MacroBar
                        label="Fat (g)"
                        total={summary.total_fat}
                        goal={goal.fat_g}
                    />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
