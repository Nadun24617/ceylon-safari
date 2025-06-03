const express = require('express');
const router = express.Router();
const Tourist = require('../models/Tourist');
const bcrypt = require('bcryptjs');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, country, passport, password } = req.body;

    const existing = await Tourist.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newTourist = new Tourist({ 
      fullName, 
      email, 
      country, 
      passport, 
      password: hashedPassword 
    });
    
    await newTourist.save();

    res.status(201).json({ message: 'Signup successful', user: newTourist });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const tourist = await Tourist.findOne({ email });
    if (!tourist) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, tourist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.json({ 
      message: "Login successful", 
      user: { 
        id: tourist._id, 
        fullName: tourist.fullName, 
        email: tourist.email 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

