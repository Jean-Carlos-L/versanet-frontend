import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";

// Registro de los componentes de Chart.js necesarios
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

// Definición de las props para el componente
interface PolarAreaChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

// Componente principal
function PolarAreaChart({ data }: PolarAreaChartProps) {
  const options: ChartOptions<"polarArea"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Polar Area",
      },
    },
  };

  return (
    <div className="flex justify-center items-center p-10 w-11/12 mx-auto">
      <PolarArea data={data} options={options} />
    </div>
  );
}

export default PolarAreaChart;
