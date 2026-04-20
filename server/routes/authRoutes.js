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

module.exports = router;