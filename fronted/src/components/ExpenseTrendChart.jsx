import{
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
}from "recharts";
export default function ExpenseTrendChart({expenses}){
    const groupedExpenses = expenses.reduce((acc,expense)=>{
        if(expense.date in acc){
            acc[expense.date] +=expense.amount;
        }else{
            acc[expense.date] = expense.amount;
        }
        return acc;
    },{});

    const chartData = Object.entries(groupedExpenses).map(
        ([date,amount])=>({
            date,amount
        }));

    chartData.sort(
        (a,b)=>new Date(a.date) - new Date(b.date)
    )

    return(
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Spending Trend 📈</h2>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}
                            margin={{
                                top:10,
                                right:20,
                                left:10,
                                bottom:10
                            }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>   
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip formatter={(value)=>[`Ksh ${value}`,"spent"]} />
                    <Line 
                    type="monotone"
                    dataKey="amount"
                    stroke="#f97316"
                    dot={{r:5}}
                    activeDot={{r:8}}
                    strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}