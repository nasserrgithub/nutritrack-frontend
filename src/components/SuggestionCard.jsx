const SuggestionCard = ({ suggestion }) => {
    return (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="font-semibold text-gray-800 mb-1">
                {suggestion.food_name}
                <span className="text-sm font-normal text-gray-500 ml-2">
                    {suggestion.weight_g}g
                </span>
            </p>

            <div className="grid grid-cols-4 gap-2 text-center mt-3">
                <div>
                    <p className="text-sm font-bold text-blue-700">
                        {suggestion.calories}
                    </p>
                    <p className="text-[10px] text-gray-500">kcal</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-blue-700">
                        {suggestion.protein_g}g
                    </p>
                    <p className="text-[10px] text-gray-500">protein</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-blue-700">
                        {suggestion.carbs_g}g
                    </p>
                    <p className="text-[10px] text-gray-500">carbs</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-blue-700">
                        {suggestion.fat_g}g
                    </p>
                    <p className="text-[10px] text-gray-500">fat</p>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCard
