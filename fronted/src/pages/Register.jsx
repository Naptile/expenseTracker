import { useState } from "react"
import api from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function Register(){
    const[form,setForm]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const navigate = useNavigate();
    const[showPassword,setShowPassword]=useState(false);
    const[showConfirmPassword,setShowConfirmPassword]=useState(false)
    const[error,setError]=useState("");

    const handleSubmit =async(e)=>{
        try {
            e.preventDefault();

            if(form.password !==form.confirmPassword){
                toast.error("Passwords do not match")
                setError("Password do not match")
                return;
            }
            const {confirmPassword, ...userData}= form;
            const response = await api.post("/auth/register",userData);            
            toast.success("User Registered Successfully...");
            setForm({
                name:"",
                email:"",
                password:"",
                confirmPassword: ""
            })
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message ||"Registration Failed")
            setError(error.response?.data?.message);
        }
    };


   

    
    return(
        <div className="flex justify-center  items-center h-screen w-md text-center mx-auto ">
            
            <form onSubmit={handleSubmit} className="p-6 shadow-sm flex flex-col gap-4 w-lg border border-slate-200">

                <h1 className="text-3xl">Registration Form</h1>
                {error&&(
                    <p className="text-red-600">{error}</p>
                )}
                
                <label htmlFor="Name" className="text-left">Name</label>
                <input type="text" 
                value={form.name}
                placeholder="Enter your name"
                onChange={(e)=>setForm({...form,name:e.target.value})}
                className="w-full px-6 py-2  bg-gray-100 rounded-xl border border-slate-200 ring-green-600 hover:bg-gray-200 focus:ring-2 focus:outline-none transition-colors"
                required
                />
                

                <label htmlFor="email" className="text-left">Email</label>
                <input type="email"
                value={form.email}
                placeholder="Email"
                onChange={(e)=>setForm({...form,email:e.target.value})}
                className="w-full px-6 py-2  rounded-xl ring-green-600 bg-gray-100 hover:bg-gray-200 border-slate-200 focus:ring-2 focus:outline-none transition-colors"
                required
                />

                <label htmlFor="password" className="text-left ">password</label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"}
                value={form.password}
                placeholder="Password"
                onChange={(e)=>setForm({...form,password:e.target.value})}
                className="w-full px-6 py-2  rounded-xl  bg-gray-100 ring-green-600 hover:bg-gray-200 border-slate-200 focus:ring-2 focus:outline-none transition-colors"
                required
                />
                <button 
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute  right-4 top-1/2 -translate-y-1/2">👁️</button>
                </div>

                <label htmlFor="confirmPassword" className="text-left">Confirm Password</label>
                <div className="relative " >
                <input type={showConfirmPassword ? "text" : "password"}
                        value={form.confirmPassword}
                        required
                        placeholder="Confirm Password"
                        onChange={(e)=>setForm({...form,confirmPassword:e.target.value})}
                        className=" px-6 py-2 w-full  rounded-xl  bg-gray-100 ring-green-600 hover:bg-gray-200 border-slate-200 focus:ring-2 focus:outline-none transition-colors"
                />
                <button 
                type="button"
                onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 ">
                    👁️
                </button>
                </div>

                <button 
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white text-lg px-4 py-2 rounded-xl hover:bg-green-700 transition-colors">
                    Register
                </button>
                <Link to="/">
                Already have an account? <span className="text-blue-500">login</span>
                </Link>
            </form>
        </div>
    )
}