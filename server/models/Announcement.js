const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: String,
  message: String,
  targetRole: {
    type: String,
    enum: ["all", "faculty", "auditor", "student"],
    default: "all",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);