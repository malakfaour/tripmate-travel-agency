const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// LOGIN
router.post("/login", authController.login);

// LOGOUT
router.post("/logout", authController.logout);

// GET CURRENT USER (session or jwt)
router.get("/me", authMiddleware, authController.me);

module.exports = router;
