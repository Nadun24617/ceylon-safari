// server.js
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 5000;

const BOOKING_API_KEY = 'YOUR_API_KEY';  // Replace with your actual API key
const API_URL = 'https://api.booking.com/v1/hotels';  // Example endpoint

app.get('/api/hotels', async (req, res) => {
  try {
    const { city, checkin_date, checkout_date } = req.query;

    // Fetch hotel data from Booking.com API
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${BOOKING_API_KEY}`, // Or use Basic Authentication if required
      },
      params: {
        city_ids: city,  // Specify city or location
        checkin_date,
        checkout_date,
        rows: 5,  // Limit to 5 results for example
      },
    });

    // Send the hotel data to the frontend
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
