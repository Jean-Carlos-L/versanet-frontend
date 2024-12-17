import React from "react";
import TraficoChart from "@/modules/stats/components/TraficoChart";
import Header from "@/common/components/Header";
import { Link } from "react-router-dom";

function TraficoList() {
  return (
    <main>
      <Header title="Estadísticas de Tráfico" />

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

      <section className="p-6">
        <TraficoChart />
      </section>
    </main>
  );
}

export default TraficoList;
