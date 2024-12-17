import React, { useState } from "react";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";
import { useFilters } from "./hooks/useFilters";
import { useInvoiceQuery } from "./hooks/useInvoiceQuery";
import { useNumberInvoice } from "./hooks/useNumbreInvoice";
import CreatePayments from "../payments/PaymentCreate";
import { Invoice } from "@/common/models/Invoice";

const HEADERS_TABLE = [
  "#",
  "Cliente",
  "Plan",
  "Fecha de factura",
  "Total a pagar",
  "Estado",
  "Acciones",
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const getStatusLabel = (status: string | number): string => {
  const statusMap: Record<string, string> = {
    "0": "Pagada",
    "1": "Pendiente",
  };
  return statusMap[status] || "Desconocido";
};

function InvoicesList() {
  const { filters, handleChange } = useFilters();
  const { invoices, loading } = useInvoiceQuery(filters);
  const { numberInvoice } = useNumberInvoice(filters);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", e.target.value);
  };

  const handleOpenModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setSelectedInvoice(null);
  };

  return (
    <main>
      <Header title="Gestión de Facturas" />
      <div className="container mx-auto">
        {/* Filtros */}
        <section className="w-full flex flex-col">
          <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label htmlFor="customer">Cliente</label>
                <input
                  type="text"
                  id="customer"
                  value={filters.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  placeholder="Buscar por CC/NIT"
                  className="input input-bordered"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="plan">Plan</label>
                <input
                  type="text"
                  id="plan"
                  value={filters.plan}
                  onChange={(e) => handleChange("plan", e.target.value)}
                  placeholder="Buscar por plan"
                  className="input input-bordered"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  value={filters.status || ""}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="select select-bordered"
                >
                  <option value="">Todos</option>
                  <option value="1">Pendiente</option>
                  <option value="0">Pagada</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dateInvoice">Fecha</label>
                <input
                  type="date"
                  id="dateInvoice"
                  value={filters.dateInvoice || ""}
                  onChange={(e) => handleChange("dateInvoice", e.target.value)}
                  className="input input-bordered"
                />
              </div>
            </div>
          </header>
          {/* Tabla */}
          <section className="flex flex-col w-full">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="flex items-center mb-4 space-x-3">
                  <Pagination
                    currentPage={filters.page}
                    pageSize={filters.pageSize}
                    totalItems={numberInvoice}
                    onPageChange={(page) => handleChange("page", page)}
                  />
                  <select
                    onChange={handleChangePageSize}
                    value={filters.pageSize}
                    className="select select-bordered"
                  >
                    {PAGE_SIZE_OPTIONS.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <Table
                  headers={HEADERS_TABLE}
                  data={invoices.map((invoice, index) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{invoice.customer.document}</TableCell>
                      <TableCell>{invoice.plan.description}</TableCell>
                      <TableCell>{invoice.dateInvoice}</TableCell>
                      <TableCell>{invoice.mount}</TableCell>
                      <TableCell>{getStatusLabel(invoice.status)}</TableCell>
                      <TableCell>
                        {getStatusLabel(invoice.status) === "Pendiente" ? (
                          <button
                            onClick={() => handleOpenModal(invoice)}
                            className="btn btn-primary"
                          >
                            Pagar
                          </button>
                        ) : (
                          <button disabled className="btn btn-disabled">
                            Pagada
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                />
              </>
            )}
          </section>

          {isCreateModalOpen && selectedInvoice && (
            <CreatePayments
              isOpen={isCreateModalOpen}
              onClose={handleCloseModal}
              invoice={selectedInvoice}
              onRefresh={() => {
                handleCloseModal();
              }}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default InvoicesList;
