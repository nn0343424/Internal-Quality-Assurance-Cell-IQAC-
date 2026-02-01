const mongoose = require("mongoose");

const evenAuditSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lessonPlan: Boolean,
  courseFile: Boolean,
  internalAssessment: Boolean,
  innovativeTeaching: Boolean,
  proof: String,
  remarks: String,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("EvenAudit", evenAuditSchema);
