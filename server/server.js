const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
  origin: [
    "https://clear-task-mu.vercel.app",
    "http://localhost:3000"
  ]
}));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/todos", require("./routes/todoRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/uploads", express.static("uploads"));

// test route
app.get("/", (req, res) => {
  res.send("Priyanhu's Backend is running");
});

// server start
app.listen(5001, () => {
  console.log("Server running on port 5001");
});

