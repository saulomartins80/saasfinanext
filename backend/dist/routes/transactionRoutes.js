"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
// Rotas
router.get('/transactions', transactionController_1.getTransactions); // Busca todas as transações
router.get('/saldo', transactionController_1.getSaldo); // Busca o saldo
router.get('/receitas', transactionController_1.getReceitas); // Busca o total de receitas
router.get('/despesas', transactionController_1.getDespesas); // Busca o total de despesas
exports.default = router;
