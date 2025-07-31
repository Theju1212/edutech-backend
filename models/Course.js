// models/Course.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  category: { type: String, enum: ['Academic', 'Skill Development'] },
  image: String,
});

module.exports = mongoose.model("Course", courseSchema);
