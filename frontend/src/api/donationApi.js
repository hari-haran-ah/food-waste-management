import apiClient from './apiClient';

// Function to post a new donation
export const postDonation = async (donationData) => {
  try {
    const response = await apiClient.post('/api/donations/create', donationData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('Donation Post Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to get all donations
export const getDonations = async () => {
  try {
    const response = await apiClient.get('/api/donations/all');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('Error fetching donations:', errorMessage);
    throw new Error(errorMessage);
  }
};

// Function to update booking status
// Assuming you have an apiClient for handling axios requests

export const updateBookingStatus = async (donationId, username) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem('user');  // Ensure 'user' is actually storing the JWT token
    if (!token) {
      throw new Error('You need to be logged in to book a donation.');
    }

    // Make the API request to book the donation
    const response = await apiClient.patch(
      `/api/donations/book/${donationId}`,
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      }
    );

    // Check the response for success
    if (response.data.message === "Donation booked successfully") {
      return { success: true, donation: response.data.donation };
    }

    // If no success message, throw an error
    throw new Error('Failed to book donation');
  } catch (error) {
    // Handle different types of errors more gracefully
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || 'An unexpected error occurred';
      if (errorMessage === 'This donation is already booked') {
        console.error('This donation is already booked');
        throw new Error('This donation is already booked');
      } else {
        console.error('Error booking donation:', errorMessage);
        throw new Error(errorMessage);
      }
    } else {
      const generalErrorMessage = error.message || 'An error occurred while booking donation';
      console.error('Error booking donation:', generalErrorMessage);
      throw new Error(generalErrorMessage);
    }
  }
};


// Function to delete a donation
export const deleteDonation = async (donationId) => {
  try {
    const response = await apiClient.delete(`/api/donations/delete/${donationId}`);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('Error deleting donation:', errorMessage);
    throw new Error(errorMessage);
  }
};