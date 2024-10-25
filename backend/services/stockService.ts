import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); 

const IEX_API_KEY = process.env.IEX_API_KEY;

// Fetch real-time stock data from IEX Cloud
export const getRealTimeStockData = async (symbol : string) => {
  try {
    const response = await axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
