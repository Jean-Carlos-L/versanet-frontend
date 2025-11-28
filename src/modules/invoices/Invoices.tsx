import Header from "@/common/components/Header";
import Spinner from "@/common/components/Spinner";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Textfield from "@/common/components/Textfield";
import { formatCurrency } from "@/common/utils/formatCurrency";
import { useInvoicesQuery } from "./hooks/useInvoicesQuery";
import { useState } from "react";
import Pagination from "@/common/components/Pagination";
import { formatDate } from "@/common/utils/formatDate";
import Button from "@/common/components/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useInvoiceCommand } from "./hooks/useInvoiceCommand";
import { generatePath } from "@/common/utils/generatePath.util";
import { CurrencyDollarIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const HEADERS_TABLE = [
  "#",
  "Contrato",
  "Cliente",
  "Fecha de facturación",
  "Monto",
  "Estado",
  "Acciones",
];

function Invoices() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { invoices, loading, page, onPage, pageSize, total, refresh } =
    useInvoicesQuery(filters);
  const { deleteInvoice } = useInvoiceCommand(refresh);

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const reditectToCreateInvoice = () => {
    navigate(ROUTES.INVOICES_CREATE);
  };

  const redirectToEditInvoice = (id: string) => {
    const path = generatePath(ROUTES.INVOICES_EDIT, { id });
    navigate(path);
  };

  const redirectToPayments = (id: string) => {
    const path = generatePath(ROUTES.PAYMENTS, { invoiceId: id });
    navigate(path);
  }

  return (
    <main>
      <Header title="Facturación" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          <div className="flex gap-4 mb-4 justify-center">
            <Textfield
              label=""
              name="customer"
              placeholder="Buscar cliente"
              value={filters.customer || ""}
              onChange={handleChangeFilters}
            />

            <Textfield
              label=""
              name="contract"
              placeholder="Buscar contrato"
              value={filters.contract || ""}
              onChange={handleChangeFilters}
            />

            <Textfield
              label=""
              name="minAmount"
              type="number"
              placeholder="Monto mínimo"
              value={filters.minAmount || ""}
              onChange={handleChangeFilters}
            />
            <Textfield
              label=""
              name="maxAmount"
              type="number"
              placeholder="Monto máximo"
              value={filters.maxAmount || ""}
              onChange={handleChangeFilters}
            />
          </div>

          <div className="mb-4 space-y-2 flex flex-col">
            <div className="w-fit">
              <Button onClick={reditectToCreateInvoice} type="button">
                Crear factura
              </Button>
            </div>
            {loading && invoices.length === 0 ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={invoices.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{invoice.contract?.id}</TableCell>
                    <TableCell>{invoice.customer?.name}</TableCell>
                    <TableCell>
                      {formatDate({ date: invoice.invoiceDate })}
                    </TableCell>

                    <TableCell>
                      {formatCurrency({ amount: invoice.amount })}
                    </TableCell>

                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 justify-center">
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => redirectToEditInvoice(invoice.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                           <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => redirectToPayments(invoice.id)}
                        >
                          <CurrencyDollarIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => deleteInvoice(invoice.id)}
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

          <Pagination
            currentPage={page}
            onPageChange={onPage}
            pageSize={pageSize}
            totalItems={total}
            itemsPerPage={20}
          />
        </section>
      </div>
    </main>
  );
}

export default Invoices;
