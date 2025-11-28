import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import {
  Inventory,
  InventoryCreate,
  InventoryUpdate,
} from "@/common/models/Inventory";
import { createInventoryService } from "@/modules/inventory/services/createInventory.service";
import { updateInventoryService } from "@/modules/inventory/services/updateInventory.service";
import { deleteInventoryService } from "../services/deleteInventory.service";
import { toast } from "react-toastify";
import { getInventoryByIdService } from "../services/getInventoryId.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";

const initialInventoryState:
  | Inventory
  | InventoryCreate
  | InventoryUpdate
  | null = {
  id: "",
  reference: "",
  mac: "",
  network_address: "",
  type: "",
  quantity: 0,
  status: "activo",
};

export const TYPES_DEVICES = [
  { label: "Router", value: "router" },
  { label: "Switch", value: "switch" },
  { label: "Mac", value: "mac" },
  { label: "Otro", value: "otros" },
];

export const useInventoryCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [inventory, setInventory] = useState<
    Inventory | InventoryCreate | InventoryUpdate | null
  >(initialInventoryState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (key: string, value: any) => {
    setInventory((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const resetForm = () => {
    setInventory(initialInventoryState);
    setErrors({});
  };

  const deleteInventory = async (id: string) => {
    try {
      setLoading(true);
      const confirmed = await confirmation({
        title: "Eliminar inventario",
        message: "¿Estás seguro de que deseas eliminar este inventario?",
      });
      if (!confirmed.isConfirmed) return;

      await deleteInventoryService(fetchData)(id);
      if (refresh) {
        refresh();
      }
      toast.success("Inventario eliminado correctamente");
      return true;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createInventory = async (payloadParam?: InventoryCreate) => {
    try {
      setLoading(true);
      const payload: InventoryCreate = payloadParam
        ? payloadParam
        : {
            reference: (inventory as InventoryCreate).reference,
            mac: (inventory as InventoryCreate).mac,
            network_address: (inventory as InventoryCreate).network_address,
            type: (inventory as InventoryCreate).type,
            quantity: Number((inventory as InventoryCreate).quantity),
            status: (inventory as InventoryCreate).status,
          };

      if (!validations(payload)) return;

      await createInventoryService(fetchData)(payload);
      if (refresh) refresh();
      toast.success("Inventario creado correctamente");
      resetForm();
      return true;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateInventory = async (inventory: InventoryUpdate) => {
    try {
      setLoading(true);
      const confirmed = await confirmation({
        title: "Actualizar inventario",
        message: "¿Estás seguro de que deseas actualizar este inventario?",
      });
      if (!confirmed.isConfirmed) return;
      await updateInventoryService(fetchData)(inventory);
      if (refresh) refresh();
      toast.success("Inventario actualizado correctamente");
      return true;
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInventory = async (id: string) => {
    try {
      setLoading(true);
      const response = await getInventoryByIdService(fetchData)(id);
      setInventory(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validations = (inv?: InventoryCreate | InventoryUpdate) => {
    const target = inv ? inv : inventory;
    const errors: { [key: string]: string } = {};
    const typeDeviceValues = TYPES_DEVICES.map((type) => type.value);

    if (!target || !("reference" in target) || !target.reference) {
      errors.reference = "El campo referencia es requerido";
    }

    if (target && "type" in target && target.type && !typeDeviceValues.includes(target.type)) {
      errors.type = "El tipo de equipo no es válido";
    }

    if (!target || !("type" in target) || !target.type) {
      errors.type = "El campo tipo de equipo es requerido";
    }

    if (!target || !("network_address" in target) || !target.network_address) {
      errors.network_address = "El campo dirección de red es requerido";
    }

    if (!target || !("quantity" in target) || !target.quantity || target.quantity < 1) {
      errors.quantity = "La cantidad debe ser al menos 1";
    }
    if (!target || !("status" in target) || !target.status) {
      errors.status = "El campo estado es requerido";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
    createInventory,
    updateInventory,
    validations,
    deleteInventory,
    loading,
    errors,
    inventory,
    handleChange,
    resetForm,
    getInventory,
  };
};
