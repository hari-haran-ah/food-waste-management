// components/DonationList.jsx
import React, { useState, useEffect } from 'react';
import { getDonations, updateBookingStatus } from '../api/donationApi';

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getDonations();
        setDonations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const handleBookingChange = async (donationId, currentStatus) => {
    try {
      const result = await updateBookingStatus(donationId, 'User123'); // Replace 'User123' with the logged-in username
      if (result.success) {
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation._id !== donationId)
        );
      }
    } catch (error) {
      console.error('Failed to book donation', error);
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading donations...</div>;
  }

  return (
    <div className="space-y-6">
      {donations.map((donation) => (
        <div key={donation._id} className="p-6 bg-white shadow-md rounded-md">
          <h3 className="font-semibold text-xl text-blue-600">{donation.foodName}</h3>
          <p className="text-gray-600">{donation.quantity} units</p>
          <p className="text-gray-600">Contact: {donation.phoneNumber}</p>
          <p className="text-gray-600">Posted by: {donation.username}</p>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={donation.isBooked}
              onChange={() => handleBookingChange(donation._id, donation.isBooked)}
              className="mr-2"
            />
            <span className="text-gray-600">{donation.isBooked ? 'Booked' : 'Available'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
