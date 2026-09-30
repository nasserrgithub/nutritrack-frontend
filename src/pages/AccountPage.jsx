import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile } from "../api/auth"

const AccountPage = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile()
                setProfile(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    const metrics = profile
        ? [
              { label: "Email", value: profile.email },
              {
                  label: "Weight",
                  value: profile.weight_kg ? `${profile.weight_kg} kg` : "—",
              },
              {
                  label: "Height",
                  value: profile.height_cm ? `${profile.height_cm} cm` : "—",
              },
              {
                  label: "Age",
                  value: profile.age ? `${profile.age} years` : "—",
              },
              {
                  label: "Gender",
                  value: profile.gender
                      ? profile.gender.charAt(0).toUpperCase() +
                        profile.gender.slice(1)
                      : "—",
              },
              {
                  label: "Activity level",
                  value: profile.activity_level
                      ? profile.activity_level.charAt(0).toUpperCase() +
                        profile.activity_level.slice(1)
                      : "—",
              },
          ]
        : []

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--nt-bg)",
                padding: "20px 16px",
            }}
        >
            <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <h1
                    style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: "var(--nt-text)",
                        marginBottom: 16,
                    }}
                >
                    Profile
                </h1>

                {/* avatar + name */}
                <div
                    style={{
                        background: "var(--nt-card)",
                        borderRadius: "var(--nt-radius)",
                        border: "0.5px solid var(--nt-border)",
                        padding: 20,
                        marginBottom: 12,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: loading || !profile ? 0 : 16,
                        }}
                    >
                        <div
                            style={{
                                width: 52,
                                height: 52,
                                borderRadius: "50%",
                                background: "var(--nt-green-50)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 24,
                            }}
                        >
                            🥗
                        </div>
                        <div>
                            <p
                                style={{
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: "var(--nt-text)",
                                }}
                            >
                                {loading
                                    ? "Loading..."
                                    : profile?.email || "NutriTrack user"}
                            </p>
                            {profile?.google_id && (
                                <span
                                    style={{
                                        fontSize: 11,
                                        background: "var(--nt-green-50)",
                                        color: "var(--nt-green-700)",
                                        borderRadius: 20,
                                        padding: "2px 8px",
                                        marginTop: 4,
                                        display: "inline-block",
                                    }}
                                >
                                    Google account
                                </span>
                            )}
                        </div>
                    </div>

                    {/* body metrics */}
                    {!loading && profile && (
                        <div
                            style={{
                                borderTop: "0.5px solid var(--nt-border)",
                                paddingTop: 14,
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                            }}
                        >
                            {metrics.slice(1).map((m) => (
                                <div
                                    key={m.label}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "6px 10px",
                                        background: "var(--nt-green-50)",
                                        borderRadius: 10,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: 13,
                                            color: "var(--nt-text-muted)",
                                        }}
                                    >
                                        {m.label}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 13,
                                            fontWeight: 500,
                                            color: "var(--nt-green-900)",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {m.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* logout */}
                <div
                    style={{
                        background: "var(--nt-card)",
                        borderRadius: "var(--nt-radius)",
                        border: "0.5px solid var(--nt-border)",
                        padding: 20,
                        marginBottom: 12,
                    }}
                >
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            background: "none",
                            border: "none",
                            padding: "6px 0",
                            cursor: "pointer",
                            width: "100%",
                        }}
                    >
                        <span style={{ fontSize: 14, color: "#e53e3e" }}>
                            → Log out
                        </span>
                    </button>
                </div>

                <p
                    style={{
                        fontSize: 11,
                        color: "var(--nt-text-muted)",
                        textAlign: "center",
                        marginTop: 20,
                    }}
                >
                    NutriTrack is still growing — more features on the way 🌱
                </p>
            </div>
        </div>
    )
}

export default AccountPage
