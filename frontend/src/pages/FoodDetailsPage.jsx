// pages/FoodDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDonations, updateBookingStatus } from '../api/donationApi';

const FoodDetailsPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for success popup
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonationDetails = async () => {
      try {
        const donationsData = await getDonations();
        const selectedDonation = donationsData.find((d) => d._id === id);
        setDonation(selectedDonation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donation details:', error);
        alert('Failed to load donation details');
        setLoading(false);
      }
    };

    fetchDonationDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      await updateBookingStatus(id, true);
      setDonation((prev) => ({ ...prev, isBooked: true }));
      setShowConfirmation(false);
      setShowSuccess(true); // Show success popup
      setTimeout(() => setShowSuccess(false), 3000); // Automatically hide after 3 seconds
    } catch (error) {
      console.error('Error booking donation:', error);
      alert('Failed to book donation');
    }
  };

  if (loading) {
    return <div>Loading donation details...</div>;
  }

  if (!donation) {
    return <div>Donation not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-6">
      {/* Header */}
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">FOOD DONATE APP</h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/booking-food')}
          >
            Back
          </button>
        </div>
      </header>

      {/* Donation Details */}
      <div className="mt-20 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">{donation.foodName}</h2>
        <p>Quantity: {donation.quantity}</p>
        <p>Contact: {donation.phoneNumber}</p>
        <p>Posted by: {donation.username}</p>
        <p>Status: {donation.isBooked ? 'Booked' : 'Available'}</p>

        {!donation.isBooked && (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
            onClick={() => setShowConfirmation(true)}
          >
            Book This Donation
          </button>
        )}
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl">Are you sure you want to book this food?</h3>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 text-white p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl">Successfully booked the donation!</h3>
            <button
              className="bg-white text-green-500 px-4 py-2 rounded mt-4 hover:bg-green-600 hover:text-white transition"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailsPage;
