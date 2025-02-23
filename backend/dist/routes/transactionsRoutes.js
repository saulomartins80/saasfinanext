"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/transactionsRoutes.ts
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/transactions', (req, res) => {
    const transactions = [
        { id: 1, description: 'Salário', amount: 4000, type: 'income' },
        { id: 2, description: 'Aluguel', amount: -1500, type: 'expense' },
    ]; // Exemplo estático (substitua por dados do banco de dados)
    res.json({ transactions });
});
exports.default = router;
