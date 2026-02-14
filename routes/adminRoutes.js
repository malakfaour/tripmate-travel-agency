const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const bookingController = require('../controllers/bookingController');

// 📨 Contact messages
router.get('/messages', contactController.getAllMessages);

// 📘 Booking requests
router.get('/bookings', bookingController.getAllBookingsAdmin);

module.exports = router;
