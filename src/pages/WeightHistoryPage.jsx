import { useState } from "react"
import WeightLogForm from "../components/WeightLogForm"
import WeightChart from "../components/WeightChart"

const WeightHistoryPage = () => {
    const [refreshKey, setRefreshKey] = useState(0)

    const handleLogged = () => {
        setRefreshKey((prev) => prev + 1)
    }

    return (
        <div style={{ minHeight: "100vh", background: "var(--nt-bg)", padding: "20px 16px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--nt-text)", marginBottom: 16 }}>
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