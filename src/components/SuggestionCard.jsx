const SuggestionCard = ({ suggestion }) => {
    return (
        <div style={{ background: "var(--nt-green-50)", border: "0.5px solid var(--nt-border)", borderRadius: "var(--nt-radius)", padding: 14 }}>
            <p style={{ fontWeight: 500, color: "var(--nt-text)", marginBottom: 4 }}>
                {suggestion.food_name}
                <span style={{ fontSize: 12, fontWeight: 400, color: "var(--nt-text-muted)", marginLeft: 8 }}>
                    {suggestion.weight_g}g
                </span>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginTop: 10 }}>
                {[
                    { label: "kcal", value: suggestion.calories },
                    { label: "protein", value: `${suggestion.protein_g}g` },
                    { label: "carbs", value: `${suggestion.carbs_g}g` },
                    { label: "fat", value: `${suggestion.fat_g}g` },
                ].map((m) => (
                    <div key={m.label} style={{ background: "var(--nt-card)", borderRadius: 10, padding: "6px 4px", textAlign: "center", border: "0.5px solid var(--nt-border)" }}>
                        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--nt-green-900)" }}>{m.value}</p>
                        <p style={{ fontSize: 10, color: "var(--nt-text-muted)" }}>{m.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SuggestionCard