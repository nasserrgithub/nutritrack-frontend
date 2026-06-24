import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:underline"
                >
                    Log out
                </button>
            </div>
            <p className="text-gray-500 mt-2">Welcome to NutriTrack.</p>
        </div>
    )
}

export default DashboardPage
