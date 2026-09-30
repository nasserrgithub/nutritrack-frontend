import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const AuthCallbackPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = searchParams.get("token")
        const profileComplete = searchParams.get("profile_complete") === "true"
        const userId = searchParams.get("user_id")

        if (!token) {
            navigate("/login")
            return
        }

        // store the JWT token
        localStorage.setItem("token", token)

        if (!profileComplete) {
            // new Google user — needs to complete profile
            navigate("/profile")
        } else {
            // existing user — go straight to dashboard
            navigate("/dashboard")
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">Signing you in...</p>
        </div>
    )
}

export default AuthCallbackPage