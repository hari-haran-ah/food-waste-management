const mongoose = require('mongoose');

// Define the Donation schema
const donationSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  quantity: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  username: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  bookedBy: { type: String, default: null },
  location: { type: String, required: true },
}, { timestamps: true });

// Create and export the Donation model
module.exports = mongoose.model('Donation', donationSchema);
