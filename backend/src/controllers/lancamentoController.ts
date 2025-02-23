import { Request, Response } from 'express';
import Lancamento from '../models/Lancamento';

// Busca todos os lançamentos
export const getLancamentos = async (req: Request, res: Response) => {
  try {
    const lancamentos = await Lancamento.find();
    res.json({ lancamentos });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar lançamentos', error });
  }
};

// Cria um novo lançamento
export const createLancamento = async (req: Request, res: Response) => {
  try {
    const { descricao, valor, tipo, categoria } = req.body;
    const novoLancamento = new Lancamento({ descricao, valor, tipo, categoria });
    await novoLancamento.save();
    res.status(201).json({ lancamento: novoLancamento });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar lançamento', error });
  }
};

// Atualiza um lançamento existente
export const updateLancamento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descricao, valor, tipo, categoria } = req.body;
    const lancamentoAtualizado = await Lancamento.findByIdAndUpdate(
      id,
      { descricao, valor, tipo, categoria },
      { new: true }
    );
    res.json({ lancamento: lancamentoAtualizado });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar lançamento', error });
  }
};

// Exclui um lançamento
export const deleteLancamento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Lancamento.findByIdAndDelete(id);
    res.json({ message: 'Lançamento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir lançamento', error });
  }
};
