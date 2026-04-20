const express = require("express");
const router = express.Router();
const Document = require("../models/Document");
const Notification = require("../models/Notification");

// Get documents by department
router.get("/documents/:department", async (req, res) => {
  const data = await Document.find({
    department: req.params.department,
  });
  res.json(data);
});

// Review document
router.post("/new-review-document/:id", async (req, res) => {
  try {
    const { status, comment } = req.body;

    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        status,
        auditorComment: comment,
      },
      { new: true }
    );
const now = new Date();
const formatted = now.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

// ✅ ADD NOTIFICATION HERE
await Notification.create({
  userId: doc.faculty,   // ✅ VERY IMPORTANT
  message: `Your ${doc.documentType} is ${status} on ${formatted}`,
  // message: `Your ${doc.documentType} is ${status}`,
});

    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ================= PHASE 1 REVIEW SYSTEM =================

// Get documents by department
router.get("/new-documents", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const data = await Document.find(filter)
      .populate("faculty", "name email")
      .sort({ uploadedAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET documents by facultyId
router.get("/documents/faculty/:id", async (req, res) => {
  try {
    const docs = await Document.find({
      faculty: req.params.id,
    }).populate("faculty", "name email");

    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Review document (per-file)


module.exports = router;