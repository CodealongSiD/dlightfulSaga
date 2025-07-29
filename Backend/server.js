const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); 
const authRoutes = require("./routes/authRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Enable CORS for frontend port
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);


// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Digital Book Store API 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
