import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

// Exportação nomeada
export const Transaction = mongoose.model('Transaction', TransactionSchema);
