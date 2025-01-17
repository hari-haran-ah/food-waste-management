import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your API URL

// SignIn function
export const signIn = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, data);
    return response;
  } catch (error) {
    throw error; // This will propagate the error for handling in the component
  }
};

// SignUp function
export const signUp = async ({ name, email, password, confirmPassword }) => {
  try {
    // Ensure payload has required data
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const payload = { name, email, password, confirmPassword };

    const response = await axios.post(`${API_URL}/signup`, payload);
    return response.data;
  } catch (error) {
    console.error('SignUp Error:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // Error message from backend
    } else {
      throw new Error(error.message); // General error message
    }
  }
};
