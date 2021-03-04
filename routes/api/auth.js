const express = require('express');
const router = express.Router();
const { baseAuth } = require('../../middleware/baseAuth')
const authController = require('../../controllers/authController');
const ErrorResponse = require('../../model/ErrorResponse');

router.get("/error", (req, res, next)=> {
    return next(new ErrorResponse(400, "I'm error ! I'm not good"));
});

router.post("/register", authController.register);
router.post("/login", baseAuth, authController.login);

module.exports = router;