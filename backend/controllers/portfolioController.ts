import Portfolio from '../models/Portfolio.js';

// Fetch user's portfolio from MongoDB
export const getPortfolio = async (req : any, res : any) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.params.userId });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
