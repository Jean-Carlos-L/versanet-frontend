import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { ContractCreate, ContractUpdate } from "@/common/models/Contract";
import { createContractService } from "../services/createContract.service";
import { deleteContractService } from "../services/deleteContract.service";
import { updateContractService } from "../services/updateContract.service";
// Elimina enable/disable si backend usa update genérico

export const useContractsCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deleteContract = async (id: string) => {
    try {
      setLoadingAction(true);
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

  const createContract = async (contract: ContractCreate) => {
    try {
      setLoadingAction(true);
      const response = await createContractService(fetchData)(contract);
      if (refresh) refresh();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoadingAction(false);
    }
  };

  const updateContract = async (contract: ContractUpdate) => {
    try {
      setLoadingAction(true);
      // Para enable/disable: { ...contract, estado: 'activo' }
      const response = await updateContractService(fetchData)(contract);
      if (refresh) refresh();
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoadingAction(false);
    }
  };

  const validations = (contract: ContractCreate | ContractUpdate) => {
    const errors: { [key: string]: string } = {};

    if (!contract.customer_id) errors.customer_id = "El cliente es requerido";
    if (!contract.plan_id) errors.plan_id = "El plan es requerido";
    if (!contract.start_date) errors.start_date = "La fecha de inicio es requerida";
    if (!contract.end_date) errors.end_date = "La fecha de fin es requerida";
    if (contract.start_date && contract.end_date && new Date(contract.start_date) >= new Date(contract.end_date)) {
      errors.start_date = "La fecha de inicio debe ser anterior a la fecha de fin";
    }

    const hasErrors = Object.keys(errors).length > 0;
    setErrors(errors);
    return { hasErrors, errors };
  };

  return {
    createContract,
    deleteContract,
    updateContract,
    validations,
    loadingAction,
    errors,
  };
};
