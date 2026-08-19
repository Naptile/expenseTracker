import NotFound from "./NotFound";

export default function ExpenseList({expenses,setEditingExpense,handleDelete,search}){
    

    const categoryIcons = {
    food: "🍔",
    transport: "🚌",
    shopping: "🛍️",
    bills: "💡",
    entertainment: "🎬",
    education: "📚"
};

// if(expenses.length===0){
//     return <NotFound search={search}/>
// }
    


    return(
        
        <div className="border border-slate-100 shadow-xl  overflow-x-auto mt-4">
            <h2 className="text-4xl text-center bg-gradient-to-r from-orange-500 to-indigo-900 bg-clip-text text-transparent font-serif ">Recent Expenses</h2>
             {expenses.length===0 && (
                    <NotFound search={search}/>
                )}
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 ">

                {expenses.map((expense)=>(
                    <div key={expense._id}
                    className=" flex flex-col gap-2 w-full rounded-xl shadow-lg border border-slate-200 bg-gradient-to-r from-orange-500 to-pink-600  text-center hover:from-orange-700 hover:to-pink-700  hover:scale-105  transition-all"
                    >   

                        <h3 className="text-3xl text-white font-bold font-serif">{categoryIcons[expense.category]}{expense.category}</h3>
                        <p className="text-lg font-mono font-sans">{expense.title}</p> 
                        <p className="">{expense.description}</p>                                               
                        <p className="text-lg ">{expense.date}</p>
                        <div className="flex gap-2 ">
                             <button 
                             onClick={()=>setEditingExpense(expense)}
                             className=" bg-gradient-to-r from-cyan-900 to-blue-500  px-8 text-white border border-slate-500 shadow-lg py-2 rounded-xl">Edit</button>
                             <button className="bg-gradient-to-r from-red-100 to-orange-500 px-8 py-2 rounded-xl border border-orange-500 shadow-lg"
                             onClick={()=>handleDelete(expense._id)}
                             >Delete</button>                   
                             </div>
                        <p className="text-2xl text-right font-bold font-mono"> Ksh {expense.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}