import { useState } from "react";
import Table from "@/common/components/Table";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/20/solid";
import Spinner from "@/common/components/Spinner";
import Modal from "@/common/components/Modal";
import { useCustomersQuery } from "./hooks/useCustomersQuery";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import CustomerCreateModal from "./CustomerCreateModal";
import CustomerEditModal from "./CustomerEditModal";
import { CustomerUpdate } from "@/common/models/Customer";

const HEADERS_TABLE = ["#", "Nombres y apellidos", "Cedula", "Correo", "Telefono", "Direccion", "Acciones"];

function CustomerListModal() {
    const { customers, loading, refresh } = useCustomersQuery();
    const { deleteCustomer, loadingAction } = useCustomersCommand(refresh);
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const openEditModal = (customerId: string) => {
        setCurrentCustomerId(customerId);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentCustomerId(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("¿Estás seguro de eliminar este cliente?") && !loadingAction) {
            deleteCustomer(id);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
                <h1 className="text-3xl font-semibold text-gray-700">Lista de clientes</h1>
            </header>      
            <div className="w-11/12 flex justify-end mb-5">
                <button
                    onClick={openCreateModal}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
                >
                    Agregar cliente
                </button>
            </div>
            <div className="w-11/12 text-white">
                {loading ? (
                    <Spinner />
                ) : (
                    <Table
                        headers={HEADERS_TABLE}
                        data={customers.map((customer, index) => (
                            <tr key={customer.id}>
                                <td>{index + 1}</td>
                                <td>{customer.names}</td>
                                <td>{customer.cedula}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(customer.id)}>
                                            <PencilIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(customer.id)}>
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    />
                )}
            </div>

            {/* Modal para crear cliente */}
            {isCreateModalOpen && (
                <CustomerCreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
            )}

            {/* Modal para editar cliente */}
            {isEditModalOpen && currentCustomerId && (
                <CustomerEditModal isOpen={isEditModalOpen} onClose={closeEditModal} customerId={currentCustomerId} />
            )}
        </div>
    );
}

export default CustomerListModal;
