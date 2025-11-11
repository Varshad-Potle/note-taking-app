const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
var fetchuser = require('../middleware/fetchuser'); // not used in this file, but can be used for protected routes
const router = express.Router();
const JWT_SECRET = "thisismysecretkey"; // secret key for jwt token

// Route 1: Create a new user using POST "/api/auth/createUser"
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({success, error: "User already exists" });
      }
      // Hashing the password
      // bcrypt is used to hash the password before storing it in the database
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name,
        password: secPass,
        email: email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      // Creating a JWT token
      // jwt is used to create a token that can be used to authenticate the user in future
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Route 2: Authenticate a user using POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({success, error: "Invalid credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3: Get logged-in user details using POST "/api/auth/getUser" , login required

router.post("/getUser", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
})



module.exports = router;
