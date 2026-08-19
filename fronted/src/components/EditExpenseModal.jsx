import { useState} from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export default function EditExpenseModal({expense,onClose,fetchExpenses}){
    const[form,setForm] = useState({
                 title:expense.title,
                description:expense.description,
                category:expense.category,
                amount:expense.amount,
                date:expense.date,
    })

    const handleEdit = async(e)=>{
            e.preventDefault();
            try {
                await api .put(`/expenses/${expense._id}`,form);
                toast.success("Expense Updated successfully...")
                onClose()
                fetchExpenses();
            } catch (error) {
                toast.error(error.response?.data?.message || error.response?.data?.error)
            }
        }
   
    return(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white w-full  max-w-lg rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Edit Expense </h2>

                <form onSubmit={handleEdit}>
                <input type="text"
                value={form.title}
                placeholder="title"
                onChange={(e)=>setForm({...form,title:e.target.value})}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 outline-orange-600"
                />

                <textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 outline-orange-600"
                    placeholder="Description"
                />

                <select
                    value={form.category}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            category: e.target.value
                        })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 outline-orange-600"
                >
                    <option value="food">🍔 Food</option>
                    <option value="transport">🚌 Transport</option>
                    <option value="shopping">🛍️ Shopping</option>
                    <option value="bills">💡 Bills</option>
                    <option value="entertainment">🎬 Entertainment</option>
                    <option value="education">📚 Education</option>
                </select>
                
                <input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            amount: e.target.value
                        })
                    }
                    className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-4 outline-orange-600"
                    placeholder="Amount"
                    />

                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                date: e.target.value
                            })
                        }
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 mb-6 outline-orange-600"
                    />

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                        >
                            Update Expense
                        </button>

                    </div>

                    </form>
            </div>
        </div>
    )
}