const router = require("express").Router();
const Category = require("../models/Category");
const mongoose = require("mongoose");


// ➕ ADD CATEGORY
router.post("/", async (req, res) => {
  try {
    const { userId, name, color } = req.body;

    if (!userId || !name) {
      return res.status(400).json("Missing required fields");
    }

    const category = await Category.create({
      userId,
      name,
      color: color || "#8b5cf6"
    });

    res.json(category);

  } catch (err) {
    console.error("ADD CATEGORY ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});


// 📋 GET ALL CATEGORIES (USER WISE)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.query.userId
    }).sort({ createdAt: -1 });

    res.json(categories);

  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔍 GET SINGLE CATEGORY
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json("Category not found");

    res.json(category);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ✏️ UPDATE CATEGORY
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    const { name, color } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, color },
      { new: true }
    );

    if (!updated) return res.status(404).json("Category not found");

    res.json(updated);

  } catch (err) {
    console.error("UPDATE CATEGORY ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});


// ❌ DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json("Category Deleted Successfully");

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;