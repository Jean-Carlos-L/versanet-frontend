import { Customer } from "./Customer";

export interface Invoice {
  id: string;
  customerId: string;
  contractId: string;
  invoiceDate: string;
  amount: number;
  status: number;
  customer: Customer;
  contract: any;
}

export interface InvoiceCreate {
  invoiceDate: string;
  customerId: string;
  contractId: string;
  amount: number;
}

export interface InvoiceUpdate {
  invoiceDate?: string;
  customerId?: string;
  contractId?: string;
  amount?: number;
  status?: number;
}
