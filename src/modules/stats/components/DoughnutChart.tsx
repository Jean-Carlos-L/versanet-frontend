import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DoughnutChartProps {
  entity: string;
  total: number;
  value: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ entity, total, value }) => {
  const data = {
    labels: [entity, "Resto"],
    datasets: [
      {
        data: [value, value ? total - value : total],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Distribución de ${entity}`,
      },
      datalabels: {
        display: true,
        color: "#fff",
        formatter: (value: number) => `${value}`,
        font: {
          weight: "bold" as const,
          size: 14,
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
