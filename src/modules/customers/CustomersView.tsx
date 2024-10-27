import { useParams } from "react-router-dom";
import { useCustomerById } from "./hooks/useCustomerById";
import Header from "@/common/components/Header";

function CustomersView() {
    const { id } = useParams<{ id: string }>();
    const { customer } = useCustomerById(id);

    return (
        <div>
            <Header title="Ver Cliente" />
            <div className="bg-gray-800 flex items-center justify-center">
                <div className="bg-gray-900 p-8 rounded-xl shadow-2xl max-w-2xl w-full">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">
                                    Nombres y apellidos:{" "}
                                </span>
                                {customer?.names || (
                                    <span className="italic text-gray-500">Sin nombres y apellidos</span>
                                )}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">Cedula: </span>
                                {customer?.cedula || (
                                    <span className="italic text-gray-500">Sin cedula</span>
                                )}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">Correo: </span>
                                {customer?.email || (
                                    <span className="italic text-gray-500">Sin correo</span>
                                )}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">Telefono: </span>
                                {customer?.phone || (
                                    <span className="italic text-gray-500">Sin telefono</span>
                                )}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">Direccion: </span>
                                {customer?.address || (
                                    <span className="italic text-gray-500">Sin direccion</span>
                                )}
                            </p>
                        </div>
                        <div className="mb-6">
                            <p className="text-xl text-gray-300">
                                <span className="font-semibold text-indigo-400">Estado: </span>
                                {customer?.status === 1 ? (
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomersView;