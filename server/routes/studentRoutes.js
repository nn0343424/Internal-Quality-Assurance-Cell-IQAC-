const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");
const AcademicCalendar = require("../models/AcademicCalendar");
const CourseExitSurvey = require("../models/CourseExitSurvey");
// View timetable
router.get("/timetable", async (req, res) => {
  const data = await Timetable.find();
  res.json(data);
});

// View academic calendar
router.get("/calendar", async (req, res) => {
  const data = await AcademicCalendar.find();
  res.json(data);
});
router.post("/course-exit", async (req, res) => {
  try {
    const {
      facultyId,
      courseName,
      clarity,
      syllabusCoverage,
      usefulness,
      overallSatisfaction
    } = req.body;

    console.log("REQ BODY:", req.body); // 🔥 DEBUG

    // ✅ VALIDATION
    if (
      !facultyId ||
      !courseName ||
      !clarity ||
      !syllabusCoverage ||
      !usefulness ||
      !overallSatisfaction
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const survey = new CourseExitSurvey({
      facultyId,
      courseName,
      clarity: Number(clarity),
      syllabusCoverage: Number(syllabusCoverage),
      usefulness: Number(usefulness),
      overallSatisfaction: Number(overallSatisfaction)
    });

    await survey.save();

    res.json({ message: "Feedback submitted successfully" });

  } catch (err) {
    console.error("COURSE EXIT ERROR:", err); // 🔥 THIS WILL SHOW EXACT ERROR
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
});
module.exports = router;