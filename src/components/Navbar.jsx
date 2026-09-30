import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    const links = [
        { to: "/dashboard", label: "Home" },
        { to: "/log", label: "Log" },
        { to: "/suggestions", label: "AI" },
        { to: "/goals", label: "Goals" },
        { to: "/weight", label: "Weight" },
    ]

    return (
        <nav
            style={{
                background: "var(--nt-card)",
                borderBottom: "0.5px solid var(--nt-border)",
            }}
        >
            <div
                style={{
                    maxWidth: 960,
                    margin: "0 auto",
                    padding: "10px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 18 }}>🥗</span>
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "var(--nt-text)",
                        }}
                    >
                        NutriTrack
                    </span>
                </div>

                <div style={{ display: "flex", gap: 4 }}>
                    {links.map((link) => {
                        const active = location.pathname === link.to
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    fontSize: 13,
                                    padding: "6px 10px",
                                    borderRadius: 20,
                                    fontWeight: active ? 500 : 400,
                                    background: active
                                        ? "var(--nt-green-50)"
                                        : "transparent",
                                    color: active
                                        ? "var(--nt-green-700)"
                                        : "var(--nt-text-muted)",
                                    textDecoration: "none",
                                    transition: "all 0.15s",
                                }}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        background: "var(--nt-green-50)",
                        border: "none",
                        borderRadius: 20,
                        padding: "6px 12px",
                        fontSize: 12,
                        color: "var(--nt-green-700)",
                        cursor: "pointer",
                        fontWeight: 500,
                    }}
                >
                    Log out
                </button>
            </div>
        </nav>
    )
}

export default Navbar
