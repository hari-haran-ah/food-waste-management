// src/pages/BookingDonationPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDonations } from '../api/donationApi';
import AppIcon from '../components/AppIcon';
import FoodCard from '../components/FoodCard'; 

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
    return <div className="text-center text-lg text-gray-500">Loading donations...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <span>FOOD DONATE APP</span>
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

      <main className="mt-24 px-4">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6">Available Donations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {donations.map((donation) => (
            <FoodCard
              key={donation._id}
              foodName={donation.foodName}
              quantity={donation.quantity}
              phoneNumber={donation.phoneNumber}
              username={donation.username}
              isBooked={donation.isBooked}
              onDelete={() => console.log('Delete donation')}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default BookingDonationPage;
