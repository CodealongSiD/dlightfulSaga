// routes/bookRoutes.js
const express = require('express');
const router = express.Router();

const {
  getBookCategories,
  getAllBooks,
  getBookById,
} = require('../controllers/bookController');

// Routes
router.get('/categories', getBookCategories); // Homepage
router.get('/', getAllBooks);          // Product List
router.get('/:id', getBookById);       // Book Details

module.exports = router;

// This file defines the routes for book-related operations, specifically fetching book categories.