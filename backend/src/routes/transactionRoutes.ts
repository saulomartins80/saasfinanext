import express from 'express';
import { getTransactions } from '../controllers/transactionController';

const router = express.Router();

router.get('/transactions', getTransactions);

export default router;
