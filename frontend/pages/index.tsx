import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Overview from "../components/Overview";
import Goals from "../components/Goals";
import FinanceCharts from "../components/FinanceCharts";
import Transactions from "../components/Transactions";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Endpoints que serão chamados
        const endpoints = [
          { name: "balance", url: "http://localhost:5000/api/balance" },
          { name: "transactions", url: "http://localhost:5000/api/transactions" },
          { name: "goals", url: "http://localhost:5000/api/goals" }
        ];

        // Faz todas as requisições em paralelo
        const responses = await Promise.all(endpoints.map(({ url }) => fetch(url)));

        // Verifica se todas as respostas são OK (status 200-299)
        responses.forEach((res, index) => {
          if (!res.ok) {
            throw new Error(`Erro ao buscar ${endpoints[index].name}: ${res.status} - ${res.statusText}`);
          }
        });

        // Verifica se a resposta é JSON
        const isJson = (response: Response) =>
          response.headers.get("content-type")?.includes("application/json");

        // Processa as respostas como JSON
        const [balanceData, transactionsData, goalsData] = await Promise.all(
          responses.map(res => isJson(res) ? res.json() : Promise.resolve({}))
        );

        // Atualiza o estado com os dados recebidos
        setBalance(balanceData.balance || 0);
        setTransactions(transactionsData.transactions || []);
        setGoals(goalsData.goals || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(`Erro ao carregar os dados: ${error.message}`);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Grid de componentes */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Overview balance={balance} />
          <Goals goals={goals} />
          <FinanceCharts transactions={transactions} />
        </div>

        {/* Transações */}
        <Transactions transactions={transactions} />
      </div>
    </div>
  );
}
