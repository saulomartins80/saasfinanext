import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Overview from "../components/Overview";
import Goals from "../components/Goals";
import FinanceCharts from "../components/FinanceCharts";
import Transactions from "../components/Transactions";

export default function Dashboard() {
  return (
    <div className="flex h-screen text-red-500">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Overview />
          <Goals />
          <FinanceCharts />
        </div>
        <Transactions />
      </div>
    </div>
  );
}
