// pages/DonatingFoodPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDonation } from '../api/donationApi';
import DonationPostForm from '../components/DonationPostForm';
import { motion } from 'framer-motion';
import AppIcon from '../components/AppIcon';

const DonationFoodPage = () => {
  const navigate = useNavigate();
  const [donationDetails, setDonationDetails] = useState({
    foodName: '',
    quantity: '',
    phoneNumber: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage pop-up modal

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDonation(donationDetails);
      setSuccessMessage('Donation posted successfully!');
      setIsModalOpen(true); // Show success modal
      setDonationDetails({
        foodName: '',
        quantity: '',
        phoneNumber: '',
        username: '',
      });
    } catch (error) {
      setError('Failed to post donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-center">
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
        <h1 className="text-3xl text-blue-600 font-bold inline-block flex items-center whitespace-nowrap">FOOD DONATE APP
        <AppIcon className="inline-block ml-1" /></h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/home')}
          >
            Home
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-grow pt-20 pb-10">
        <h2 className="text-3xl font-semibold text-white mb-2">Post a Donation</h2>
        {successMessage && (
          <motion.div
            className="text-green-500 mb-4 p-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <DonationPostForm
          donationDetails={donationDetails}
          setDonationDetails={setDonationDetails}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default DonationFoodPage;
