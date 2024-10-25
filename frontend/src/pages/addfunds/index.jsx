import React from 'react';

const AddFunds = () => {
  const addFunds = async (amount) => {
    try {
      console.log("Creating order...");

      // Step 1: Create an order through your backend
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      console.log("Order created:", orderData);

      // Step 2: Initialize Razorpay with the order details
      const options = {
        key: 'rzp_test_K8YGIkTVlssWWW',  // Hardcoded API Key
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        name: "Add Funds",
        description: "Adding funds to account",
        handler: async function (response) {
          console.log("Payment response:", response);
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      console.log("Initializing Razorpay:", options);
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error initiating payment:", error.message);
      alert("Error initiating payment. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => addFunds(500)}  // Pass amount in rupees
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Add Funds
      </button>
    </div>
  );
};

export default AddFunds;
