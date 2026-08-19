import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import{BrowserRouter,Routes,Route} from "react-router-dom"
export default function App(){
  return(
    <BrowserRouter>
    
      <Routes>
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard/>
          </ProtectedRoutes>
        }/>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />      
      </Routes>

    </BrowserRouter>


    
  )
}