import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
import { motion } from "framer-motion";

// Registra os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const userName = "Saulo Martins"; // Substitua pelo nome do usuário dinâmico

  // Dados para o gráfico de barras
  const barChartData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Receitas",
        data: [5000, 7000, 6000, 8000, 9000, 10000],
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Despesas",
        data: [3000, 4000, 3500, 4500, 5000, 6000],
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  // Dados para o gráfico de linhas
  const lineChartData = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Saldo",
        data: [2000, 3000, 2500, 3500, 4000, 5000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Função para determinar a saudação com base na hora do dia
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-y-auto min-h-screen pt-16">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Mensagem de Boas-Vindas */}
        <div className="p-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-4xl font-bold"
          >
            {getGreeting()},{" "}
            <span className="text-blue-500">{userName}</span>!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base"
          >
            Aqui está o seu resumo financeiro.
          </motion.p>
        </div>

        {/* Restante do conteúdo */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Saldo Atual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Saldo Atual
            </h2>
            <p className="text-2xl font-bold text-green-500 mt-2">R$ 5.000,00</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +2% em relação ao mês passado
            </p>
          </motion.div>

          {/* Receitas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Receitas
            </h2>
            <p className="text-2xl font-bold text-blue-500 mt-2">R$ 10.000,00</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +15% em relação ao mês passado
            </p>
          </motion.div>

          {/* Despesas */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Despesas
            </h2>
            <p className="text-2xl font-bold text-red-500 mt-2">R$ 5.000,00</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              -10% em relação ao mês passado
            </p>
          </motion.div>

          {/* Investimentos */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Investimentos
            </h2>
            <p className="text-2xl font-bold text-purple-500 mt-2">R$ 20.000,00</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              +8% em relação ao mês passado
            </p>
          </motion.div>
        </div>

        {/* Gráficos */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Receitas vs Despesas
            </h2>
            <div className="h-64">
              <Bar data={barChartData} />
            </div>
          </motion.div>

          {/* Gráfico de Linhas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Evolução do Saldo
            </h2>
            <div className="h-64">
              <Line data={lineChartData} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}