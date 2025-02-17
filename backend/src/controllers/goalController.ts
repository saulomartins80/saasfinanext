import { Request, Response } from 'express';
import { Goal } from '../models/Goal'; // Importe o modelo Goal

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find(); // Busca todas as metas no banco de dados
    res.json({ goals });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar metas' });
  }
};
