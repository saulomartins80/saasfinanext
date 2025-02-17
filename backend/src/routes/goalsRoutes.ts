// src/routes/goalsRoutes.ts
import express from 'express';
const router = express.Router();

router.get('/goals', (req, res) => {
  const goals = [
    { id: 1, description: 'Economizar para viagem', current: 2000, target: 5000 },
  ]; // Exemplo estático (substitua por dados do banco de dados)
  res.json({ goals });
});

export default router;
