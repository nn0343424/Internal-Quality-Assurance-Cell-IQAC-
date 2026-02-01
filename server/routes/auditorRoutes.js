const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const User = require("../models/User");
const FacultyInfo = require("../models/FacultyInfo");
const PersonalFile = require("../models/PersonalFile");
const AuditReview = require("../models/AuditReview");

// 1) Get faculty list for auditor
router.get("/faculty", auth, role("auditor"), async (req, res) => {
  const faculty = await User.find({ role: "faculty" })
    .select("name email mobile");
  res.json(faculty);
});

// 2) Get existing review (if any)
router.get("/review/:facultyId", auth, role("auditor"), async (req, res) => {
  const review = await AuditReview.findOne({
    facultyId: req.params.facultyId,
    auditorId: req.user.id
  });
  res.json(review);
});

// 3) Create / Update review
router.post("/review/:facultyId", auth, role("auditor"), async (req, res) => {
  const { remarks, status } = req.body;

  const review = await AuditReview.findOneAndUpdate(
    { facultyId: req.params.facultyId, auditorId: req.user.id },
    { remarks, status },
    { upsert: true, new: true }
  );

  res.json(review);
});

module.exports = router;
