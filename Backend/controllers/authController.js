const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/userModel");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "90d" });
};

// Helper: Reset Key Generator
const generateResetKey = () => {
  const words = ["apple", "tiger", "delta", "moon", "wolf", "java", "iron", "blue", "echo", "rose"];
  const randomWord = () => words[Math.floor(Math.random() * words.length)];
  const randomNumber = () => Math.floor(100 + Math.random() * 900); // 3-digit number

  return `${randomWord()}${randomNumber()}${randomWord()}${randomNumber()}`;
};

// Signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, isGoogle } = req.body;

    if (!email || (!isGoogle && !password)) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!isGoogle) {
      const isStrong = validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });

      if (!isStrong) {
        return res.status(400).json({
          error: "Password must be 8–16 characters and include uppercase, lowercase, number, and special character",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const hashedPassword = isGoogle ? undefined : await bcrypt.hash(password, 10);

    // 🧠 Generate reset key
    const resetKey = generateResetKey();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isGoogle,
      resetKey, // Store it in the DB
    });

    const token = createToken(newUser._id.toString());

    res.status(201).json({
      user: {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        resetKey, // 🧠 Show reset key on frontend
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.isGoogle) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password || "");
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = createToken(user._id.toString());
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  const { email, resetKey } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No user found with this email" });
    }

    // ✅ Check if resetKey matches
    if (user.resetKey !== resetKey) {
      return res.status(401).json({ error: "Invalid reset key" });
    }
    
    // ✅ Create a short-lived reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    // 🟢 Proceed if valid
    res.status(200).json({
      success: true,
      message: "Reset key validated successfully.",
      resetToken,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error while processing reset key" });
  }
};


// Reset Password
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  // 1. Check for mismatch
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // 3. Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    res.status(200).json({ message: "Password Updated! Continue" });

  } catch (err) {
    res.status(400).json({ error: "Invalid or expired reset token" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
// This code provides the authentication functionality for a digital book store backend.
// It includes user signup, login, forgot password, and reset password functionalities.