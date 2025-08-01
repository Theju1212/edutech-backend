const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  type: String,
  subject: String,
  description: String,
});

module.exports = mongoose.model('Course', courseSchema);
