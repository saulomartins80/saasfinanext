import express from "express"; // Faltava importar o express
import cors from "cors";
import connectDB from "./config/db"; // Corrigido o caminho
import userRoutes from "./routes/userRoutes";
import transactionRoutes from "./routes/transactions";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Rotas
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` ~@ Servidor rodando na porta ${PORT}`));
