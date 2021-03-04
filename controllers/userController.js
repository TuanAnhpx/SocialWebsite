const User = require("../database/models/User");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const SuccessResponse = require("../model/SuccessResponse");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ErrorResponse = require("../model/ErrorResponse");
const MailService = require("../common/mail");

exports.resetPassword = asyncMiddleware(async (req, res, next) =>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return next(new ErrorResponse(400, "Email is not found!"));
    }
    const token = crypto.randomBytes(30).toString("hex");
    const info = MailService.sendMail(
        process.env.EMAIL,
        email, 
        "Reset Password",
        "reset password"
        `<a href='http://localhost:3000/api/v1/user/resetPassword/${token}'>http://localhost:3000/api/v1/user/resetPassword/${token}</a>`
    )
    res.status(200).json(new SuccessResponse(200, `Please check your email : ${email}`))
    console.log(info)
});