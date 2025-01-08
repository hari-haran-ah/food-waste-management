// src/components/HistoryList.jsx
import React from 'react';

const HistoryList = ({ historyData }) => {
  return (
    <div>
      {historyData.length > 0 ? (
        historyData.map((item) => (
          <div key={item._id} className="p-6 bg-white shadow-md rounded-md mb-6">
            <h3 className="font-semibold text-xl text-blue-600">{item.foodName}</h3>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">Location: {item.location}</p>
            <p className="text-gray-600">Posted by: {item.username}</p>
            <p className="text-gray-600">Status: {item.isBooked ? 'Booked' : 'Available'}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No donation history available.</p>
      )}
    </div>
  );
};

export default HistoryList;