import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import {
  Contract,
  ContractCreate,
  ContractUpdate,
} from "@/common/models/Contract";
import { createContractService } from "../services/createContract.service";
import { deleteContractService } from "../services/deleteContract.service";
import { updateContractService } from "../services/updateContract.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { toast } from "react-toastify";
import { getContractByIdService } from "../services/getContractById.service";
import { formatDate } from "@/common/utils/formatDate";
import { toggleStatusService } from "../services/toggleStatus.service";

const initialContractState: Contract | ContractCreate | ContractUpdate | null =
  {
    id: "",
    customer_id: "",
    plan_id: "",
    start_date: "",
    end_date: "",
    inventory_id: null,
    status: "activo",
  };

export const useContractsCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [contract, setContract] = useState<
    Contract | ContractCreate | ContractUpdate | null
  >(initialContractState);
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleChange = (key: string, value: any) => {
    setContract((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const resetForm = () => {
    setContract(initialContractState);
    setErrors({});
  };

  const deleteContract = async (id: string) => {
    try {
      setLoadingAction(true);
      const confirmed = await confirmation({
        title: "¿Estás seguro de que deseas eliminar este contrato?",
        message: "Esta acción no se puede deshacer.",
      });
      if (!confirmed.isConfirmed) return;
      const response = await deleteContractService(fetchData)(id);
      if (refresh) refresh();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoadingAction(false);
    }
  };

  const createContract = async () => {
    try {
      setLoadingAction(true);
      const payload: ContractCreate = {
        customer_id: (contract as ContractCreate).customer_id,
        plan_id: (contract as ContractCreate).plan_id,
        start_date: (contract as ContractCreate).start_date,
        end_date: (contract as ContractCreate).end_date,
        inventory_id: (contract as ContractCreate).inventory_id,
      };

      const response = await createContractService(fetchData)(payload);
      if (refresh) refresh();
      toast.success("Contrato creado exitosamente");
      resetForm();
      return response;
    } catch (error) {
      toast.error("Error al crear el contrato");
      throw error;
    } finally {
      setLoadingAction(false);
    }
  };

  const updateContract = async () => {
    try {
      setLoadingAction(true);
      const payload: ContractUpdate = {
        id: (contract as ContractUpdate).id,
        customer_id: (contract as ContractUpdate).customer_id,
        plan_id: (contract as ContractUpdate).plan_id,
        start_date: (contract as ContractUpdate).start_date,
        end_date: (contract as ContractUpdate).end_date,
        inventory_id: (contract as ContractUpdate).inventory_id,
      };
      const response = await updateContractService(fetchData)(payload);
      if (refresh) refresh();
      toast.success("Contrato actualizado exitosamente");
      return response;
    } catch (error) {
      toast.error("Error al actualizar el contrato");
      throw error;
    } finally {
      setLoadingAction(false);
    }
  };

  const toggleContractStatus = async (id: string) => {
    try {
      const confirmed = await confirmation({
        title: `¿Estás seguro?`,
        message: `Esta acción cambiará el estado del contrato.`,
      });
      if (!confirmed.isConfirmed) return;

      await toggleStatusService(fetchData)(id);
      toast.success("Estado del contrato actualizado");
      if (refresh) refresh(); // Refresca lista
    } catch (error) {
      toast.error("Error al cambiar el estado del contrato");
      throw error;
    }
  };

  const validations = (contract: ContractCreate | ContractUpdate) => {
    const errors: { [key: string]: string } = {};

    if (!contract.customer_id) errors.customer_id = "El cliente es requerido";
    if (!contract.plan_id) errors.plan_id = "El plan es requerido";
    if (!contract.start_date)
      errors.start_date = "La fecha de inicio es requerida";
    if (!contract.end_date) errors.end_date = "La fecha de fin es requerida";
    if (
      contract.start_date &&
      contract.end_date &&
      new Date(contract.start_date) >= new Date(contract.end_date)
    ) {
      errors.start_date =
        "La fecha de inicio debe ser anterior a la fecha de fin";
    }

    const hasErrors = Object.keys(errors).length > 0;
    setErrors(errors);
    return { hasErrors, errors };
  };

  const getContract = async (id: string) => {
    try {
      setLoadingAction(true);
      const response = await getContractByIdService(fetchData)(id);
      setContract({
        ...response,
        start_date: formatDate({
          date: response.start_date,
          format: "YYYY-MM-DD",
        }),
        end_date: formatDate({ date: response.end_date, format: "YYYY-MM-DD" }),
      });
      return response;
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };

  return {
    createContract,
    deleteContract,
    updateContract,
    validations,
    toggleContractStatus,
    loadingAction,
    errors,
    contract,
    handleChange,
    resetForm,
    getContract,
  };
};
