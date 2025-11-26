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
import CreateContract from "./ContractCreateModal";
import EditContract from "./ContractEditModal"; 
import { useInvoiceCommands } from "../invoices/hooks/useInvoiceCommands"; 
import { Contract } from "@/common/models/Contract";

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
  const { contracts, loading, total, totalPages, refresh } = useContractsQuery(filters);
  const { updateContract, deleteContract, loadingAction, validations } = useContractsCommand(refresh);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentContractId, setCurrentContractId] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const { handleCreateInvoice } = useInvoiceCommands();

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", parseInt(e.target.value));
  };

  const handleSelectContract = (contract: Contract) => {
    setSelectedContract(contract);
  };

  const handleDeleteContract = (contractId: string) => {
    if (window.confirm("¿Está seguro de eliminar este contrato?") && !loadingAction) {
      deleteContract(contractId).then(() => {
        setSelectedContract(null); // Limpia sidebar
      });
    }
  };

  const openEditModal = (contractId: string) => {
    setCurrentContractId(contractId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentContractId(null);
    setIsEditModalOpen(false);
  };

  // Toggle estado (activo/inactivo) vía update
  const toggleContractStatus = async (contractId: string, currentEstado: string) => {
    if (!loadingAction) {
      const newEstado = currentEstado === 'activo' ? 'inactivo' : 'activo';
      try {
        // Log action so we can see the intended payload when the button is pressed
        console.log("[Contracts] toggleContractStatus -> sending update for id:", contractId, { status: newEstado });

        // updateContract expects the field `status`, not `estado`.
        await updateContract({ id: contractId, status: newEstado } as any);
        refresh(); // Refresca lista
      } catch (error) {
        console.error("Error al cambiar estado:", error);
      }
    }
  };

  // Modal de confirmación para factura (mantiene lógica)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [invoiceContractId, setInvoiceContractId] = useState<string | null>(null);

  const openConfirmModal = (contractId: string) => {
    setInvoiceContractId(contractId);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setInvoiceContractId(null);
  };

  const confirmInvoiceCreation = () => {
    if (invoiceContractId) {
      handleCreateInvoice(invoiceContractId);
    }
    closeConfirmModal();
  };

  // Filtros de estado (botones activos/inactivos)
  const handleEstadoFilter = (estado: string) => {
    handleChange("estado", estado);
  };

  // Debounce para inputs de filtro (opcional, ya en hook)
  const debouncedFilterChange = (key: keyof typeof filters, value: string) => {
    handleChange(key, value);
  };

  return (
    <main className="flex w-full h-full flex-col">
      <Header title="Lista de Contratos" />
      <div className="flex flex-col items-center">
        {/* Filtros de Estado */}
        <section className="mb-10 w-11/12">
          <div className="flex space-x-5 justify-start w-full">
            <button
              onClick={() => handleEstadoFilter('activo')}
              className={`px-4 py-2 rounded-t-lg focus:outline-none ${
                filters.estado === 'activo'
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => handleEstadoFilter('inactivo')}
              className={`px-4 py-2 rounded-t-lg focus:outline-none ${
                filters.estado === 'inactivo'
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Inactivos
            </button>
          </div>
        </section>

        {/* Filtros Avanzados */}
        <section className="w-full flex flex-col">
          <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label htmlFor="plan" className="text-sm font-medium text-gray-700 mb-1">
                  Plan
                </label>
                <input
                  type="text"
                  id="plan"
                  value={filters.plan || ''}
                  onChange={(e) => debouncedFilterChange("plan", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por descripción de plan"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="customer" className="text-sm font-medium text-gray-700 mb-1">
                  Cliente
                </label>
                <input
                  type="text"
                  id="customer"
                  value={filters.customer || ''}
                  onChange={(e) => debouncedFilterChange("customer", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por nombre de cliente"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="date_from" className="text-sm font-medium text-gray-700 mb-1">
                  Fecha desde (inicio)
                </label>
                <input
                  type="date"
                  id="date_from"
                  value={filters.date_from || ''}
                  onChange={(e) => handleChange("date_from", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="date_to" className="text-sm font-medium text-gray-700 mb-1">
                  Fecha hasta (fin)
                </label>
                <input
                  type="date"
                  id="date_to"
                  value={filters.date_to || ''}
                  onChange={(e) => handleChange("date_to", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </header>

          {/* Modales */}
          {isCreateModalOpen && (
            <CreateContract
              isOpen={isCreateModalOpen}
              onClose={closeCreateModal}
              onRefresh={refresh}
            />
          )}
          {isEditModalOpen && currentContractId && (
            <EditContract
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              onRefresh={refresh}
              contractId={currentContractId}
            />
          )}
        </section>

        {/* Lista y Sidebar */}
        <section className="flex w-full h-full space-x-5">
          <div className="w-full flex flex-col">
            <div className="flex flex-col w-full text-gray-800">
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex-shrink flex-col w-9/10">
                  <div className="flex items-center space-x-10 mb-3">
                    <Pagination
                        currentPage={filters.page}
                        pageSize={filters.pageSize}
                        totalItems={total}
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
                    <button
                      onClick={openCreateModal}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md w-40"
                      disabled={loadingAction}
                    >
                      Agregar Contrato
                    </button>
                  </div>
                  <Table
                    headers={HEADERS_TABLE}
                    data={contracts.map((contract, index) => (
                      <TableRow
                        key={contract.id}
                        onClick={() => handleSelectContract(contract)}
                      >
                        <TableCell>{(filters.page - 1) * filters.pageSize + index + 1}</TableCell>
                        <TableCell>{contract.plan?.description || 'N/A'}</TableCell>
                        <TableCell>{contract.start_date?.split('T')[0] || 'N/A'}</TableCell>
                        <TableCell>{contract.end_date?.split('T')[0] || 'N/A'}</TableCell>
                        <TableCell>{contract.customer?.name || 'N/A'}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-3 py-1 rounded-full ${
                            contract.status === 'activo'
                              ? "bg-green-500 text-green-100"
                              : "bg-red-500 text-red-100"
                          } font-medium`}>
                            {contract.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleContractStatus(contract.id, contract.status);
                              }}
                              title={contract.status === 'activo' ? 'Desactivar' : 'Activar'}
                            >
                              <PowerIcon className={`h-5 w-5 ${
                                contract.status === 'activo' ? 'text-red-500' : 'text-green-500'
                              }`} />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  />
                  {contracts.length === 0 && !loading && (
                    <p className="text-center text-gray-500 mt-4">No hay contratos para mostrar.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar de Detalles */}
          {selectedContract ? (
            <div className="flex-shrink w-1/3">
              <div className="flex items-center p-4 bg-gray-50 border rounded-md shadow-lg overflow-y-auto max-h-[80vh]">
                <div className="w-full">
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Plan</label>
                    <p className="text-sm text-gray-600">{selectedContract.plan?.description}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Precio</label>
                    <p className="text-sm text-gray-600">${selectedContract.plan?.price || 'N/A'}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Fecha de inicio</label>
                    <p className="text-sm text-gray-600">{selectedContract.start_date?.split('T')[0]}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Fecha de fin</label>
                    <p className="text-sm text-gray-600">{selectedContract.end_date?.split('T')[0]}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Cliente</label>
                    <p className="text-sm text-gray-600">{selectedContract.customer?.name}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Teléfono</label>
                    <p className="text-sm text-gray-600">{selectedContract.customer?.phone}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Dirección IP/MAC</label>
                    <p className="text-sm text-gray-600">{selectedContract.inventory?.network_address || 'N/A'}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Referencia Equipo</label>
                    <p className="text-sm text-gray-600">{selectedContract.inventory?.reference || 'N/A'}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Tipo de Equipo</label>
                    <p className="text-sm text-gray-600">{selectedContract.inventory?.type === '1' ? 'Router' : 'Antena'}</p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">Estado</label>
                    <p className="text-sm text-gray-600">
                      <span className={`inline-block px-3 py-1 rounded-full ${
                        selectedContract.status === 'activo'
                          ? "bg-green-500 text-green-100"
                          : "bg-red-500 text-red-100"
                      } font-medium`}>
                        {selectedContract.status === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleDeleteContract(selectedContract.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md"
                      disabled={loadingAction}
                    >
                      <TrashIcon className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => openEditModal(selectedContract.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md"
                      disabled={loadingAction}
                    >
                      <PencilIcon className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => openConfirmModal(selectedContract.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                      <CurrencyDollarIcon className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setSelectedContract(null)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Modal de Confirmación para Factura */}
          {isConfirmModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Confirmación de Factura</h2>
                <p className="mb-6">
                  ¿Estás seguro de que deseas crear una factura para este contrato?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeConfirmModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmInvoiceCreation}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ContractList;
