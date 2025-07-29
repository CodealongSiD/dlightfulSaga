const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
// This code defines a middleware function for Express.js that checks if the user is authenticated by verifying a JWT token.
// If the token is valid, it retrieves the user from the database and attaches it to the