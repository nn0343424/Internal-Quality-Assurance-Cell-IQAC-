const mongoose = require("mongoose");

const academicCalendarSchema = new mongoose.Schema({
  title: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

module.exports = mongoose.model("AcademicCalendar", academicCalendarSchema);