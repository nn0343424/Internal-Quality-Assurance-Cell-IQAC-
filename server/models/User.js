const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: String,

  // ✅ FIX: removed enum restriction (VERY IMPORTANT)
  role: {
    type: String,
    default: "faculty",
  },

  department: String,

  collegeEmail: String,
});

module.exports = mongoose.model("User", userSchema);