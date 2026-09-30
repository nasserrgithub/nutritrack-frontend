import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../api/auth"

const GENDER_OPTIONS = ["male", "female", "other"]

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        weight_kg: "",
        height_cm: "",
        age: "",
        gender: "male",
        activity_level: "sedentary",
    })
    const [genderOpen, setGenderOpen] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        try {
            await register({
                ...formData,
                weight_kg: parseFloat(formData.weight_kg),
                height_cm: parseFloat(formData.height_cm),
                age: parseInt(formData.age),
            })
            navigate("/login")
        } catch (err) {
            console.log(err)
            setError("Registration failed. Check your details and try again.")
        }
    }

    const inputStyle = {
        width: "100%",
        border: "0.5px solid var(--nt-border)",
        borderRadius: 10,
        padding: "10px 12px",
        fontSize: 13,
        color: "var(--nt-text)",
        background: "var(--nt-bg)",
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
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "var(--nt-green-50)", opacity: 0.8 }} />
            <div style={{ position: "absolute", bottom: -100, left: -60, width: 250, height: 250, borderRadius: "50%", background: "var(--nt-green-100)", opacity: 0.4 }} />

            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
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
                    <h1 style={{ fontSize: 20, fontWeight: 500, color: "var(--nt-text)", marginBottom: 4 }}>
                        Create your account
                    </h1>
                    <p style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>
                        Start tracking your nutrition today
                    </p>
                </div>

                <div style={{ background: "#fff", borderRadius: "var(--nt-radius)", border: "0.5px solid var(--nt-border)", padding: "24px 20px" }}>
                    {error && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        <input
                            name="weight_kg"
                            type="number"
                            placeholder="Weight (kg)"
                            value={formData.weight_kg}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        <input
                            name="height_cm"
                            type="number"
                            placeholder="Height (cm)"
                            value={formData.height_cm}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                        <input
                            name="age"
                            type="number"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                        <div style={{ position: "relative", marginBottom: 14 }}>
                            <button
                                type="button"
                                onClick={() => setGenderOpen(!genderOpen)}
                                style={{
                                    width: "100%",
                                    border: "0.5px solid var(--nt-border)",
                                    borderRadius: 10,
                                    padding: "10px 12px",
                                    fontSize: 13,
                                    color: "var(--nt-text)",
                                    background: "var(--nt-bg)",
                                    textAlign: "left",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <span style={{ textTransform: "capitalize" }}>{formData.gender}</span>
                                <span style={{ fontSize: 10, color: "var(--nt-text-muted)" }}>▼</span>
                            </button>

                            {genderOpen && (
                                <div style={{
                                    position: "absolute",
                                    top: "calc(100% + 4px)",
                                    left: 0,
                                    right: 0,
                                    background: "#fff",
                                    border: "0.5px solid var(--nt-border)",
                                    borderRadius: 10,
                                    zIndex: 10,
                                    overflow: "hidden",
                                }}>
                                    {GENDER_OPTIONS.map((opt) => (
                                        <div
                                            key={opt}
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, gender: opt }))
                                                setGenderOpen(false)
                                            }}
                                            style={{
                                                padding: "10px 12px",
                                                fontSize: 13,
                                                cursor: "pointer",
                                                textTransform: "capitalize",
                                                background: formData.gender === opt ? "var(--nt-green-50)" : "#fff",
                                                color: formData.gender === opt ? "var(--nt-green-700)" : "var(--nt-text)",
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-primary">
                            Create account
                        </button>
                    </form>

                    <p style={{ fontSize: 13, color: "var(--nt-text-muted)", textAlign: "center", marginTop: 14 }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "var(--nt-green-700)", fontWeight: 500, textDecoration: "none" }}>
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage