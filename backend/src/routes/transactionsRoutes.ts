// src/routes/transactionsRoutes.ts
import express from 'express';
const router = express.Router();

router.get('/transactions', (req, res) => {
  const transactions = [
    { id: 1, description: 'Salário', amount: 4000, type: 'income' },
    { id: 2, description: 'Aluguel', amount: -1500, type: 'expense' },
  ]; // Exemplo estático (substitua por dados do banco de dados)
  res.json({ transactions });
});

export default router;
