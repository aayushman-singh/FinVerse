import express from 'express';
import Portfolio from '../models/Portfolio.js'; // Adjust the path as needed

const router = express.Router();

// Route to save portfolio data
router.post('/save', async (req, res) => {
  const { userId, assets } = req.body;

  if (!userId || !Array.isArray(assets)) {
    return res.status(400).json({ success: false, message: 'Invalid data format' });
  }

  try {
    // Update or create portfolio for the user
    const portfolio = await Portfolio.findOneAndUpdate(
      { userId },
      { assets },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'Portfolio saved successfully!', portfolio });
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ success: false, message: 'Failed to save portfolio' });
  }
});

export default router;
