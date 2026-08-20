const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const {
    registerUser,
    loginUser,
    getCurrentUser,
    updateBudget,
} = require("../controllers/userController");

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/me",authMiddleware,getCurrentUser);

router.put("/budget",authMiddleware,updateBudget);

module.exports = router;