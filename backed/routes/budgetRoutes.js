const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createOrUpdateBudget,
    getBudget
} = require("../controllers/budgetController");


router.put( "/",authMiddleware,createOrUpdateBudget
);

router.get("/",authMiddleware,getBudget)

module.exports = router;