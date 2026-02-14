// controllers/travelController.js
const Trip = require('../models/Trip');

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll();
    res.json(trips);
  } catch (err) {
    console.error('❌ Error fetching trips:', err);
    res.status(500).json({ error: 'Error fetching trips' });
  }
};

// Add a new trip (admin use)
exports.addTrip = async (req, res) => {
  try {
    const { destination, price, description, image } = req.body;

    const newTrip = await Trip.create({
      destination,
      price,
      description,
      image
    });

    res.status(201).json({ message: 'Trip added', newTrip });
  } catch (err) {
    console.error('❌ Error creating trip:', err);
    res.status(500).json({ error: 'Error creating trip' });
  }
};
