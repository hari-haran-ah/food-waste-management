// src/pages/HistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations, deleteDonation } from '../api/donationApi';
import { motion, AnimatePresence } from 'framer-motion';
import FoodCard from '../components/FoodCard'; // Importing FoodCard component
import AppIcon from '../components/AppIcon';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const donationsData = await getDonations();
        const bookedDonations = donationsData.filter((donation) => donation.isBooked);
        setHistory(bookedDonations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
        alert('Failed to load history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isDeleted]);

  const handleDeleteClick = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDonation(selectedDonation._id);
      setIsDeleted(true);
      setHistory(history.filter((donation) => donation._id !== selectedDonation._id));
      setTimeout(() => {
        setIsModalOpen(false);
        setIsDeleted(false);
      }, 1000);
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation');
    }
  };

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            FOOD DONATE APP
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <button
            className="text-white border-2 border-white px-5 py-3 rounded hover:bg-white hover:text-blue-800 transition duration-300"
            onClick={() => navigate('/booking-food')}
          >
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 px-6 w-full max-w-7xl">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6">Donation History</h2>
        {history.length === 0 ? (
          <motion.p
            className="text-gray-600 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No history available
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((donation) => (
              <motion.div
                key={donation._id}
                className="bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FoodCard
                  foodName={donation.foodName}
                  quantity={donation.quantity}
                  phoneNumber={donation.phoneNumber}
                  username={donation.username}
                  isBooked={donation.isBooked}
                />
                {/* Delete Button */}
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                  onClick={() => handleDeleteClick(donation)}
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && !isDeleted && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-red-600 text-center">Confirm Delete</h3>
              <p className="text-center mt-2">This action cannot be undone.</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded mr-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleDeleteConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {isDeleted && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-green-600 text-center">
                Donation deleted successfully!
              </h3>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                onClick={() => setIsDeleted(false)}
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPage;
