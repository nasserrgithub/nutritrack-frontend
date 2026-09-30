import { useState } from "react"
import SuggestionForm from "../components/SuggestionForm"
import SuggestionCard from "../components/SuggestionCard"
import Spinner from "../components/Spinner"

const SuggestionsPage = () => {
    const [suggestions, setSuggestions] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                Enter foods you have available, then generate
                                suggestions.
                            </p>
                        ) : suggestions.length === 0 ? (
                            <p
                                style={{
                                    fontSize: 13,
                                    color: "var(--nt-text-muted)",
                                }}
                            >
                                No suggestions could be generated. Try different
                                foods.
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
