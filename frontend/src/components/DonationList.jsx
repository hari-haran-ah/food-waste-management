// components/FoodCard.jsx
import React from 'react';

const FoodCard = ({ foodName, quantity, phoneNumber, username, isBooked, onBook }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="font-semibold text-lg text-blue-600">{foodName}</h3>
      <p className="text-gray-600">{quantity} units</p>
      <p className="text-gray-600">Contact: {phoneNumber}</p>
      <p className="text-gray-600">Posted by: {username}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{isBooked ? 'Booked' : 'Available'}</span>
        {!isBooked && (
          <button
            onClick={onBook}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
