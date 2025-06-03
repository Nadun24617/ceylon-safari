const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // sorted by date ascending
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching events' });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  const { date, text, createdBy } = req.body;

  const newEvent = new Event({
    date,
    text,
    createdBy,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Optionally: Delete an event by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
