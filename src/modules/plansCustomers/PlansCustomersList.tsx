import { useState } from "react";
import { usePlansCustomersQuery } from "./hooks/usePlansCustomersQuery";
import { useFilters } from "./hooks/useFilters";
import Spinner from "@/common/components/Spinner";
import {
  TrashIcon,
  PencilIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import { usePlansCustomersCommand } from "./hooks/usePlansCustomersCommand";
import { PowerIcon } from "@heroicons/react/20/solid";
import { useNumberOfPlansCustomers } from "./hooks/useNumberOfPlansCustomers";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";
import PlansCustomersCreate from "./PlansCustomerCreate";
import PlansCustomerEdit from "./PlansCustomerEdit";
import { useInvoiceCommands } from "../invoices/hooks/useInvoiceCommands";

const HEADERS_TABLE = [
  "#",
  "Descripción",
  "Fecha de inicio",
  "Fecha de fin",
  "Cliente",
  "Acciones",
];

function PlansCustomersList() {
  const { filters, handleChange } = useFilters();
  const { plansCustomers, loading, refresh } = usePlansCustomersQuery(filters);
  const { numberOfPlansCustomers } = useNumberOfPlansCustomers(filters);
  const { enablePlan, disablePlan } = usePlansCustomersCommand(refresh);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(
    null
  );
  const [selectPlanCustomer, setSelectPlanCustomer] = useState(null);
  const { handleCreateInvoice } = useInvoiceCommands();

  const { deletePlanCustomer, loadingAction } =
    usePlansCustomersCommand(refresh);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", e.target.value);
  };

  const handleSelectPlanCustomer = (planCustomer) => {
    setSelectPlanCustomer(planCustomer);
  };

  const handleDeletePlanCustomer = (planCustomerId: string) => {
    if (
      window.confirm("¿Está seguro de eliminar este plan de cliente?") &&
      !loadingAction
    ) {
      deletePlanCustomer(planCustomerId);
    }
  };

  const openEditModal = (planCustomerId: string) => {
    setCurrentCustomerId(planCustomerId);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentCustomerId(null);
    setIsEditModalOpen(false);
  };
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [invoiceCustomerId, setInvoiceCustomerId] = useState(null);

  const openConfirmModal = (planCustomerId) => {
    setInvoiceCustomerId(planCustomerId);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setInvoiceCustomerId(null);
  };

  const confirmInvoiceCreation = () => {
    handleCreateInvoice(invoiceCustomerId);
    closeConfirmModal();
  };

  return (
    <main className="flex w-full h-full flex-col">
      <Header title="Lista de servicios de clientes" />
      <div className="flex flex-col items-center">
        <section className="mb-10 w-11/12">
          <div className="flex space-x-5 justify-start w-full">
            <button
              onClick={() => handleChange("status", 1)}
              className={`px-4 py-2 rounded-t-lg focus:outline-none ${
                filters.status === 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => handleChange("status", 0)}
              className={`px-4 py-2 rounded-t-lg focus:outline-none ${
                filters.status === 0
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Inactivos
            </button>
          </div>
        </section>

        <section className="w-full flex flex-col ">
          <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="plan"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Plan
                </label>
                <input
                  type="text"
                  id="plan"
                  value={filters.plan}
                  onChange={(e) => handleChange("plan", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar plan"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="customer"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Cliente
                </label>
                <input
                  type="text"
                  id="customer"
                  value={filters.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar cliente"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={filters.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="endDate"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Fecha de fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={filters.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </header>

          {isCreateModalOpen && (
            <PlansCustomersCreate
              isOpen={isCreateModalOpen}
              onClose={closeCreateModal}
              onRefresh={refresh}
            />
          )}
          {isEditModalOpen && currentCustomerId && (
            <PlansCustomerEdit
              isOpen={isEditModalOpen}
              onClose={closeEditModal}
              onRefresh={refresh}
              planCustomerId={currentCustomerId}
            />
          )}
        </section>
        <section className="flex w-full h-full space-x-5">
          <div className="w-full flex flex-col">
            <div className="flex flex-col w-full text-gray-800">
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex-shrin flex-col w-9/10">
                  <div className="flex items-center space-x-10 mb-3">
                    <Pagination
                      currentPage={filters.page}
                      pageSize={filters.pageSize}
                      totalItems={numberOfPlansCustomers}
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
                    >
                      Agregar contrato
                    </button>
                  </div>
                  <Table
                    headers={HEADERS_TABLE}
                    data={plansCustomers.map((plan, index) => (
                      <TableRow
                        key={plan.id}
                        onClick={() => handleSelectPlanCustomer(plan)}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{plan.plan.description}</TableCell>
                        <TableCell>{plan.startDate}</TableCell>
                        <TableCell>{plan.endDate}</TableCell>
                        <TableCell>{plan.customer.name}</TableCell>
                        <TableCell>
                          {plan.status === 1 ? (
                            <button onClick={() => disablePlan(plan.id)}>
                              <PowerIcon className="h-5 w-5 text-red-500" />
                            </button>
                          ) : (
                            <button onClick={() => enablePlan(plan.id)}>
                              <PowerIcon className="h-5 w-5 text-green-500" />
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  />
                </div>
              )}
            </div>
          </div>
          {selectPlanCustomer ? (
            <div className="flex-shrin w-1/3">
              <div className="flex items-center p-4 bg-gray-50 border rounded-md shadow-lg overflow-y-auto">
                <div className="w-full">
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Plan
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.plan.description}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.plan.price}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Fecha de inicio
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.startDate}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Fecha de fin
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.endDate}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Cliente
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.customer.name}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.customer.phone}
                    </p>
                  </div>
                  <div className="div mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Referencia Mac
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.inventoryMac.reference}
                    </p>
                  </div>
                  <div className="div mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Referencia Router
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.inventoryRouter.reference}
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <p className="text-sm text-gray-600">
                      {selectPlanCustomer.status === 1 ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-green-100 font-medium">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-red-100 font-medium">
                          Inactivo
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() =>
                        handleDeletePlanCustomer(selectPlanCustomer.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mr-5"
                    >
                      <TrashIcon className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => openEditModal(selectPlanCustomer.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md mr-5"
                    >
                      <PencilIcon className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => openConfirmModal(selectPlanCustomer.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md mr-5"
                    >
                      <CurrencyDollarIcon className="h-5 w-5 mx-auto" />
                    </button>

                    <button
                      onClick={() => setSelectPlanCustomer(null)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {isConfirmModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Confirmación</h2>
                <p className="mb-6">
                  ¿Estás seguro de que deseas crear una factura para este
                  cliente?
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

export default PlansCustomersList;
