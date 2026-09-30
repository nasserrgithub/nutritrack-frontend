import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../api/auth"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        try {
            const data = await login(email, password)
            localStorage.setItem("token", data.access_token)
            navigate("/dashboard")
        } catch (err) {
            console.log(err)
            setError("Invalid email or password")
        }
    }

    const inputStyle = {
        width: "100%",
        border: "0.5px solid var(--nt-border)",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 14,
        color: "var(--nt-text)",
        background: "#fff",
        marginBottom: 10,
        outline: "none",
    }

    return (
        <div style={{
            minHeight: "100vh",
            background: "var(--nt-bg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            position: "relative",
            overflow: "hidden",
        }}>
            {/* decorative background circles */}
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "var(--nt-green-50)", opacity: 0.8 }} />
            <div style={{ position: "absolute", bottom: -100, left: -60, width: 250, height: 250, borderRadius: "50%", background: "var(--nt-green-100)", opacity: 0.4 }} />
            <div style={{ position: "absolute", top: "40%", left: -40, width: 150, height: 150, borderRadius: "50%", background: "var(--nt-green-50)", opacity: 0.5 }} />

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 360 }}>
                {/* logo / header */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "var(--nt-green-500)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 12px",
                        fontSize: 28,
                    }}>
                        🥗
                    </div>
                    <h1 style={{ fontSize: 22, fontWeight: 500, color: "var(--nt-text)", marginBottom: 4 }}>
                        NutriTrack
                    </h1>
                    <p style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>
                        Track your nutrition, reach your goals
                    </p>
                </div>

                {/* card */}
                <div style={{
                    background: "#fff",
                    borderRadius: "var(--nt-radius)",
                    border: "0.5px solid var(--nt-border)",
                    padding: "24px 20px",
                }}>
                    {error && (
                        <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12, textAlign: "center" }}>
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ ...inputStyle, marginBottom: 14 }}
                        />

                        <button type="submit" className="btn-primary">
                            Log in
                        </button>
                    </form>

                    <p style={{ fontSize: 13, color: "var(--nt-text-muted)", textAlign: "center", marginTop: 14 }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "var(--nt-green-700)", fontWeight: 500, textDecoration: "none" }}>
                            Register
                        </Link>
                    </p>

                    <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1, height: "0.5px", background: "var(--nt-border)" }} />
                        <span style={{ fontSize: 12, color: "var(--nt-text-muted)" }}>or</span>
                        <div style={{ flex: 1, height: "0.5px", background: "var(--nt-border)" }} />
                    </div>

                    <a
                        href={`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/google`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: "0.5px solid var(--nt-border)",
                            background: "#fff",
                            fontSize: 14,
                            color: "var(--nt-text)",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LoginPage