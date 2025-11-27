import { useFetch } from "@/common/hooks/useFetch";
import { useState } from "react";
import { CustomerCreate, CustomerUpdate } from "@/common/models/Customer";
import { createCustomerService } from "../services/createCustomer.service";
import { updateCustomerService } from "../services/updateCustomer.service";
import { deleteCustomerService } from "../services/deleteCustomer.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { toast } from "react-toastify";

export const useCustomersCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deleteCustomer = async (id: string) => {
    try {
      setLoadingAction(true);
      const confirmed = await confirmation({
        title: "Eliminar cliente",
        message: "¿Estás seguro de que deseas eliminar este cliente?",
      });
      if (!confirmed.isConfirmed) {
        return;
      }
      const response = await deleteCustomerService(fetchData)(id);
      if (refresh) {
        refresh();
      }
      toast.success("Cliente eliminado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const createCustomer = async (customer: CustomerCreate) => {
    try {
      setLoadingAction(true);
      const response = await createCustomerService(fetchData)(customer);
      if (refresh) {
        refresh();
      }
      toast.success("Cliente creado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const updateCustomer = async (customer: CustomerUpdate) => {
    try {
      setLoadingAction(true);
      const confirmed = await confirmation({
        title: "Actualizar cliente",
        message: "¿Estás seguro de que deseas actualizar este cliente?",
      });
      if (!confirmed.isConfirmed) {
        return;
      }
      const response = await updateCustomerService(fetchData)(customer);
      if (refresh) {
        console.log("Refreshing after update");
        refresh();
      }
      toast.success("Cliente actualizado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const validations = (customer: CustomerCreate | CustomerUpdate) => {
    const errors: { [key: string]: string } = {};
    if (!customer.name) {
      errors.names = "El nombre es requerido";
    }
    if (!customer.document) {
      errors.document = "El documento es requerido";
    }
    if (!customer.email) {
      errors.email = "El email es requerido";
    }
    if (!customer.phone) {
      errors.phone = "El teléfono es requerido";
    }
    if (!customer.address) {
      errors.address = "La dirección es requerida";
    }
    const hasErrors = Object.keys(errors).length > 0;
    setErrors(errors);
    return { hasErrors, errors };
  };

  return {
    deleteCustomer,
    createCustomer,
    updateCustomer,
    loadingAction,
    validations,
    errors,
  };
};
