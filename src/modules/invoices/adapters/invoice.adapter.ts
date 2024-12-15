import { Invoice } from "@/common/models/Invoice";

export const InvoiceAdapter = (invoice: Invoice) => {
  return {
    id: invoice.id,
    plan: {
      id: invoice.plan.id,
      description: invoice.plan.description,
      price: invoice.plan.price,
      features: invoice.plan.features,
    },
    customer: {
      id: invoice.customer.id,
      name: invoice.customer.name,
      document: invoice.customer.document,
      email: invoice.customer.email,
      phone: invoice.customer.phone,
      address: invoice.customer.address,
      status: invoice.customer.status,
    },
    dateInvoice: invoice.dateInvoice,
    mount: invoice.mount,
    status: invoice.status,
    createdAt: invoice.createdAt,
    updatedAt: invoice.updatedAt,
  };
};
