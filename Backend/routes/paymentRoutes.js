const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create-order', verifyToken, createOrder);
router.post('/verify-payment', verifyToken, verifyPayment);

module.exports = router;
// This file defines the routes for creating a payment order and verifying payments using Razorpay.