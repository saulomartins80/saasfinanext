import FinanceCharts from '../components/FinanceCharts';
import Login from '../components/Login';
import Budget from '../components/Budget';
import FinancialAI from '../components/FinancialAI';
import FinanceChart from '../components/FinanceChart';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <div>
      <Dashboard />
      <FinanceChart />
      <FinanceAI />
      <Login />
      <Budget />
      <FinancialAI />
    </div>
  );
}
