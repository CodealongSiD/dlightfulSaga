// models/userModel.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
    },
    resetKey: {
      type: String,
      required: false, 
    },
    isGoogle: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// This code defines a Mongoose schema for a User model in a MongoDB database.
// The schema includes fields for name, email, password, Google ID, a flag for Google