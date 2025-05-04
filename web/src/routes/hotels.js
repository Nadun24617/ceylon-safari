import express from 'express';
import Hotel from '../models/Hotel.js'; // use relative path with forward slashes

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
