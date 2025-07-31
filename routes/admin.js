const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Simple admin credentials (can move to .env or use JWT)
const ADMIN_EMAIL = 'admin@example.com';
const SECRET_KEY = '12345';

router.post('/test-login', (req, res) => {
  console.log("✅ TEST LOGIN HIT");
  res.json({ success: true });
});


router.post('/login', (req, res) => {
  const { email, key } = req.body;
  if (email === ADMIN_EMAIL && key === SECRET_KEY) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
});

router.get('/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

router.post('/courses', async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({ success: true, course: newCourse });
});

router.put('/courses/:id', async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/courses/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
