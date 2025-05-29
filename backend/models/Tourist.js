const mongoose = require('mongoose');

const touristSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  passport: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Tourist', touristSchema);
