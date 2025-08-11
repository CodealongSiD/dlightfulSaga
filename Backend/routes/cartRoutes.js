const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");




router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCartItems);
router.delete("/remove/:bookId", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);


module.exports = router;
// This file defines the routes for cart-related operations, ensuring that the user is authenticated before allowing access.
