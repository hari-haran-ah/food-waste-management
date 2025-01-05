//SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../api/auth';
import SignUpForm from '../components/SignUpForm';
import AppIcon from '../components/AppIcon';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (name, email, password, confirmPassword) => {
    if (error) setError(''); // Clear previous error
    setLoading(true);

    try {
      const response = await signUp({ name, email, password, confirmPassword });
      console.log("Sign up successful:", response);
      navigate('/');
    } catch (err) {
      console.error("Sign Up Error:", err);
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="fixed top-0 left-0 w-full z-10 p-4 bg-blue-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-white">
            FOOD DONATE APP
          </h1>
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
          >
            Sign In
          </button>
        </div>
      </header> 
      <br />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Sign Up
        </h2>
        <SignUpForm onSignUp={handleSignUp} loading={loading} error={error} />
        {error && (
          <p className="text-red-600 text-center mt-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm mb-2 text-blue-700">Already have an account?</p>
          <button
            className="text-blue-600 underline hover:text-blue-800 transition duration-300 text-sm font-medium"
            onClick={() => navigate('/')}
          >
            Sign In Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
