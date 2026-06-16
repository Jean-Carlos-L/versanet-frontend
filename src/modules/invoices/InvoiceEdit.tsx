import Header from "@/common/components/Header";
import { useInvoiceCommand } from "./hooks/useInvoiceCommand";
import FormInvoice from "./components/FormInvoice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function InvoiceEdit() {
  const { id } = useParams<{ id: string }>();
  const { invoice, handleChange, updateInvoice, errors, getInvoice } =
    useInvoiceCommand();

  const handleUpdate = () => {
    updateInvoice();
  };

  useEffect(() => {
    if (id) {
      getInvoice(id);
    }
  }, [id]);

  return (
    <main>
      <Header title="Editar Factura" />
      <section className="p-5">
        <FormInvoice
          data={invoice}
          onChange={handleChange}
          errors={errors}
          onSubmit={handleUpdate}
        />
      </section>
    </main>
  );
}

export default InvoiceEdit;
