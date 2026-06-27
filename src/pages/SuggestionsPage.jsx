import { useState } from "react"
import SuggestionForm from "../components/SuggestionForm"
import SuggestionCard from "../components/SuggestionCard"
import Spinner from "../components/Spinner"

const SuggestionsPage = () => {
    const [suggestions, setSuggestions] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Food Suggestions
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SuggestionForm
                        onSuggestions={setSuggestions}
                        onLoadingChange={setIsGenerating}
                    />

                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-sm font-medium text-gray-500 mb-3">
                            Suggestions
                        </h2>
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center py-10 gap-3">
                                <Spinner size="lg" />
                                <p className="text-sm text-gray-400">
                                    Generating suggestions, this may take a few
                                    seconds...
                                </p>
                            </div>
                        ) : suggestions === null ? (
                            <p className="text-gray-400 text-sm">
                                Enter foods you have available, then generate
                                suggestions.
                            </p>
                        ) : suggestions.length === 0 ? (
                            <p className="text-gray-400 text-sm">
                                No suggestions could be generated. Try different
                                foods.
                            </p>
                        ) : (
                            <div className="space-y-3">
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
