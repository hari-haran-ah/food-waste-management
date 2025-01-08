import React from 'react';

const DonationPostForm = ({ donationDetails, setDonationDetails, handleFormSubmit }) => {
  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Food Name"
          value={donationDetails.foodName || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, foodName: e.target.value })}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Quantity"
          value={donationDetails.quantity || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, quantity: e.target.value })}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          value={donationDetails.phoneNumber || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, phoneNumber: e.target.value })}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Location"
          value={donationDetails.location || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, location: e.target.value })}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={donationDetails.username || ''}
          onChange={(e) => setDonationDetails({ ...donationDetails, username: e.target.value })}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-semibold transition duration-300 bg-blue-600 hover:bg-blue-700"
      >
        Post Donation
      </button>
    </form>
  );
};

export default DonationPostForm;
