import express from 'express';
import { getGoals } from '../controllers/goalController';

const router = express.Router();

router.get('/goals', getGoals);

export default router;
