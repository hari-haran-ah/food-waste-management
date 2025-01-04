// pages/SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth'; // Ensure this points to your API method
import SignUpForm from '../components/SignUpForm'; // Ensure this is the correct path for your form
import AppIcon from '../components/AppIcon';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Single error state
  const navigate = useNavigate();

  // Handle the signup process
  const handleSignUp = async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(''); // Reset any previous error message to avoid duplication
    try {
      const response = await signUp({ name, email, password, confirmPassword });

      // If signup is successful, navigate to the sign-in page
      navigate('/'); // You can redirect to login page after successful signup
    } catch (err) {
      // Only set the error if it's not already set (avoid duplicate errors)
      if (!error) {
        if (err.response && err.response.data.message === 'User already exists') {
          setError('User already exists. Please use a different email.');
        } else {
          setError('Error signing up. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
      {/* Header */}
      <header className="w-full p-6 bg-white shadow-lg flex justify-between items-center fixed top-0 left-0 z-50">
      <h1 className="text-3xl text-blue-600 font-bold flex items-center whitespace-nowrap">FOOD DONATE APP
      <AppIcon className="inline-block ml-1" /></h1> 
        {/* Button for Sign In navigation */}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-sm sm:max-w-md p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mt-24">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>

        {/* Render the form */}
        <SignUpForm onSignUp={handleSignUp} loading={loading} error={error} />

        {/* Render error message only once at the bottom */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            className="text-blue-500 underline hover:text-blue-700 transition duration-300"
            onClick={() => navigate('/')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
