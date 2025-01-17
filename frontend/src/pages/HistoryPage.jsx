import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations, deleteDonation } from '../api/donationApi';
import { motion, AnimatePresence } from 'framer-motion';
import AppIcon from '../components/AppIcon';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
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
  }, []);

  const handleDeleteClick = (donation) => {
    setSelectedDonation(donation);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Send the delete request to the backend
      await deleteDonation(selectedDonation._id);

      // Update state after successful deletion (immutable update)
      setHistory((prevHistory) => {
        return prevHistory.filter((donation) => donation._id !== selectedDonation._id);
      });

      // Close the modal after deletion
      setIsModalOpen(false);

      // Show success toast with 5-second duration at the top-right corner
      toast.success('Donation deleted successfully!', {
        position: 'top-right',
        autoClose: 5000,
        style: {
          background: '#2b6cb0',
          color: 'white',
        },
      });
    } catch (error) {
      console.error('Error deleting donation:', error);
      toast.error('Failed to delete donation', {
        position: 'top-right',
        autoClose: 5000,
        style: {
          background: '#e53e3e',
          color: 'white',
        },
      });
    }
  };

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="bg-blue-800 p-4 w-full z-10 fixed top-0 left-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            FOOD DONATE APP
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
      <div className="pt-24 w-full max-w-7xl mb-96">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6">Donation History</h2>
        {history.length === 0 ? (
          <p className="text-center text-lg text-gray-500 mb-6">No History Available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {history.map((donation) => (
              <motion.div
                key={donation._id}
                className="bg-white p-4 rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-medium text-blue-800">{donation.foodName}</h3>
                  <svg
                    width="50px"
                    height="50px"
                    viewBox="0 0 1024 1024"
                    className="icon"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M359.8 368.7c-83.5 37-150 103.4-187.1 186.9-5.6 12.6 0.1 27.3 12.7 32.9 3.3 1.5 6.7 2.2 10.1 2.2 9.6 0 18.7-5.5 22.8-14.8 32.1-72.2 89.5-129.6 161.7-161.6 12.6-5.6 18.3-20.3 12.7-32.9-5.5-12.6-20.3-18.3-32.9-12.7z m214.6-108.5c7.2-11.8 11.6-25.5 11.6-40.3 0-42.8-34.7-77.4-77.4-77.4-42.8 0-77.4 34.7-77.4 77.4 0 14.8 4.4 28.6 11.6 40.3-216.7 31.9-383.5 219-383.5 444.4v54.1c0 13.8 11.2 25 25 25H933c13.8 0 25-11.2 25-25v-54.1c-0.1-225.4-167-412.4-383.6-444.4zM908 733.7H109.2v-29.1c0-220.2 179.2-399.3 399.4-399.3S908 484.4 908 704.6v29.1z m24.9 100.2H84.2c-13.8 0-25 11.2-25 25s11.2 25 25 25h848.7c13.8 0 25-11.2 25-25s-11.2-25-25-25z"
                      fill="#FCA128"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start w-full space-y-2">
                  <p className="text-gray-600">Quantity: {donation.quantity}</p>
                  <p className="text-gray-600">Contact: {donation.phoneNumber}</p>
                  <p className="text-gray-600">Location: {donation.location}</p>
                  <p className="text-gray-600">Posted by: {donation.username}</p>
                  <p className={`text-gray-600 font-semibold ${donation.isBooked ? 'text-green-600' : 'text-red-600'}`}>
                    Status: {donation.isBooked ? 'Booked' : 'Available'}
                  </p>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 w-full"
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
        {isModalOpen && (
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
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HistoryPage;
