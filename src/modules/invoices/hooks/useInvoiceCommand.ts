import { useFetch } from "@/common/hooks/useFetch";
import { Invoice, InvoiceCreate, InvoiceUpdate } from "@/common/models/Invoice";
import { useState } from "react";
import { createInvoiceService } from "../services/createInvoice.service";
import { toast } from "react-toastify";
import { updateInvoiceService } from "../services/updateInvoice.service";
import { deleteInvoiceService } from "../services/deleteInvoice.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { getInvoiceByIdService } from "../services/getInvoiceById.service";
import { formatDate } from "@/common/utils/formatDate";

export const useInvoiceCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [invoice, setInvoice] = useState<
    Invoice | InvoiceCreate | InvoiceUpdate | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: any) => {
    setInvoice((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const resetForm = () => {
    setInvoice(null);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!invoice?.invoiceDate) {
      newErrors.invoiceDate = "La fecha de la factura es requerida";
    }
    if (!invoice?.customerId) {
      newErrors.customerId = "El cliente es requerido";
    }
    if (!invoice?.contractId) {
      newErrors.contractId = "El contrato es requerido";
    }
    if (!invoice?.amount || invoice.amount <= 0) {
      newErrors.amount = "El monto debe ser mayor a cero";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createInvoice = async () => {
    if (!validate() || !invoice) return;

    setLoading(true);
    try {
      const payload: InvoiceCreate = {
        invoiceDate: invoice.invoiceDate as string,
        customerId: invoice.customerId as string,
        contractId: invoice.contractId as string,
        amount: invoice.amount as number,
      };

      await createInvoiceService(fetchData)(payload);
      toast.success("Factura creada correctamente");
      resetForm();
      if (refresh) refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateInvoice = async () => {
    if (!validate() || !invoice || !("id" in invoice)) return;

    setLoading(true);
    try {
      const payload: InvoiceUpdate = {
        invoiceDate: invoice.invoiceDate,
        customerId: invoice.customerId,
        contractId: invoice.contractId,
        amount: invoice.amount,
        status: invoice.status,
      };

      await updateInvoiceService(fetchData)(invoice.id, payload);
      toast.success("Factura actualizada correctamente");
      if (refresh) refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id: string) => {
    setLoading(true);
    try {
      const confirmed = await confirmation({
        message: "¿Estás seguro de que deseas eliminar esta factura?",
      });
      if (!confirmed.isConfirmed) return;

      await deleteInvoiceService(fetchData)(id);
      toast.success("Factura eliminada correctamente");
      if (refresh) refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getInvoice = async (id: string) => {
    setLoading(true);
    try {
      const invoice = await getInvoiceByIdService(fetchData)(id);
      setInvoice({
        ...invoice,
        invoiceDate: formatDate({
          date: invoice.invoiceDate,
          format: "YYYY-MM-DD",
        }),
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    invoice,
    loading,
    errors,
    handleChange,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    resetForm,
  };
};
