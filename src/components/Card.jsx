const Card = ({ children, className = "" }) => (
    <div
        style={{
            background: "var(--nt-card)",
            borderRadius: "var(--nt-radius)",
            border: "0.5px solid var(--nt-border)",
            padding: "14px 16px",
        }}
        className={className}
    >
        {children}
    </div>
)

export default Card
