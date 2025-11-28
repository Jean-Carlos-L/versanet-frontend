import Button from "@/common/components/Button";
import Select from "@/common/components/Select";
import Textfield from "@/common/components/Textfield";
import { PaymentCreate, PaymentUpdate } from "@/common/models/Payment";

function FormPayment({ data, onChange, onSubmit, errors }: FormPaymentProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onSubmit();
  };

  return (
    <form
      className="w-6/12 bg-white p-4 mt-5 rounded-lg shadow-md mx-auto"
      onSubmit={handleSubmit}
    >
      <Textfield
        label="Monto"
        name="amount"
        type="number"
        placeholder="Monto del pago"
        value={data?.amount?.toString() || ""}
        onChange={(e) => onChange("amount", Number(e.target.value))}
        error={errors.amount}
      />
      <Textfield
        label="Fecha de Pago"
        name="paymentDate"
        type="date"
        placeholder="Fecha del pago"
        value={data?.paymentDate || ""}
        onChange={(e) => onChange("paymentDate", e.target.value)}
        error={errors.paymentDate}
      />
      <Select
        label="Método de Pago"
        name="method"
        value={data?.method || ""}
        onChange={(e) => onChange("method", e.target.value)}
        options={[
          { label: "Tarjeta de Crédito", value: "tarjeta_credito" },
          { label: "Tarjeta de debito", value: "tarjeta_debito" },
          { label: "Transferencia bancaria", value: "transferencia_bancaria" },
          { label: "Efectivo", value: "efectivo" },
          { label: "Otros", value: "otros" },
        ]}
        error={errors.method}
      />

      <Select
        label="Estado"
        name="status"
        value={data?.status || ""}
        onChange={(e) => onChange("status", e.target.value)}
        options={[
          { label: "Pendiente", value: "pendiente" },
          { label: "Completado", value: "completado" },
          { label: "Fallido", value: "fallido" },
        ]}
        error={errors.status}
      />

      <Button type="submit">Guardar</Button>
    </form>
  );
}

interface FormPaymentProps {
  data: PaymentCreate | PaymentUpdate;
  onChange: (key: string, value: any) => void;
  onSubmit: () => void;
  errors: Record<string, string>;
}

export default FormPayment;
