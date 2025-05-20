import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  pricePerNight: Number,
  availableRooms: Number,
  image: String
});

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
