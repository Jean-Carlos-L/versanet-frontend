import { useHistory } from "@/modules/history/hooks/useHistory";
import Spinner from "@/common/components/Spinner";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";
import { useFiltersHistory } from "./hooks/useFiltersHistory";
import { useNumberHistory } from "./hooks/useNumberHistory";

const HEADERS_TABLE = [
  "#",
  "Entidad",
  "Acción",
  "Mensaje",
  "Fecha de Notificación",
];

function HistoryList({ entities }: { entities: string }) {
  const { filters, handleChange } = useFiltersHistory();
  const { historial, loading } = useHistory(entities, filters);
  const { numberHistory } = useNumberHistory(entities);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", Number(e.target.value));
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
              <div className="flex items-center space-x-10 mb-5">
                <Pagination
                  currentPage={filters.page}
                  pageSize={filters.pageSize}
                  totalItems={numberHistory} // Basado en historial.length
                  onPageChange={(page) => handleChange("page", page)}
                />
                <select
                  onChange={handleChangePageSize}
                  className="p-2 mb-0 rounded-md"
                  value={filters.pageSize}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
              <Table
                headers={HEADERS_TABLE}
                data={historial.map((notification, index) => (
                  <TableRow key={notification.id_historial}>
                    <TableCell>
                      {index + 1 + (filters.page - 1) * filters.pageSize}
                    </TableCell>
                    <TableCell>{notification.entidad}</TableCell>
                    <TableCell>{notification.accion}</TableCell>
                    <TableCell>{notification.mensaje}</TableCell>
                    <TableCell>
                      {new Date(
                        notification.fecha_historial
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default HistoryList;
