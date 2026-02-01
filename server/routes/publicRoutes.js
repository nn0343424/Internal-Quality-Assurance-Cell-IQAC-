const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get all faculty (public)
router.get("/faculty", async (req, res) => {
  try {
    const faculty = await User.find(
      { role: "faculty" },
      "name department"
    );
    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: "Failed to load faculty" });
  }
});

module.exports = router;
