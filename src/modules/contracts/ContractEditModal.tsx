import { useEffect, useState } from "react";
import Modal from "@/common/components/Modal";
import FormContract from "./components/FormContract";
import { ContractUpdate } from "@/common/models/Contract";
import { useContractsCommand } from "./hooks/useContractsCommand";
import { useContractById } from "./hooks/useContractById";


function ContractEditModal({ isOpen, onClose, contractId, onRefresh }: { isOpen: boolean; onClose: () => void; contractId: string; onRefresh?: () => void }) {
    const { contract } = useContractById(contractId);
    const { updateContract, loadingAction } = useContractsCommand(onRefresh);
    const [contractUpdate, setContractUpdate] = useState<ContractUpdate>({
        id: "",
        customer_id: "",
        plan_id: "",
        start_date: "",
        end_date: "",
        inventory_id: null,
        status: "activo",
    });
    useEffect(() => {
        if (contract) {
            setContractUpdate({
                id: contract.id,
                customer_id: contract.customer_id,
                plan_id: contract.plan_id,
                start_date: contract.start_date,
                end_date: contract.end_date,
                inventory_id: contract.inventory_id,
                status: contract.status,
            });
        }
    }, [contract]);
    const handleChange = (key: string, value: any) => {
        setContractUpdate((prev) => ({ ...prev, [key]: value }));
    };
    const handleSubmit = () => {
        if (loadingAction) return;
        updateContract(contractUpdate);
        onClose();
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Editar Contrato</h2>
            <FormContract
            contract={contractUpdate}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loadingAction} />
        </Modal>
    );
}

export default ContractEditModal;