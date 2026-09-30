import apiClient from "./client"

export const getSuggestions = async (date, preference) => {
    const response = await apiClient.post(`/summary/${date}/suggestions`, {
        preference,
    })
    return response.data
}
