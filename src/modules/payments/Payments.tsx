import Header from "@/common/components/Header";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePaymentsByInvoiceQuery } from "./hooks/usePaymentsByInvoiceQuery";
import Spinner from "@/common/components/Spinner";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import { formatDate } from "@/common/utils/formatDate";
import { formatCurrency } from "@/common/utils/formatCurrency";
import Button from "@/common/components/Button";
import { generatePath } from "@/common/utils/generatePath.util";
import { ROUTES } from "@/common/routers/routes";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { usePaymentCommand } from "./hooks/usePaymentCommand";

const HEADERS_TABLE = [
  "#",
  "Fecha de Pago",
  "Método de Pago",
  "Monto",
  "Estado",
  "Acciones",
];

function Payments() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { payments, loading, refresh } = usePaymentsByInvoiceQuery(invoiceId);
  const { deletePayment } = usePaymentCommand(refresh);

  const redirectToCreatePayment = () => {
    const path = generatePath(ROUTES.PAYMENTS_CREATE, { invoiceId: invoiceId });
    navigate(path);
  };

  const redirectToEditPayment = (id: string) => {
    const path = generatePath(ROUTES.PAYMENTS_EDIT, { invoiceId: invoiceId, id });
    navigate(path);
  }

  return (
    <main>
      <Header title="Pagos para la Factura" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <div className="w-fit mb-4">
              <Button type="button" onClick={redirectToCreatePayment}>
                Agregar Pago
              </Button>
            </div>
            {loading && payments.length === 0 ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={payments.map((payment, index) => (
                  <TableRow key={payment.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {formatDate({ date: payment.paymentDate })}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">
                        {payment.method.split("_").join(" ")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {formatCurrency({ amount: payment.amount })}
                    </TableCell>
                    <TableCell>{payment.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 justify-center">
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => redirectToEditPayment(payment.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => deletePayment(payment.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Payments;
