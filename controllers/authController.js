const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    // 2. Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    // 3. Create browser session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    // 4. Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      sessionUser: req.session.user,
      jwtToken: token
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    res.clearCookie("connect.sid"); // clears session cookie
    res.json({ message: "Logged out successfully" });
  });
};
exports.me = (req, res) => {
  if (req.session.user) {
    return res.json({ user: req.session.user, source: "session" });
  }

  if (req.user) {
    return res.json({ user: req.user, source: "jwt" });
  }

  return res.status(401).json({ error: "Not authenticated" });
};
