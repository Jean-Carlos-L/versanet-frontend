import { useStats } from "./hooks/useStats";
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";
import DoughnutChart from "./components/DoughnutChart";
import { Link } from "react-router-dom";
import {
  WifiIcon,
  BoltSlashIcon,
  UserIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

function StatsList() {
  const { stats, loading } = useStats();

  if (loading || !stats) {
    return (
      <main>
        <Header title="Estadísticas" />
        <div className="flex justify-center mt-10">
          <Spinner />
        </div>
      </main>
    );
  }

  const entities = [
    {
      name: "Contratos Activos",
      value: stats.activeContracts,
      icon: <WifiIcon className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Contratos Deshabilitados",
      value: stats.inactiveContracts,
      icon: <BoltSlashIcon className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Clientes Plan 30M",
      value: stats.clientsWith30MPlan,
      icon: <UserIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Clientes Plan 60M",
      value: stats.clientsWith60MPlan,
      icon: <UserIcon className="h-6 w-6 text-yellow-500" />,
    },
    {
      name: "Clientes Plan 90M",
      value: stats.clientsWith90MPlan,
      icon: <UserIcon className="h-6 w-6 text-purple-500" />,
    },
    {
      name: "Total Clientes",
      value: stats.totalClients,
      icon: <UserGroupIcon className="h-6 w-6 text-pink-500" />,
    },
  ];

  return (
    <main>
      <Header title="Estadísticas" />

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

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {entities.map((entity) => (
          <div
            key={entity.name}
            className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center mb-4">
              {entity.icon}
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                {entity.name}
              </h2>
            </div>
            <p className="text-gray-600">Cantidad: {entity.value}</p>
            <DoughnutChart
              entity={entity.name}
              total={stats.totalClients}
              value={entity.value}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default StatsList;
