const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.post("/resetPassword", userController.resetPassword);
router.post("/resetPassword/:token", userController.updatePassword);

module.exports = router;