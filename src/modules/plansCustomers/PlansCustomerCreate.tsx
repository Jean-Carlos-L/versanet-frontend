import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormPlanCustomer from "./components/FormPlanCustomer";
import { PlanCustomerCreate } from "@/common/models/PlanCustomer";
import { usePlansCustomersCommand } from "./hooks/usePlansCustomersCommand";

function CreatePlanCustomer({ isOpen, onClose, onRefresh }) {

    const [planCustomer, setPlanCustomer] = useState<PlanCustomerCreate>({
        customer: { id: "" },
        plan: {id: ""},
        status: 1,
        staticIp: "",
        mac: "",
        startDate: "",
        endDate: "",
    });
    const { createPlanCustomer, loadingAction } = usePlansCustomersCommand();

    const handleChange = (planCustomer: PlanCustomerCreate) => {
        setPlanCustomer(planCustomer);
    }
    
    const handleSubmit = async () => {
        if (!loadingAction) {
            await createPlanCustomer(planCustomer).then(() => {
                setPlanCustomer({
                    customer: { id: "" },
                    plan: {id: ""},
                    status: 1,
                    staticIp: "",
                    mac: "",
                    startDate: "",
                    endDate: "",
                });
                onRefresh();
                onClose();
            });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Crear Plan del Cliente</h2>
            <FormPlanCustomer
                planCustomer={planCustomer}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </Modal>
    );
}

export default CreatePlanCustomer;