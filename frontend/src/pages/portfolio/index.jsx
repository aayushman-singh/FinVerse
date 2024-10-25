import React, { useState } from 'react';

const TOKENS = {
  usdt: { name: "USDT", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" },
  usdc: { name: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
  stEth: { name: "stETH", address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84" },
  matic: { name: "MATIC", address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0" },
};

const Portfolio = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [priceData, setPriceData] = useState(null);

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value);
  };

  const fetchTokenPrice = async () => {
    // Retrieve tokenAddress based on the selected token
    const tokenAddress = TOKENS[selectedToken]?.address;
    
    if (!tokenAddress) {
      alert("Please select a valid token");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5005/api/token/price/${tokenAddress}`);
      console.log("Raw response:", response);
  
      if (!response.ok) throw new Error('Failed to fetch token price');
      
      const data = await response.json();
      console.log("Parsed response:", data);
      setPriceData(data.priceData);
    } catch (error) {
      console.error("Error fetching token price:", error);
    }
  };

  return (
    <div>
      <h1>Select Token to Fetch Price</h1>
      <select value={selectedToken} onChange={handleTokenChange}>
        <option value="">Select a token</option>
        {Object.keys(TOKENS).map((key) => (
          <option key={key} value={key}>
            {TOKENS[key].name}
          </option>
        ))}
      </select>
      <button onClick={fetchTokenPrice}>Get Price</button>
      {priceData && (
        <div>
          <h2>Price Data:</h2>
          <pre>{JSON.stringify(priceData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Portfolio;