import { useNavigate } from "react-router-dom"
import api from "../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function Navbar(){
    const navigate = useNavigate();
    const handleLogOut = ()=>{    
           localStorage.removeItem("token");
        navigate("/")
    }

    const[user,setUser]= useState(null);

    const fetchUser = async()=>{
        try {
            const response = await api.get("/auth/me");
            setUser(response.data)
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message)
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return(
       

        <nav className="w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* logo */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-xl shadow-sm">                        
                     💰
                     </div>

                     <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">ExpenseTracker</h1>
                    
                </div>
                    
                {/* user section */}
                <div className="flex items-center gap-3 ">
                    {/* user avatar */}
                    {user &&(
                        <>
                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                        
                    {/* Greetings */}
                    <div className="hidden sm:block">
                        <p className="text-xs text-slate-500">Welcome back</p>
                        <p className="font-semibold text-slate-800">{user.name}👋</p>
                    </div>
                    </>
                    )}
                    {/* LOgout */}
                    <button
                    onClick={handleLogOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                    >LogOut</button>
                </div>

            </div>
        </nav>
    )
}