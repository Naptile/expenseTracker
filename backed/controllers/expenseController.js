const Expense = require("../models/expense");

exports.createExpense =async(req,res)=>{
    try{
        const{title,description,category,amount,date} = req.body;
        const expense = await  Expense.create({title,description,category,amount,date,user:req.user});        
        res.status(201).json({
            message:"Expense created successfully",
            expense});
    }catch(error){
        res.status(400).json({error:error.message})
    }
};

exports.getExpense = async(req,res)=>{
    try {
        const expense = await Expense.find({user:req.user});
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

exports.getById =async(req,res)=>{
    try{
        const expense = await Expense.findOne({
            _id:req.params.id,
            user:req.user
        });
        if(!expense){
            return res.status(404).json("Expense not found");
        }
        res.status(200).json(expense);
    }catch(error){
        res.status(400).json({error:error.message})
    }
};

exports.updateExpense = async(req,res) =>{
    try {
        const updatedExpense = await Expense.findOneAndUpdate({
                _id:req.params.id,
                user:req.user
            },                
            req.body,            
            {new:true,
            runValidators:true
            },
                       
        );
        if(!updatedExpense){
            return res.status(404).json({
                message:"Expense not found"})
        }
        res.status(200).json({
            message:"Expense Updated successfully",
            updatedExpense
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

exports.deleteExpense = async(req,res)=>{
    try {
        const {id} = req.params;
        const deletedExpense= await Expense.findOneAndDelete({
            _id:id,
            user:req.user
        });

        if(!deletedExpense){
            return res.status(404).json({
                message:"Expense not found"
            })
        }

        res.status(200).json({
            message:"Expense deleted successfully",
            deletedExpense
        });
    } catch (error){
        res.status(500).json({error:error.message});
    }
};
