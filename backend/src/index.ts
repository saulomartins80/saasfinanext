import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import balanceRoutes from './routes/balanceRoutes';
import transactionRoutes from './routes/transactionRoutes';
import goalRoutes from './routes/goalRoutes';
import userRoutes from './routes/userRoutes';

import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', balanceRoutes);       // Agora `/api/balance` funciona
app.use('/api', transactionRoutes);   // Agora `/api/transactions` funciona
app.use('/api', goalRoutes);          // Agora `/api/goals` funciona
app.use('/api', userRoutes);          // Agora `/api/login` funciona

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
