export interface PaymentCreate {
  invoice_id: string;
  customer_id: string;
  methodPaid: string;
  date: string;
  amountPaid: number;
}
