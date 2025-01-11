import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDonations } from '../api/donationApi';
import { updateBookingStatus } from '../api/donationApi';
import AppIcon from '../components/AppIcon';
import FoodCard from '../components/FoodCard';

const BookingDonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // State for handling error messages
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false); // To track booking success
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const navigate = useNavigate();

  // Fetch available donations on page load
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsData = await getDonations();
        const availableDonations = donationsData.filter((donation) => !donation.isBooked);
        setDonations(availableDonations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
        setLoading(false);
        alert('Failed to fetch donations. Please try again later.');
      }
    };

    fetchDonations();
  }, []);

  // Handle the booking action
  const handleBooking = (donationId) => {
    const donation = donations.find((donation) => donation._id === donationId);
    if (donation && donation.isBooked) {
      setErrorMessage('This donation has already been booked.');
      return;
    }

    setSelectedDonationId(donationId);
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmBooking = async () => {
    try {
      const result = await updateBookingStatus(selectedDonationId, 'User123'); // Replace 'User123' with the logged-in username
      if (result.success) {
        // Update the donation list after successful booking
        setDonations((prevDonations) =>
          prevDonations.map((donation) =>
            donation._id === selectedDonationId ? { ...donation, isBooked: true } : donation
          )
        );
        setIsBookingSuccess(true);
        setIsModalOpen(false); // Close the modal
      } else {
        setErrorMessage('Failed to book donation. Please try again later.');
        setIsModalOpen(false); // Close the modal on error
      }
    } catch (error) {
      console.error('Failed to book donation', error);
      setErrorMessage(error.message); // Display error message from the API
      setIsModalOpen(false); // Close the modal on error
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal if the user cancels
    setErrorMessage('');
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading donations...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
            <button
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate('/history')}
            >
              History
            </button>
          </div>
        </div>
      </header>
      <main className="mt-24 px-4">
        <h2 className="text-3xl text-blue-800 font-semibold mb-6 ml-1">Available Donations</h2>

        {/* If there are no donations available, show the 'Food not available' message */}
        {donations.length === 0 ? (
          <p className="text-center text-lg text-gray-500">Food not available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {donations.map((donation) => (
              <FoodCard
                key={donation._id}
                foodName={donation.foodName}
                quantity={donation.quantity}
                phoneNumber={donation.phoneNumber}
                location={donation.location}
                username={donation.username}
                isBooked={donation.isBooked}
                onBook={() => handleBooking(donation._id)} // Pass the booking function
              />
            ))}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

        {/* Success Modal */}
        {isBookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 opacity-100">
            <div className="bg-white p-6 rounded-md shadow-xl transform scale-95 transition-all duration-300 ease-in-out">
            <p className="text-green-500 text-lg font-semibold">Booking Successful!</p>
            <button
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
              onClick={() => navigate('/booking-food')}
            >
            OK
            </button>
            </div>
        </div>
)}


        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 opacity-100">
            <div className="bg-white p-6 rounded-md shadow-xl transform scale-95 transition-all duration-300 ease-in-out">
              <p className="text-lg font-semibold text-gray-700">Are you sure you want to book this donation?</p>
              <div className="mt-4 flex space-x-4">
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-full transition duration-300 hover:bg-red-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-600"
                  onClick={confirmBooking}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingDonationPage;
