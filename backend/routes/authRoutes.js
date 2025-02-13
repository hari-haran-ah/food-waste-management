const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Sign-up Route
router.post('/signup', async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    
    // Trim input
    name = name.trim();
    email = email.trim().toLowerCase();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Create token
    const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

    // Send response
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign-in Route
router.post('/signin', async (req, res) => {
  try {
    let { email, password } = req.body;

    // Normalize input
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Exclude password from token payload
    const { password: _, ...userData } = user.toObject();

    // Create token
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });

    // Send token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
