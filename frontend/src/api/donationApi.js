import axios from 'axios';

const API_URL = 'http://localhost:5000/api/donations';
const HISTORY_API_URL = 'http://localhost:5000/api/history';

// Function to post a new donation
export const postDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, donationData, {
      withCredentials: true, // Send cookies (JWT)
    });
    return response.data;
  } catch (error) {
    handleError('Donation Post Error', error);
    throw error;
  }
};

// Function to get all donations
export const getDonations = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError('Error fetching donations', error);
    throw error;
  }
};

// Function to update booking status
export const updateBookingStatus = async (donationId, username) => {
  try {
    const response = await axios.post(
      `${API_URL}/book`,
      { donationId, username },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    handleError('Error updating booking status', error);
    throw error;
  }
};

// Function to get donation history
export const getHistory = async () => {
  try {
    const response = await axios.get(`${HISTORY_API_URL}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleError('Error fetching donation history', error);
    throw error;
  }
};

// Utility function to handle and log errors
const handleError = (message, error) => {
  console.error(`${message}:`, error.response ? error.response.data : error.message);
};
