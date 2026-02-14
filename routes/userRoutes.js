const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

console.log("✅ userRoutes.js loaded successfully");

// SIGNUP
router.post('/signup', userController.signup);

// LOGIN
router.post('/login', userController.login);

// LOGOUT
router.post('/logout', userController.logout);

module.exports = router;
