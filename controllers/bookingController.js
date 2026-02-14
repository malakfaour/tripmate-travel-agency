const Booking = require('../models/Booking');
const { sendAdvisorEmail } = require('../utils/mailer');

// 🧩 Create Booking
exports.createBooking = async (req, res) => {
  try {
    console.log('📥 Request body:', req.body);
    console.log('👤 Authenticated user:', req.user?.id, req.user?.email);

    const { fullName, email, destination, passengers, phone, message, category } = req.body;

    if (!fullName || !email || !destination || !passengers || !phone || !category) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    const booking = await Booking.create({
      fullName,
      email,
      destination,
      passengers,
      phone,
      message,
      category,
      userId: req.user.id,
    });

    // OPTIONAL ADMIN EMAIL
    try {
      await sendAdvisorEmail({
        fullName,
        email,
        subject: `New Booking Request (${destination})`,
        message: `
          Destination: ${destination}<br>
          Category: ${category}<br>
          Passengers: ${passengers}<br>
          Phone: ${phone}<br>
          Message: ${message}
        `
      });
    } catch (emailError) {
      console.error("❌ Could not send booking email:", emailError.message);
    }

    res.status(201).json({ message: 'Booking created successfully!', booking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ error: 'Error creating booking', details: err.message });
  }
};

// ✅ Get all bookings for logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(bookings);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ error: 'Error fetching user bookings' });
  }
};

// ✏️ Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update(req.body);
    res.json({ message: 'Booking updated successfully!', booking });
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ error: 'Error updating booking' });
  }
};

// ❌ Delete / Cancel a booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully!' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Error cancelling booking' });
  }
};

// 🟦 NEW: ADMIN — VIEW ALL BOOKINGS
exports.getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.render('admin-bookings', {
      title: 'Booking Requests',
      bookings
    });

  } catch (err) {
    console.error("❌ Admin booking fetch error:", err);
    res.status(500).send("Internal Server Error");
  }
};
