import { Invoice } from "@/common/models/Invoice";

export const InvoiceAdapter = (invoice: Invoice) => {
  return {
    id: invoice.id,
    client: invoice.idCliente,
    invoiceDate: invoice.fecha_facturacion,
    mount: invoice.monto_total,
    status: invoice.estado,
    createdAt: invoice.fecha_creacion,
    updatedAt: invoice.fecha_actualizacion,
  };
};
