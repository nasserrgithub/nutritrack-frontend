import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getDailySummary, getActiveGoal } from "../api/summary"
import { getTodayDate } from "../utils/date"
import MacroRing from "../components/MacroRing"

const DashboardPage = () => {
    const [summary, setSummary] = useState(null)
    const [goal, setGoal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

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

    if (loading) return <p className="p-8">Loading...</p>
    if (error) return <p className="p-8 text-red-500">{error}</p>

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/log"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Log food
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-600 hover:underline"
                        >
                            Log out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MacroRing
                        label="Calories"
                        total={summary.total_calories}
                        goal={goal.calories}
                    />
                    <MacroRing
                        label="Protein (g)"
                        total={summary.total_protein}
                        goal={goal.protein_g}
                    />
                    <MacroRing
                        label="Carbs (g)"
                        total={summary.total_carbs}
                        goal={goal.carbs_g}
                    />
                    <MacroRing
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
