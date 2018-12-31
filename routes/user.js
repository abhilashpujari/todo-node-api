const express = require('express');
const router = express.Router();
const user_controller = require("../controllers/user");

// Register
router.route('/register')
    .post(user_controller.register);

// Authenticate
router.route('/authenticate')
    .post(user_controller.authenticate);

module.exports = router;