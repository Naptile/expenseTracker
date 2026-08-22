import { useState,useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { toast } from "react-toastify";
import StatCard from "../components/StatCard";
import ExpenseList from "../components/ExpenseList";
import EditExpenseModal from "../components/EditExpenseModal";
import CategoryChart from "../components/CategoryChart";
import ExpenseTrendChart from "../components/ExpenseTrendChart";
import SpendingRadaChart from "../components/SpendingRadaChart";
import Footer from "../components/Footer";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import LoadingSpiner from "../components/LoadingSpinner";
import NotFound from "../components/NotFound";
import { useLoaderData } from "react-router-dom";
import MonthlySpendingChart from "../components/MonthlySpendingChart";
import BudgetForm from "../components/BudgetForm";
export default function Dashboard(){

    const[expenses,setExpenses]= useState([]);
    const[editingExpense,setEditingExpense] = useState(null);
    const[categoryFilter,setCategoryFilter] = useState("all");
    const[search,setSearch]=useState("");
    const[startDate,setStartDate] = useState("");
    const[endDate,setEndDate] = useState("");
    const[sortBy,setSortBy] = useState("newest");
    const[currentPage,setCurrentPage] = useState(1);
    const[loading,setLoading] = useState(false);
    const[user,setUser] = useState(null);
    const[budget,setBudget] = useState(0);

    //fetch user
    const fetchUser = async() =>{
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch user"
            )
            
        }
    }

    //fetch Expenses
    const fetchExpenses = async()=>{
        setLoading(true);
        try {
            const response = await api.get("/expenses");
            setExpenses(response.data);
                      
        } catch (error) {
            toast.error(error.response?.data?.error || error.response?.data?.message || "Failed to fetch")
        }
        finally{
            setLoading(false);
        }
    }

    //fetchBUdget

    const fetchBudget = async() =>{
        try {
            const date = new Date();
            const month = date.getMonth();
            const year =date.getFullYear();
            const response = await api.get("/budget",{
                params:{
                    month,
                    year
                }
            });

            setBudget(response.data.amount || 0);
        } catch (error) {
            toast.error(error.response?.data?.message || error.response?.data?.error || "Failed to fetch budget")
        }
    }

    useEffect(()=>{
        fetchExpenses();
        fetchUser();
        fetchBudget();
    },[]);


    const handleDelete= async(id)=>{
        try {
            const confirmed = window.confirm("Are you sure you want to delete expense? this action cannot be undone");
            if(!confirmed)return;
            await api.delete(`/expenses/${id}`)
            toast.success("Expense Deleted successfully")
            fetchExpenses();
        } catch (error) {
            toast.error(error.response?.data?.message || error.response?.data?.error)
            
        }
        
    };

    const totalAmount = expenses.reduce((acc,expense)=>acc + expense.amount,0 )
    const expenseCount = expenses.length;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear()

    const thisMonthExpenses = expenses.filter((expense)=>{
    const expenseDate = new Date(expense.date);
        return(
            expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
        );
    }).reduce((total,expense)=>{
        return total + expense.amount
    },0);

    const highestExpense =expenses.reduce((highest,expense)=>{
        if(expense.amount>highest){
            highest =expense.amount;            
        }return highest;
    },0);

   const filteredExpenses = expenses.filter((expense)=>{        
            const matchesSearch=[
                expense.title,
                expense.category,
                expense.amount,
                expense.description,
                expense.date,
                
            ].some((field)=>String(field).toLowerCase().includes(search.toLowerCase()))
            
            const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
            const expenseDate = new Date(expense.date);
            const afterStart = startDate ==="" || expenseDate>=new Date(startDate);
            const beforeEnd = endDate ==="" || expenseDate <= new Date(endDate);
            const matchesDate = startDate === afterStart && beforeEnd ;
            return matchesSearch && matchesCategory ;
    });

    const sortedExpenses = [...filteredExpenses].sort((a,b)=>{
        if(sortBy ==="highest"){
            return b.amount - a.amount;
        }
        if(sortBy ==="lowest"){
            return a.amount -b.amount
        }
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if(sortBy === "newest"){
            return dateB - dateA;
        }
        if(sortBy ==="oldest"){
            return dateA - dateB;
        }
        return 0;
    });

    //pagination

    const expensesPerPage = 4;
    const totalExpenses = expenses.length;
    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = sortedExpenses.slice(
        indexOfFirstExpense,
        indexOfLastExpense
    );
    
    return(
        <div className="bg-slate">
            <Navbar/>          
            
            <div className="grid grid-cols-1 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5  mt-4 ">
                <StatCard title={"💰Total Amount"} value={`Ksh ${totalAmount.toLocaleString()}`}/>
                <StatCard title={"🧾Transactions"} value={expenseCount} />
                <StatCard title={"🔥Highest Expense"} value={`Ksh ${highestExpense.toLocaleString()}`}/>
                <StatCard title={"This Month"} value={`Ksh ${thisMonthExpenses.toLocaleString()}`}/>
                {user &&
                 <BudgetForm budget={budget} thisMonthExpenses={thisMonthExpenses} fetchBudget={fetchBudget} />
                }
                <ExpenseForm fetchExpenses={fetchExpenses} loading={loading} setLoading={setLoading}/>                      
               
            </div>

            {loading &&(
                <LoadingSpiner/>
            )}

            {expenses.length ===0 &&(
                <NotFound/>
            )}          
            
            <div className="p-6">                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ExpenseTrendChart expenses={expenses}/>
                        <SpendingRadaChart expenses={expenses}/>
                        <CategoryChart expenses={expenses}/> 
                        <MonthlySpendingChart expenses={expenses}/>
                     </div>

            </div>           
           
            {
                editingExpense&&(
                    <EditExpenseModal 
                    expense={editingExpense}
                    fetchExpenses={fetchExpenses}
                    onClose={()=>setEditingExpense(null)}
                    />
                )
            }

            
            <Filter 
            search={search} 
            setSearch={setSearch} 
            categoryFilter={categoryFilter} 
            setCategoryFilter={setCategoryFilter} 
            startDate={startDate}
            endDate={endDate} 
            sortBy={sortBy}
            setSortBy={setSortBy}          
            />
             <p>
                showing {currentExpenses.length} of {expenses.length}
            </p>
            <ExpenseList expenses={currentExpenses} setEditingExpense={setEditingExpense} handleDelete={handleDelete} search={search} /> 
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} expensesPerPage={expensesPerPage} search={search} totalExpenses={totalExpenses}  />
          
             <Footer/>
        </div>
    ) 
}