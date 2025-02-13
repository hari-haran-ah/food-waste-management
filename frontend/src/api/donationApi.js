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
export const updateBookingStatus = async (donationId, username) => {
  try {
    const response = await apiClient.patch(`/api/donations/book/${donationId}`, { username });

    if (response.data.message === "Donation booked successfully") {
      return { success: true, donation: response.data.donation };
    }

    throw new Error('Failed to book donation');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message === 'This donation is already booked') {
      console.error('This donation is already booked');
      throw new Error('This donation is already booked');
    } else {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      console.error('Error booking donation:', errorMessage);
      throw new Error(errorMessage);
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