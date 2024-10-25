import React from 'react';

const AddFunds = () => {
  const handleAddFunds = () => {
    alert('Add Funds button clicked');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleAddFunds}
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add Funds
      </button>
    </div>
  );
};

export default AddFunds;
