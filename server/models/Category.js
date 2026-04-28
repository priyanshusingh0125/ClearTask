const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  color: {
    type: String,
    default: "#8b5cf6"
  }

}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);