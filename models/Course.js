const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  category: String,
  subject: String,
  type: String,
  description: String,
    imageUrl: String,       // admin can include image URL
  videoId: String         // optional: YouTube video ID
});

module.exports = mongoose.model('Course', courseSchema);
