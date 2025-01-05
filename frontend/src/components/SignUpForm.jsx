import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SignUpForm = ({ onSignUp, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return; // Optional: handle password mismatch in UI
    }
    onSignUp(name, email, password, confirmPassword);
  };

  const inputVariants = {
    focus: { 
      scale: 1.02, 
      boxShadow: '0 0 15px rgba(255,255,255,0.3)',
      transition: { type: 'spring', stiffness: 300 }
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: '0 0 20px rgba(74,222,128,0.7)' },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.6, pointerEvents: 'none' }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div variants={inputVariants} whileFocus="focus">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-green-400 transition duration-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </motion.div>
      <motion.div variants={inputVariants} whileFocus="focus">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-green-400 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </motion.div>
      <motion.div variants={inputVariants} whileFocus="focus">
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-green-400 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </motion.div>
      <motion.div variants={inputVariants} whileFocus="focus">
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-gray-300 focus:outline-none focus:border-green-400 transition duration-300"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </motion.div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-300"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        disabled={loading}
        animate={loading ? "disabled" : ""}
      >
        {loading ? 'Signing Up...' : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
};

export default SignUpForm;
