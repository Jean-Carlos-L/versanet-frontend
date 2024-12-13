import { useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { createInvoice } from "../services/creaateInvoice.service";

export const useInvoiceCommands = () => {
  const { fetchData } = useFetch();
  const [loading, setLoading] = useState(false);

  const handleCreateInvoice = async (idContrato: string) => {
    try {
      setLoading(true);
      const invoice = await createInvoice(fetchData)(idContrato);
      alert(
        "Factura creada con éxito. Datos de la factura: " +
          JSON.stringify(invoice)
      );
    } catch (error) {
      console.error(error);
      alert(error.message || "Ocurrió un error al intentar crear la factura.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleCreateInvoice,
  };
};
