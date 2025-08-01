const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// POST a new course
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
});

// PUT update course
router.put('/:id', async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE course
router.delete('/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
