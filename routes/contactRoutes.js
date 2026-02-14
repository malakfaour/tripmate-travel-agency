// routes/contactRoutes.js
const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// 1️⃣ GET Contact Page
router.get('/', contactController.renderContactPage);

// 2️⃣ POST Contact Form
router.post('/', contactController.submitContactForm);



// 4️⃣ Test Email
router.get('/test-email', contactController.testEmail);

module.exports = router;
