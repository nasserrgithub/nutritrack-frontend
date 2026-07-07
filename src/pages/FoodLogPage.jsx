import { useState } from "react"
import { getTodayDate } from "../utils/date"
import LogFoodForm from "../components/LogFoodForm"
import NaturalLanguageForm from "../components/NaturalLanguageForm"
import CustomMacrosForm from "../components/CustomMacrosForm"
import FoodEntryList from "../components/FoodEntryList"

const TABS = ["By name", "Natural language", "Custom macros"]

const FoodLogPage = () => {
    const [refreshKey, setRefreshKey] = useState(0)
    const [activeTab, setActiveTab] = useState(0)
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div className="flex flex-col">
                        <div className="flex gap-1 mb-3">
                            {TABS.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`flex-1 text-xs py-2 px-1 rounded transition-colors ${
                                        activeTab === i
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1">
                            {activeTab === 0 && (
                                <LogFoodForm onLogged={handleLogged} />
                            )}
                            {activeTab === 1 && (
                                <NaturalLanguageForm onLogged={handleLogged} />
                            )}
                            {activeTab === 2 && (
                                <CustomMacrosForm onLogged={handleLogged} />
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-2">
                            Today's entries
                        </h2>
                        <FoodEntryList key={refreshKey} loggedDate={today} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodLogPage
