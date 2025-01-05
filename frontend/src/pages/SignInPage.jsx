import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from '../api/auth';
import SignInForm from '../components/SignInForm';
import Cookies from 'js-cookie';
import { LucideHeart } from 'lucide-react';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await signIn({ email, password });
      Cookies.set('user', JSON.stringify(response.data), { expires: 7, secure: true, sameSite: 'Strict' });
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-animate"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-700 to-red-600 opacity-75"></div>
      
      <ParticlesBackground />

      <header className="fixed top-0 left-0 w-full z-10 p-6">
        <motion.div 
          className="max-w-7xl mx-auto flex justify-between items-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-white flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
              FOOD DONATE APP
            </span>
            <LucideHeart className="w-8 h-8 text-yellow-400 animate-pulse-slow" />
          </motion.h1>
          <motion.button
            onClick={() => navigate('/signup')}
            className="bg-white bg-opacity-20 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-opacity-30 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
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
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-gradient-x">
                Welcome to Food Donate
              </span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl border border-white border-opacity-20"
        initial={{ y: 50, opacity: 0, rotateX: -15 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Sign In
        </motion.h2>

        <SignInForm onSignIn={handleSignIn} loading={loading} error={error} />

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-sm mb-2">Don't have an account?</p>
          <motion.button
            className="text-yellow-400 underline hover:text-yellow-300 transition duration-300 text-lg font-semibold"
            onClick={() => navigate('/signup')}
            whileHover={{ scale: 1.05, textShadow: '0 0 8px rgb(250,204,21)' }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ParticlesBackground = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.7, 0],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  );
};

export default SignInPage;
