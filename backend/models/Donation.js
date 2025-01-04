const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    foodName: { type: String, required: true },
    quantity: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    username: { type: String, required: true },
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: String, default: '' },  // Track who booked the donation
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
