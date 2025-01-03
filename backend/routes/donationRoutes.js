const express = require('express');
const Donation = require('../models/Donation'); // Assuming Donation model exists
const router = express.Router();

// POST route to create a donation
router.post('/create', async (req, res) => {
  const { foodName, quantity, phoneNumber, username } = req.body;

  // Validate input
  if (!foodName || !quantity || !phoneNumber || !username) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Create a new donation entry
    const newDonation = new Donation({
      foodName,
      quantity,
      phoneNumber,
      username,
    });

    // Save the donation to the database
    await newDonation.save();
    res.status(201).json({ message: 'Donation posted successfully!', donation: newDonation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating donation post.' });
  }
});

// Route to get all donations
router.get('/all', async (req, res) => {
  try {
    const donations = await Donation.find(); // Assuming you have a Donation model
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// Route to update booking status
// Add route to update booking status
router.post('/book', async (req, res) => {
    const { donationId, isBooked } = req.body;
  
    try {
      // Find the donation by its ID and update its booking status
      const donation = await Donation.findByIdAndUpdate(donationId, { isBooked }, { new: true });
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      res.status(200).json({ message: 'Booking status updated', donation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating booking status' });
    }
  });
  
module.exports = router;
