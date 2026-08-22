const Budget = require("../models/budget");
console.log("budget controller loaded",Budget);
console.log("findOne",typeof Budget.findOne);
exports.createOrUpdateBudget = async(req,res) =>{
    try {
        const {month, year, amount} = req.body;
        if(month ===undefined || year ===undefined || amount ===undefined){
            return res.status(400).json({
                message:"Month, year and amount are required"
            });
        }

        if(amount < 0){
            return res.status(400).json({
                message:"Budget amount cannot be negative"
            });
        }

        const budget = await Budget.findOneAndUpdate(
            //filter ie what to find
            {
            user:req.user,
            month,
            year
            },        
            //what to update
             {
        $set:{
            amount //update only amount
            }
            },

        //options 'HOW',,,,,HOw to behave
        {
            new:true,
            upsert:true,
            runValidators:true
        }
    );

    res.status(200).json({
        message:"Budget saved successfully",
        budget
    });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
};

exports.getBudget = async(req,res) =>{
    try {

        const{month,year} = req.query;
        const budget = await Budget.findOne(
            {
                user:req.user,
                month,
                year}
        );

        if(!budget){
            return res.status(404).json({
                message:"No budget found"
            });
        }

        res.status(200).json(budget);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}