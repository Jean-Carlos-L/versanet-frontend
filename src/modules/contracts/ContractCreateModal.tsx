import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormContract from "./components/FormContract";
import { ContractCreate } from "@/common/models/Contract";
import { useContractsCommand } from "./hooks/useContractsCommand";

function ContractCreateModal({ isOpen, onClose, onRefresh }: { isOpen: boolean; onClose: () => void; onRefresh?: () => void }) {
    const { createContract, loadingAction } = useContractsCommand(onRefresh);
    const [contractCreate, setContractCreate] = useState<ContractCreate>({
        customer_id: "",
        plan_id: "",
        start_date: "",
        end_date: "",
        inventory_id: null,
    });

    const handleChange = (key: string, value: any) => {
        setContractCreate((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (loadingAction) return;
        await createContract(contractCreate);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Crear Contrato</h2>
            <FormContract contract={contractCreate} onChange={handleChange} onSubmit={handleSubmit} loading={loadingAction} />
        </Modal>
    );
}

export default ContractCreateModal;
