import { createRazorpayInstance } from "../config/razorpayConfig.js";
import Crypto from 'crypto';
const razor = createRazorpayInstance();

// Create Order Function
export async function createOrder(req, res) {
  const { orderID, amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: 'INR',
    receipt: orderID || 'receipt1', // Use provided orderID or default
  };

  try {
    razor.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Something went wrong with order creation',
          error: err.message
        });
      }
      // Order created successfully
      return res.status(200).json({
        success: true,
        order
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

// Verify Payment Function
export async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    const secret = process.env.RAZORPAY_SECRET;
    const hmac = Crypto.createHmac("sha256", secret!);
    hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");
    if (generatedSignature == razorpay_signature){
        return res.status(200).json({
            success: true,
            message: 'Payment verified',

        })

    }
    else {
        return res.status(400).json({
            success: true,
            message: 'Payment verification failed'
        })
    }
    res.status(200).json({ success: true, message: 'Payment verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment verification failed', error: error.message });
  }
}
