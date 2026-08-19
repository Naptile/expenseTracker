const mongoose = require ("mongoose");
const expenseSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        required:true,
        enum:["food","transport","shopping","bills","entertainment","education"],        
    },

    amount:{
        type:Number,
        required:true,
        min:0
    },
    date:{
        type:String,
        required:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true});

const Expense = mongoose.model("Expense",expenseSchema);

module.exports = Expense 