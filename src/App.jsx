import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ProtectedRoute from "./components/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage"
import FoodLogPage from "./pages/FoodLogPage"
import WeightHistoryPage from "./pages/WeightHistoryPage"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/log"
                    element={
                        <ProtectedRoute>
                            <FoodLogPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weight"
                    element={
                        <ProtectedRoute>
                            <WeightHistoryPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
