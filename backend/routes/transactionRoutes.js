const express = require("express");
const Transaction = require("../models/Transaction"); // Certifique-se de que o modelo está correto
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📥 Recebendo dados da requisição:", req.body); // Log dos dados recebidos
    const { userId, amount, type, description } = req.body;

    if (!userId || !amount || !type) {
      console.log("⚠️ Campos obrigatórios faltando!");
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
    }

    const transaction = new Transaction({ userId, amount, type, description });
    const savedTransaction = await transaction.save();

    console.log("✅ Transação salva com sucesso:", savedTransaction);
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.log("❌ Erro ao criar transação:", err.message);
    res.status(500).json({ error: "Erro ao criar transação", details: err.message });
  }
});

module.exports = router;
