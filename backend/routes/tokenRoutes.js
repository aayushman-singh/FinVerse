import express from 'express';
import { getTokenPrice } from '../services/moralisService.js';

const router = express.Router();

router.get('/price/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const priceData = await getTokenPrice(address);
    res.status(200).json({ success: true, priceData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
