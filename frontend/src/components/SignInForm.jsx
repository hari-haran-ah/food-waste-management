import React from 'react';
import { motion } from 'framer-motion';
import { LucideUser, LucideLock } from 'lucide-react';

const SignInForm = ({ onSignIn, loading, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onSignIn(email, password);
  };

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    focus: { scale: 1.02, boxShadow: '0 0 20px rgba(255,255,255,0.3)' },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, boxShadow: '0 0 20px rgba(250,204,21,0.7)' },
    tap: { scale: 0.95 },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        className="relative"
        initial="initial"
        animate="animate"
        variants={inputVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LucideUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <motion.input
          type="email"
          name="email"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400 transition-all duration-300"
          placeholder="Email address"
          variants={inputVariants}
          whileFocus="focus"
        />
      </motion.div>
      <motion.div
        className="relative"
        initial="initial"
        animate="animate"
        variants={inputVariants}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <LucideLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <motion.input
          type="password"
          name="password"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400 transition-all duration-300"
          placeholder="Password"
          variants={inputVariants}
          whileFocus="focus"
        />
      </motion.div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-yellow-500 hover:to-pink-600 transition-all duration-300"
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        disabled={loading}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {loading ? (
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-6 h-6 border-t-2 border-b-2 border-white rounded-full mr-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Signing In...
          </motion.div>
        ) : (
          'Sign In'
        )}
      </motion.button>
    </form>
  );
};

export default SignInForm;

