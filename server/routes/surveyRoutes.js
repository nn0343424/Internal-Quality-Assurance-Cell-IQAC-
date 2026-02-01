const express = require("express");
const CourseExitSurvey = require("../models/CourseExitSurvey");

const router = express.Router();


router.post("/course-exit", async (req, res) => {
  try {
    const survey = new CourseExitSurvey({
      facultyId: req.body.facultyId,
      courseName: req.body.courseName,
      clarity: Number(req.body.clarity),
      syllabusCoverage: Number(req.body.syllabusCoverage),
      usefulness: Number(req.body.usefulness),
      overallSatisfaction: Number(req.body.overallSatisfaction)
    });

    await survey.save();
    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("COURSE EXIT ERROR:", err);
    res.status(500).json({ message: "Submission failed" });
  }
});


module.exports = router;
