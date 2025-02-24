import { useState } from "react";
import { Utensils, HomeIcon, Wrench, HeartPulse, BookOpen, Fuel, Smile, Car, Activity } from "lucide-react";

interface LancamentoProps {
  onClose: () => void;
}

const Lancamento = ({ onClose }: LancamentoProps) => {
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
        onClose(); // Fecha o modal após salvar
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Adicionar Lançamento
      </h2>

      {/* Tipo */}
      <label className="block">
        <span className="font-semibold">Tipo:</span>
        <select
          className={`w-full p-2 border rounded focus:outline-none ${
            tipo === "despesa"
              ? "bg-red-100 hover:bg-red-200"
              : tipo === "receita"
              ? "bg-green-100 hover:bg-green-200"
              : "bg-purple-100 hover:bg-purple-200"
          }`}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="despesa">🔴 Despesa</option>
          <option value="receita">🟢 Receita</option>
          <option value="transferencia">🟣 Transferência</option>
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
          <option value="alimentacao"><Utensils size={16} className="inline mr-2" /> Alimentação</option>
          <option value="casa"><HomeIcon size={16} className="inline mr-2" /> Casa</option>
          <option value="servico"><Wrench size={16} className="inline mr-2" /> Serviço</option>
          <option value="cuidado pessoal"><HeartPulse size={16} className="inline mr-2" /> Cuidado Pessoal</option>
          <option value="educacao"><BookOpen size={16} className="inline mr-2" /> Educação</option>
          <option value="posto de combustivel"><Fuel size={16} className="inline mr-2" /> Posto de Combustível</option>
          <option value="lazer"><Smile size={16} className="inline mr-2" /> Lazer</option>
          <option value="transporte"><Car size={16} className="inline mr-2" /> Transporte</option>
          <option value="saude"><Activity size={16} className="inline mr-2" /> Saúde</option>
        </select>
      </label>

      {/* Botões */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default Lancamento;
