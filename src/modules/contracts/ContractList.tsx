import { useState } from "react";
import { useContractsQuery } from "./hooks/useContractsQuery";
import { useFiltersContracts } from "./hooks/useFiltersContracts";
import { useContractsCommand } from "./hooks/useContractsCommand";
import Spinner from "@/common/components/Spinner";
import {
  TrashIcon,
  PencilIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import { PowerIcon } from "@heroicons/react/20/solid";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";
import { Contract } from "@/common/models/Contract";
import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import { generatePath } from "@/common/utils/generatePath.util";
import { ROUTES } from "@/common/routers/routes";
import { useNavigate } from "react-router-dom";
import Select from "@/common/components/Select";
import ContractCreateModal from "./ContractCreateModal";
import ContractEditModal from "./ContractEditModal";

const HEADERS_TABLE = [
  "#",
  "Descripción del Plan",
  "Fecha de inicio",
  "Fecha de fin",
  "Cliente",
  "Estado",
  "Acciones",
];

function ContractList() {
  const { filters, handleChange } = useFiltersContracts();
  const { contracts, loading, total, refresh } = useContractsQuery(filters);
  const { toggleContractStatus, deleteContract } = useContractsCommand(refresh);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContractId, setEditingContractId] = useState<string | null>(null);
  const openEditModal = (id: string) => {
    setEditingContractId(id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditingContractId(null);
    setIsEditModalOpen(false);
  };

  const debouncedFilterChange = (key: keyof typeof filters, value: string) => {
    handleChange(key, value);
  };

  const redirectToCreate = () => {
    // keep route available but prefer modal
    // navigate(ROUTES.CONTRACTS_CREATE);
    openCreateModal();
  };

  return (
    <main>
      <Header title="Lista de Contratos" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 flex gap-3">
          <div className="flex flex-grow flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <section className="mb-10 w-full">
              <div className="flex gap-4 mb-4 justify-center">
                <Textfield
                  label=""
                  name="plan"
                  value={filters.plan || ""}
                  onChange={(e) =>
                    debouncedFilterChange("plan", e.target.value)
                  }
                  placeholder="Buscar por descripción del plan"
                />
                <Textfield
                  label=""
                  name="customer"
                  value={filters.customer || ""}
                  onChange={(e) =>
                    debouncedFilterChange("customer", e.target.value)
                  }
                  placeholder="Buscar por cliente"
                />
                <Textfield
                  label=""
                  name="date_from"
                  type="date"
                  value={filters.date_from || ""}
                  onChange={(e) =>
                    debouncedFilterChange("date_from", e.target.value)
                  }
                  placeholder="Fecha desde"
                />
                <Textfield
                  label=""
                  name="date_to"
                  type="date"
                  value={filters.date_to || ""}
                  onChange={(e) =>
                    debouncedFilterChange("date_to", e.target.value)
                  }
                  placeholder="Fecha hasta"
                />
                <Select
                  label=""
                  name="estado"
                  value={filters.estado || ""}
                  onChange={(e) =>
                    debouncedFilterChange("estado", e.target.value)
                  }
                  options={[
                    { value: "activo", label: "Activo" },
                    { value: "inactivo", label: "Inactivo" },
                  ]}
                />
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <div className="w-fit">
                  <Button onClick={redirectToCreate} type="button">
                    Agregar contrato
                  </Button>
                </div>
                {loading && contracts.length === 0 ? (
                  <Spinner />
                ) : (
                  <Table
                    headers={HEADERS_TABLE}
                    data={contracts.map((contract, index) => (
                      <TableRow
                        key={contract.id}
                        onClick={() => setSelectedContract(contract)}
                      >
                        <TableCell>
                          {(filters.page - 1) * filters.pageSize + index + 1}
                        </TableCell>
                        <TableCell>
                          {contract.plan?.description || "N/A"}
                        </TableCell>
                        <TableCell>
                          {contract.start_date?.split("T")[0] || "N/A"}
                        </TableCell>
                        <TableCell>
                          {contract.end_date?.split("T")[0] || "N/A"}
                        </TableCell>
                        <TableCell>
                          {contract.customer?.name || "N/A"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-block px-3 py-1 rounded-full ${
                              contract.status === "activo"
                                ? "bg-green-500 text-green-100"
                                : "bg-red-500 text-red-100"
                            } font-medium`}
                          >
                            {contract.status === "activo"
                              ? "Activo"
                              : "Inactivo"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleContractStatus(contract.id);
                              }}
                              title={
                                contract.status === "activo"
                                  ? "Desactivar"
                                  : "Activar"
                              }
                            >
                              <PowerIcon
                                className={`h-5 w-5 ${
                                  contract.status === "activo"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              />
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
                currentPage={filters.page}
                onPageChange={(newPage) => handleChange("page", newPage)}
                pageSize={filters.pageSize}
              />
            </section>
          </div>
          {selectedContract && (
            <DetailContract
              contract={selectedContract}
              onClose={() => setSelectedContract(null)}
              onDelete={deleteContract}
              onEdit={(id: string) => openEditModal(id)}
            />
          )}
          <ContractCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onRefresh={refresh} />
          <ContractEditModal isOpen={isEditModalOpen} onClose={closeEditModal} contractId={editingContractId} onRefresh={refresh} />
        </section>
      </div>
    </main>
  );
}

function DetailContract({
  contract,
  onClose,
  onDelete,
  onEdit,
}: {
  contract: Contract;
  onClose: () => void;
  onDelete: (id: string) => any;
  onEdit?: (id: string) => void;
}) {
  if (!contract) return null;
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(contract.id).then((data) => {
      if (data.success) onClose();
    });
  };

  const redirectToEdit = () => {
    if (onEdit) return onEdit(contract.id);
    const path = generatePath(ROUTES.CONTRACTS_EDIT, { id: contract.id });
    navigate(path);
  };

  return (
    <aside className="w-1/4 bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Detalles del Contrato
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar panel"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Contenido con scroll si es muy largo */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <dl className="space-y-5 text-sm">
          <div>
            <dt className="text-gray-500 font-medium">Descripción del Plan</dt>
            <dd className="mt-1 text-gray-900">
              {contract.plan?.description || "N/A"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Precio</dt>
            <dd className="mt-1 text-gray-900 flex items-center gap-1">
              {contract.plan ? (
                <>
                  <CurrencyDollarIcon className="h-5 w-5 text-green-600" />
                  <span className="font-medium">
                    {contract.plan.price.toFixed(2)}
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Fecha de Inicio</dt>
            <dd className="mt-1 text-gray-900">
              {contract.start_date
                ? new Date(contract.start_date).toLocaleDateString("es-ES")
                : "N/A"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Fecha de Fin</dt>
            <dd className="mt-1 text-gray-900">
              {contract.end_date
                ? new Date(contract.end_date).toLocaleDateString("es-ES")
                : "N/A"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Cliente</dt>
            <dd className="mt-1 text-gray-900 font-medium">
              {contract.customer?.name || "N/A"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Referencia del Equipo</dt>
            <dd className="mt-1 text-gray-900">
              {contract.inventory?.reference || "Sin asignar"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Estado</dt>
            <dd className="mt-2">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  contract.status === "activo" || contract.status === "vigente"
                    ? "bg-green-100 text-green-800"
                    : contract.status === "pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : contract.status === "cancelado" ||
                      contract.status === "vencido"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {contract.status || "Desconocido"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Footer con acciones */}
      <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50">
        <button
          onClick={redirectToEdit}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}

export default ContractList;
