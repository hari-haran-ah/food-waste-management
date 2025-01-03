import React, { useEffect, useState } from 'react';
import { getDonations, updateBookingStatus } from '../api/donationApi';

const BookingDonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch donations on component mount
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsData = await getDonations();
        setDonations(donationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Handle booking status change
  const handleBookingChange = async (donationId, isBooked) => {
    try {
      await updateBookingStatus(donationId, isBooked);
      setDonations((prevDonations) =>
        prevDonations.map((donation) =>
          donation._id === donationId
            ? { ...donation, isBooked: isBooked }
            : donation
        )
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  // Disable checkbox if donation is already booked
  const isDisabled = (isBooked) => isBooked;

  if (loading) {
    return <div>Loading donations...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <h2 className="text-3xl text-white font-semibold mb-4">Available Donations</h2>
      <div className="space-y-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-medium">{donation.foodName}</h3>
              <p>Quantity: {donation.quantity}</p>
              <p>Contact: {donation.phoneNumber}</p>
              <p>Posted by: {donation.username}</p>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={donation.isBooked}
                  onChange={() => handleBookingChange(donation._id, !donation.isBooked)}
                  className="form-checkbox"
                  disabled={isDisabled(donation.isBooked)} // Disable if already booked
                />
                <span className="text-sm">Book Donation</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDonationPage;
