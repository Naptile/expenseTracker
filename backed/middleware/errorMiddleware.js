const errorMiddleware = (err,req,res,next)=>{
    console.error(err.stack);
    
    if(err.name ==="ValidationError"){
        return res.status(400).json({
            message:"Validation failed",
            error:err.message      
        });
    }
    if(err.name ==="CastError"){
        return res.status(400).json({
            message:"Invalid ID format",
            error:err.message
        });
    }
    if(err.code ===11000){
        return res.status(400).json({
            message:"Email already Exists",
            error:err.message
        });
    }
    res.status(500).json({
        message:"Internal server error",
        error:err.message
    });
};
module.exports = errorMiddleware;