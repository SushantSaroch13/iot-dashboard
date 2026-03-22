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

// ✅ START LOCAL SERVER
// app.listen(3000, () => {
//   console.log("🚀 Server running at http://localhost:3000");
// });

// ✅ START PRODUCTION SERVER (VERCEL)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});