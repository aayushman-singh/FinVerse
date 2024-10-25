import { createRazorpayInstance } from "../config/razorpayConfig.js";
import Crypto from 'crypto';

const razor = createRazorpayInstance();

import axios from 'axios';

export async function createRazorpayOrder(req, res) {
  const { amount } = req.body;

  try {
    const response = await axios.post('https://api.razorpay.com/v1/orders', {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'receipt#1',
      notes: {
        key1: 'value3',
        key2: 'value2'
      }
    }, {
      auth: {
        username: 'rzp_test_K8YGIkTVlssWWW', // Replace with your test key
        password: 'edFxKbzv2LcZcWLLdR4lk6uy' // Replace with your secret key
      },
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Send back the order data from Razorpay
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
  }
}

  

// Verify Payment Function
export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const secret = process.env.RAZORPAY_SECRET;
    const hmac = Crypto.createHmac("sha256", secret);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: 'Payment verified'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
}
