export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  method: string;
  status: string;
  invoice?: {
    id: string;
    customerId: string;
    contractId: string;
    totalAmount: number;
    dueDate: string;
    status: string;
  }
}

export interface PaymentCreate {
  invoiceId: string;
  amount: number;
  paymentDate: string;
  method: string;
  status: string;
}

export interface PaymentUpdate {
  id?: string;
  invoiceId?: string;
  amount?: number;
  paymentDate?: string;
  method?: string;
  status?: string;
}