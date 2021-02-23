const ErrorResponse = require("../model/ErrorResponse");

const errorMiddleware = (err, req, res, next) => {
    let errors = {...err};

    if(!err.code && err.message){
        errors.code = 500;
        errors.messgae = err.message;
    }

    if(err.code === 11000){
        errors = new ErrorResponse(400, err.keyValue);
        for(let i in errors.message){
            errors.message[i] = `${i} is already exist`;
        }
    }

    if(err.name === "CastError"){
        errors.code = 400;
        errors.message = "ID is invalid";
    }

    res.status(errors.code || 500).json({
        success: false,
        code: errors.code || 500,
        message: errors.message || "Server Error"
    });

    next();
}

module.exports = errorMiddleware;