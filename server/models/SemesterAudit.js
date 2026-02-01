const mongoose = require("mongoose");

const semesterAuditSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  academicYear: {
    type: String,
    required: true
  },

  semesterType: {
    type: String,
    enum: ["ODD", "EVEN"],
    required: true
  },

  // Checklist
  coursePlan: String,              // Yes / No / NA
  academicCalendar: String,
  studentList: String,
  timetable: String,
  lessonPlan: String,
  lectureNotes: String,
  questionBank: String,
  attendance: String,
  internalAssessment: String,

  // Outcome & Analysis
  courseOutcomesDefined: String,
  coPoMapping: String,
  resultAnalysis: String,
  gapAnalysis: String,

  // Remarks
  facultyRemarks: {
    type: String,
    default: ""
  },

  auditorRemarks: {
    type: String,
    default: ""
  },

  finalStatus: {
    type: String,
    enum: ["Pending", "Approved", "Needs Correction"],
    default: "Pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("SemesterAudit", semesterAuditSchema);
