import React, { useEffect, useState, useCallback } from "react";
import Modal from "@/common/components/Modal";
import FormContract from "./components/FormContract";
import { ContractUpdate } from "@/common/models/Contract";
import { useContractsCommand } from "./hooks/useContractsCommand";
import { useContractById } from "./hooks/useContractById";

interface EditContractProps {
  isOpen: boolean;
  onClose: () => void;
  contractId?: string | null;
  onRefresh: () => void;
}

const EditContract: React.FC<EditContractProps> = ({ isOpen, onClose, contractId, onRefresh }) => {
  const { contract, loading: loadingFetch } = useContractById(contractId);
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
  const [error, setError] = useState<string | null>(null);

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

  const handleChange = useCallback((updated: ContractUpdate) => {
    setContractUpdate(updated);
  }, []);

  const handleSubmit = useCallback(async () => {
    setError(null);
    try {
      await updateContract(contractUpdate);
      onRefresh();
      onClose();
    } catch (err) {
      // Buenas prácticas: loguear y mostrar un mensaje amigable al usuario
      console.error("Error updating contract:", err);
      const message = err instanceof Error ? err.message : String(err);
      setError(`No se pudo actualizar el contrato: ${message}`);
    }
  }, [contractUpdate, updateContract, onRefresh, onClose]);

  if (loadingFetch) return <div>Cargando...</div>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Editar Contrato</h2>
      {error && (
        <div role="alert" style={{ color: "red", marginBottom: 8 }}>
          {error}
        </div>
      )}
      <FormContract
        contract={contractUpdate}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loadingAction}
      />
    </Modal>
  );
};

export default EditContract;
