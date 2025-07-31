// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Test route
router.get('/ping', (req, res) => {
  res.send('pong');
});

// Debug route to test reset-password API existence
router.get('/debug/reset', (req, res) => {
  res.send('✅ /api/reset-password route is live!');
});

// Register
router.post('/register', async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.json({ success: false, message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, phone, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.json({ success: false, message: 'Error in signup', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Incorrect password' });

    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.json({ success: false, message: 'Error in login', error: err.message });
  }
});

// Forgot Password - Check if email exists
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Email exists' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password (with hashing)
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
