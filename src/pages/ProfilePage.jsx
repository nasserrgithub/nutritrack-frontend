import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/client"

const GENDER_OPTIONS = ["male", "female", "other"]

const ProfilePage = () => {
    const [weightKg, setWeightKg] = useState("")
    const [heightCm, setHeightCm] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("male")
    const [genderOpen, setGenderOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await apiClient.post("/auth/profile", {
                weight_kg: parseFloat(weightKg),
                height_cm: parseFloat(heightCm),
                age: parseInt(age),
                gender,
            })
            navigate("/dashboard")
        } catch (err) {
            setError("Could not save profile. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
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
                        Complete your profile
                    </h1>
                    <p style={{ fontSize: 13, color: "var(--nt-text-muted)" }}>
                        A few details to personalize your nutrition tracking.
                    </p>
                </div>

                <div style={{ background: "#fff", borderRadius: "var(--nt-radius)", border: "0.5px solid var(--nt-border)", padding: "24px 20px" }}>
                    {error && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{error}</p>}

                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value)}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Height (cm)"
                            value={heightCm}
                            onChange={(e) => setHeightCm(e.target.value)}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={inputStyle}
                            required
                        />

                        <div style={{ position: "relative" }}>
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
                                <span style={{ textTransform: "capitalize" }}>{gender}</span>
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
                                            onClick={() => { setGender(opt); setGenderOpen(false) }}
                                            style={{
                                                padding: "10px 12px",
                                                fontSize: 13,
                                                cursor: "pointer",
                                                textTransform: "capitalize",
                                                background: gender === opt ? "var(--nt-green-50)" : "#fff",
                                                color: gender === opt ? "var(--nt-green-700)" : "var(--nt-text)",
                                            }}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ marginTop: 4 }}
                        >
                            {loading ? "Saving..." : "Complete profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage