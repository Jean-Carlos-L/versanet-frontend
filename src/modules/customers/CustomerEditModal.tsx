import { useEffect, useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Modal from "@/common/components/Modal";
import { CustomerUpdate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import { useCustomerById } from "./hooks/useCustomerById"; 


function CustomerEditModal({ isOpen, onClose, customerId }) {
    const { customer } = useCustomerById(customerId);
    const { updateCustomer, loadingAction } = useCustomersCommand();
    const [customerUpdate, setCustomerUpdate] = useState<CustomerUpdate>({
        id: "",
        names: "",
        cedula: "",
        email: "",
        phone: "",
        address: "",
        status: 0,
    });

    useEffect(() => {
        if (customer) {
            setCustomerUpdate({
                id: customer.id,
                names: customer.names,
                cedula: customer.cedula,
                email: customer.email,
                phone: customer.phone,
                address: customer.address,
                status: customer.status,
            });
        }
    }, [customer]);

    const handleChange = (updatedCustomer: CustomerUpdate) => {
        setCustomerUpdate(updatedCustomer);
    };

    const handleSubmit = () => {
        if (!loadingAction) {
            updateCustomer(customerUpdate);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Editar Cliente</h2>
            <FormCustomer 
                customer={customerUpdate} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
            />
        </Modal>
    );
}

export default CustomerEditModal;
