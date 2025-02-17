import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction'; // Importação corrigida

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};
