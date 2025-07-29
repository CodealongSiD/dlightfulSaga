const requireAuth = require("../middleware/authMiddleware");

const express = require("express");
const {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Protected route to test JWT
router.get("/protected", requireAuth, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route!",
    user: req.user, // user info from DB
  });
});

module.exports = router;
// This code defines the authentication routes for user signup, login, forgot password, and reset password.
// It uses Express.js to create a router and maps HTTP POST requests to the corresponding controller functions