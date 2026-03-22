const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  device: String,
  temperature: Number,
  humidity: Number,
  pressure: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", sensorSchema);