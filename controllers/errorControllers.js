
const sendErrorDev=(err,res)=>{
    console.log(err);
    res.status(err.statusCode).json({
        status:err.status,
        err,
        message:err.message
    })
}

const sendErrorProd=(err,res)=>{
   if(err.isOperational){
       res.status(err.statusCode).json({
           status:err.status,
           message:err.message
       });
   }

   else{
       res.status(500).json({
           status:"fail",
           message:"internal server error"
       });
   }
}

module.exports= (err,req,res,next)=>{
   
    err.status=err.status || "fail";
    err.statusCode= err.statusCode|| 500;
   if(process.env.NODE_ENV==="development"){
       sendErrorDev(err,res);
   }
//    else if(processe.env.NODE_ENV==="production"){
//        let error={...err}
//        if()
//        sendErrorProd(error,res);
//    }
}