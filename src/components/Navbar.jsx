import { Link, useNavigate, useLocation } from "react-router-dom"
import useIsMobile from "../hooks/useIsMobile"
import {
    IconHome,
    IconPencil,
    IconSparkles,
    IconTarget,
    IconScale,
    IconUser,
} from "@tabler/icons-react"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useIsMobile()

    const links = [
        { to: "/dashboard", label: "Home", icon: IconHome },
        { to: "/log", label: "Log", icon: IconPencil },
        { to: "/suggestions", label: "AI", icon: IconSparkles },
        { to: "/goals", label: "Goals", icon: IconTarget },
        { to: "/weight", label: "Weight", icon: IconScale },
        { to: "/account", label: "Profile", icon: IconUser },
    ]

    if (isMobile) {
        return (
            <nav
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "#fff",
                    borderTop: "0.5px solid var(--nt-border)",
                    display: "flex",
                    zIndex: 100,
                    paddingBottom: "env(safe-area-inset-bottom, 0px)",
                }}
            >
                {links.map((link) => {
                    const active = location.pathname === link.to
                    const Icon = link.icon
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "10px 4px",
                                textDecoration: "none",
                                borderTop: active
                                    ? "2px solid var(--nt-green-500)"
                                    : "2px solid transparent",
                            }}
                        >
                            <Icon
                                size={20}
                                stroke={1.5}
                                color={
                                    active
                                        ? "var(--nt-green-700)"
                                        : "var(--nt-text-muted)"
                                }
                                style={{ marginBottom: 2 }}
                            />
                            <span
                                style={{
                                    fontSize: 11,
                                    fontWeight: active ? 500 : 400,
                                    color: active
                                        ? "var(--nt-green-700)"
                                        : "var(--nt-text-muted)",
                                }}
                            >
                                {link.label}
                            </span>
                        </Link>
                    )
                })}
            </nav>
        )
    }

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
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <IconSparkles
                        size={18}
                        stroke={1.5}
                        color="var(--nt-green-500)"
                    />
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
                    {links
                        .filter((l) => l.to !== "/account")
                        .map((link) => {
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

                <Link
                    to="/account"
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background:
                            location.pathname === "/account"
                                ? "var(--nt-green-100)"
                                : "var(--nt-green-50)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                        border:
                            location.pathname === "/account"
                                ? "1.5px solid var(--nt-green-500)"
                                : "0.5px solid var(--nt-border)",
                        transition: "all 0.15s",
                    }}
                >
                    <IconUser
                        size={16}
                        stroke={1.5}
                        color="var(--nt-green-700)"
                    />
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
