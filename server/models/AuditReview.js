const mongoose = require("mongoose");

const auditReviewSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  auditorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  remarks: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Needs Correction"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("AuditReview", auditReviewSchema);
