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
    const updatedStatus = !currentStatus; // Toggle the booking status
    try {
      const result = await updateBookingStatus(donationId, updatedStatus, 'User123'); // Replace 'User123' with the logged-in username
      console.log(result); // Handle success or updated donation data here
    } catch (error) {
      console.error('Failed to book donation', error);
    }
  };

  if (loading) {
    return <div>Loading donations...</div>;
  }

  return (
    <div>
      {donations.map(donation => (
        <div key={donation._id} className="p-4 bg-gray-100 mb-4 rounded-md">
          <h3 className="font-semibold text-xl">{donation.foodName}</h3>
          <p>{donation.quantity} units</p>
          <p>Contact: {donation.phoneNumber}</p>
          <p>Posted by: {donation.username}</p>
          <label>
            <input
              type="checkbox"
              checked={donation.isBooked}
              onChange={() => handleBookingChange(donation._id, donation.isBooked)}
            />
            Book Donation
          </label>
        </div>
      ))}
    </div>
  );
};

export default DonationList;
