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
  const [isModalOpen, setIsModalOpen] = useState(false); // To manage pop-up modal

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
      setIsModalOpen(true); // Show success modal
    } catch (error) {
      setError('Failed to post donation. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 flex flex-col items-center justify-center">
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">FOOD DONATE APP<AppIcon className="inline-block ml-1" /></h1>
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
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <DonationPostForm
          donationDetails={donationDetails}
          setDonationDetails={setDonationDetails}
          handleFormSubmit={handleFormSubmit}
        />
      </div>

      {/* Animated Modal Popup */}
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
                  navigate('/donating-food'); // Navigate back to home after closing the modal
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
