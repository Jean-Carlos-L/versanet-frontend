import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Header from "@/common/components/Header";
import { CustomerUpdate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";
import { useCustomerById } from "./hooks/useCustomerById"; 

function CustomersEdit() {
    const {id} = useParams<{ id: string }>();
    const { customer} = useCustomerById(id);
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
    const handleChange = (customer: CustomerUpdate) => {
        setCustomerUpdate(customer);
    };

    const handleSubmit = () => {
        if (!loadingAction) {
            updateCustomer(customerUpdate);
        }
    };

    return (
        <div>
            <Header title="Editar cliente" />
            <FormCustomer customer={customer} loading={loadingAction} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
}

export default CustomersEdit;