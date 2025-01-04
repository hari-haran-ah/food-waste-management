import React from 'react';
import { motion } from 'framer-motion';

const SignInForm = ({ onSignIn, loading, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onSignIn(email, password);
  };

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <motion.input
          type="email"
          name="email"
          required
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          placeholder="Email address"
          variants={inputVariants}
          whileFocus="focus"
        />
      </div>
      <div>
        <motion.input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400"
          placeholder="Password"
          variants={inputVariants}
          whileFocus="focus"
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-yellow-500 hover:to-pink-600 transition duration-300"
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(250,204,21,0.7)' }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </motion.button>
    </form>
  );
};

export default SignInForm;

