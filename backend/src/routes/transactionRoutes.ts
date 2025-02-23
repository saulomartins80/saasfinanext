import express from 'express';
import {
  getTransactions,
  getSaldo,
  getReceitas,
  getDespesas,
} from '../controllers/transactionController';

const router = express.Router();

// Rotas
router.get('/transactions', getTransactions); // Busca todas as transações
router.get('/saldo', getSaldo); // Busca o saldo
router.get('/receitas', getReceitas); // Busca o total de receitas
router.get('/despesas', getDespesas); // Busca o total de despesas

export default router;
