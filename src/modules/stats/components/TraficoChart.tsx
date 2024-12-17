import React, { useEffect, useState } from "react";
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

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Tipos de datos de tráfico
interface TrafficData {
  name: string;
  rxPacketsPerSecond: number;
  rxBitsPerSecond: number;
  txPacketsPerSecond: number;
  txBitsPerSecond: number;
}

// Componente principal
const TraficoChart: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);

  // Simulación de API cada 5 segundos
  useEffect(() => {
    const fetchTraffic = async () => {
      // Simular una llamada a la API
      const response = {
        name: "ether3",
        rxPacketsPerSecond: Math.floor(Math.random() * 1000),
        rxBitsPerSecond: Math.floor(Math.random() * 1000000),
        txPacketsPerSecond: Math.floor(Math.random() * 2000),
        txBitsPerSecond: Math.floor(Math.random() * 20000000),
      };

      // Actualizar estado con los nuevos datos
      setTrafficData((prevData) => [...prevData.slice(-9), response]); // Mantener solo las últimas 10 entradas
      setTimeLabels((prevLabels) => [...prevLabels.slice(-9), new Date().toLocaleTimeString()]);
    };

    // Ejecutar fetch cada 5 segundos
    const interval = setInterval(fetchTraffic, 5000);
    fetchTraffic(); // Primer fetch inmediato

    return () => clearInterval(interval);
  }, []);

  // Preparar datos para el gráfico
  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "RX Packets Per Second",
        data: trafficData.map((data) => data.rxPacketsPerSecond),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
      {
        label: "RX Bits Per Second",
        data: trafficData.map((data) => data.rxBitsPerSecond),
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
        tension: 0.4,
      },
      {
        label: "TX Packets Per Second",
        data: trafficData.map((data) => data.txPacketsPerSecond),
        borderColor: "rgba(255,206,86,1)",
        backgroundColor: "rgba(255,206,86,0.2)",
        tension: 0.4,
      },
      {
        label: "TX Bits Per Second",
        data: trafficData.map((data) => data.txBitsPerSecond),
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
        text: "Traffic Statistics - ether3",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Gráfico de Tráfico</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TraficoChart;
