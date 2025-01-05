import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDonations, updateBookingStatus } from '../api/donationApi';
import AppIcon from '../components/AppIcon';

const FoodDetailsPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
      setShowSuccess(true);
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
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white flex items-center space-x-2">
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

      <div className="pt-32 px-6 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-4xl font-bold mb-4">{donation.foodName}</h2>
          <p className="text-lg">Quantity: {donation.quantity}</p>
          <p className="text-lg">Contact: {donation.phoneNumber}</p>
          <p className="text-lg">Posted by: {donation.username}</p>
          <p className="text-lg">Status: {donation.isBooked ? 'Booked' : 'Available'}</p>

          {!donation.isBooked && (
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
              onClick={() => setShowConfirmation(true)}
            >
              Book This Donation
            </button>
          )}
        </div>
      </div>

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

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-500 text-white p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl">Successfully booked the donation!</h3>
            <button
              className="bg-white text-green-500 px-4 py-2 rounded mt-4 hover:bg-green-600 hover:text-white transition"
              onClick={() => {
                setShowSuccess(false);
                navigate('/booking-food');
              }}
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
