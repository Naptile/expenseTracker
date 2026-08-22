require("dotenv").config();
const connectDB= require("./config/db");
const cors = require("cors")
const errorMiddleware = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const express = require("express");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>res.send("Api server  running..."));

app.use("/api/auth",authRoutes);
app.use("/api",expenseRoutes);
app.use("/api/budget",budgetRoutes);
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`server running on http://localhost:${PORT}`))
