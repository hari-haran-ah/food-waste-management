// pages/BookingFoodPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDonations } from '../api/donationApi';
import AppIcon from '../components/AppIcon';

const BookingDonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsData = await getDonations();
        setDonations(donationsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setLoading(false);
        alert('Failed to fetch donations. Please try again later.');
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <div>Loading donations...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
        <h1 className="text-3xl text-blue-600 font-bold inline-block flex items-center whitespace-nowrap">FOOD DONATE APP
        <AppIcon className="inline-block ml-1" /></h1>
          <div className="flex space-x-4">
            <button
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
              onClick={() => navigate('/home')}
            >
              Home
            </button>
            <button
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
        </div>
      </header>

      <h2 className="text-3xl text-white font-semibold mb-4 mt-20">Available Donations</h2>
      <div className="space-y-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className={`bg-white p-4 rounded-lg shadow-md ${donation.isBooked ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
          >
            <h3 className="text-xl font-medium">
              <Link to={`/donation/${donation._id}`} className="text-blue-500 hover:underline">
                {donation.foodName}
              </Link>
            </h3>
            <p>Quantity: {donation.quantity}</p>
            <p>Contact: {donation.phoneNumber}</p>
            <p>Posted by: {donation.username}</p>
            <p>Status: {donation.isBooked ? 'Booked' : 'Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDonationPage;
