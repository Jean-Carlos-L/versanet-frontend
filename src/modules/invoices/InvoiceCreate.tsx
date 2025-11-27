import Header from "@/common/components/Header";
import FormInvoice from "./components/FormInvoice";
import { useInvoiceCommand } from "./hooks/useInvoiceCommand";

function InvoiceCreate() {
  const { invoice, handleChange, createInvoice, errors } =
    useInvoiceCommand();

  const handleCreate = () => {
    createInvoice();
  };

  return (
    <main>
      <Header title="Crear Factura" />
      <section>
        <FormInvoice
          data={invoice}
          onChange={handleChange}
          errors={errors}
          onSubmit={handleCreate}
        />
      </section>
    </main>
  );
}

export default InvoiceCreate;
