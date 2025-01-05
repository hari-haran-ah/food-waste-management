import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import AppIcon from '../components/AppIcon';

const HomePage = () => {
  const navigate = useNavigate();
  const [showDonationPost, setShowDonationPost] = useState(false);

  const handleDonationPostClick = () => {
    setShowDonationPost(true);
  };

  const handleSignOut = () => {
    Cookies.remove('user');
    navigate('/');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white"
    >
      <header className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="flex justify-between items-center px-6 max-w-7xl mx-auto">
          <motion.h1 
            className="text-3xl font-bold inline-block flex items-center whitespace-nowrap"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            FOOD DONATE APP
            <AppIcon className="inline-block ml-2 animate-bounce" />
          </motion.h1>
          <div className="flex space-x-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-white px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/about')}
            >
              About
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="text-white px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition duration-300"
              onClick={handleSignOut}
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl font-bold mb-6 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Food Donate App
        </motion.h2>
        <motion.p 
          className="text-xl mb-10 text-center max-w-2xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Choose an action to make a difference in your community!
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-600 transition duration-300 shadow-lg"
            onClick={() => navigate('/donating-food')}
          >
            Donate Food
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-yellow-600 transition duration-300 shadow-lg"
            onClick={() => navigate('/booking-food')}
          >
            Book Food
          </motion.button>
        </div>

        {showDonationPost && (
          <motion.div 
            className="mt-10 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Donation Post Section</h3>
            <p className="text-lg">Here you can add your donation post details...</p>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default HomePage;

