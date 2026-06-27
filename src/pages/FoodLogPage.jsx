import { useState } from "react"
import { getTodayDate } from "../utils/date"
import LogFoodForm from "../components/LogFoodForm"
import NaturalLanguageForm from "../components/NaturalLanguageForm"
import FoodEntryList from "../components/FoodEntryList"

const FoodLogPage = () => {
    const [refreshKey, setRefreshKey] = useState(0)
    const today = getTodayDate()

    const handleLogged = () => {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Food Log
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <LogFoodForm onLogged={handleLogged} />
                    <NaturalLanguageForm onLogged={handleLogged} />
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-sm font-medium text-gray-500 mb-2">
                        Today's entries
                    </h2>
                    <FoodEntryList key={refreshKey} loggedDate={today} />
                </div>
            </div>
        </div>
    )
}

export default FoodLogPage
