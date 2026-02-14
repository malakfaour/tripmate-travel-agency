// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ===============================
// 1️⃣ SIGNUP
// ===============================
exports.signup = async (req, res) => {
  console.log("📝 Signup request received");
  console.log("📦 Request body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log("🔍 Checking if user exists:", email);
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ error: 'Email already exists. Please log in instead.' });
    }

    console.log("✨ Creating new user:", { name, email });
    const user = await User.create({ name, email, password });

    console.log("✅ User created successfully:", {
      id: user.id,
      name: user.name,
      email: user.email
    });

    res.status(201).json({
      message: 'User registered successfully!',
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({
      error: 'Registration failed',
      details: err.errors ? err.errors[0].message : err.message,
    });
  }
};

// ===============================
// 2️⃣ LOGIN (SESSION + JWT)
// ===============================
exports.login = async (req, res) => {
  console.log("🔐 Login request received");
  console.log("📦 Request body:", { email: req.body.email, password: "***" });

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log("🔍 Looking for user:", email);
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("🔑 Validating password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Invalid password for user:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log("🟢 Password validated successfully");

    // Create Session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    console.log("🟢 Session created:", req.session.user);

    // Create JWT as well
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'tripmate_secret_key',
      { expiresIn: '1d' }
    );

    console.log("🎟️ JWT token generated");

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({
      error: 'Login failed',
      details: err.message
    });
  }
};

// ===============================
// 3️⃣ LOGOUT
// ===============================
exports.logout = (req, res) => {
  console.log("🔓 Logout request received");

  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    console.log("🧹 Session destroyed and cookie cleared");
    res.json({ message: 'Logged out successfully' });
  });
};
