import React, { useState } from 'react';

const SignInForm = ({ onSignIn, loading, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition transform hover:bg-blue-700 hover:scale-105 duration-300"
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </form>
  );
};

export default SignInForm;
