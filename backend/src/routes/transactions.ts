import { Router } from "express";
import { Transaction } from "../models/Transaction";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId });
    res.json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
