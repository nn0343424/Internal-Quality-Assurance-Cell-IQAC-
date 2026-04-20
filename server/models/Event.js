const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  type: String, // seminar, workshop, guest lecture
  date: Date,
  description: String,
  organizedBy: String,
});

module.exports = mongoose.model("Event", eventSchema);