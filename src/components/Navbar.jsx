import { Link, useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login", { replace: true })
    }

    const links = [
        { to: "/dashboard", label: "Dashboard" },
        { to: "/log", label: "Food Log" },
        { to: "/suggestions", label: "Suggestions" },
        { to: "/goals", label: "Goals" },
        { to: "/weight", label: "Weight" },
    ]

    return (
        <nav className="bg-white shadow">
            <div className="max-w-5xl mx-auto px-8 py-4 flex justify-between items-center">
                <div className="flex gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm ${
                                location.pathname === link.to
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 hover:underline"
                >
                    Log out
                </button>
            </div>
        </nav>
    )
}

export default Navbar
