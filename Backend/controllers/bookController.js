// controllers/bookController.js
const Book = require('../models/bookModel');

const getBookCategories = async (req, res) => {
  try {
    const bestsellers = await Book.find({ ratings: { $gte: 4.7 } });
    const popular = await Book.find({ ratings: { $gte: 4.4, $lt: 4.7 } });
    const allBooks = await Book.find();
    const newRelease = allBooks.reduce((lowest, book) =>
          book.ratings < lowest.ratings ? book : lowest
      );

    res.status(200).json({
      bestsellers,
      popular,
      newRelease,
    });
  } catch (error) {
    console.error('Error fetching categorized books:', error);
    res.status(500).json({ message: 'Error fetching categorized books' });
  }
};

// GET /api/books → All books (for product list page)
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, books });
  } catch (error) {
    console.error('Error fetching all books:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// GET /api/books/:id → Single book (for product description)
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, book });
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getBookCategories,
  getAllBooks,
  getBookById,
};

// Export the book categories controller
// This controller fetches categorized books based on ratings and returns them in the response.