// pages/HomePage.jsx
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [showDonationPost, setShowDonationPost] = useState(false); // Track whether to show the content

  // Function to handle clicking the "Donation Post" button
  const handleDonationPostClick = () => {
    // You can either navigate to a new page or show content at the bottom
    setShowDonationPost(true); // Show the content at the bottom
    // Alternatively, use navigate('/home/donation-post') to navigate to another page
    // navigate('/home/donation-post');
  };

  return (
    <>
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">FOOD DONATE APP</h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/')}
          >
            Sign Out
          </button>
        </div>
      </header>

      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-semibold mb-6">Welcome to Food Donate App</h2>
        <p className="text-lg mb-10 text-center">
          Choose an action to get started!
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Donation Post Button */}
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300"
            onClick={() => navigate('/donating-food')} // Handle button click to show content on the same page
          >
            Donation Food
          </button>

          {/* Booking the Donation Button */}
          <button
            className="bg-yellow-500 text-white ml-10 px-8 py-3 rounded-lg text-lg font-medium hover:bg-yellow-600 transition duration-300"
            onClick={() => navigate('/booking-food')} // Navigate to the booking page
          >
            Booking Food
          </button>
        </div>

        {/* Conditionally Render Donation Post Content Below */}
        {showDonationPost && (
          <div className="mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Donation Post Section</h3>
            <p className="text-lg">Here you can add your donation post details...</p>
            {/* You can add a form or additional content here for the donation post */}
          </div>
        )}
      </motion.div>

      {/* Render Nested Routes */}
      <Outlet />
    </>
  );
};

export default HomePage;
