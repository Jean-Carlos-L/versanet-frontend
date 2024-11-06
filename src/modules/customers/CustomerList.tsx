import { useState } from "react";
import Table from "@/common/components/Table";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Spinner from "@/common/components/Spinner";
import { useCustomersQuery } from "./hooks/useCustomersQuery";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import CustomerCreateModal from "./CustomerCreateModal";
import CustomerEditModal from "./CustomerEditModal";

const HEADERS_TABLE = ["#", "Cédula", "Nombres y apellidos"];
const ITEMS_PER_PAGE = 10;

function CustomerListModal() {
    const { customers, loading, refresh } = useCustomersQuery();
    const { deleteCustomer, loadingAction } = useCustomersCommand(refresh);

    const [filter, setFilter] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
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
        if (window.confirm("¿Estás seguro de eliminar este cliente?") && !loadingAction) {
            deleteCustomer(id);
        }
    };

    const filteredCustomers = customers.filter(customer => {
        return (
            customer.cedula.toLowerCase().includes(filter.toLowerCase()) ||
            customer.names.toLowerCase().includes(filter.toLowerCase()) ||
            (customer.email && customer.email.toLowerCase().includes(filter.toLowerCase()))
        );
    });

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex w-full h-full flex-col">
            <header className="bg-gray-100 w-full p-3 rounded-md shadow-lg mb-5">
                <h1 className="text-3xl font-semibold text-gray-700">Clientes</h1>
            </header>
            <div className="flex justify-between mb-3">
                <div className="flex-1 flex justify-center mb-3">
                    <input
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Buscar por cédula, nombre o correo"
                        className="border rounded-md px-4 py-2 w-3/4"
                    />
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={openCreateModal}
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md w-40"
                    >
                        Agregar cliente
                    </button>
                </div>
            </div>
            <div className="flex w-full h-full">
                <div className="w-2/3 p-4 flex flex-col">
                    <div className="flex flex-col w-full text-white">
                        {loading && customers.length === 0 ? (
                            <Spinner />
                        ) : (
                            <Table
                                headers={HEADERS_TABLE}
                                data={currentCustomers.map((customer, index) => (
                                    <tr
                                        key={customer.id}
                                        onClick={() => handleSelectCustomer(customer)}
                                        className="cursor-pointer"
                                    >
                                        <td>{indexOfFirstItem + index + 1}</td>
                                        <td>{customer.cedula}</td>
                                        <td>{customer.names}</td>
                                    </tr>
                                ))}
                            />
                        )}
                    </div>

                    <div className="flex justify-center gap-2 my-4">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            Anterior
                        </button>
                        <span>Página {currentPage}</span>
                        <button onClick={nextPage} disabled={currentPage >= Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)}>
                            Siguiente
                        </button>
                    </div>

                    {isCreateModalOpen && (
                        <CustomerCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onRefresh={refresh} />
                    )}

                    {isEditModalOpen && currentCustomerId && (
                        <CustomerEditModal isOpen={isEditModalOpen} onClose={closeEditModal} customerId={currentCustomerId} onRefresh={refresh} />
                    )}
                </div>

                <div className="w-1/3 p-4 bg-gray-50 border rounded-md shadow-lg min-h-[400px] max-h-[600px] overflow-y-auto">
                    {selectedCustomer ? (
                        <div className="text-center">
                            <div className="md-gray-800 flex items-center justify-center">
                                <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
                                    <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Cédula:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.cedula || (
                                                    <span className="italic text-gray-500">Sin cédula</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Nombres y apellidos:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.names || (
                                                    <span className="italic text-gray-500">Sin nombres y apellidos</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Correo electrónico:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.email || (
                                                    <span className="italic text-gray-500">Sin correo</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Teléfono:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.phone || (
                                                    <span className="italic text-gray-500">Sin teléfono</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Dirección:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.address || (
                                                    <span className="italic text-gray-500">Sin dirección</span>
                                                )}
                                            </p>
                                        </div>
                                        <div className="mb-6">
                                            <p className="text-xl font-semibold text-indigo-400">Estado:</p>
                                            <p className="text-gray-300">
                                                {selectedCustomer.status === 1 ? (
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

                                        <div className="flex justify-center gap-2 mt-6">
                                            <button
                                                onClick={() => openEditModal(selectedCustomer.id)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedCustomer.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h2 className="text-xl font-semibold text-gray-700">Selecciona un cliente para ver detalles</h2>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CustomerListModal;
