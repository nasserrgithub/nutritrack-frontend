const MacroBar = ({ label, total, goal }) => {
    const pct = Math.min(Math.round((total / goal) * 100), 100)

    return (
        <div
            style={{
                background: "var(--nt-card)",
                borderRadius: "var(--nt-radius)",
                border: "0.5px solid var(--nt-border)",
                padding: "14px",
            }}
        >
            <p
                style={{
                    fontSize: 11,
                    color: "var(--nt-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: 6,
                }}
            >
                {label}
            </p>
            <p
                style={{
                    fontSize: 22,
                    fontWeight: 500,
                    color: "var(--nt-text)",
                }}
            >
                {Number(total).toFixed(1)}
            </p>
            <p style={{ fontSize: 11, color: "var(--nt-text-muted)" }}>
                of {Number(goal).toFixed(0)}{" "}
                {label.includes("kcal") || label === "Calories" ? "kcal" : "g"}
            </p>
            <div
                style={{
                    marginTop: 8,
                    background: "var(--nt-green-50)",
                    borderRadius: 8,
                    height: 6,
                }}
            >
                <div
                    style={{
                        background: "var(--nt-green-500)",
                        borderRadius: 8,
                        height: 6,
                        width: `${pct}%`,
                        transition: "width 0.3s ease",
                    }}
                />
            </div>
        </div>
    )
}

export default MacroBar
