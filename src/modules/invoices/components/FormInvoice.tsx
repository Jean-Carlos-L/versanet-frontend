import Button from "@/common/components/Button";
import Select from "@/common/components/Select";
import Textfield from "@/common/components/Textfield";
import { InvoiceCreate, InvoiceUpdate } from "@/common/models/Invoice";
import { useCustomersQuery } from "@/modules/customers/hooks/useCustomersQuery";
import { useEffect } from "react";

function FormInvoice({ data, onChange, errors, onSubmit }: FormInvoiceProps) {
  const { customers } = useCustomersQuery();
  const { contracts } = {
    contracts: [{ id: "CTR001", customerId: "CUST001" }],
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    if (contracts.length > 0 && !data?.contractId) {
      console.log("Setting default contractId");
      const contract = contracts.find((c) => c.id === data?.contractId);
      onChange("customerId", contract?.customerId);
    }
  }, [contracts, data?.contractId]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-6/12 bg-white p-4 rounded-lg shadow-md mx-auto"
    >
      <Textfield
        label="Fecha de la factura"
        value={data?.invoiceDate || ""}
        onChange={(e) => onChange("invoiceDate", e.target.value)}
        error={errors.invoiceDate}
        name="invoiceDate"
        type="date"
        placeholder="Fecha de la factura"
      />

      <Select
        label="Contrato"
        value={data?.contractId || ""}
        onChange={(e) => onChange("contractId", e.target.value)}
        error={errors.contractId}
        name="contractId"
        options={contracts.map((contract) => ({
          label: `${contract.id}`,
          value: contract.id,
        }))}
      />

      <Select
        label="Cliente"
        value={data?.customerId || ""}
        onChange={(e) => onChange("customerId", e.target.value)}
        error={errors.customerId}
        name="customerId"
        options={customers.map((customer) => ({
          label: `${customer.document} - ${customer.name}`,
          value: customer.id,
        }))}
        disabled={true}
      />

      <Textfield
        label="Monto"
        value={data?.amount?.toString() || ""}
        onChange={(e) => onChange("amount", Number(e.target.value))}
        error={errors.amount}
        name="amount"
        type="number"
        placeholder="Monto de la factura"
      />

      <div className="mt-10">
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

interface FormInvoiceProps {
  data: InvoiceCreate | InvoiceUpdate;
  onChange: (field: string, value: any) => void;
  errors: Record<string, string>;
  onSubmit: () => void;
}

export default FormInvoice;
