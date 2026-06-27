import apiClient from "./client"

export const logFood = async (foodData) => {
    const response = await apiClient.post("/log/", foodData)
    return response.data
}

export const logNaturalMeal = async (mealData) => {
    const response = await apiClient.post("/log/natural", mealData)
    return response.data
}

export const getFoodLog = async (date) => {
    const response = await apiClient.get(`/log/${date}`)
    return response.data
}
