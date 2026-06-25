import { PieChart, Pie, Cell } from "recharts"

const MacroRing = ({ label, total, goal }) => {
    const consumed = Math.min(total, goal)
    const remaining = Math.max(goal - total, 0)

    const data = [
        { name: "consumed", value: consumed },
        { name: "remaining", value: remaining },
    ]

    console.log(data)

    const percentage = goal > 0 ? (total / goal) * 100 : 0

    return (
        <div className="bg-white rounded-lg shadow p-4 w-full flex flex-col items-center">
            <h3 className="text-sm font-medium text-gray-500 mb-2 self-start">
                {label}
            </h3>

            <PieChart width={140} height={140}>
                <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#e5e7eb" />
                </Pie>
            </PieChart>

            <p className="text-lg font-bold text-gray-800 -mt-20">
                {percentage.toFixed(0)}%
            </p>

            <p className="text-sm text-gray-400 mt-16">
                {total} / {goal}
            </p>
        </div>
    )
}

export default MacroRing
