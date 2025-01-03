const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
