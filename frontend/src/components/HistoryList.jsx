// src/components/HistoryList.jsx
import React from 'react';

const HistoryList = ({ historyData }) => {
  return (
    <div>
      {historyData.length > 0 ? (
        historyData.map((item) => (
          <div key={item._id} className="p-4 bg-gray-100 mb-4 rounded-md">
            <h3 className="font-semibold text-xl">{item.foodName}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Posted by: {item.username}</p>
            <p>Status: {item.isBooked ? 'Booked' : 'Available'}</p>
          </div>
        ))
      ) : (
        <p>No donation history available.</p>
      )}
    </div>
  );
};

export default HistoryList;
