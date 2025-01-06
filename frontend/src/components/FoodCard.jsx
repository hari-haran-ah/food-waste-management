import React from 'react';

const FoodCard = ({ foodName, quantity, phoneNumber, username, isBooked, onBook }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4 w-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-medium text-blue-800">{foodName}</h3>
        {/* SVG Icon */}
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 1024 1024"
          className="icon"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M359.8 368.7c-83.5 37-150 103.4-187.1 186.9-5.6 12.6 0.1 27.3 12.7 32.9 3.3 1.5 6.7 2.2 10.1 2.2 9.6 0 18.7-5.5 22.8-14.8 32.1-72.2 89.5-129.6 161.7-161.6 12.6-5.6 18.3-20.3 12.7-32.9-5.5-12.6-20.3-18.3-32.9-12.7z m214.6-108.5c7.2-11.8 11.6-25.5 11.6-40.3 0-42.8-34.7-77.4-77.4-77.4-42.8 0-77.4 34.7-77.4 77.4 0 14.8 4.4 28.6 11.6 40.3-216.7 31.9-383.5 219-383.5 444.4v54.1c0 13.8 11.2 25 25 25H933c13.8 0 25-11.2 25-25v-54.1c-0.1-225.4-167-412.4-383.6-444.4zM908 733.7H109.2v-29.1c0-220.2 179.2-399.3 399.4-399.3S908 484.4 908 704.6v29.1z m24.9 100.2H84.2c-13.8 0-25 11.2-25 25s11.2 25 25 25h848.7c13.8 0 25-11.2 25-25s-11.2-25-25-25z"
            fill="#FCA128"
          />
        </svg>
      </div>
      <div className="flex flex-col items-start w-full space-y-2">
        <p className="text-gray-600">Quantity: {quantity}</p>
        <p className="text-gray-600">Contact: {phoneNumber}</p>
        <p className="text-gray-600">Posted by: {username}</p>
        <p className={`text-gray-600 font-semibold ${isBooked ? 'text-green-600' : 'text-green-600'}`}>
          Status: {isBooked ? 'Booked' : 'Available'}
        </p>
      </div>
      {!isBooked && (
        <button
          onClick={onBook}
          className="bg-blue-600 text-white px-2 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Book
        </button>
      )}
    </div>
  );
};

export default FoodCard;
