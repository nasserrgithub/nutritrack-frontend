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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-80"
            >
                <h1 className="text-xl font-bold mb-6">NutriTrack Login</h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full border rounded p-2 mb-4"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                >
                    Log in
                </button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
