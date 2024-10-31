import { useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Modal from "@/common/components/Modal"; // Asegúrate de que este componente Modal exista
import { CustomerCreate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";

function CustomerCreateModal({ isOpen, onClose }) {
    const [customer, setCustomer] = useState<CustomerCreate>({
        names: "",
        cedula: "",
        email: "",
        phone: "",
        address: "",
        status: 1,
    });
    const { createCustomer, loadingAction } = useCustomersCommand();

    const handleChange = (customer: CustomerCreate) => {
        setCustomer(customer);
    };

    const handleSubmit = () => {
        if (!loadingAction) {
            createCustomer(customer).then(() => {
                setCustomer({
                    names: "",
                    cedula: "",
                    email: "",
                    phone: "",
                    address: "",
                    status: 1,
                });
                onClose(); // Cerrar el modal después de crear
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Crear Cliente</h2>
            <FormCustomer 
            customer={customer} 
            onChange={handleChange} 
            onSubmit={handleSubmit}
            />
        </Modal>
    );
}

export default CustomerCreateModal;
