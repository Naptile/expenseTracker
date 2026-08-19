import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,ResponsiveContainer
}from "recharts";
export default function CategoryChart({expenses}){
    const categoryStarts = expenses.reduce((acc,expense)=>{
        if(expense.category in acc){
            acc[expense.category] += expense.amount;
        }
        else{
            acc[expense.category] = expense.amount;
        }
        return acc;
    },{});

    const chartData = Object.entries(categoryStarts).map(
        ([category,total])=>({
            category,total
        })
    )
    
    console.log(chartData);

    const categoryTotal = chartData.reduce(
        (total,item)=>total + item.total,0
    )

    const categoryColors ={
        food: "#f97316",
        transport: "#3b82f6",
        shopping: "#ec4899",
        bills: "#eab308",
        entertainment: "#8b5cf6",
        education: "#14b8a6"
    }

    return(
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-slate-800">Expenses by Category</h2>
            <p className="text-sm  text-slate-500 mt-1">Breakdown of you spending</p>
            <div className="w-full h-[380px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie 
                        data ={chartData}
                        dataKey="total"
                        nameKey="category"
                        cx="50%"
                        cy="45%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={5}
                        cornerRadius={6}
                        >
                        {chartData.map((entry,index)=>(
                            <Cell key={`cell-${index}`}
                            fill={categoryColors[entry.category]}
                            
                            />
                        ))}                        
                        </Pie>

                        <Tooltip 
                        formatter={(value)=>`Ksh ${value.toLocaleString()}`}
                        />
                        <Legend
                        verticalAlign="bottom"
                        height={45}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                        <p className="text-sm text-slate-500 ">Total Spending</p>
                        <p text-2xl font-bold text-slate-800>Ksh {categoryTotal.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}