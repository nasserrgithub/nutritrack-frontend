import { useState } from "react"
import { getSuggestions } from "../api/suggestions"
import { getTodayDate } from "../utils/date"

// Must match max_length on SuggestionRequest.preference in the backend
const MAX_PREFERENCE_LENGTH = 200

const SuggestionForm = ({ onSuggestions, onLoadingChange }) => {
    const [preference, setPreference] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setLoading(true)
        onLoadingChange(true)

        try {
            const foodSuggestions = await getSuggestions(
                getTodayDate(),
                preference.trim(),
            )
            // Preference is kept (not cleared) so the user can regenerate
            // or tweak it without retyping
            onSuggestions(foodSuggestions)
        } catch (err) {
            console.log(err)
            setError("Could not generate food suggestions.")
        } finally {
            setLoading(false)
            onLoadingChange(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: "var(--nt-card)",
                borderRadius: "var(--nt-radius)",
                border: "0.5px solid var(--nt-border)",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
            }}
        >
            {error && <p style={{ color: "#e53e3e", fontSize: 13 }}>{error}</p>}

            <label
                htmlFor="suggestion-preference"
                style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--nt-text-muted)",
                }}
            >
                Any preference? (optional)
            </label>

            <textarea
                id="suggestion-preference"
                placeholder="e.g. 'something spicy', 'I have eggs and oats', 'no dairy', 'a light dinner'"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                maxLength={MAX_PREFERENCE_LENGTH}
                rows={4}
                style={{
                    width: "100%",
                    border: "0.5px solid var(--nt-border)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 13,
                    color: "var(--nt-text)",
                    background: "var(--nt-bg)",
                    outline: "none",
                    resize: "none",
                    overflowY: "auto",
                    fontFamily: "inherit",
                    lineHeight: 1.6,
                }}
            />

            <p
                style={{
                    fontSize: 12,
                    color: "var(--nt-text-muted)",
                    textAlign: "right",
                    marginTop: -6,
                }}
            >
                {preference.length}/{MAX_PREFERENCE_LENGTH}
            </p>

            <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Generating..." : "Generate suggestions"}
            </button>
        </form>
    )
}

export default SuggestionForm
