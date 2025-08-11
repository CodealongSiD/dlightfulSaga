const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { createOrder, getUserOrders } = require("../controllers/orderController");

// Protected routes
router.get("/", verifyToken, getUserOrders);      // Get user's orders

module.exports = router;

// This file defines the routes for order-related operations, ensuring that the user is authenticated before allowing access.