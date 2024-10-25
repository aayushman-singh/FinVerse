import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

export function createRazorpayInstance (){
   return new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY!,
        key_secret: process.env.RAZORPAY_API_KEY,
      });
}