import apiClient from "./client"

export const createGoal = async (goalData) => {
    const response = await apiClient.post("/goals/", goalData)
    return response.data
}

export const getActiveGoal = async () => {
    const response = await apiClient.get("/goals/active")
    return response.data
}
