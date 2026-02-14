// routes/travelRoutes.js
const express = require('express');
const travelController = require('../controllers/travelController');

const router = express.Router();

// Get all trips
router.get('/', travelController.getAllTrips);

// Add a new trip (optional for admin)
router.post('/', travelController.addTrip);

module.exports = router;
