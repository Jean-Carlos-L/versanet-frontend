export interface Invoice {
  id: string;
  plan: {
    id: string;
    description: string;
    price: number;
    features: string;
  };
  customer: {
    id: string;
    name: string;
    document: string;
    email: string;
    phone: string;
    address: string;
    status: number;
  };
  dateInvoice: string;
  mount: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceCreate {
  planId: string;
  customerId: string;
  dateInvoice: string;
  mount: number;
  status: number;
}
