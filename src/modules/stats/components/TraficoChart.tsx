import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TrafficChartProps {
  labels: string[];
  name: string;
  rxPackets: number[];
  rxBits: number[];
  txPackets: number[];
  txBits: number[];
}

const TrafficChart: React.FC<TrafficChartProps> = ({
  labels,
  name,
  rxPackets,
  rxBits,
  txPackets,
  txBits,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "RX Packets Per Second",
        data: rxPackets,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "RX Bits Per Second",
        data: rxBits,
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.4,
      },
      {
        label: "TX Packets Per Second",
        data: txPackets,
        borderColor: "rgba(255,206,86,1)",
        backgroundColor: "rgba(255,206,86,0.2)",
        tension: 0.4,
      },
      {
        label: "TX Bits Per Second",
        data: txBits,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Tráfico en tiempo real de la interfaz  " + name,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo",
        },
      },
      y: {
        title: {
          display: true,
          text: "Valor",
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TrafficChart;