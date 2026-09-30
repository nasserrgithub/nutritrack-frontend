import { useState } from "react"
import { useNavigate } from "react-router-dom"
import apiClient from "../api/client"

const ProfilePage = () => {
    const [weightKg, setWeightKg] = useState("")
    const [heightCm, setHeightCm] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("male")
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

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Complete your profile
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    We need a few details to personalize your nutrition tracking.
                </p>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        value={weightKg}
                        onChange={(e) => setWeightKg(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Height (cm)"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white rounded p-2 mt-2 hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Saving..." : "Complete profile"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage