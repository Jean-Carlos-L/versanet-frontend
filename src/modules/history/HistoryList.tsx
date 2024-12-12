import { useState } from "react";
import { useHistory } from "@/modules/history/hooks/useHistory";
import { useFiltersHistory } from "./hooks/useFiltersHistory";
import { useNumberHistory } from "./hooks/useNumberHistory";
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";
import Pagination from "@/common/components/Pagination";

const HEADERS_TABLE = ["#", "Entidad", "Acción"];

function HistoryList({ entities }: { entities: string }) {
  const { filters, handleChange } = useFiltersHistory();
  const { historial, loading } = useHistory(entities, filters);
  const { numberHistory } = useNumberHistory(entities);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", Number(e.target.value));
  };

  // Estado para manejar qué fila está expandida
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index); // Alternar expansión
  };

  return (
    <main>
      <Header title="Historial de Notificaciones" />
      <div className="flex flex-col items-center">
        <section className="w-11/12">
          <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Filtros de búsqueda
              </h2>
              <div className="flex items-center space-x-5">
                <label htmlFor="startDate" className="text-gray-600">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={filters.startDate || ""}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </header>
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Pagination
                  currentPage={filters.page}
                  pageSize={filters.pageSize}
                  totalItems={numberHistory}
                  onPageChange={(page) => handleChange("page", page)}
                />
                <select
                  onChange={handleChangePageSize}
                  className="select select-bordered"
                  value={filters.pageSize}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300 rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      {HEADERS_TABLE.map((header) => (
                        <th
                          key={header}
                          className="py-3 px-4 text-left font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map((notification, index) => (
                      <>
                        {/* Fila principal */}
                        <tr
                          key={notification.id_historial}
                          onClick={() => handleToggleRow(index)}
                          className={`cursor-pointer ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-gray-500 hover:text-white transition duration-150`}
                        >
                          <td className="py-3 px-4 border-t text-gray-800">
                            {index + 1 + (filters.page - 1) * filters.pageSize}
                          </td>
                          <td className="py-3 px-4 border-t text-gray-800">
                            {notification.entidad}
                          </td>
                          <td className="py-3 px-4 border-t text-gray-800">
                            {notification.accion}
                          </td>
                        </tr>

                        {/* Fila expandible */}
                        {expandedRow === index && (
                          <tr className="bg-gray-200">
                            <td
                              colSpan={HEADERS_TABLE.length}
                              className="p-4 border-t"
                            >
                              <div className="text-sm text-gray-700">
                                <p>
                                  <strong className="text-gray-900">
                                    ID Registro:
                                  </strong>{" "}
                                  {notification.id_entidad}
                                </p>
                                <p>
                                  <strong className="text-gray-900">
                                    Mensaje Completo:
                                  </strong>{" "}
                                  {notification.mensaje}
                                </p>
                                <p>
                                  <strong className="text-gray-900">
                                    Fecha de Notificación:
                                  </strong>{" "}
                                  {new Date(
                                    notification.fecha_historial
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default HistoryList;
