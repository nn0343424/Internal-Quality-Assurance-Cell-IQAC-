const mongoose = require("mongoose");

const courseExitSurveySchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  courseName: String,
  clarity: Number,
  syllabusCoverage: Number,
  usefulness: Number,
  overallSatisfaction: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "CourseExitSurvey",
  courseExitSurveySchema
);
