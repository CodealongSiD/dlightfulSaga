const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Book",
      },
    ],
    amount: {
      type: Number,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    razorpaySignature: {
      type: String,
      default: null,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
// This file defines the Order model schema for MongoDB using Mongoose.
// It includes fields for user ID, books, payment details, and timestamps.