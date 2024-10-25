import mongoose, { Document, Schema, Model, model } from 'mongoose';

interface Asset {
  name: string;
  symbol: string;
  currentPrice: number;
  dailyChange: number;
  allocation: number; 
}

interface PortfolioDocument extends Document {
  userId: string;
  totalValue: number;
  dailyChange: number;
  assets: Asset[];
}

const AssetSchema = new Schema<Asset>({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  dailyChange: { type: Number, required: true },
  allocation: { type: Number, required: true },
});

const PortfolioSchema = new Schema<PortfolioDocument>({
  userId: { type: String, required: true },
  totalValue: { type: Number, required: true },
  dailyChange: { type: Number, required: true },
  assets: [AssetSchema],
});

const Portfolio: Model<PortfolioDocument> = model<PortfolioDocument>('Portfolio', PortfolioSchema);

export default Portfolio;
