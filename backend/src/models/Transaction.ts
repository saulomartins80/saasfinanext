import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa' | 'transferencia';
  data: Date;
  categoria: string;
}

const transactionSchema: Schema = new Schema({
  descricao: { type: String, required: true },
  valor: { type: Number, required: true },
  tipo: { type: String, enum: ['receita', 'despesa', 'transferencia'], required: true },
  data: { type: Date, default: Date.now },
  categoria: { type: String, required: true },
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction; // Exportação padrão
