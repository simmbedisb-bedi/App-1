require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const { initTwilio }       = require("./services/smsService");
const { startScheduler }   = require("./services/schedulerService");

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/checklist",     require("./routes/checklist"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/workout",       require("./routes/workout"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌸 Routine Tracker Server running on port ${PORT}\n`);
  initTwilio();
  startScheduler();
});
