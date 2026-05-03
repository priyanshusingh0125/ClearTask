const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

const connectDB = require("./config/db");

const app = express();

connectDB();


const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://clear-task-mu.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors());

app.use((err, req, res, next) => {
  console.error("SERVER ERROR 👉", err);
  res.status(500).json("Server error");
});

app.use(express.json());

// ✅ UPLOAD FOLDER AUTO CREATE
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

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

