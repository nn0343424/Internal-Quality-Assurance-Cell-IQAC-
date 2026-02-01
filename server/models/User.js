const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "faculty", "auditor"]
  },
  department: String,
  subject: String,
  mobile: String
});

module.exports = mongoose.model("User", userSchema);
