const Order = require("../models/orderModel"); 

exports.getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId })
      .populate("books")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(order => ({
      books: order.books.map(book => ({
        title: book.title,
        coverImage: book.coverImage,
      })),
    }));

    // Debugging log to check the structure of formattedOrders
    console.log("Formatted Orders Response:", JSON.stringify(formattedOrders, null, 2));

    res.status(200).json(formattedOrders);
  } catch (err) {
    console.error("Fetch Orders Error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
