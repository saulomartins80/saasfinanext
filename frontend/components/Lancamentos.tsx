import { useState } from "react";
import { Plus, ChevronDown } from "lucide-react";
import FormularioLancamento from "./FormularioLancamento";

const Lancamentos = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Fevereiro 2025");
  const [selectedCategory, setSelectedCategory] = useState("despesa");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Dados de exemplo (substitua pelos dados reais do seu backend)
  const lancamentos = [
    {
      id: 1,
      tipo: "despesa",
      conta: "Cartão Nubank",
      categoria: "Alimentação",
      valor: -850.0,
      data: "2025-02-15",
      tags: ["mercado"],
    },
    {
      id: 2,
      tipo: "receita",
      conta: "Conta inicial",
      categoria: "Salário",
      valor: 3000.0,
      data: "2025-02-01",
      tags: ["trabalho"],
    },
  ];

  const saldoAtual = lancamentos.reduce((total, lanc) => total + lanc.valor, 0);
  const saldoPrevisto = saldoAtual; // Aqui você pode adicionar lógica para calcular o saldo previsto

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-6">
          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Lançamentos
            </h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>

          {/* Filtros e Período */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <button className="flex items-center text-gray-700 dark:text-gray-300">
                <span>{selectedPeriod}</span>
                <ChevronDown size={18} className="ml-2" />
              </button>
            </div>

            {/* Abas de Categorias */}
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedCategory("despesa")}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === "despesa"
                    ? "bg-red-500 text-white dark:bg-red-700 dark:text-white"
                    : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
                }`}
              >
                Despesas
              </button>
              <button
                onClick={() => setSelectedCategory("receita")}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === "receita"
                    ? "bg-green-500 text-white dark:bg-green-700 dark:text-white"
                    : "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                }`}
              >
                Receitas
              </button>
              <button
                onClick={() => setSelectedCategory("transferencia")}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === "transferencia"
                    ? "bg-purple-500 text-white dark:bg-purple-700 dark:text-white"
                    : "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200"
                }`}
              >
                Transferências
              </button>
            </div>
          </div>

          {/* Lista de Lançamentos */}
          <div className="space-y-4">
            {lancamentos
              .filter((lanc) => lanc.tipo === selectedCategory)
              .map((lanc) => (
                <div
                  key={lanc.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {lanc.categoria}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {lanc.conta} • {new Date(lanc.data).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-lg font-semibold ${
                        lanc.valor < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      R$ {lanc.valor.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2">
                    {lanc.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Resumo do Saldo */}
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resumo do Saldo
            </h3>
            <div className="mt-2">
              <p className="text-gray-700 dark:text-gray-300">
                Saldo Atual: R$ {saldoAtual.toFixed(2)}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Saldo Previsto: R$ {saldoPrevisto.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Lançamento */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <FormularioLancamento onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lancamentos;