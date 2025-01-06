import axios from 'axios';

const API_URL = 'http://localhost:5000/api/donations'; // Corrected API URL for backend

// Function to post a new donation
export const postDonation = async (donationData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, donationData, {
      withCredentials: true, // Send cookies (JWT)
    });
    return response.data;
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
    console.error('Error fetching donations:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to update booking status
export const updateBookingStatus = async (donationId, username) => {
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/donations/book/${donationId}`,
      { username },
      { withCredentials: true }
    );

    // If the response contains a success message, return it
    if (response.data.message === "Donation booked successfully") {
      return { success: true, donation: response.data.donation }; // Return success and the updated donation data
    }

    // If no success message is found, throw an error
    throw new Error('Failed to book donation');

  } catch (error) {
    // Check if the error is due to the donation already being booked
    if (error.response && error.response.data && error.response.data.message === 'This donation is already booked') {
      console.error('This donation is already booked');
      throw new Error('This donation is already booked');  // Throw a specific error for UI handling
    } else {
      console.error('Error booking donation:', error.response ? error.response.data : error.message);
      throw error;  // Propagate the error for handling in the component
    }
  }
};


// Function to delete a donation
export const deleteDonation = async (donationId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${donationId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting donation:', error);
    throw error;
  }
};
