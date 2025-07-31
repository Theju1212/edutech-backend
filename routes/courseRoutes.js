// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Add Course
router.post("/add", async (req, res) => {
  try {
    const { title, category, image } = req.body;
    const course = new Course({ title, category, image });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit Course
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Course
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
