const ErrorResponse = require("../model/ErrorResponse")

exports.authorize = (...roles) =>(req, res, next) =>{
    if(!req.user){
        return next(new ErrorResponse(401, "Unauthorization"));
    }
    if(!roles.includes(req.user.role)){
        return next(new ErrorResponse(403, "Don't have permission to access this route"))
    }
    next();
};