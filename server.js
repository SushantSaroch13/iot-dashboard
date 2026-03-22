const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const dataRoutes = require("./routes/data");
const historyRoutes = require("./routes/history");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ CONNECT DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// ✅ REGISTER ROUTES (THIS WAS MISSING)
app.use("/", dataRoutes);
app.use("/history", historyRoutes);

// ✅ START SERVER
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});