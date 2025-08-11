// middleware/verifyToken.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing or malformed" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ more standard
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;

// This middleware function checks for a valid JWT token in the request headers.
// If the token is valid, it decodes it and attaches the user ID to the request