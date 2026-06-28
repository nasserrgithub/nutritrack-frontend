import { useState } from "react"
import { deleteFoodEntry } from "../api/logs"

const FoodEntryCard = ({ entry, onDeleted }) => {
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        setDeleting(true)
        try {
            await deleteFoodEntry(entry.id)
            onDeleted(entry.id)
        } catch (err) {
            console.log(err)
            setDeleting(false)
        }
    }

    return (
        <div className="border-b last:border-b-0 py-3">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="font-medium text-gray-800">
                        {entry.food_name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                        {entry.meal_slot}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-500">{entry.weight_g}g</p>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-xs text-red-500 hover:text-red-700 disabled:text-gray-300"
                    >
                        {deleting ? "..." : "Delete"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-gray-50 rounded p-1.5">
                    <p className="text-xs font-semibold text-gray-700">
                        {entry.calories}
                    </p>
                    <p className="text-[10px] text-gray-400">kcal</p>
                </div>
                <div className="bg-gray-50 rounded p-1.5">
                    <p className="text-xs font-semibold text-gray-700">
                        {entry.protein_g}g
                    </p>
                    <p className="text-[10px] text-gray-400">protein</p>
                </div>
                <div className="bg-gray-50 rounded p-1.5">
                    <p className="text-xs font-semibold text-gray-700">
                        {entry.carbs_g}g
                    </p>
                    <p className="text-[10px] text-gray-400">carbs</p>
                </div>
                <div className="bg-gray-50 rounded p-1.5">
                    <p className="text-xs font-semibold text-gray-700">
                        {entry.fat_g}g
                    </p>
                    <p className="text-[10px] text-gray-400">fat</p>
                </div>
            </div>
        </div>
    )
}

export default FoodEntryCard
