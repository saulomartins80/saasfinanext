import { useEffect, useState } from "react";
import { Plus, Download, Search, X } from "lucide-react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Registre todos os elementos necessários, incluindo o ArcElement
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Variantes de animação
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tableVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// Componente do Modal para Nova Transação
const AddTransactionModal = ({ onClose, onAddTransaction }) => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("receita");

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaTransacao = {
      descricao,
      valor: parseFloat(valor),
      data,
      categoria,
      tipo,
    };
    onAddTransaction(novaTransacao);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nova Transação</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="alimentacao">Alimentação</option>
              <option value="casa">Casa</option>
              <option value="servico">Serviço</option>
              <option value="educacao">Educação</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
              <option value="transferencia">Transferência</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

// Componente de Spinner de Carregamento
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Transacoes = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Busca as transações e o resumo financeiro do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca transações
        const transactionsResponse = await fetch("http://localhost:5000/api/lancamentos");
        if (!transactionsResponse.ok) {
          throw new Error("Falha ao carregar transações");
        }
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);

        // Busca saldo
        const saldoResponse = await fetch("http://localhost:5000/api/saldo");
        if (!saldoResponse.ok) {
          throw new Error("Falha ao carregar saldo");
        }
        const saldoData = await saldoResponse.json();
        setSaldo(saldoData.saldo);

        // Busca receitas
        const receitasResponse = await fetch("http://localhost:5000/api/receitas");
        if (!receitasResponse.ok) {
          throw new Error("Falha ao carregar receitas");
        }
        const receitasData = await receitasResponse.json();
        setReceitas(receitasData.receitas);

        // Busca despesas
        const despesasResponse = await fetch("http://localhost:5000/api/despesas");
        if (!despesasResponse.ok) {
          throw new Error("Falha ao carregar despesas");
        }
        const despesasData = await despesasResponse.json();
        setDespesas(despesasData.despesas);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtra as transações
  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter((transaction) =>
        transaction.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((transaction) => transaction.tipo === filterType);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.data >= startDate && transaction.data <= endDate
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1); // Resetar a paginação ao aplicar filtros
  }, [searchTerm, filterType, transactions, startDate, endDate]);

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Dados para os gráficos
  const chartData = {
    labels: filteredTransactions.map((t) => t.descricao),
    datasets: [
      {
        label: "Valor",
        data: filteredTransactions.map((t) => t.valor),
        backgroundColor: filteredTransactions.map((t) =>
          t.tipo === "receita" ? "rgba(75, 192, 192, 0.8)" : "rgba(255, 99, 132, 0.8)"
        ),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: filteredTransactions.map((t) => t.data),
    datasets: [
      {
        label: "Saldo",
        data: filteredTransactions.map((t) => t.valor),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: filteredTransactions.map((t) => t.categoria),
    datasets: [
      {
        label: "Valor",
        data: filteredTransactions.map((t) => t.valor),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
        ],
      },
    ],
  };

  // Função para exportar transações
  const handleExport = () => {
    const headers = ["Descrição", "Valor", "Data", "Categoria"];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      filteredTransactions
        .map((transaction) =>
          [transaction.descricao, transaction.valor, transaction.data, transaction.categoria].join(",")
        )
        .join("\n"); // Corrigido: Fechamento correto do método .join()

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transacoes.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Função para adicionar uma nova transação
  const handleAddTransaction = async (novaTransacao) => {
    try {
      const response = await fetch("http://localhost:5000/api/lancamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTransacao),
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions((prev) => [...prev, data]);
        setFilteredTransactions((prev) => [...prev, data]);
        toast.success("Transação adicionada com sucesso!");
      } else {
        console.error("Erro ao adicionar transação:", await response.text());
        toast.error("Erro ao adicionar transação");
      }
    } catch (error) {
      console.error("Erro ao conectar ao backend:", error);
      toast.error("Erro de conexão com o servidor");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Transações</h1>

      {/* Filtros e Ações */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Pesquisar transação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-full md:w-auto"
          >
            <option value="all">Todas</option>
            <option value="receita">Receitas</option>
            <option value="despesa">Despesas</option>
            <option value="transferencia">Transferências</option>
          </select>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-full md:w-auto"
            />
            <span className="text-gray-900 dark:text-white">até</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white w-full md:w-auto"
            />
          </div>
        </div>
        <div className="flex space-x-4 w-full md:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full md:w-auto justify-center"
          >
            <Plus size={18} className="mr-2" />
            Nova Transação
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full md:w-auto justify-center"
          >
            <Download size={18} className="mr-2" />
            Exportar
          </motion.button>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Saldo Atual</h2>
          <p className="text-2xl font-bold text-green-500">R$ {saldo.toFixed(2)}</p>
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Receitas</h2>
          <p className="text-2xl font-bold text-green-500">R$ {receitas.toFixed(2)}</p>
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Despesas</h2>
          <p className="text-2xl font-bold text-red-500">R$ {despesas.toFixed(2)}</p>
        </motion.div>
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Distribuição por Categoria
          </h2>
          <div className="h-64">
            <Pie data={pieChartData} />
          </div>
        </motion.div>
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Evolução do Saldo
          </h2>
          <div className="h-64">
            <Line data={lineChartData} />
          </div>
        </motion.div>
      </div>

      {/* Tabela de Transações */}
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md overflow-x-auto"
        initial="hidden"
        animate="visible"
        variants={tableVariants}
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Transações Recentes
        </h2>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left text-gray-900 dark:text-white">Descrição</th>
              <th className="py-2 text-left text-gray-900 dark:text-white">Valor</th>
              <th className="py-2 text-left text-gray-900 dark:text-white">Data</th>
              <th className="py-2 text-left text-gray-900 dark:text-white">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="py-3 text-gray-900 dark:text-white">{transaction.descricao}</td>
                <td
                  className={`py-3 ${
                    transaction.valor < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.valor < 0 ? "-" : "+"}R$ {Math.abs(transaction.valor).toFixed(2)}
                </td>
                <td className="py-3 text-gray-900 dark:text-white">{transaction.data}</td>
                <td className="py-3 text-gray-900 dark:text-white">{transaction.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Anterior
          </button>
          <span className="text-gray-900 dark:text-white">
            Página {currentPage} de {Math.ceil(filteredTransactions.length / itemsPerPage)}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          >
            Próxima
          </button>
        </div>
      </motion.div>

      {/* Modal para Nova Transação */}
      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {/* Notificações */}
      <ToastContainer />
    </div>
  );
};

export default Transacoes;