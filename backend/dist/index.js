"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const balanceRoutes_1 = __importDefault(require("./routes/balanceRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const goalsRoutes_1 = __importDefault(require("./routes/goalsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const lancamentos_1 = __importDefault(require("./routes/lancamentos")); // Nova rota
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/api", balanceRoutes_1.default);
app.use("/api", transactionRoutes_1.default);
app.use("/api", goalsRoutes_1.default);
app.use("/api", userRoutes_1.default);
app.use("/api", lancamentos_1.default); // Adicionada a rota de lançamentos
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` ~@ Servidor rodando na porta ${PORT}`));
