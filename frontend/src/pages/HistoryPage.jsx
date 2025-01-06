import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations, deleteDonation } from '../api/donationApi';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '../components/AppIcon';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalWidth, setModalWidth] = useState('max-w-md'); // Modal width state
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
        setLoading(false);
        alert('Failed to load history');
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
      setModalWidth('max-w-sm'); // Reduce the width after confirmation
      setTimeout(() => {
        setIsModalOpen(false);
        setIsDeleted(false);
      }, 1000);
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation');
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter' && isModalOpen && !isDeleted) {
        handleDeleteConfirm();  // Trigger confirm action on Enter key
      }
    },
    [isModalOpen, isDeleted]
  );

  useEffect(() => {
    // Add event listener for "Enter" key
    window.addEventListener('keydown', handleKeyPress);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleOkClick = () => {
    setIsDeleted(false);
    setIsModalOpen(false);
    navigate('/history'); // Navigate to the history page after clicking "OK"
  };

  useEffect(() => {
    // Reset modal state on page refresh or reload
    setIsModalOpen(false);
    setIsDeleted(false);
  }, []);

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-24">
      {/* Header */}
      <header className="bg-blue-800 p-4 w-full z-10 fixed top-0 left-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <span>FOOD DONATE APP</span>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <div className="flex space-x-4">
            <button
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate('/booking-food')}
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="w-full max-w-7xl px-6 py-6 mt-24">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {history.map((donation) => (
              <motion.div
                key={donation._id}
                className="bg-white p-4 rounded-lg shadow-md relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Food Name on Top-Left */}
                <span className="absolute top-2 left-2 text-blue-800 text-sm font-bold">
                  {donation.foodName}
                </span>
                <div className="flex flex-col items-start w-full space-y-2 mt-6">
                  <p className="text-gray-600">Quantity: {donation.quantity}</p>
                  <p className="text-gray-600">Contact: {donation.phoneNumber}</p>
                  <p className="text-gray-600">Posted by: {donation.username}</p>
                  <p
                    className={`text-gray-600 font-semibold ${donation.isBooked ? 'text-green-600' : 'text-red-600'}`}
                  >
                    Status: {donation.isBooked ? 'Booked' : 'Available'}
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 w-full"
                    onClick={() => handleDeleteClick(donation)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isModalOpen && !isDeleted && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={`${modalWidth} bg-white p-8 rounded-xl shadow-lg transform scale-95 transition-all duration-300 ease-in-out`}>
              <h3 className="text-2xl text-blue-800 font-semibold text-center mb-4">
                Are you sure you want to delete?
              </h3>
              <p className="text-gray-800 text-center mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-between gap-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 w-full"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
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
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full transform scale-95 transition-all duration-300 ease-in-out">
              <h3 className="text-2xl text-green-600 font-semibold text-center mb-4">
                Donation Deleted Successfully!
              </h3>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full"
                onClick={handleOkClick} // Navigate to history page after clicking "OK"
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
