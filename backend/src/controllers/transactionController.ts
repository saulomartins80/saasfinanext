import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

// Busca todas as transações
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar transações', error });
  }
};

// Busca o saldo (receitas - despesas)
export const getSaldo = async (req: Request, res: Response) => {
  try {
    const receitas = await Transaction.aggregate([
      { $match: { tipo: 'receita' } },
      { $group: { _id: null, total: { $sum: '$valor' } } },
    ]);
    const despesas = await Transaction.aggregate([
      { $match: { tipo: 'despesa' } },
      { $group: { _id: null, total: { $sum: '$valor' } } },
    ]);
    const saldo = (receitas[0]?.total || 0) - (despesas[0]?.total || 0);
    res.json({ saldo });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao calcular saldo', error });
  }
};

// Busca o total de receitas
export const getReceitas = async (req: Request, res: Response) => {
  try {
    const receitas = await Transaction.aggregate([
      { $match: { tipo: 'receita' } },
      { $group: { _id: null, total: { $sum: '$valor' } } },
    ]);
    res.json({ receitas: receitas[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar receitas', error });
  }
};

// Busca o total de despesas
export const getDespesas = async (req: Request, res: Response) => {
  try {
    const despesas = await Transaction.aggregate([
      { $match: { tipo: 'despesa' } },
      { $group: { _id: null, total: { $sum: '$valor' } } },
    ]);
    res.json({ despesas: despesas[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar despesas', error });
  }
};
