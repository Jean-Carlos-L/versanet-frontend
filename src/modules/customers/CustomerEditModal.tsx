import { useEffect, useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Modal from "@/common/components/Modal";
import { CustomerUpdate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import { useCustomerById } from "./hooks/useCustomerById"; 


function CustomerEditModal({ isOpen, onClose, customerId, onRefresh}) {
    const { customer } = useCustomerById(customerId);
    const { updateCustomer, loadingAction } = useCustomersCommand(onRefresh);
    const [customerUpdate, setCustomerUpdate] = useState<CustomerUpdate>({
        id: "",
        name: "",
        document: "",
        email: "",
        phone: "",
        address: "",
        status: "activo",
    });

    useEffect(() => {
        if (customer) {
            setCustomerUpdate({
                id: customer.id,
                name: customer.name,
                document: customer.document,
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
            updateCustomer(customerUpdate)
            onClose();
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
