import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { Plan } from "@/common/models/Plan";
import { createPlanService } from "../services/createPlan.service";
import { toast } from "react-toastify";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { deletePlanService } from "../services/deletePlan.service";
import { getPlanByIdService } from "../services/getPlanById.service";
import { editPlanService } from "../services/editPlan.service";

const initialPlan: Plan = {
  id: "",
  description: "",
  features: "",
  duration: 0,
  price: 0,
  status: 0,
};

export const usePlanCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const showConfirmation = useConfirmation();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangePlan = (key: keyof Plan, value: string | number) => {
    setPlan((prev) => ({
      ...prev!,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const resetPlan = () => {
    setPlan(initialPlan);
  };

  const validationPlan = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!plan?.description || plan.description.trim() === "") {
      newErrors.description = "La descripción es requerida.";
    }

    if (!plan?.features || plan.features.trim() === "") {
      newErrors.features = "Las características son requeridas.";
    }

    if (!plan?.duration || plan.duration <= 0) {
      newErrors.duration = "La duración debe ser mayor a 0.";
    }

    if (!plan?.price || plan.price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPlan = async () => {
    if (!validationPlan()) return;
    try {
      await createPlanService(fetchData)(plan!);
      resetPlan();
      if (refresh) refresh();
      toast.success("Plan creado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el plan");
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const confirmed = await showConfirmation({
        title: "Confirmar eliminación",
        message: "¿Estás seguro de que deseas eliminar este plan?",
      });

      if (!confirmed.isConfirmed) return;

      await deletePlanService(fetchData)(id);
      if (refresh) refresh();
      toast.success("Plan eliminado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el plan");
    }
  };

  const getPlan = async (id: string) => {
    try {
      const plan = await getPlanByIdService(fetchData)(id);
      setPlan(plan);
    } catch (error) {
      console.error(error);
      toast.error("Error al obtener el plan");
    }
  };

  const editPlan = async () => {
    if (!validationPlan()) return;
    try {
      const confirmed = await showConfirmation({
        title: "Confirmar edición",
        message: "¿Estás seguro de que deseas editar este plan?",
      });

      if (!confirmed.isConfirmed) return;

      await editPlanService(fetchData)(plan!.id, plan!);
      if (refresh) refresh();
      toast.success("Plan editado exitosamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al editar el plan");
    }
  };

  return {
    plan,
    errors,
    handleChangePlan,
    resetPlan,
    createPlan,
    deletePlan,
    getPlan,
    editPlan,
  };
};
