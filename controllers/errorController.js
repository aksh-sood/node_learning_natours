module.exports=(err,req,res,next) => {
    // console.log(err.stack);
    err.statusCode = res.statusCode||500;
    err.status = "Error";
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message
    })};
