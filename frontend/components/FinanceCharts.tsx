import { useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        label: "Evolução Financeira",
        data: [100, 200, -150, 300, -50, 450],
        backgroundColor: (context: any) => {
          return context.raw < 0 ? "rgba(255, 99, 132, 0.8)" : "rgba(75, 192, 192, 0.8)";
        },
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite ajustar melhor o tamanho do gráfico
    plugins: {
      title: {
        display: true,
        text: "Evolução Financeira",
        font: { size: 20 },
      },
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw > 0 ? "Lucro" : "Prejuízo"}: R$ ${Math.abs(tooltipItem.raw).toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: { beginAtZero: true, grid: { display: false } },
      y: { beginAtZero: true, grid: { display: false } },
    },
  };

  return (
    <div className="flex justify-center items-center w-full mt-auto p-6"> {/* Centraliza horizontalmente e empurra para baixo */}
      <div className="w-full max-w-3xl h-80"> {/* Define um tamanho fixo para melhor visualização */}
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default FinanceChart;
