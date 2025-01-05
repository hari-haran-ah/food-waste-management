import React from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this is installed
import AppIcon from '../components/AppIcon'; // Import your AppIcon component correctly

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-blue-800">
      {/* Header Section */}
      <header className="bg-blue-800 p-4 w-full z-10 fixed top-0 left-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-white">
            FOOD DONATE APP
          </h1>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <div className="flex space-x-4">
            <button
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate('/home')}
            >
              Home
            </button>
          </div>
        </div>
      </header>
<br /><br /><br />
      {/* About Content Section */}
      <main className="pt-24 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center text-blue-800">
        <h2 className="text-4xl font-semibold mb-6">About the Food Donate App</h2>
        <p className="text-lg mb-6 max-w-xl">
          The Food Donate App is designed to help people donate and book food for those in need. Our mission is to create a platform where people can easily donate surplus food or book food for themselves, ensuring that no food goes to waste. We believe in making food donation easy, accessible, and impactful.
        </p>
        <p className="text-lg max-w-xl">
          Thank you for supporting this cause! Together, we can make a difference in the community.
        </p>
      </main>
    </div>
  );
};

export default About;
