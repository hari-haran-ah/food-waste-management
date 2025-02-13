import apiClient from './apiClient';

// SignIn function
export const signIn = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/signin', data,{ withCredentials: true });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('SignIn Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

// SignUp function
export const signUp = async ({ name, email, password, confirmPassword }) => {
  try {
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const payload = { name, email, password, confirmPassword };
    const response = await apiClient.post('/api/auth/signup', payload);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    console.error('SignUp Error:', errorMessage);
    throw new Error(errorMessage);
  }
};