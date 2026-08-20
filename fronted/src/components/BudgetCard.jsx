import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "../services/api";

export default  function BudgetCard({budget,thisMonthExpenses,fetchUser}){
    const[newBudget,setNewBudget] = useState(budget);

    const handleBudgetUpdate = async (e) =>{
        e.preventDefault();
        try{
            await api.put("/auth/budget",{
                monthlyBudget:Number(newBudget)
            });
            toast.success("Budget updated successfully");
            fetchUser();
        }catch(error){
            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to update budget"
            )
        }
    }; 
    
    const remaining = budget - thisMonthExpenses;
    const percentage = budget > 0 ?(thisMonthExpenses / budget ) * 100 : 0;
    const amountRemaining = Math.abs(remaining);
    let status;
    if(percentage >=100){
        status =  "🚨 Over Budget";
    }else if(percentage >= 90){
        status = "🔴 Almost at Limit";
    }else if(percentage >= 70){
        status = "🟠 Getting Close";
    }else{
        status = "🟢 Within Budget"
    }
    

    let progressColor;

    if (percentage >= 100) {
        progressColor = "bg-red-500";
    } else if (percentage >= 90) {
        progressColor = "bg-red-400";
    } else if (percentage >= 70) {
        progressColor = "bg-yellow-500";
    } else {
        progressColor = "bg-green-500";
    }

    return(
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold">💰 Monthly Budget</h2>
            <p>Ksh {budget.toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <p className="text-sm text-slate-500">Spend</p>
                    <p className="text-xl font-bold">Ksh {thisMonthExpenses.toLocaleString()}</p>
                </div>

                <div className=""> 
                   
                    {remaining >= 0 ?(
                         <>
                    <p className="text-sm text-slate-500">Remaining</p>
                    <p className="text-xl font-bold">
                        Ksh {remaining.toLocaleString()}
                    </p>
                    </>
                    ):(
                        <>
                        <p className="text-sm text-slate-500">Over Budget</p>
                        <p className="text-2xl font-bold text-red-600">Ksh {amountRemaining.toLocaleString()}</p>
                        </>
                    )
                    }
                </div>                
            </div>
            {budget ===0 &&(
                    <div  className="mt-4 bg-orange-100 text-orange-700 p-3 rounded-lg"> 
                        Set your monthly budget to start tracking your spending
                    </div>
                )}

            <div className="mt-6">
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-slate-500">
                        Budget usage
                    </span>

                    <span className="font-semibold ">
                        {percentage.toFixed(1)}%
                    </span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className={`${progressColor} h-4 rounded-full transition-all duration-500`}
                    style={{
                        width:`${Math.min(percentage,100)}%`
                    }}
                    >
                    </div>
                </div>
                <p className="mt-3 text-center font-semi-bold">{status}</p>
               
            </div>
            <form onSubmit={handleBudgetUpdate} className="mt-5">
                <input type="number"
                value={newBudget}
                onChange={(e)=>setNewBudget(e.target.value)}
                placeholder="Enter monthly budget"
                 className="w-full border border-slate-300 rounded-lg px-4 py-2"
                />  
                <button 
                type="submit"
                 className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Update Budget
                    </button>            
            </form>
        </div>
    )
}