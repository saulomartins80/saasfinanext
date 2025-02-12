const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true, trim: true },
    valor: { type: Number, required: true },
    data: { type: Date, required: true },
    categoria: {
      type: String,
      required: true,
      enum: [
        "Alimentação 🥗",
        "Casa 🏠",
        "Serviço 💼",
        "Cuidado Pessoal 💅",
        "Educação 📚",
        "Posto de Combustível ⛽",
      ],
      trim: true,
    },
    conta: { type: String, required: true, trim: true },
    tipo: {
      type: String,
      enum: ["despesa", "receita", "transferencia"],
      required: true,
    },
  },
  { timestamps: true } // Adiciona createdAt e updatedAt automaticamente
);

module.exports = mongoose.model("Transaction", TransactionSchema);
