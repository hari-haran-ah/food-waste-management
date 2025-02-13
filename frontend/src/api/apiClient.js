import axios from 'axios';

// Create an Axios instance with base URL and default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', // Base URL for all requests
  withCredentials: true, // Send cookies (JWT) with every request
});

export default apiClient;