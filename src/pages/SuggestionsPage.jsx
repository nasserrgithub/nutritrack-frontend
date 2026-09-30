import { useState, useEffect } from "react"
import SuggestionForm from "../components/SuggestionForm"
import SuggestionCard from "../components/SuggestionCard"
import Spinner from "../components/Spinner"
import { getDailySummary } from "../api/summary"
import { getTodayDate } from "../utils/date"

const CalorieStat = ({ label, value }) => (
    <div
        style={{
            background: "var(--nt-bg)",
            border: "0.5px solid var(--nt-border)",
            borderRadius: 10,
            padding: "8px 10px",
            textAlign: "center",
        }}
    >
        <p
            style={{
                fontSize: 16,
                fontWeight: 500,
                color: "var(--nt-green-900)",
            }}
        >
            {value === null ? "—" : `${Math.round(value)} kcal`}
        </p>
        <p style={{ fontSize: 11, color: "var(--nt-text-muted)" }}>{label}</p>
    </div>
)

const SuggestionsPage = () => {
    const [suggestions, setSuggestions] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [consumedCalories, setConsumedCalories] = useState(null)

    // Today's consumed calories don't change while on this page,
    // so one fetch on mount is enough
    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await getDailySummary(getTodayDate())
                setConsumedCalories(summary.total_calories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSummary()
    }, [])

    const suggestedCalories =
        suggestions && suggestions.length > 0
            ? suggestions.reduce((sum, s) => sum + s.calories, 0)
            : null

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
                    Food Suggestions
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <SuggestionForm
                        onSuggestions={setSuggestions}
                        onLoadingChange={setIsGenerating}
                    />

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
                                marginBottom: 10,
                            }}
                        >
                            Suggestions
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 8,
                                marginBottom: 14,
                            }}
                        >
                            <CalorieStat
                                label="consumed today"
                                value={consumedCalories}
                            />
                            <CalorieStat
                                label="in these suggestions"
                                value={isGenerating ? null : suggestedCalories}
                            />
                        </div>

                        {isGenerating ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "40px 0",
                                    gap: 12,
                                }}
                            >
                                <Spinner size="lg" />
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "var(--nt-text-muted)",
                                        textAlign: "center",
                                    }}
                                >
                                    Generating suggestions, this may take a few
                                    seconds...
                                </p>
                            </div>
                        ) : suggestions === null ? (
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--nt-text-muted)",
                                }}
                            >
                                Add a preference if you like, then generate
                                suggestions for your remaining macros.
                            </p>
                        ) : suggestions.length === 0 ? (
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--nt-text-muted)",
                                }}
                            >
                                No suggestions needed — you've already met (or
                                are very close to) today's macro goals.
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}
                            >
                                {suggestions.map((s, index) => (
                                    <SuggestionCard
                                        key={index}
                                        suggestion={s}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionsPage
