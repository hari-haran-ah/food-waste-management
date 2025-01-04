// src/pages/HistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../api/donationApi';
import HistoryList from '../components/HistoryList'; // Adjusted path
import AppIcon from '../components/AppIcon';

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <header className="bg-white text-blue-600 p-4 fixed top-0 left-0 w-full z-10 shadow-md">
        <div className="flex justify-between items-center px-6">
        <h1 className="text-3xl text-blue-600 font-bold inline-block flex items-center whitespace-nowrap">FOOD DONATE APP
        <AppIcon className="inline-block ml-1" /></h1>
          <button
            className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300"
            onClick={() => navigate('/booking-food')}
          >
            Back
          </button>
        </div>
      </header>
      <div className="mt-20 px-6">
        <h2 className="text-3xl text-white font-semibold mb-4">Donation History</h2>
        <HistoryList historyData={historyData} />
      </div>
    </div>
  );
};

export default HistoryPage;
