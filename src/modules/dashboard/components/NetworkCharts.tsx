// components/dashboard/NetworkCharts.tsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { usePercentageDistributionPlansQuery } from "../hooks/usePercentageDistributionPlansQuery";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function NetworkCharts() {
  const { data: distributionPlans } = usePercentageDistributionPlansQuery();

  const lineData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
    datasets: [
      {
        label: "Tráfico (Mbps)",
        data: [65, 92, 145, 190, 215, 170, 98],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.parsed.y} Mbps`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(0, 0, 0, 0.05)" },
        ticks: { callback: (value: any) => `${value} Mbps` },
      },
      x: { grid: { display: false } },
    },
  };

  const doughnutData = {
    labels: distributionPlans?.map((plan) => plan.plan),
    datasets: [
      {
        data: distributionPlans?.map((plan) => plan.percentage),
        backgroundColor: [
          "rgb(251, 146, 60)", // orange-400
          "rgb(34, 197, 94)", // green-500
          "rgb(99, 102, 241)", // indigo-500
          "rgb(236, 72, 153)", // pink-500
          "rgb(14, 165, 233)", // sky-500
          "rgb(168, 85, 247)", // purple-500
          "rgb(16, 185, 129)", // emerald-500
          "rgb(249, 115, 22)", // orange-500
        ],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 15,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          font: { size: 13 },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => ({
                text: `${label} — ${data.datasets[0].data[i]}%`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: "#fff",
                fontColor: "#374151",
              }));
            }
            return [];
          },
        },
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed}%`,
        },
      },
    },
    cutout: "68%",
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
      {/* Gráfica de Línea */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Consumo de Red (Últimas 24h)
        </h3>
        <div className="h-80">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Gráfica de Dona */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Distribución de Planes Activos
        </h3>
        <div className="h-80">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>
      </div>
    </section>
  );
}
