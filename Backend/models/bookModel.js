// Backend → models/bookModel.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      default: "Siddharth Sharma",
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String, // URL or local path
      required: true,
    },
    stock: {
      type: Number,
      default: 100,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Book", bookSchema);
