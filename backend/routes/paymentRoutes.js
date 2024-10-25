import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentsController.js';

const router = express.Router();

// Route to create an order
router.post('/create-order', createOrder);

// Route to verify payment
router.post('/verify-payment', verifyPayment);

export default router;
