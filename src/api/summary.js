import apiClient from "./client"

export const getDailySummary = async (date) => {
    const response = await apiClient.get(`/summary/${date}`)
    return response.data
}

export const getActiveGoal = async () => {
    const response = await apiClient.get("/goals/active")
    return response.data
}
