const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  
  userId: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ""
  },

  deadline: {
    type: Date,
    default: null
  },

  category: {
    type: String,
    default: ""
  },

  color: {
    type: String,
    default: "violet"
  },

  completed: {
    type: Boolean,
    default: false
  }

}, { timestamps: true }); // ✅ createdAt, updatedAt auto

module.exports = mongoose.model("Todo", todoSchema);