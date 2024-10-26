import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const AssetSchema = new Schema({
  symbol: { type: String, required: true },
  type: { type: String, required: true, enum: ['stock', 'token'] },
  boughtPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const PortfolioSchema = new Schema({
  userId: { type: String, required: true },
  assets: [AssetSchema],
});

const Portfolio = model('Portfolio', PortfolioSchema);

export default Portfolio;
