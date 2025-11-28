import { useParams } from "react-router-dom";
import { usePaymentCommand } from "./hooks/usePaymentCommand";
import { useEffect } from "react";
import Header from "@/common/components/Header";
import FormPayment from "./components/FormPayment";

function PaymentUpdate() {
  const { id } = useParams<{ id: string }>();
  const { payment, handleChange, errors, updatePayment, getPayment } =
    usePaymentCommand();

  const handleSubmit = async () => {
    updatePayment();
  };

  useEffect(() => {
    getPayment(id || "");
  }, [id]);

  return (
    <main>
      <Header title="Editar Pago" />
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

export default PaymentUpdate;
