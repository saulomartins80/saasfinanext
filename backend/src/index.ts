import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import balanceRoutes from "./routes/balanceRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import goalsRoutes from "./routes/goalsRoutes";
import userRoutes from "./routes/userRoutes";
import lancamentoRoutes from "./routes/lancamentos";
import { firebaseAdmin } from "./config/firebaseAdmin"; // Importa a instância do Firebase
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use("/api", balanceRoutes);
app.use("/api", transactionRoutes);
app.use("/api", goalsRoutes);
app.use("/api", userRoutes);
app.use("/api", lancamentoRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` ~@ Servidor rodando na porta ${PORT}`));
