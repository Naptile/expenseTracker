import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import LoadingSpiner from "../components/LoadingSpinner";
export default function Login(){
    const[form,setForm]=useState({
        email:"",
        password:""
    });
    const[loading,setLoading] = useState(false);

    const[showPassword,setShowPassword]=useState(false)
    const[error,setError]=useState("");
    const navigate = useNavigate();

    const handleSubmit =async(e)=>{
        e.preventDefault()
        setLoading(true)
        try {
            
            const response = await api.post("/auth/login",form)
            const token= response.data.token
            localStorage.setItem("token",token);

            toast.success("Login successful! Redirected to Dashboard...")
            setForm({
                 email:"",
                password:""
            })
            navigate("/dashboard");
            
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message ||"Login Failed")
            setError(error.response?.data?.message || error.response?.data?.error || error.message);
        }
        finally{
            setLoading(false)
        }
        
    }
    {loading&&(
        <>
        return <LoadingSpiner/>
        </>
        
    )}


    return(
        <div className="flex justify-center items-center h-screen">
            
            <form  onSubmit={handleSubmit} className="shadow-lg w-md p-6 flex flex-col gap-4  border border-slate-300 rounded-lg">
                <h1 className="text-center text-4xl ">Login</h1>
                {
                    error&&(
                        <p className="text-red-500">{error}</p>
                    )
                }

                <label className="text-lg">email:</label>
                <input type="email"
                value={form.email} 
                onChange={(e)=>setForm({...form,email:e.target.value})}
                className="w-full bg-gray-100 border border-slate-300 outline-none rounded-lg px-4 py-2 mb-4 hover:bg-gray-200 focus:ring-2 ring-green-500  cursor-pointer transition-colors"
                placeholder="enter email"
                required
                />

                <label className="text-lg">password:</label>
                <div className="relative">
                <input 
                value={form.password}
                onChange={(e)=>setForm({...form,password:e.target.value})}
                type={showPassword ? "text" : "password"}                
                className="w-full bg-gray-100 border border-slate-300 outline-none rounded-lg px-4 py-2 mb-4 hover:bg-gray-200 focus:ring-2 ring-green-500 cursor-pointer  transition-colors"
                placeholder="Password"
                required
                />
                <button 
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2  cursor-pointer ">
                     👁️
                </button>                
                </div>

                <button 
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 rounded-xl px-6 text-lg text-white py-2 hover:bg-green-600 transition-colors">{loading ?"signing in.." :"Login"}</button>
                <Link to={"/register"} className="px-2  hover:text-blue-500">Don't have an account ? <span className="text-blue-500 hover:text-slate-900">Register</span></Link>
            </form>
        </div>
    )
}