const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  department: String,
  semester: String,
  fileUrl: String,
  publicId: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Timetable", timetableSchema);