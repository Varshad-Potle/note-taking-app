// File: middleware/fetchuser.js
// It is a middleware function that fetches the user from the JWT token in the request header.
// It verifies the token and attaches the user information to the request object for further processing in the route handlers.

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'thisismysecretkey';

const fetchUser = (req, res, next) => {
  // Get token from header
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // { id: ... }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = fetchUser;
