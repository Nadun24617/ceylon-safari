const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: String, required: true }, // user email or id
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
