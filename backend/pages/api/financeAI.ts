import { OpenAI } from "openai";

// Criação da instância da API com a chave da API (isso está no backend)
const openai = new OpenAI({
  apiKey: "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",  // Substitua com sua chave da API
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const result = await openai.completions.create({
        model: "gpt-4",
        prompt: req.body.prompt,
        max_tokens: 50,
      });

      // Retorne a resposta da IA para o frontend
      res.status(200).json({ response: result.choices[0].text });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao chamar a API do OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Método não permitido" });
  }
}
