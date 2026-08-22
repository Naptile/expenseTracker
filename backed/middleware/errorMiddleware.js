const errorMiddleware = (err,req,res,next)=>{
    console.error(err.stack);
    
    if(err.name ==="ValidationError"){
        return res.status(400).json({
            message:"Validation failed",
                
        });
    }
    if(err.name ==="CastError"){
        return res.status(400).json({
            message:"Invalid ID format",
            
        });
    }
    if(err.code ===11000){
        return res.status(400).json({
            message:"A record with this value already exists",
           
        });
    }
    res.status(500).json({
        message:"Internal server error",
       
    });
};
module.exports = errorMiddleware;