import { useState } from "react"
import WeightLogForm from "../components/WeightLogForm"
import WeightChart from "../components/WeightChart"

const WeightHistoryPage = () => {
    const [refreshKey, setRefreshKey] = useState(0)

    const handleLogged = () => {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Weight History
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <WeightLogForm onLogged={handleLogged} />
                    </div>
                    <div className="md:col-span-2">
                        <WeightChart refreshKey={refreshKey} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeightHistoryPage
