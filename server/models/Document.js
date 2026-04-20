const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  department: String,

  documentType: {
    type: String,
    enum: [
      "Lesson Plan",
      "Lecture Notes",        // ✅ added
      "Question Bank",
      "Attendance",
      "Internal Assessment",  // ✅ added
      "Result Analysis"
    ],
    required: true,
  },

  fileUrl: {
    type: String,
    required: true,
  },

  publicId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["Submitted", "Verified", "Needs Correction"],
    default: "Submitted",
  },

  auditorComment: {
    type: String,
  },

  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);