import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Watchlist.css'; // Add CSS for styling

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([
    { name: 'Ethereum', symbol: 'eth', type: 'token' },
    { name: 'Reliance Industries', symbol: 'RELIANCE', type: 'stock', exchange: 'NSE' }
  ]);
  
  const [prices, setPrices] = useState({});

  // Fetch data for each watchlist item
  useEffect(() => {
    const fetchPrices = async () => {
      const priceData = {};
      for (const item of watchlist) {
        try {
          if (item.type === 'token') {
            // Fetch token price using Moralis API
            const tokenResponse = await axios.get(`https://deep-index.moralis.io/api/v2/erc20/${item.symbol}/price`, {
              headers: {
                'X-API-Key': process.env.MORALIS_API_KEY,
              }
            });
            priceData[item.symbol] = tokenResponse.data;
          } else if (item.type === 'stock' && item.exchange === 'NSE') {
            // Fetch stock price using Upstox API
            const stockResponse = await axios.get(`https://api.upstox.com/market/quote/${item.symbol}`);
            priceData[item.symbol] = stockResponse.data;
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setPrices(priceData);
    };

    fetchPrices();
  }, [watchlist]);

  return (
    <div className="watchlist-grid">
      {watchlist.map((item) => (
        <div key={item.symbol} className="watchlist-tile">
          <h3>{item.name} ({item.symbol.toUpperCase()})</h3>
          {prices[item.symbol] ? (
            <>
              <p>Price: ${prices[item.symbol].price || prices[item.symbol].lastPrice}</p>
              <p>Change: {prices[item.symbol].priceChange || prices[item.symbol].change} ({prices[item.symbol].priceChangePct || prices[item.symbol].changePercent}%)</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Watchlist;