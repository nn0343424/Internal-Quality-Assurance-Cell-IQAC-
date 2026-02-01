const mongoose = require("mongoose");

const personalFileSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },

  highestQualification: String,
  specialization: String,
  yearOfPassing: Number,
  teachingExperience: Number,
  industryExperience: Number,
  publicationsCount: Number

}, { timestamps: true });

module.exports = mongoose.model("PersonalFile", personalFileSchema);
