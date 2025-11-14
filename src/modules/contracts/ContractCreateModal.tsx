import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormContract from "./components/FormContract";
import { ContractCreate } from "@/common/models/Contract";
import { useContractsCommand } from "./hooks/useContractsCommand";

type CreateContractProps = {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
};

function CreateContract({ isOpen, onClose, onRefresh }: CreateContractProps) {
  const [contract, setContract] = useState<ContractCreate>({
    customer_id: "",
    plan_id: "",
    start_date: "",
    end_date: "",
    inventory_id: "",
    status: "activo",
  });
  const { createContract, loadingAction } = useContractsCommand(onRefresh);

  const handleChange = (updated: ContractCreate) => setContract(updated);

  const handleSubmit = async () => {
    try {
      await createContract(contract);
      setContract({
        customer_id: "",
        plan_id: "",
        start_date: "",
        end_date: "",
        inventory_id: "",
        status: "activo",
      });
      onRefresh();
      onClose();
    } catch (error) {
      // Maneja error, ej. toast
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Crear Contrato</h2>
      <FormContract contract={contract} onChange={handleChange} onSubmit={handleSubmit} loading={loadingAction} />
    </Modal>
  );
}

export default CreateContract;
