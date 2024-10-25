import express from 'express';
import { getTokenPrice } from '../services/moralisService.js';

const router = express.Router();

router.get('/price/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const priceData = await getTokenPrice(symbol);
    res.status(200).json({ success: true, priceData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
