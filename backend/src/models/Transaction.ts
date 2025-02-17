import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Transaction = mongoose.model("Transaction", TransactionSchema);
