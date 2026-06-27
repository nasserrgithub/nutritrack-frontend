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

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Macro Goals
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GoalForm onLogged={handleGoalCreated} />

                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-3">
                            Current goal
                        </h2>
                        {loading ? (
                            <p className="text-gray-400">Loading...</p>
                        ) : currentGoal ? (
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>
                                    Calories:{" "}
                                    <span className="font-semibold">
                                        {currentGoal.calories} kcal
                                    </span>
                                </p>
                                <p>
                                    Protein:{" "}
                                    <span className="font-semibold">
                                        {currentGoal.protein_g}g
                                    </span>
                                </p>
                                <p>
                                    Carbs:{" "}
                                    <span className="font-semibold">
                                        {currentGoal.carbs_g}g
                                    </span>
                                </p>
                                <p>
                                    Fat:{" "}
                                    <span className="font-semibold">
                                        {currentGoal.fat_g}g
                                    </span>
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Effective since {currentGoal.effective_date}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-400">
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
