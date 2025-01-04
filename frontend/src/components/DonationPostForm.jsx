// components/DonationPostForm.jsx
import React from 'react';

const DonationPostForm = ({ donationDetails, setDonationDetails, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96 mt-12">
      <div className="mb-4">
        <label htmlFor="foodName" className="block text-lg font-medium mb-2">Food Name</label>
        <input
          type="text"
          id="foodName"
          value={donationDetails.foodName || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, foodName: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-lg font-medium mb-2">Quantity</label>
        <input
          type="text"
          id="quantity"
          value={donationDetails.quantity || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, quantity: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-lg font-medium mb-2">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          value={donationDetails.phoneNumber || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, phoneNumber: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-lg font-medium mb-2">Your Username</label>
        <input
          type="text"
          id="username"
          value={donationDetails.username || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, username: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition duration-300"
      >
        Post Donation
      </button>
    </form>
  );
};

export default DonationPostForm;
