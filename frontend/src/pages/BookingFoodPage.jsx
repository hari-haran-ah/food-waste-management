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
        const availableDonations = donationsData.filter((donation) => !donation.isBooked);
        setDonations(availableDonations);
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">
              FOOD DONATE APP
            </h1>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <div className="flex space-x-4">
            <button
              className="text-white border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate('/home')}
            >
              Home
            </button>
            <button
              className="text-white border-2 border-white px-4 py-2 rounded hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
        </div>
      </header>

      <h2 className="text-3xl text-blue-800 font-semibold mb-4 mt-20">Available Donations</h2>
      <div className="space-y-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white p-4 rounded-lg shadow-md opacity-100"
          >
            <h3 className="text-xl font-medium">
              <Link to={`/donation/${donation._id}`} className="text-blue-500 hover:underline">
                {donation.foodName}
              </Link>
            </h3>
            <p>Quantity: {donation.quantity}</p>
            <p>Contact: {donation.phoneNumber}</p>
            <p>Posted by: {donation.username}</p>
            <p>Status: Available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingDonationPage;
