import { useState } from "react";
import FormCustomer from "./components/FormCustomer";
import Header from "@/common/components/Header";
import { CustomerCreate } from "@/common/models/Customer";
import { useCustomersCommand } from "./hooks/useCustomersCommand";

function CustomersCreate() {
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
            });
        }
    };

    return (
        <div>
            <Header title="Crear cliente" />
            <FormCustomer customer={customer} onChange={handleChange} onSubmit={handleSubmit} />
        </div>
    );
}

export default CustomersCreate;