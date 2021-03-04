const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post("/resetPassword", userController.resetPassword);

module.exports = router;