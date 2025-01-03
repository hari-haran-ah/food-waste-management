import axios from 'axios';

const API_URL = 'http://localhost:5000/api/donations';

// Function to post a new donation
export const postDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, donationData, {
      withCredentials: true, // Send cookies (JWT)
    });
    return response;
  } catch (error) {
    console.error('Donation Post Error:', error.response ? error.response.data : error.message);
    throw error; // Propagate error for handling in the component
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
    console.error('Error fetching donations:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (donationId, isBooked) => {
  try {
    const response = await axios.post(`${API_URL}/book`, {
      donationId,
      isBooked,
      username: 'User123', // Replace with logged-in username
    }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating booking status:', error);
    throw error;
  }
};
