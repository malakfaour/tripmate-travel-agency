// routes/bookingRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// 🧩 Create Booking
router.post('/', authMiddleware, bookingController.createBooking);

// ✅ Read (Get all bookings for logged-in user)
router.get('/my', authMiddleware, bookingController.getMyBookings);

// ✏️ Update (Edit a booking)
router.put('/:id', authMiddleware, bookingController.updateBooking);

// ❌ Delete (Cancel a booking)
router.delete('/:id', authMiddleware, bookingController.deleteBooking);

// 🟦 ADMIN: View all bookings
router.get('/admin/all', bookingController.getAllBookingsAdmin);
module.exports = router;
