const MacroRing = ({ label, total, goal }) => {
    const percentage = (total / goal) * 100
    const clampedPercentage = Math.min(percentage, 100)

    return (
        <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                <span className="text-xs text-gray-400">
                    {percentage.toFixed(0)}%
                </span>
            </div>

            <p className="text-2xl font-bold text-gray-800 mb-3">
                {total}{" "}
                <span className="text-sm text-gray-400 font-normal">
                    / {goal}
                </span>
            </p>

            <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${clampedPercentage}%` }}
                />
            </div>
        </div>
    )
}

export default MacroRing
