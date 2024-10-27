import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import { CustomerCreate, CustomerUpdate } from "@/common/models/Customer";
import { useCustomersCommand } from "../hooks/useCustomersCommand";



function FormCustomer({ customer, loading, onSubmit, onChange }: FormCustomerProps) {
    const { validations, errors } = useCustomersCommand();

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...customer, [name]: value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {
            const { hasErrors } = validations(customer);
            if (!hasErrors) {
                return onSubmit();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md max-w-lg mx-auto" aria-label="Formulario de Cliente">
            <div>
                <Textfield
                    label="Nombres"
                    name="names"
                    value={customer?.names}
                    placeholder="Nombres del cliente"
                    onChange={handleChangeText}
                    error={errors.names}
                />

                <Textfield
                    label="Cédula"
                    name="cedula"
                    value={customer?.cedula}
                    placeholder="Cédula del cliente"
                    onChange={handleChangeText}
                    error={errors.cedula}
                />

                <Textfield
                    label="Correo Electrónico"
                    name="email"
                    value={customer?.email}
                    placeholder="Correo electrónico del cliente"
                    onChange={handleChangeText}
                    error={errors.email}
                />
                
                <Textfield
                    label="Teléfono"
                    name="phone"
                    value={customer?.phone}
                    placeholder="Teléfono del cliente"
                    onChange={handleChangeText}
                    error={errors.phone}
                />

                <Textfield
                    label="Dirección"
                    name="address"
                    value={customer?.address}
                    placeholder="Dirección del cliente"
                    onChange={handleChangeText}
                    error={errors.address}
                />
                <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
                </div>
            </div>
        </form>
    );

}

interface FormCustomerProps {
    customer: CustomerCreate | CustomerUpdate;
    loading?: boolean;
    onSubmit: () => void;
    onChange: (customer: CustomerCreate | CustomerUpdate) => void;
}

export default FormCustomer;