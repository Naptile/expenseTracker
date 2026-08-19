import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function SpendingRadaChart({expenses}){
    const categoryTotals = expenses.reduce((acc,expense)=>{
        if(expense.category in acc){
            acc[expense.category] +=expense.amount;
        }else{
            acc[expense.category] = expense.amount;
        }
        return acc;
    },{});

    const chartData = Object.entries(categoryTotals).map(
        ([category,amount])=>({
            category,
            amount
        })
    )

    return(
        <div className="w-full h-[500px] shadow-lg border border-slate-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4"> 🕸️Spending by Category</h2>

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData}>
                    <PolarGrid/>
                    <PolarAngleAxis dataKey="category" 
                    tick={{
                        fontSize:14,
                        fontWeight:600
                    }}
                    />
                    <PolarRadiusAxis 
                    tick={{
                        fontSize:11
                    }}
                    />

                    <Radar
                    name="Spending"
                    dataKey="amount"
                    fill="#f97316"
                    fillOpacity={0.6}
                    stroke="#f97316"
                    strokeWidth={2}
                    />

                    <Tooltip 
                    formatter={(value)=>[`Ksh ${value}`,"Spending"]}
                    />
                </RadarChart>
            
            </ResponsiveContainer>
        </div>
    )
}