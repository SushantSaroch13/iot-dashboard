const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

let devices = {};

// ✅ POST /update
router.post("/update", async (req, res) => {
  const data = req.body;

  if (!data || !data.device) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const entry = new Sensor({
    device: data.device,
    temperature: data.temperature,
    humidity: data.humidity,
    pressure: data.pressure,
    timestamp: new Date()
  });

  await entry.save();

  devices[data.device] = {
    ...data,
    lastUpdate: Date.now()
  };

  res.json({ message: "Saved" });
});

// ✅ GET /current
router.get("/current", async (req, res) => {
  const latest = await Sensor.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$device",
        device: { $first: "$device" },
        temperature: { $first: "$temperature" },
        humidity: { $first: "$humidity" },
        pressure: { $first: "$pressure" },
        timestamp: { $first: "$timestamp" }
      }
    }
  ]);

  res.json(latest);
});

module.exports = router;