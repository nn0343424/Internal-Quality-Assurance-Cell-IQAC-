const mongoose = require("mongoose");

const semesterAuditSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  semester: {   // ✅ NEW
    type: String,
    required: true,
  },

  academicYear: String,

  coursePlan: String,
  academicCalendar: String,
  studentList: String,
  timetable: String,
  lessonPlan: String,
  lectureNotes: String,
  questionBank: String,
  attendance: String,
  internalAssessment: String,
  courseOutcomesDefined: String,
  coPoMapping: String,
  resultAnalysis: String,
  gapAnalysis: String,
  facultyRemarks: String,

}, { timestamps: true });

module.exports = mongoose.model("SemesterAudit", semesterAuditSchema);