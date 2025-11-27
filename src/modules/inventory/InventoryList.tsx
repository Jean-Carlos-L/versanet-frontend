import { useState } from "react";
import { useFilters } from "./hooks/useFilters";
import Spinner from "@/common/components/Spinner";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/20/solid";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";
import { useInventoryQuery } from "./hooks/useInventoryQuery";
import { useInventoryCommand } from "./hooks/useInventoryCommand";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { generatePath } from "@/common/utils/generatePath.util";
import Button from "@/common/components/Button";
import Modal from "@/common/components/Modal";
import Textfield from "@/common/components/Textfield";

const HEADERS_TABLE = [
  "#",
  "Referencia",
  "Tipo de Equipo",
  "Direccion de red",
  "Estado",
  "Acciones",
];

function InventoryList() {
  const navigate = useNavigate();
  const { filters, handleChange } = useFilters();
  const { inventories, loading, refresh, onPage, total, page, pageSize } =
    useInventoryQuery(filters);
  const { deleteInventory } = useInventoryCommand(refresh);

  const [selectInventory, setSelectInventory] = useState(null);

  const redirectToCreate = () => {
    navigate(ROUTES.INVENTORY_CREATE);
  };

  const redirectToEdit = (id: string) => {
    const path = generatePath(ROUTES.INVENTORY_EDIT, { id });
    navigate(path);
  };

  return (
    <main>
      <Header title="Inventario" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          <div className="flex gap-4 mb-4 justify-center">
            <Textfield
              label=""
              name="reference"
              value={filters.referencia}
              onChange={(e) => handleChange("referencia", e.target.value)}
              placeholder="Buscar por referencia"
            />
            <Textfield
              label=""
              name="tipo_equipo"
              value={filters.tipo_equipo}
              onChange={(e) => handleChange("tipo_equipo", e.target.value)}
              placeholder="Buscar por tipo"
            />

            <Textfield
              label=""
              name="direccion_red"
              value={filters.direccion_red}
              onChange={(e) => handleChange("direccion_red", e.target.value)}
              placeholder="Buscar por dirección de red"
            />
          </div>

          <div className="flex flex-col space-y-2 mb-4">
            <div className="w-fit">
              <Button onClick={redirectToCreate} type="button">
                Agregar equipo
              </Button>
            </div>

            {loading && inventories.length === 0 ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={inventories.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.reference}</TableCell>
                    <TableCell>{item.type}</TableCell>

                    <TableCell>{item.network_address}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === "activo"
                            ? "bg-green-100 text-green-800"
                            : item.status === "mantenimiento"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3 justify-center">
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => redirectToEdit(item.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => deleteInventory(item.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => setSelectInventory(item)}
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              />
            )}
          </div>

          <Pagination
            totalItems={total}
            currentPage={page}
            onPageChange={onPage}
            pageSize={pageSize}
          />

          <ModalInventoryDetails
            inventory={selectInventory}
            isOpen={!!selectInventory}
            onClose={() => setSelectInventory(null)}
          />
        </section>
      </div>
    </main>
  );
}

function ModalInventoryDetails({ inventory, onClose, isOpen }) {
  if (!inventory) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Título sutil */}
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Detalles del equipo
          </h3>

          {/* Grid limpia de 2 columnas en pantallas medianas+ */}
          <div className="space-y-4">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
              <div>
                <dt className="text-gray-500 font-medium">Referencia</dt>
                <dd className="mt-1 text-gray-900 font-medium">
                  {inventory.reference}
                </dd>
              </div>

              <div>
                <dt className="text-gray-500 font-medium">Tipo de Equipo</dt>
                <dd className="mt-1 text-gray-900">{inventory.type}</dd>
              </div>

              <div>
                <dt className="text-gray-500 font-medium">Dirección de Red</dt>
                <dd className="mt-1 text-gray-900 font-mono text-xs sm:text-sm">
                  {inventory.network_address}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500 font-medium">Cantidad</dt>
                <dd className="mt-1 text-gray-900">{inventory.quantity}</dd>
              </div>

              <div>
                <dt className="text-gray-500 font-medium">Estado</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      inventory.status === "activo"
                        ? "bg-green-100 text-green-800"
                        : inventory.status === "mantenimiento"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {inventory.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          {/* Espacio inferior para que no se pegue al cierre automático del modal */}
          <div className="mt-8" />
        </div>
      </div>
    </Modal>
  );
}

export default InventoryList;
