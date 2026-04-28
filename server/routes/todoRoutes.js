const router = require("express").Router();
const Todo = require("../models/Todo");
const mongoose = require("mongoose");


// ➕ ADD TASK
router.post("/", async (req, res) => {
  try {
    const { userId, title, description, deadline, category, color } = req.body;

    // 🔴 basic validation
    if (!userId || !title) {
      return res.status(400).json("Missing required fields");
    }

    const todo = await Todo.create({
      userId,
      title,
      description: description || "",
      deadline: deadline ? new Date(deadline) : null, // ✅ FIX
      category: category || "",
      color: color || "violet"
    });

    res.json(todo);

  } catch (err) {
    console.error("ADD TASK ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});


// 📋 VIEW ALL TASKS (USER WISE)
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({
      userId: req.query.userId
    }).sort({ createdAt: -1 });

    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});


// 🔍 VIEW SINGLE TASK
router.get("/:id", async (req, res) => {
  try {
    // ✅ ID validation
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json("Task not found");

    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✏️ EDIT TASK (ALL FIELDS)
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    const { title, description, deadline, category, color } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        deadline: deadline ? new Date(deadline) : null,
        category,
        color
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json("Task not found");
    }

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR 👉", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ TOGGLE COMPLETE
router.put("/toggle/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json("Task not found");

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ❌ DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid ID");
    }

    await Todo.findByIdAndDelete(req.params.id);

    res.json("Task Deleted Successfully");

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;