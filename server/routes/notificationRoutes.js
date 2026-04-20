const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// GET user notifications
router.get("/:userId", async (req, res) => {
  try {
    const data = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// MARK AS READ
router.put("/read/:id", async (req, res) => {
  try {
    const data = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET UNREAD COUNT
router.get("/count/:userId", async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      userId: req.params.userId,
      read: false,
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MARK ALL AS READ
router.put("/read-all/:userId", async (req, res) => {
  try {
    console.log("USER ID:", req.params.userId);

    const result = await Notification.updateMany(
      { userId: req.params.userId, read: false },
      { read: true }
    );

    console.log("UPDATED:", result);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;