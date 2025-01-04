// pages/About.jsx

import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white pt-20">
      <h2 className="text-4xl font-semibold mb-6">About the Food Donate App</h2>
      <p className="text-lg mb-6 text-center max-w-xl">
        The Food Donate App is designed to help people donate and book food for those in need. Our mission is to create a platform where people can easily donate surplus food or book food for themselves, ensuring that no food goes to waste. We believe in making food donation easy, accessible, and impactful.
      </p>
      <p className="text-lg text-center max-w-xl">
        Thank you for supporting this cause! Together, we can make a difference in the community.
      </p>
    </div>
  );
};

export default About;
