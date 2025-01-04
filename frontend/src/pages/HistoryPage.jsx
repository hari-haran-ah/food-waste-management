import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      {/* Header */}
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">FOOD DONATE APP</h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/booking-food')}
          >
            Back
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mt-20 px-6">
        <h2 className="text-3xl text-white font-semibold mb-4">Donation History</h2>
        {/* You can populate the donation history here */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-medium">Donation Title</h3>
          <p>Quantity: 10</p>
          <p>Posted by: User123</p>
          <p>Status: Booked</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-medium">Donation Title</h3>
          <p>Quantity: 5</p>
          <p>Posted by: User456</p>
          <p>Status: Available</p>
        </div>
        {/* You can dynamically render more donations if needed */}
      </div>
    </div>
  );
};

export default HistoryPage;
