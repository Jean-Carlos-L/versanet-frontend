import { useTrafico } from "./hooks/useTrafico";
import TrafficChart from "./components/TraficoChart";
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";
import { Link } from "react-router-dom";

const Trafico: React.FC = () => {
  const { traficoData, loading } = useTrafico();

  if (loading || traficoData.length === 0) {
    return (
      <main>
        <Header title="Tráfico de Red" />
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      </main>
    );
  }

  // Generar etiquetas y datos para el gráfico
  const labels = traficoData.map((_, index) => `Tiempo ${index + 1}`);
  const rxPackets = traficoData.map((data) => data.rxPacketsPerSecond);
  const rxBits = traficoData.map((data) => data.rxBitsPerSecond);
  const txPackets = traficoData.map((data) => data.txPacketsPerSecond);
  const txBits = traficoData.map((data) => data.txBitsPerSecond);

  return (
    <main>
      <Header title="Tráfico de Red" />

      {/* Botones de Navegación */}
      <div className="flex justify-center gap-4 p-6">
        <Link
          to="/control-panel"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Ver Estadísticas
        </Link>
        <Link
          to="/trafico"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Ir a Tráfico
        </Link>
      </div>

      <div className="p-6">
        <TrafficChart
          labels={labels}
          name="Interfaz de Red"
          rxPackets={rxPackets}
          rxBits={rxBits}
          txPackets={txPackets}
          txBits={txBits}
        />
      </div>
    </main>
  );
};

export default Trafico;
