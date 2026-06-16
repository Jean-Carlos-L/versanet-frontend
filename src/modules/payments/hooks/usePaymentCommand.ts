import { useConfirmation } from "@/common/hooks/useConfirmation";
import { useFetch } from "@/common/hooks/useFetch";
import { Payment, PaymentCreate, PaymentUpdate } from "@/common/models/Payment";
import { useState } from "react";
import { createPaymentService } from "../services/createPayment.service";
import { toast } from "react-toastify";
import { updatePaymentService } from "../services/updatePayment.service";
import { deletePaymentService } from "../services/deletePayment.service";
import { getPaymentByIdService } from "../services/getPaymentById.service";
import { formatDate } from "@/common/utils/formatDate";

const initialPaymentState: Payment | PaymentCreate | PaymentUpdate = {
  amount: 0,
  method: "",
  paymentDate: "",
  invoiceId: "",
};

export const usePaymentCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [payment, setPayment] = useState<
    Payment | PaymentCreate | PaymentUpdate
  >(initialPaymentState);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: any) => {
    setPayment((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const resetForm = () => {
    setPayment(initialPaymentState);
    setErrors({});
  };

  const validations = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!payment.amount || payment.amount <= 0) {
      newErrors.amount = "El monto debe ser mayor a cero";
    }
    if (!payment.method || payment.method.trim() === "") {
      newErrors.method = "El método de pago es obligatorio";
    }
    if (!payment.paymentDate || payment.paymentDate.trim() === "") {
      newErrors.paymentDate = "La fecha de pago es obligatoria";
    }
    if (!payment.invoiceId || payment.invoiceId.trim() === "") {
      newErrors.invoiceId = "El ID de la factura es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPayment = async () => {
    try {
      setLoading(true);
      if (!validations()) return;
      const payload: PaymentCreate = {
        amount: payment.amount,
        method: payment.method,
        paymentDate: payment.paymentDate,
        invoiceId: payment.invoiceId!,
        status: payment.status,
      };
      await createPaymentService(fetchData)(payload);
      resetForm();
      toast.success("Pago creado con éxito");
      if (refresh) refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePayment = async () => {
    try {
      setLoading(true);
      if (!validations() || !payment || !("id" in payment)) return;

      const payload: PaymentUpdate = {
        amount: payment.amount,
        method: payment.method,
        paymentDate: payment.paymentDate,
        status: payment.status,
        invoiceId: payment.invoiceId!,
      };

      await updatePaymentService(fetchData)(payment.id, payload);
      toast.success("Pago actualizado con éxito");
      if (refresh) refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id: string) => {
    try {
      setLoading(true);
      const confirmed = await confirmation({
        title: "Confirmar eliminación",
        message: "¿Estás seguro de que deseas eliminar este pago?",
      });
      if (!confirmed.isConfirmed) return;

      await deletePaymentService(fetchData)(id);
      toast.success("Pago eliminado con éxito");
      if (refresh) refresh();
    } catch (error) {
      toast.error("Error al eliminar el pago");
    } finally {
      setLoading(false);
    }
  };

  const getPayment = async (id: string) => {
    try {
      setLoading(true);
      const response = await getPaymentByIdService(fetchData)(id);
      setPayment({
        ...response.data,
        paymentDate: formatDate({
          date: response.data.paymentDate,
          format: "YYYY-MM-DD",
        }),
      });
    } catch (error) {
      toast.error("Error al obtener el pago");
    } finally {
      setLoading(false);
    }
  };

  return {
    payment,
    loading,
    errors,
    handleChange,
    createPayment,
    updatePayment,
    deletePayment,
    getPayment,
    resetForm,
  };
};
