import { useParams } from "react-router-dom";
import { usePaymentCommand } from "./hooks/usePaymentCommand";
import { useEffect } from "react";
import Header from "@/common/components/Header";
import FormPayment from "./components/FormPayment";

function PaymentCreate() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { payment, handleChange, errors, createPayment, loading } =
    usePaymentCommand();

  const handleSubmit = async () => {
    createPayment();
  };

  useEffect(() => {
    handleChange("invoiceId", invoiceId || "");
  }, [invoiceId]);

  return (
    <main>
      <Header title="Crear Pago" />
      <section className="p-5">
        <FormPayment
          data={payment}
          onChange={handleChange}
          errors={errors}
          onSubmit={handleSubmit}
        />
      </section>
    </main>
  );
}

export default PaymentCreate;
