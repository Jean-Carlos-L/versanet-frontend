import { useEffect, useState } from "react";
import Modal from "@/common/components/Modal";
import FormPlanCustomer from "./components/FormPlanCustomer";
import { PlanCustomerUpdate } from "@/common/models/PlanCustomer";
import { usePlansCustomersCommand } from "./hooks/usePlansCustomersCommand";
import { usePlanCustomerById } from "./hooks/usePlanCustomerById";

function EditPlanCustomer({ isOpen, onClose,planCustomerId, onRefresh }) {
    const { planCustomer } = usePlanCustomerById(planCustomerId);
    const { updatePlanCustomer, loadingAction } = usePlansCustomersCommand();
    const [planCustomerUpdate, setPlanCustomerUpdate] = useState<PlanCustomerUpdate>({
        id: "",
        customer: { id: "" },
        plan: { id: "" },
        status: 0,
        staticIp: "",
        mac: "",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        if (planCustomer) {
            setPlanCustomerUpdate({
                id: planCustomer.id,
                customer: { id: planCustomer.customer.id },
                plan: { id: planCustomer.plan.id },
                status: planCustomer.status,
                staticIp: planCustomer.staticIp,
                mac: planCustomer.mac,
                startDate: planCustomer.startDate,
                endDate: planCustomer.endDate
            });
        }
    }, [planCustomer]);
    const handleChange = (updatedPlanCustomer: PlanCustomerUpdate) => {
        setPlanCustomerUpdate(updatedPlanCustomer);
        onRefresh();
    };
    const handleSubmit = () => {
        if (!loadingAction) {
            updatePlanCustomer(planCustomerUpdate);
            onRefresh();
            onClose();
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Editar Plan de Cliente</h2>
            <FormPlanCustomer
                planCustomer={planCustomerUpdate}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}

export default EditPlanCustomer;