const Razorpay = require('razorpay');
const crypto = require('crypto');
const razorpay = require('../utils/razorpayInstance');
const Order = require("../models/orderModel");

// CREATE ORDER CONTROLLER
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // Amount in rupees
    const userId = req.user?.id;

    if (!amount || !userId) {
    return res.status(400).json({ success: false, message: "Missing data" });
      }

      const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
      });
    
    const options = {
      amount: amount, 
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const razorpayOrder = await instance.orders.create(options);
      res.status(201).json({
          success: true,
          orderId: razorpayOrder.id, // This must be sent to frontend!
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// VERIFY PAYMENT CONTROLLER
const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    cartItems,
    amount,
  } = req.body;

  const userId = req.user.id; // assuming you're using verifyToken middleware

  /* Debug logs to ensure all required data is received
  console.log("🔍 Verifying Payment...");
  console.log("➡️ Order ID:", razorpay_order_id);
  console.log("➡️ Razorpay Payment ID:", razorpay_payment_id);
  console.log("➡️ Razorpay Signature:", razorpay_signature);
  console.log("➡️ Books in Cart:", cartItems);
  console.log("➡️ Amount:", amount);
  console.log("➡️ User ID:", userId);
*/
  // Signature verification
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      // ADDED: Check if user already exists in Order model
      const existingOrder = await Order.findOne({ userId });

      if (existingOrder) {
        // Merge new books without duplicates
        const newBookIds = cartItems
          .map(book => book._id.toString())
          .filter(id => !existingOrder.books.some(b => b._id.toString() === id));

        existingOrder.books.push(...cartItems.filter(b => newBookIds.includes(b._id.toString())));
        existingOrder.amount += amount; // Add to total price
        existingOrder.razorpayOrderId = razorpay_order_id;
        existingOrder.razorpayPaymentId = razorpay_payment_id;
        existingOrder.razorpaySignature = razorpay_signature;
        existingOrder.isPaid = true;
        existingOrder.paidAt = new Date();

        await existingOrder.save();

        return res.status(200).json({
          success: true,
          message: "Payment verified and order updated",
          order: existingOrder,
        });
      }

      // If no order exists for user, create a new one
      const newOrder = await Order.create({
        userId,
        books: cartItems,
        amount,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        isPaid: true,
        paidAt: new Date(),
      });

      console.log("✅ Order successfully saved:", newOrder);

      return res.status(200).json({
        success: true,
        message: "Payment verified and order saved",
        order: newOrder,
      });
    } catch (error) {
      console.error("❌ DB Save Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error while saving order",
      });
    }
  } else {
    console.warn("❌ Invalid signature detected");
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};


module.exports = {
  createOrder,
  verifyPayment,
};
// This controller creates a Razorpay order with the specified amount and returns the order details.
// It uses the Razorpay SDK to interact with the Razorpay API.