const express = require('express');
const Donation = require('../models/Donation'); // Assuming Donation model exists
const router = express.Router();

// POST route to create a donation
router.post('/create', async (req, res) => {
  const { foodName, quantity, phoneNumber, username, location } = req.body;

  if (!foodName || !quantity || !phoneNumber || !username || !location) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newDonation = new Donation({
      foodName,
      quantity,
      phoneNumber,
      username,
      location,
      isBooked: false, // Default status is false (available)
    });

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

// Route to book a donation using PATCH method
router.patch('/book/:donationId', async (req, res) => {
  const { donationId } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    if (donation.isBooked) {
      return res.status(400).json({ message: 'This donation is already booked' });
    }

    donation.isBooked = true;
    donation.bookedBy = username;

    await donation.save();

    res.status(200).json({
      message: 'Donation booked successfully',
      donation,
    });
  } catch (error) {
    console.error('Error booking donation:', error);
    res.status(500).json({ message: 'Error booking donation' });
  }
});

// Route to delete a donation
router.delete('/delete/:id', async (req, res) => {
  const donationId = req.params.id;

  try {
    const donation = await Donation.findByIdAndDelete(donationId);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

module.exports = router;
