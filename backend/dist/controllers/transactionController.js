"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDespesas = exports.getReceitas = exports.getSaldo = exports.getTransactions = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
// Busca todas as transações
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield Transaction_1.default.find();
        res.json({ transactions });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar transações', error });
    }
});
exports.getTransactions = getTransactions;
// Busca o saldo (receitas - despesas)
const getSaldo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const receitas = yield Transaction_1.default.aggregate([
            { $match: { tipo: 'receita' } },
            { $group: { _id: null, total: { $sum: '$valor' } } },
        ]);
        const despesas = yield Transaction_1.default.aggregate([
            { $match: { tipo: 'despesa' } },
            { $group: { _id: null, total: { $sum: '$valor' } } },
        ]);
        const saldo = (((_a = receitas[0]) === null || _a === void 0 ? void 0 : _a.total) || 0) - (((_b = despesas[0]) === null || _b === void 0 ? void 0 : _b.total) || 0);
        res.json({ saldo });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao calcular saldo', error });
    }
});
exports.getSaldo = getSaldo;
// Busca o total de receitas
const getReceitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const receitas = yield Transaction_1.default.aggregate([
            { $match: { tipo: 'receita' } },
            { $group: { _id: null, total: { $sum: '$valor' } } },
        ]);
        res.json({ receitas: ((_a = receitas[0]) === null || _a === void 0 ? void 0 : _a.total) || 0 });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar receitas', error });
    }
});
exports.getReceitas = getReceitas;
// Busca o total de despesas
const getDespesas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const despesas = yield Transaction_1.default.aggregate([
            { $match: { tipo: 'despesa' } },
            { $group: { _id: null, total: { $sum: '$valor' } } },
        ]);
        res.json({ despesas: ((_a = despesas[0]) === null || _a === void 0 ? void 0 : _a.total) || 0 });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar despesas', error });
    }
});
exports.getDespesas = getDespesas;
