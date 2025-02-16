import { useState } from "react";

export default function Lancamento() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [conta, setConta] = useState("Conta inicial");
  const [tipo, setTipo] = useState("despesa");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lancamento = {
      descricao,
      valor: parseFloat(valor),
      data,
      categoria,
      conta,
      tipo,
    };

    try {
      const response = await fetch("http://localhost:5000/api/lancamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lancamento),
      });

      if (response.ok) {
        alert("Lançamento salvo com sucesso!");
        setDescricao("");
        setValor("");
        setData("");
        setCategoria("");
        setConta("Conta inicial");
        setTipo("despesa");
      } else {
        console.error("Erro no backend:", await response.text());
        alert("Erro ao salvar lançamento");
      }
    } catch (error) {
      console.error("Erro ao conectar ao backend:", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
        Novo Lançamento 💰
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo */}
        <label className="block">
          <span className="font-semibold">Tipo:</span>
          <select
            className={`w-full p-2 border rounded focus:outline-none ${
              tipo === "despesa"
                ? "bg-red-100 hover:bg-red-200"
                : tipo === "receita"
                ? "bg-green-100 hover:bg-green-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="despesa">🔴 Despesa</option>
            <option value="receita">🟢 Receita</option>
            <option value="transferencia">⚫ Transferência</option>
          </select>
        </label>

        {/* Descrição */}
        <label className="block">
          <span className="font-semibold">Descrição:</span>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ex: Compra no mercado"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>

        {/* Valor */}
        <label className="block">
          <span className="font-semibold">Valor:</span>
          <input
            type="number"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ex: 50.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </label>

        {/* Data */}
        <label className="block">
          <span className="font-semibold">Data:</span>
          <input
            type="date"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </label>

        {/* Conta */}
        <label className="block">
          <span className="font-semibold">Conta/Cartão:</span>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
          >
            <option value="Conta inicial">🏦 Conta inicial</option>
            <option value="Cartão de crédito">💳 Cartão de crédito</option>
          </select>
        </label>

        {/* Categoria */}
        <label className="block">
          <span className="font-semibold">Categoria:</span>
          <select
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="alimentacao">🍽️ Alimentação</option>
            <option value="casa">🏠 Casa</option>
            <option value="servico">🛠️ Serviço</option>
            <option value="cuidado pessoal">🧴 Cuidado Pessoal</option>
            <option value="educacao">📚 Educação</option>
            <option value="posto de combustivel">⛽ Posto de Combustível</option>
          </select>
        </label>

        {/* Botão Salvar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          ✅ Salvar Lançamento
        </button>
      </form>
    </div>
  );
}
