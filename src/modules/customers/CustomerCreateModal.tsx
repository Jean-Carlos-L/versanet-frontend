import { useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Modal from "@/common/components/Modal"; // Asegúrate de que este componente Modal exista
import { CustomerCreate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";

function CustomerCreateModal({ isOpen, onClose, onRefresh }) {
    const [customer, setCustomer] = useState<CustomerCreate>({
        name: "",
        document: "",
        email: "",
        phone: "",
        address: "",
        status: "activo",
    });
    const { createCustomer, loadingAction } = useCustomersCommand(onRefresh);

    const handleChange = (customer: CustomerCreate) => {
        setCustomer(customer);
    };

    const handleSubmit = async() => {
         if (!loadingAction) {
            await createCustomer(customer).then(() => {
                setCustomer({
                    name: "",
                    document: "",
                    email: "",
                    phone: "",
                    address: "",
                    status: "activo",
                });
                onClose();
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
