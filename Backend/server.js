const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); 
const path = require('path');
const authRoutes = require('./routes/authRoutes')
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require("./routes/orderRoutes");


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware: Enable CORS for frontend port
const allowedOrigins = [
  "http://localhost:5173",                // local dev
  "https://dlightful-saga.vercel.app"     // production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// Middleware: Parse incoming JSON
app.use(express.json());

// Route mounting
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/orders", orderRoutes);

// Middleware to prepend BASE_URL to any coverImage or file paths in responses
app.use((req, res, next) => {
  const oldJson = res.json;
  res.json = function (data) {
    const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

    const replaceUrls = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map(replaceUrls);
      } else if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (typeof obj[key] === 'string' && obj[key].startsWith('/uploads/')) {
            obj[key] = `${baseUrl}${obj[key]}`;
          } else if (typeof obj[key] === 'string' && obj[key].includes('/uploads/')) {
            // Handles case where it's like "uploads/file.jpg" without leading slash
            obj[key] = `${baseUrl}/${obj[key].replace(/^\/?/, '')}`;
          } else if (typeof obj[key] === 'object') {
            replaceUrls(obj[key]);
          }
        }
      }
      return obj;
    };

    return oldJson.call(this, replaceUrls(data));
  };
  next();
});


// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Digital Book Store API 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
