import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDonation } from '../api/donationApi';
import DonationPostForm from '../components/DonationPostForm';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '../components/AppIcon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DonationFoodPage = () => {
  const navigate = useNavigate();
  const [donationDetails, setDonationDetails] = useState({
    foodName: '',
    quantity: '',
    phoneNumber: '',
    username: '',
  });
  const [error, setError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // State for the confirmation modal

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDonation = async () => {
    try {
      await postDonation(donationDetails); // Post the donation
      setDonationDetails({
        foodName: '',
        quantity: '',
        phoneNumber: '',
        location: '',
        username: '',
      });
      setIsConfirmModalOpen(false); // Close the confirmation modal
      toast.success('Donation posted successfully!', {
        position: 'top-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#2b6cb0', // Correct bg-blue-800 color
          color: 'white', // White text for contrast
        },
      });
    } catch (error) {
      setError('Failed to post donation. Please try again.');
      toast.error('Failed to post donation. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        style: {
          backgroundColor: '#2b6cb0', // Correct bg-blue-800 color
          color: 'white', // White text for contrast
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <ToastContainer />
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <span>FOOD DONATE APP</span>
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmModalOpen && (
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
              <h3 className="text-xl font-bold text-center text-blue-800">
                Are you sure you want to post this food?
              </h3>
              <div className="flex justify-between mt-4">
                <motion.button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsConfirmModalOpen(false)} // Close the confirmation modal without posting
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmDonation} // Confirm and post the donation
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonationFoodPage;
