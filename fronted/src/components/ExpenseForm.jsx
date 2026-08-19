import { useState } from "react"
import api from "../services/api";
import { toast } from "react-toastify";
export default function ExpenseForm({fetchExpenses,loading,setLoading}){
    const [form,setForm]=useState({
        title:"",
        description:"",
        category:"",
        amount:"",
        date:"",
    })

    const handleSubmit =async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            await api.post("/expenses",form);
            toast.success("Expense Added Successfully...");
            setForm({
                title:"",
                description:"",
                category:"",
                amount:"",
                date:"",
            })

            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to add expense")
        }
        finally{
            setLoading(false)
        }
    }
    return(
    <div className="w-full md:w-md mt-2">
        <form onSubmit={handleSubmit} className="shadow-lg p-6 border border-slate-200 ">

            <h1 className="text-3xl p-2 font-serif  ">Add Expense</h1>

            <input type="text" placeholder="Title"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
            className="w-full border border-slate-200 bg-gray-100 px-4 py-2 rounded-lg mb-4 outline-green-500 hover:bg-gray-200 transition-colors"
            />

            <textarea type="text" placeholder="Description"
            value={form.description}
            maxLength={100}
            onChange={(e)=>setForm({...form,description:e.target.value})}
             className="w-full border border-slate-200 bg-gray-100 px-4 py-2 rounded-lg mb-4  outline-green-500 hover:bg-gray-200 transition-colors"
             required
            />

            <select name="" 
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="w-full border border-slate-200 bg-gray-100 px-4 py-2 rounded-lg mb-4  outline-green-500 hover:bg-gray-200 transition-colors"
            required
            
            >   <option value="">Select Category</option>
                <option value="food">🍔Food</option>
                <option value="transport">🚌 Transport</option>
                <option value="bills">💡Bills</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="entertainment">🎬Entertainment</option>
                <option value="education">📚Education</option>
            </select>

            <input type="number" placeholder="Amount"
            value={form.amount}
            min="0"
            onChange={(e)=>setForm({...form,amount:e.target.value})}
             className="w-full border border-slate-200 bg-gray-100 px-4 py-2 rounded-lg mb-4 outline-green-500 hover:bg-gray-200 transition-colors"
             required
           
            /> 

            <input type="date" placeholder="date"
            value={form.date}
            onChange={(e)=>setForm({...form,date:e.target.value})}
             className="w-full border border-slate-200 bg-gray-100 px-4 py-2 rounded-lg mb-4 outline-green-500 hover:bg-gray-200 transition-colors"
             required
           />

           <button 
           disabled={loading}
           className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-2 rounded-lg  shadow-lg shadow-orange-500/30 hover:scale-105 text-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300">Add Expense</button>

        </form>
    </div>
    )
}