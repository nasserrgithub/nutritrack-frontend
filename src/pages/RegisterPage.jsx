import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../api/auth"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        weight_kg: "",
        height_cm: "",
        age: "",
        gender: "",
        activity_level: "sedentary",
    })
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >
                <h1 className="text-xl font-bold mb-6">
                    Create your NutriTrack account
                </h1>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    name="weight_kg"
                    type="number"
                    placeholder="Weight (kg)"
                    value={formData.weight_kg}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    name="height_cm"
                    type="number"
                    placeholder="Height (cm)"
                    value={formData.height_cm}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />

                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-3"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border rounded p-2 mb-4"
                >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
