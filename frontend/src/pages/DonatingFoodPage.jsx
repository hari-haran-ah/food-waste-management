import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDonation } from '../api/donationApi';
import DonationPostForm from '../components/DonationPostForm';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDonation(donationDetails);
      setDonationDetails({
        foodName: '',
        quantity: '',
        phoneNumber: '',
        username: '',
      });
      setIsModalOpen(true);
    } catch (error) {
      setError('Failed to post donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">FOOD DONATE APP</h1>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <button
            onClick={() => navigate('/home')}
            className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
          >
            Home
          </button>
        </div>
      </header>

      <br />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Post a Donation</h2>
        {error && <p className="text-red-600 text-center mt-4 bg-red-100 p-2 rounded">{error}</p>}
        <DonationPostForm
          donationDetails={donationDetails}
          setDonationDetails={setDonationDetails}
          handleFormSubmit={handleFormSubmit}
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <h3 className="text-xl font-bold text-center text-green-600">
                Thank You for Your Donation!
              </h3>
              <p className="text-center mt-2">Your generosity is greatly appreciated.</p>
              <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsModalOpen(false);
                  navigate('/donating-food');
                }}
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationFoodPage;
