const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  journal: String,
  year: String,
  type: String, // research paper / FDP / workshop
});

module.exports = mongoose.model("Research", researchSchema);