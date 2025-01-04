import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations, deleteDonation } from '../api/donationApi';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '../components/AppIcon'; // Ensure the correct path for AppIcon

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
  }, []);

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
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      {/* Header */}
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold inline-flex items-center">
            FOOD DONATE APP <AppIcon className="ml-2" />
          </h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/booking-food')}
          >
            Back
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 px-6">
        <h2 className="text-3xl text-white font-semibold mb-4">Donation History</h2>
        {history.length === 0 ? (
          <motion.p
            className="text-white text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No history available
          </motion.p>
        ) : (
          history.map((donation) => (
            <motion.div
              key={donation._id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="text-xl font-medium">{donation.foodName}</h3>
              <p>Quantity: {donation.quantity}</p>
              <p>Posted by: {donation.username}</p>
              <p>Status: Booked</p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700"
                onClick={() => handleDeleteClick(donation)}
              >
                Delete
              </button>
            </motion.div>
          ))
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
              <h3 className="text-xl font-bold text-red-600 text-center">
                Confirm Delete
              </h3>
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
