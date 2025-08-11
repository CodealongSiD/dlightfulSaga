const Cart = require("../models/cartModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel"); 

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const existingItem = await Cart.findOne({ user: userId, product: bookId });
    if (existingItem) {
      return res.status(409).json({ message: "Book already in cart" });
    }

    const newCartItem = await Cart.create({
      user: userId,
      product: bookId,
    });

    res.status(201).json({ message: "Book added to cart", cartItem: newCartItem });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add book to cart" });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user orders
    const existingOrder = await Order.findOne({ userId }).populate("books");
    const purchasedBookIds = existingOrder ? existingOrder.books.map(b => b._id.toString()) : [];

    // Fetch cart items
    const cartItems = await Cart.find({ user: userId }).populate("product");

    // Remove books from cart if already purchased
    const validCartItems = cartItems.filter(item => !purchasedBookIds.includes(item.product._id.toString()));

    // If we removed anything, clear them from DB
    if (validCartItems.length !== cartItems.length) {
      const removedIds = cartItems
        .filter(item => purchasedBookIds.includes(item.product._id.toString()))
        .map(item => item.product._id);

      await Cart.deleteMany({ user: userId, product: { $in: removedIds } });
    }

    // Prepare detailed items
    const detailedItems = validCartItems.map(item => ({
      _id: item.product._id,
      title: item.product.title,
      price: item.product.price,
      coverImage: item.product.coverImage,
      quantity: 1,
    }));

    // Totals
    const subtotal = detailedItems.reduce((acc, item) => acc + item.price, 0);
    const platformFee = 4;
    const gst = 10;
    const total = subtotal + platformFee + gst;

    res.status(200).json({
      message: "Cart fetched successfully",
      items: detailedItems,
      subtotal,
      platformFee,
      gst,
      total,
    });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};



const removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  try {
    const deletedItem = await Cart.findOneAndDelete({
      user: userId,
      product: bookId,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Cart.deleteMany({ user: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found in cart to delete" });
    }

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};


module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
};
// This file contains the cart controller functions for adding, fetching, removing, and clearing items in the user's cart.
// It uses the Cart model to interact with the database and handle cart-related operations.