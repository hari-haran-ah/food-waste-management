// pages/SignInPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../api/auth';
import SignInForm from '../components/SignInForm';
import { motion } from 'framer-motion';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await signIn({ email, password });
      localStorage.setItem('user', JSON.stringify(response.data)); // Store user info in localStorage
      navigate('/home'); // Navigate to HomePage after successful sign-in
    } catch (err) {
      setError('Invalid email or password'); // Show error if login fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fixed Header at the Top of the Window */}
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="w-full p-6 bg-white shadow-lg flex justify-between items-center fixed top-0 left-0 z-50">
          <h1 className="text-4xl font-semibold text-blue-600">FOOD DONATE APP</h1>

          {/* Sign Up Button in Header Right Side */}
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Motion div for animated background */}
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-white pt-20" // Add padding-top to prevent overlap with fixed header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }} // Added delay for the page fade-in animation
      >
        {/* Motion div for animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'linear',
          }}
          style={{ backgroundSize: '400% 400%' }}
        />

        <div className="relative w-full max-w-sm p-6 bg-white rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <motion.h1
            className="text-3xl font-semibold text-center mb-6 text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }} // Delay for the title animation
          >
            Sign In
          </motion.h1>

          {/* SignInForm Component */}
          <SignInForm onSignIn={handleSignIn} loading={loading} error={error} />

          {/* Error Message */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          {/* Sign Up Navigation */}
          <div className="mt-4 text-center">
            <p className="text-sm">Don't have an account?</p>
            <button
              className="text-blue-500 underline hover:text-blue-700 transition duration-300"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SignInPage;
