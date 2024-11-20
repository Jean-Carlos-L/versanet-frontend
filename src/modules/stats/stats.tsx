import { useStats } from "./hooks/useStats";
import PolarAreaChart from "./components/PolarAreaChart"; // Asegúrate de importar correctamente
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";

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

    const chartData = {
        labels: [
            "Contratos Activos",
            "Contratos Deshabilitados",
            "Clientes Plan 30M",
            "Clientes Plan 60M",
            "Clientes Plan 90M",
        ],
        datasets: [
            {
                label: "Estadísticas de Clientes y Contratos",
                data: [
                    stats.activeContracts,
                    stats.inactiveContracts,
                    stats.clientsWith30MPlan,
                    stats.clientsWith60MPlan,
                    stats.clientsWith90MPlan,
                ],
                backgroundColor: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                ],
            },
        ],
    };

    return (
        <main>
            <Header title="Estadísticas" />
            <div className="flex flex-col items-center mt-5">
                <PolarAreaChart data={chartData} />
            </div>
        </main>
    );
}

export default StatsList;
