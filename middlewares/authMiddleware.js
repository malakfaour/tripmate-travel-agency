const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // 1️⃣ SESSION AUTH
    if (req.session?.user) {
      req.user = req.session.user;
      return next();
    }

    // 2️⃣ JWT AUTH
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findByPk(decoded.id);
      if (!user) return res.status(401).json({ error: "Unauthorized" });

      req.user = {
        id: user.id,
        email: user.email,
        username: user.username
      };

      return next();
    }

    // 3️⃣ NO SESSION + NO JWT → BLOCK
    return res.status(401).json({ error: "Unauthorized" });

  } catch (err) {
    console.error("AuthMiddleware ERROR →", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

