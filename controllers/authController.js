const User = require("../database/models/User");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../model/ErrorResponse");

exports.register = asyncMiddleware(async (req, res, next) =>{
    const {firstname, lastname, email, password} = req.body;
    const newUser = new User({firstname, lastname, email, password});
    const saved_user = await newUser.save();
    res.status(201).json(new SuccessResponse(201, saved_user));
});

exports.login = asyncMiddleware(async (req, res, next) =>{
    const {email, password} = req.body;
    const isExistEmail = await User.findOne({email});
    if(isExistEmail){
        const isMatchPassword = await User.comparePassword(password, isExistEmail.password);
        if(isMatchPassword){
            const token = jwt.sign({
                firstname: isExistEmail.firstname, 
                lastname: isExistEmail.lastname,
                email: isExistEmail.email,
                role: isExistEmail.role
            },
                process.env.JWT_KEY
            );
            return res.status(200).json(new SuccessResponse(200, token));
        }else{
            return next(new ErrorResponse(400, "Wrong password!"));
        }
    }else{
        return next(new ErrorResponse(404, "Email is not found"))
    }
});