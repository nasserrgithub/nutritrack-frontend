import { useState, useEffect } from "react"
import { getFoodLog } from "../api/logs"
import FoodEntryCard from "./FoodEntryCard"

const FoodEntryList = ({ loggedDate }) => {
    const [foodEntryList, setFoodEntryList] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const handleDeleted = (deletedId) => {
        setFoodEntryList((prev) =>
            prev.filter((entry) => entry.id !== deletedId),
        )
    }

    useEffect(() => {
        const getFoodEntryList = async () => {
            try {
                const res = await getFoodLog(loggedDate)
                setFoodEntryList(res)
            } catch (err) {
                console.log(err)
                setError("Failure on fetching food entries.")
            } finally {
                setLoading(false)
            }
        }
        getFoodEntryList()
    }, [loggedDate])

    if (loading) return <p className="p-8">Loading...</p>
    if (error) return <p className="p-8 text-red-500">{error}</p>
    if (foodEntryList.length === 0)
        return <p className="p-8">No food logged yet</p>

    return (
        <div>
            {foodEntryList.map((foodEntry) => (
                <FoodEntryCard
                    key={foodEntry.id}
                    entry={foodEntry}
                    onDeleted={handleDeleted}
                />
            ))}
        </div>
    )
}

export default FoodEntryList
