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
      isBooked: false, // Default status is false (available)
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

// Route to book a donation
router.post('/book', async (req, res) => {
  const { donationId, username } = req.body;

  if (!donationId || !username) {
    return res.status(400).json({ message: 'Donation ID and username are required' });
  }

  try {
    // Find the donation by ID
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if the donation is already booked
    if (donation.isBooked) {
      return res.status(400).json({ message: 'This donation is already booked' });
    }

    // Update the booking status and the username of the person who booked it
    donation.isBooked = true;
    donation.bookedBy = username;  // Track who booked it (optional)

    // Save the updated donation
    await donation.save();

    res.status(200).json({
      message: 'Donation booked successfully',
      donation: donation,
    });
  } catch (error) {
    console.error('Error booking donation:', error);
    res.status(500).json({ message: 'Error booking donation' });
  }
});

module.exports = router;
