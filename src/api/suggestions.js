import apiClient from "./client"

export const getSuggestions = async (date, availableFoods) => {
    const response = await apiClient.post(`/summary/${date}/suggestions`, {
        available_foods: availableFoods,
    })
    return response.data
}
