import Header from "@/common/components/Header";
import { useCountEntitiesQuery } from "./hooks/useCountEntitiesQuery";
import { useCountRecentEntitiesQuery } from "./hooks/useCountRecentEntitiesQuery";
import NetworkCharts from "./components/NetworkCharts";

function Dashboard() {
  const { data: countEntities } = useCountEntitiesQuery();
  const { data: countRecentEntities } = useCountRecentEntitiesQuery();

  return (
    <main>
      <Header title="Bienvenido al Dashboard" />
      <div className="p-5">
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Resumen de Entidades
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tarjeta Clientes */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Clientes</p>
                  <p className="text-3xl font-bold mt-2">
                    {countEntities?.customers ?? 0}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-blue-50 text-xs mt-4 opacity-90">
                Total registrados
              </p>
            </div>

            {/* Tarjeta Contratos */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">
                    Contratos
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {countEntities?.contracts ?? 0}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-green-50 text-xs mt-4 opacity-90">
                Total registrados
              </p>
            </div>

            {/* Tarjeta Facturas */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Facturas
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {countEntities?.invoices ?? 0}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-purple-50 text-xs mt-4 opacity-90">
                Total registradas
              </p>
            </div>

            {/* Tarjeta Usuarios */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">
                    Usuarios
                  </p>
                  <p className="text-3xl font-bold mt-2">
                    {countEntities?.users ?? 0}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-orange-50 text-xs mt-4 opacity-90">
                Del sistema
              </p>
            </div>
          </div>
        </section>
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Actividad del Mes Actual
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Contratos creados este mes */}
            <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Contratos creados
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    {countRecentEntities?.contracts.thisMonth ?? 30}
                  </p>
                  <p className="text-emerald-600 text-sm font-semibold mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {countRecentEntities?.contracts.percentageChange ?? 0}% vs
                    mes anterior
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <svg
                    className="w-7 h-7 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Facturas pagadas este mes */}
            <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Facturas pagadas
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    {countRecentEntities?.invoices.thisMonth ?? 0}
                  </p>
                  <p className="text-blue-600 text-sm font-semibold mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {countRecentEntities?.invoices.percentageChange ?? 0}% vs
                    mes anterior
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Nuevos clientes este mes */}
            <div className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Nuevos clientes
                  </p>
                  <p className="text-4xl font-bold text-gray-900 mt-2">
                    {countRecentEntities?.customers.thisMonth ?? 0}
                  </p>
                  <p className="text-purple-600 text-sm font-semibold mt-2 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {countRecentEntities?.customers.percentageChange ?? 0}% vs
                    mes anterior
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <svg
                    className="w-7 h-7 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NetworkCharts />
      </div>
    </main>
  );
}

export default Dashboard;
