require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Root route (moved ABOVE for cleaner structure)
app.get("/", (req, res) => {
  res.send("VisionAssist Backend Running");
});

// API routes
app.use("/api/auth", authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});