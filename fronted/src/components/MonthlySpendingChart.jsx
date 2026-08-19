import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function MonthlySpendingChart({ expenses }) {

    // 1. Calculate spending for each year/month
    const monthlyTotals = expenses.reduce((acc, expense) => {

        const date = new Date(expense.date);

        const year = date.getFullYear();
        const month = date.getMonth();

        const key = `${year}-${month}`;

        if (key in acc) {
            acc[key] += expense.amount;
        } else {
            acc[key] = expense.amount;
        }

        return acc;

    }, {});


    // 2. Generate the last 6 months
    const currentDate = new Date();

    const months = [];

    for (let i = 5; i >= 0; i--) {

        const date = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
        );

        months.push(date);
    }


    // 3. Convert months into chart data
    const chartData = months.map((date) => {

        const year = date.getFullYear();
        const month = date.getMonth();

        const key = `${year}-${month}`;

        return {
            month: date.toLocaleString("default", {
                month: "short"
            }),

            amount: monthlyTotals[key] || 0
        };
    });


    return (
        <div className="w-full bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
                Monthly Spending
            </h2>

            <ResponsiveContainer width="100%" height={450}>

                <LineChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis 
                    tickFormatter={(value)=>`Ksh ${value >= 1000 ?`${value/1000}k`:value}`}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#f97316"
                        strokeWidth={3}
                        animationDuration={800}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}