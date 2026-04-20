const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: String,
  year: String,
});

module.exports = mongoose.model("Student", studentSchema);