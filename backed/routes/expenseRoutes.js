const express = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const router = express.Router();
const{
    createExpense,
    getExpense,
    getById,
    updateExpense,
    deleteExpense
} = require("../controllers/expenseController");

router.get("/expenses",authMiddleware,getExpense);
router.get("/expenses/:id",authMiddleware,getById);
router.post("/expenses",authMiddleware,createExpense);
router.put("/expenses/:id",authMiddleware,updateExpense);
router.delete("/expenses/:id",authMiddleware,deleteExpense);

module.exports = router;