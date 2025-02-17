import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  description: { type: String, required: true },
  current: { type: Number, required: true },
  target: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Relacionamento com o usuário
});

export const Goal = mongoose.model('Goal', GoalSchema);
