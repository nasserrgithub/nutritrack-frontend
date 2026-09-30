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
                    Food Log
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="flex flex-col">
                        <div
                            style={{
                                display: "flex",
                                gap: 4,
                                marginBottom: 12,
                            }}
                        >
                            {TABS.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    style={{
                                        flex: 1,
                                        fontSize: 12,
                                        padding: "7px 4px",
                                        borderRadius: 20,
                                        border:
                                            activeTab === i
                                                ? "none"
                                                : "0.5px solid var(--nt-border)",
                                        background:
                                            activeTab === i
                                                ? "var(--nt-green-500)"
                                                : "var(--nt-card)",
                                        color:
                                            activeTab === i
                                                ? "#fff"
                                                : "var(--nt-text-muted)",
                                        cursor: "pointer",
                                        fontWeight: activeTab === i ? 500 : 400,
                                        transition: "all 0.15s",
                                    }}
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

                    <div
                        style={{
                            background: "var(--nt-card)",
                            borderRadius: "var(--nt-radius)",
                            border: "0.5px solid var(--nt-border)",
                            padding: 16,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: "var(--nt-text-muted)",
                                marginBottom: 8,
                            }}
                        >
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
