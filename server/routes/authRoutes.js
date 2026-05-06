const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123", // you can later move to .env
      { expiresIn: "1d" }
    );

    // ✅ SEND TOKEN + DATA
    res.json({
      token,
      role: user.role,
      _id: user._id,
      name: user.name
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({
      message: "User registered successfully"
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;