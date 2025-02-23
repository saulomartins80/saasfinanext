"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GoalSchema = new mongoose_1.default.Schema({
    description: { type: String, required: true },
    current: { type: Number, required: true },
    target: { type: Number, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }, // Relacionamento com o usuário
});
exports.Goal = mongoose_1.default.model('Goal', GoalSchema);
