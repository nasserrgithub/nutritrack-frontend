import { useState, useEffect } from "react"
import { getDailySummary } from "../api/summary"
import { getActiveGoal } from "../api/goals"
import { getTodayDate } from "../utils/date"
import MacroBar from "../components/MacroBar"

const DashboardPage = () => {
  const [summary, setSummary] = useState(null)
  const [goal, setGoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const today = getTodayDate()
    const fetchData = async () => {
      try {
        const summaryData = await getDailySummary(today)
        const goalData = await getActiveGoal()
        setSummary(summaryData)
        setGoal(goalData)
      } catch (err) {
        console.log(err)
        setError("Could not load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return (
    <div style={{ padding: 32, textAlign: "center", color: "var(--nt-text-muted)" }}>
      Loading...
    </div>
  )
  if (error) return (
    <div style={{ padding: 32, textAlign: "center", color: "#e53e3e" }}>
      {error}
    </div>
  )

  return (
    <div style={{ minHeight: "100vh", background: "var(--nt-bg)", padding: "20px 16px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--nt-text)", marginBottom: 16 }}>
          Dashboard
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
          <MacroBar label="Calories" total={summary.total_calories} goal={goal.calories} />
          <MacroBar label="Protein (g)" total={summary.total_protein} goal={goal.protein_g} />
          <MacroBar label="Carbs (g)" total={summary.total_carbs} goal={goal.carbs_g} />
          <MacroBar label="Fat (g)" total={summary.total_fat} goal={goal.fat_g} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage