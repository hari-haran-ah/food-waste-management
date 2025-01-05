import React from 'react';
import { LucideUser, LucideLock } from 'lucide-react';

const SignInForm = ({ onSignIn, loading, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onSignIn(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <LucideUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          name="email"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Email address"
        />
      </div>
      <div className="relative">
        <LucideLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="password"
          name="password"
          required
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
};

export default SignInForm;
