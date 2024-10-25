import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
//import portfolioRoutes from './routes/portfolioRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; 
import tokenRoutes from './routes/tokenRoutes.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb+srv://cpcollective:rgr77MrNm4bf6gpL@cluster0.cd1if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// API routes
//app.use('/api/portfolio', portfolioRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
// Production environment setup
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Serve static files from the frontend in production
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
