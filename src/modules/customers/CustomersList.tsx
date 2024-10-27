import Table from "@/common/components/Table";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/20/solid";
import { useCustomersQuery } from "./hooks/useCustomersQuery";
import Spinner from "@/common/components/Spinner";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useCustomersCommand } from "./hooks/useCustomersCommand";

const HEADERS_TABLE = ["#", "Nombres y apellidos", "Cedula", "Correo", "Telefono", "Direccion", "estado", "Acciones"];

function CustomersList() {
    const navigate = useNavigate();
    const { customers, loading, refresh } = useCustomersQuery();
    const { deleteCustomer, loadingAction } = useCustomersCommand(refresh);


    const handleEdit = (id: string) => {
        const path = generatePath(ROUTES.CUSTOMERS_EDIT, { id });
        navigate(path);
    };

    const handleDelete = (id: string) => {
        if (
            window.confirm("¿Estás seguro de eliminar este cliente?") &&
            !loadingAction
        ) {
            deleteCustomer(id);
        }
    };

    const handleView = (id: string) => {
        const path = generatePath(ROUTES.CUSTOMERS_VIEW, { id });
        navigate(path);
    };

    return (
        <div className="flex flex-col items-center">
            <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
                <h1 className="text-3xl font-semibold text-gray-700">Lista de clientes</h1>
            </header>

            <div className="w-11/12 text-center">
                {loading && customers.length === 0 ? (
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
                                <td>{customer.status}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleView(customer.id)}>
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleEdit(customer.id)}>
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
        </div>
    );

}

export default CustomersList;



