const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.registerUser =async(req,res)=>{
    try{
        const{name,email,password} = req.body;
        const userExists= await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            message:"User created succssessfully",
            user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
        });
    }catch(error){
        res.status(400).json({error:error.message});
        }    

};

exports.getCurrentUser =async(req,res)=>{
    try {
        const user = await User.findById(req.user).select("-password");

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
}


exports.loginUser = async(req,res)=>{
    try {
        const{email,password} =req.body;
        const userExists = await User.findOne({email});
        if(!userExists){
            return res.status(404).json({
                error:"User Not found"});
        };
        const ismatch = await bcrypt.compare(password,userExists.password);
        if(!ismatch){
            return res.status(400).json({
                message:"Incorrect Login details"
            });
        }
        const token = jwt.sign(
            {id:userExists._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.status(200).json({message:"Login successful",token});
    } catch (error) {
        res.status(500).json({error:error.message});        
    }
};

exports.updateBudget = async(req,res)=>{
    try {
        const {monthlyBudget} = req.body;
        if(monthlyBudget === undefined){
            res.status(400).json({
                message:"Monthly Budget is required"
            });
        }

        if(monthlyBudget < 0){
            res.status(400).json({
                Budget :"Cannot be negative"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user,
            {monthlyBudget},
            {new:true,runValidators:true}
        ).select("-password");

        if(!user){
            res.status(404).json({
                message:"User not found"
            });
        }

        res.status(200).json({
            message:"Monthly Budget updated successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
        
    }
}