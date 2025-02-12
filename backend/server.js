require("dotenv").config(); // Carrega as variáveis do .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const transactionsRoutes = require("./routes/transactions");

const app = express();
app.use(express.json());
app.use(cors());

// Verifica se a variável de ambiente está definida
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ ERRO: A variável MONGO_URI não está definida no .env!");
  process.exit(1); // Encerra a aplicação se a conexão não estiver configurada
}

// Conectar ao MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  });

app.use("/api", transactionsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
