require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const alertRoutes = require("./routes/alertRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

// Create HTTP server
const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.set("io", io);

// DB connect
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/alert", alertRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("VisionAssist Backend Running");
});

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

//Global error handler (must be last)
app.use(errorHandler);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});