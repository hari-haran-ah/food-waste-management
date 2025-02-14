import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AppIcon from "../components/AppIcon";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const [showDonationPost, setShowDonationPost] = useState(false);

  // Check if the user is authenticated on page load
  useEffect(() => {
    if (!user) {
      navigate("/home"); // Redirect to sign-in if user is not authenticated
    }
  }, [user, navigate]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  if (!user) {
    return null; // Optionally show a loading spinner or nothing until user data is validated
  }

  return (
    <motion.div className="min-h-screen bg-white text-blue-800 overflow-hidden">
      <header className="bg-blue-800 p-4 w-full z-10 fixed top-0 left-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
            FOOD DONATE APP
            <AppIcon className="inline-block ml-2 animate-pulse-slow" />
          </h1>
          <div className="flex space-x-4">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={() => navigate("/about")}
            >
              About
            </motion.button>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-white hover:text-blue-800 transition duration-300"
              onClick={logout} // Use logout from context
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>
      <br />
      <br />
      <br />
      <br />
      <main className="pt-24 px-4 max-w-7xl mx-auto ">
        <motion.h2
          className="text-5xl font-bold mb-6 text-center text-blue-800"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Food Donate App
        </motion.h2>
        <motion.p
          className="text-xl mb-10 text-center max-w-2xl mx-auto text-blue-700"
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
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
            onClick={() => navigate("/donating-food")}
          >
            Donate Food
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg"
            onClick={() => navigate("/booking-food")}
          >
            Book Food
          </motion.button>
        </div>
      </main>
    </motion.div>
  );
};

export default HomePage;
