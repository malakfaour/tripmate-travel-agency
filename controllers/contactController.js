// controllers/contactController.js
const Contact = require('../models/Contact');
const { sendAdvisorEmail } = require('../utils/mailer');

// ========================================
// 1️⃣ GET Contact Page
// ========================================
exports.renderContactPage = (req, res) => {
  res.render('contact', { title: 'TripMate | Contact an Advisor' });
};

// ========================================
// 2️⃣ POST Contact Form
// ========================================
exports.submitContactForm = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save in database
    const contact = await Contact.create({ fullName, email, subject, message });

    // Send email
  // Try sending email BUT don't stop DB saving
try {
  await sendAdvisorEmail({ fullName, email, subject, message });
} catch (emailErr) {
  console.error("❌ Email failed, but message was saved:", emailErr);
}


    // Response
    res.status(201).render('contact-success', { title: 'Thank You!' });

  } catch (err) {
    console.error('❌ Error saving contact form:', err);
    res.status(500).send('Internal Server Error');
  }
};

// ========================================
// 3️⃣ Admin View — All Messages
// ========================================
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.render('admin-messages', {
      title: 'Contact Messages',
      messages
    });

  } catch (err) {
    console.error('❌ Error fetching messages:', err);
    res.status(500).send('Internal Server Error');
  }
};

// ========================================
// 4️⃣ Test Email (Optional)
// ========================================
exports.testEmail = async (req, res) => {
  try {
    await sendAdvisorEmail({
      fullName: 'Test User',
      email: 'test@example.com',
      subject: 'Testing TripMate Email',
      message: 'This is a test email from your TripMate contact route.',
    });

    res.send('✅ Test email sent successfully!');

  } catch (err) {
    console.error('❌ Email test failed:', err);
    res.status(500).send('❌ Failed to send test email.');
  }
};
