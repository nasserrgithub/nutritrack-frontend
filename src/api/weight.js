import apiClient from "./client"

export const logWeight = async (weightData) => {
    const response = await apiClient.post("/weight/", weightData)
    return response.data
}

export const getWeightHistory = async (days = 30) => {
    const response = await apiClient.get(`/weight/?days=${days}`)
    return response.data
}
