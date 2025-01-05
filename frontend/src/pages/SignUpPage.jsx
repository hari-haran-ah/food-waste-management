import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signUp } from '../api/auth';
import SignUpForm from '../components/SignUpForm';
import AppIcon from '../components/AppIcon';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = async (name, email, password, confirmPassword) => {
    if (error) setError(''); // Clear previous error

    setLoading(true);

    try {
      // Attempt to sign up the user
      const response = await signUp({ name, email, password, confirmPassword });

      // Handle successful response
      console.log("Sign up successful:", response);

      // Redirect on successful sign-up
      navigate('/'); 
    } catch (err) {
      console.error("Sign Up Error:", err);
      // Set error based on the response
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-green-400 via-blue-500 to-indigo-600"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 w-full z-10 p-4">
        <motion.div 
          className="max-w-7xl mx-auto flex justify-between items-center"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-white flex items-center space-x-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              FOOD DONATE APP
            </span>
            <AppIcon className="w-10 h-10 text-green-400" />
          </motion.h1>
          <motion.button
            onClick={() => navigate('/')}
            className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        </motion.div>
      </header>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="text-6xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600">
                Join Food Donate Today
              </span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl border border-white border-opacity-20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-white"
        >
          Sign Up
        </motion.h2>

        <SignUpForm onSignUp={handleSignUp} loading={loading} error={error} />

        <AnimatePresence>
          {error && (
            <motion.p
              className="text-red-400 text-center mt-4 bg-red-900 bg-opacity-50 p-2 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          className="mt-6 text-center text-white"
        >
          <p className="text-sm mb-2">Already have an account?</p>
          <motion.button
            className="text-green-400 underline hover:text-green-300 transition duration-300 text-lg font-semibold"
            onClick={() => navigate('/')}
          >
            Sign In Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;
