const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Criar um novo lançamento
router.post("/lancamentos", async (req, res) => {
  try {
    const { descricao, valor, data, categoria, conta, tipo } = req.body;

    // Validação dos dados recebidos
    if (!descricao || !valor || !data || !categoria || !conta || !tipo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Criando a nova transação
    const novaTransacao = new Transaction({
      descricao,
      valor,
      data,
      categoria,
      conta,
      tipo,
    });

    // Salvando no banco
    await novaTransacao.save();
    res.status(201).json({ message: "Lançamento criado com sucesso!", novaTransacao });

  } catch (error) {
    console.error("Erro ao criar lançamento:", error);
    res.status(500).json({ error: "Erro interno no servidor.", details: error.message });
  }
});

module.exports = router;
