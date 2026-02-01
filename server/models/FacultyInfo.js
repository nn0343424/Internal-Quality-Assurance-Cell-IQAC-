const mongoose = require("mongoose");

const facultyInfoSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  designation: String,
  department: String,
  dateOfJoining: String,
  appointmentType: String,
  coursesHandled: String

}, { timestamps: true });

module.exports = mongoose.model("FacultyInfo", facultyInfoSchema);
