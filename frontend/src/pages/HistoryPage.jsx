import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations, deleteDonation } from '../api/donationApi';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleDelete = async (id) => {
    try {
      await deleteDonation(id);
      setIsDeleted(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting donation:', error);
      alert('Failed to delete donation');
    }
  };

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-white">
              FOOD DONATE APP
            </h1>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <button
            className="text-white border-2 border-white px-5 py-3 rounded hover:bg-white hover:text-blue-800 transition duration-300"
            onClick={() => navigate('/home')}
          >
            Home
          </button>
        </div>
      </header>

      <h2 className="text-3xl text-blue-800 font-semibold mb-4 mt-20">Donation History</h2>
      <div className="space-y-4">
        <AnimatePresence>
          {history.map((donation) => (
            <motion.div
              key={donation._id}
              className="bg-white p-4 rounded-lg shadow-md opacity-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-xl font-medium">
                {donation.foodName}
              </h3>
              <p>Quantity: {donation.quantity}</p>
              <p>Contact: {donation.phoneNumber}</p>
              <p>Posted by: {donation.username}</p>
              <p>Status: {donation.isBooked ? 'Booked' : 'Available'}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HistoryPage;
