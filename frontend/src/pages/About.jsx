// pages/About.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is installed
import AppIcon from '../components/AppIcon'; // Import your AppIcon component correctly

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex flex-col">
      {/* Header Section */}
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl text-blue-600 font-bold flex items-center whitespace-nowrap">
            FOOD DONATE APP
            <AppIcon className="ml-2" />
          </h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/home')}
          >
            Home
          </button>
        </div>
      </header>

      {/* About Content Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-white pt-20">
        <h2 className="text-4xl font-semibold mb-6">About the Food Donate App</h2>
        <p className="text-lg mb-6 text-center max-w-xl">
          The Food Donate App is designed to help people donate and book food for those in need. Our mission is to create a platform where people can easily donate surplus food or book food for themselves, ensuring that no food goes to waste. We believe in making food donation easy, accessible, and impactful.
        </p>
        <p className="text-lg text-center max-w-xl">
          Thank you for supporting this cause! Together, we can make a difference in the community.
        </p>
      </div>
    </div>
  );
};

export default About;
