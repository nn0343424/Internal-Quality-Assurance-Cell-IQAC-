const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");
const CourseExitSurvey = require("../models/CourseExitSurvey");
const FacultyInfo = require("../models/FacultyInfo");
const PersonalFile = require("../models/PersonalFile");


const router = express.Router();

// GET faculty & auditors
router.get("/users", auth, role("admin"), async (req, res) => {
  const users = await User.find({ role: { $ne: "admin" } });
  res.json(users);
});

// 🔴 THIS ROUTE IS REQUIRED
router.get("/feedback-summary", auth, role("admin"), async (req, res) => {
  try {
    const summary = await CourseExitSurvey.aggregate([
      {
        $group: {
          _id: "$facultyId",
          responses: { $sum: 1 },
          avgClarity: { $avg: "$clarity" },
          avgSatisfaction: { $avg: "$overallSatisfaction" }
        }
      }
    ]);

    res.json(summary);
  } catch (err) {
    console.error("FEEDBACK SUMMARY ERROR:", err);
    res.status(500).json({ message: "Failed to load feedback summary" });
  }
});

router.put("/users/:id", auth, role("admin"), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        department: req.body.department,
        subject: req.body.subject
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("UPDATE USER ERROR:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

router.get("/faculty/:id/info", auth, async (req, res) => {
  if (!["admin", "auditor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const info = await FacultyInfo.findOne({ facultyId: req.params.id });
  res.json(info);
});

router.get("/faculty/:id/personal", auth, async (req, res) => {
  if (!["admin", "auditor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const file = await PersonalFile.findOne({ facultyId: req.params.id });
  res.json(file);
});

module.exports = router;
