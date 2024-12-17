import { useState } from "react";
import Modal from "@/common/components/Modal";
import FormPayment from "./components/FormPayment";
import { usePaymentsCommand } from "./hooks/usePaymentsCommand";
import { PaymentCreate } from "@/common/models/Payment";
import { Invoice } from "@/common/models/Invoice";

interface CreatePaymentsProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  invoice: Invoice; // Ajusta el tipo de 'invoice' según el modelo que tengas
}

function CreatePayments({
  isOpen,
  onClose,
  onRefresh,
  invoice,
}: CreatePaymentsProps) {
  const [payment, setPayment] = useState<PaymentCreate>({
    invoice_id: invoice?.id || "",
    customer_id: invoice?.customer?.id || "",
    methodPaid: "",
    date: "",
    amountPaid: invoice?.mount || 0,
  });

  const { createPayments, loadingAction } = usePaymentsCommand();

  const handleChange = (updatedPayment: PaymentCreate) => {
    setPayment(updatedPayment);
  };

  const handleSubmit = async () => {
    if (!loadingAction) {
      await createPayments(payment).then(() => {
        setPayment({
          invoice_id: invoice?.id || "",
          customer_id: invoice?.customer?.id || "",
          methodPaid: "",
          date: "",
          amountPaid: invoice?.mount || 0,
        });
        onRefresh();
        onClose();
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Crear Pago</h2>
      <FormPayment
        payment={payment}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default CreatePayments;
