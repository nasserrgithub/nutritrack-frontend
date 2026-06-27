import apiClient from "./client"

export const getDailySummary = async (date) => {
    const response = await apiClient.get(`/summary/${date}`)
    return response.data
}
