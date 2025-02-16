import { Router } from "express";
import { loginUser } from "../services/authService";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    res.json({ user });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      res.status(401).json({ error: "Erro desconhecido" });
    }
  }
});

export default router;
