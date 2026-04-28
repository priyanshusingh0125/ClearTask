const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");


// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔴 validation
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    // 🔴 check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "User registered successfully",
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error("REGISTER ERROR 👉", err);
    res.status(500).json("Server error");
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔴 validation
    if (!email || !password) {
      return res.status(400).json("Email and password required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    // 🔐 compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    // ✅ SUCCESS RESPONSE
    res.json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error("LOGIN ERROR 👉", err);
    res.status(500).json("Server error");
  }
});

module.exports = router;