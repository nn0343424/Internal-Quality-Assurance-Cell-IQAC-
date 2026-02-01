const mongoose = require("mongoose");

const oddAuditSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessonPlan: Boolean,
  courseFile: Boolean,
  internalAssessment: Boolean,
  innovativeTeaching: Boolean,
  proof: String,
  remarks: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("OddAudit", oddAuditSchema);
