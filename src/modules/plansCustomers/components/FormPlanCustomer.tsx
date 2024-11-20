import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import Select from "@/common/components/Select";
import { PlanCustomerCreate, PlanCustomerUpdate } from "@/common/models/PlanCustomer";
import { usePlansCustomersCommand } from "../hooks/usePlansCustomersCommand";
import { useCustomersQuery } from "@/modules/customers/hooks/useCustomersQuery";
import { usePlansQuery } from "@/modules/plans/hooks/usePlansQuery";

function FormPlanCustomer ({ planCustomer, loading, onSubmit, onChange }: FormPlanCustomerProps) {
    const { customers } = useCustomersQuery();
    const { plans } = usePlansQuery();
    const { validations, errors } = usePlansCustomersCommand();

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...planCustomer, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {
            const { hasErrors } = validations(planCustomer);
            if (!hasErrors) {
                return onSubmit();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md max-w-lg mx-auto" aria-label="Formulario de Plan del Cliente">
            <div>
                <Select
                label="Cliente"
                name="customer"
                options={customers.map((customer) => ({ value: customer.id, label: customer.cedula }))}
                value={planCustomer?.customer?.id}
                onChange={ (e) => onChange({ ...planCustomer, customer: { id: e.target.value } })}
                error={errors.customer}
                />
                <Select
                label="Plan"
                name="plan"
                options={plans.map((plan) => ({ value: plan.id, label: plan.description }))}
                value={planCustomer?.plan?.id}
                onChange={ (e) => onChange({ ...planCustomer, plan: { id: e.target.value } })}
                error={errors.plan}
                />
                 <Textfield
                    label="IP estatica"
                    name="staticIp"
                    value={planCustomer?.staticIp}
                    placeholder="IP estatica del cliente"
                    onChange={handleChangeText}
                    error={errors.description}
                />
                <Textfield
                    label="MAC"
                    name="mac"
                    value={planCustomer?.mac}
                    placeholder="MAC del cliente"
                    onChange={handleChangeText}
                    error={errors.description}
                />
                <div className="flex gap-5 items-center flex-col">
                     <label htmlFor="startDate" className="font-semibold text-start w-full">
                        Fecha de inicio
                     </label>
                     <input
                        type="date"
                        name="startDate"
                        value={planCustomer?.startDate}
                        onChange={handleChangeText}
                        className={`input input-bordered w-full max-w-full ${errors.startDate ? "input-error" : ""}`}
                     />
                  </div>
                  <div className="flex gap-5 items-center flex-col">
                        <label htmlFor="endDate" className="font-semibold text-start w-full">
                            Fecha de fin
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={planCustomer?.endDate}
                            onChange={handleChangeText}
                            className={`input input-bordered w-full max-w-full ${errors.endDate ? "input-error" : ""}`}
                        />
                  </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
                </div>
            </div>
        </form>
    );
}

interface FormPlanCustomerProps {
    planCustomer: PlanCustomerCreate | PlanCustomerUpdate;
    loading?: boolean;
    onSubmit: () => void;
    onChange: (planCustomer: PlanCustomerCreate | PlanCustomerUpdate) => void;
}

export default FormPlanCustomer;