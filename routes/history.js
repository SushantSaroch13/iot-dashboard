const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

// GET /history/:device
router.get("/:device", async (req, res) => {
    const device = req.params.device;
    const range = req.query.range;

    let query = Sensor.find({ device }).sort({ timestamp: -1 });

    if (range === "10latest") {
        query = query.limit(10);
    }
    else if (range === "10min") {
        query = query.find({
            timestamp: { $gte: new Date(Date.now() - 10 * 60 * 1000) }
        });
    }
    else if (range === "1h") {
        query = query.find({
            timestamp: { $gte: new Date(Date.now() - 60 * 60 * 1000) }
        });
    }
    else if (range === "24h") {
        query = query.find({
            timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });
    }

    let data;

    if (range === "10latest") {
        data = await query.limit(10);
    } else {
        data = await query; // ❌ NO LIMIT for time ranges
    }

    res.json(data.reverse());
});

module.exports = router;