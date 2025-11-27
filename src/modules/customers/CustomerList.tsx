import { useState } from "react";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Spinner from "@/common/components/Spinner";
import { useCustomersQuery } from "./hooks/useCustomersQuery";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import CustomerCreateModal from "./CustomerCreateModal";
import CustomerEditModal from "./CustomerEditModal";
import Header from "@/common/components/Header";
import Textfield from "@/common/components/Textfield";
import Button from "@/common/components/Button";
import { Customer } from "@/common/models/Customer";

const HEADERS_TABLE = ["#", "Cédula", "Nombres y apellidos"];
const ITEMS_PER_PAGE = 10;

function CustomerListModal() {
  const { customers, loading, refresh } = useCustomersQuery();
  const { deleteCustomer, loadingAction } = useCustomersCommand(refresh);

  const [filter, setFilter] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (customerId: string) => {
    setCurrentCustomerId(customerId);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCustomerId(null);
  };
  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleDelete = (id: string) => {
    deleteCustomer(id).then(() => {
      setSelectedCustomer(null);
    });
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.document.toLowerCase().includes(filter.toLowerCase()) ||
      customer.name.toLowerCase().includes(filter.toLowerCase()) ||
      (customer.email &&
        customer.email.toLowerCase().includes(filter.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <main>
      <Header title="Clientes" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 flex gap-3">
          <div className="flex flex-grow flex-col items-center bg-white p-4 rounded-lg shadow-md">
            <section className="mb-10 w-full">
              <div className="mb-4 justify-center">
                <Textfield
                  label=""
                  name="search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Cédula, nombre o correo"
                />
              </div>

              <div className="flex flex-col space-y-2 mb-4">
                <div className="w-fit">
                  <Button onClick={openCreateModal} type="button">
                    Agregar cliente
                  </Button>
                </div>
                {loading && customers.length === 0 ? (
                  <Spinner />
                ) : (
                  <Table
                    headers={HEADERS_TABLE}
                    data={currentCustomers.map((customer, index) => (
                      <TableRow
                        key={customer.id}
                        onClick={() => handleSelectCustomer(customer)}
                      >
                        <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                        <TableCell>{customer.document}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                      </TableRow>
                    ))}
                  />
                )}
              </div>
            </section>
          </div>

          {selectedCustomer && (
            <DetailCustomer
              customer={selectedCustomer}
              onClose={() => setSelectedCustomer(null)}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>

      {isCreateModalOpen && (
        <CustomerCreateModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
          onRefresh={refresh}
        />
      )}

      {isEditModalOpen && currentCustomerId && (
        <CustomerEditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          customerId={currentCustomerId}
          onRefresh={refresh}
        />
      )}
    </main>
  );
}

function DetailCustomer({
  customer,
  onClose,
  onEdit,
  onDelete,
}: {
  customer: Customer;
  onClose: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  if (!customer) return null;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'activo':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'suspendido':
      case 'suspended':
        return 'bg-yellow-100 text-yellow-800';
      case 'eliminado':
      case 'deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <aside className="w-1/4 bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Detalles del Cliente
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <dl className="space-y-6 text-sm">
          <div>
            <dt className="text-gray-500 font-medium">ID</dt>
            <dd className="mt-1 text-gray-900 font-mono text-xs sm:text-sm">
              {customer.id}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Nombre completo</dt>
            <dd className="mt-1 text-gray-900 font-semibold text-base">
              {customer.name || "Sin nombre"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Email</dt>
            <dd className="mt-1 text-gray-900 break-words">
              {customer.email || "No registrado"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Teléfono</dt>
            <dd className="mt-1 text-gray-900">
              {customer.phone || "No registrado"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Dirección</dt>
            <dd className="mt-1 text-gray-900">
              {customer.address || "No registrada"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500 font-medium">Estado</dt>
            <dd className="mt-2">
              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(
                  customer.status
                )}`}
              >
                {customer.status || "Desconocido"}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Footer con acciones */}
         <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50">
        <button
          onClick={() => onEdit(customer.id)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(customer.id)}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}

export default CustomerListModal;
