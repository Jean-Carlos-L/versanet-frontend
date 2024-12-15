import React from "react";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Spinner from "@/common/components/Spinner";
import Header from "@/common/components/Header";
import { useFilters } from "./hooks/useFilters";
import { useInvoiceQuery } from "./hooks/useInvoiceQuery";
import { useNumberInvoice } from "./hooks/useNumbreInvoice";

const HEADERS_TABLE = [
  "#",
  "Cliente",
  "Plan",
  "Fecha de factura",
  "Total a pagar",
  "Estado",
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const getStatusLabel = (status: string | number): string => {
  const statusMap: Record<string, string> = {
    "0": "Pagada",
    "1": "Pendiente",
  };
  return statusMap[status] || null; // Maneja estados inesperados
};

function InvoicesList() {
  const { filters, handleChange } = useFilters();
  const { invoices, loading } = useInvoiceQuery(filters);
  const { numberInvoice } = useNumberInvoice(filters);

  const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("pageSize", e.target.value);
  };

  return (
    <main>
      <Header title="Gestión de Facturas" />
      <div className="container mx-auto">
        {/* Filtros */}
        <section className="w-full flex flex-col ">
          <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="customer"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Cliente
                </label>
                <input
                  type="text"
                  id="customer"
                  value={filters.customer}
                  onChange={(e) => handleChange("customer", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por CC/NIT"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="plan"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Plan
                </label>
                <input
                  type="text"
                  id="plan"
                  value={filters.plan}
                  onChange={(e) => handleChange("plan", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por plan"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Estado de la factura
                </label>
                <select
                  id="status"
                  value={filters.status || ""}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  <option value="1">Pendiente</option>
                  <option value="0">Pagada</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="dateInvoice"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Fecha de facturación
                </label>
                <input
                  type="date"
                  id="dateInvoice"
                  value={filters.dateInvoice || ""}
                  onChange={(e) => handleChange("dateInvoice", e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar por fecha de facturación"
                />
              </div>
            </div>
          </header>
          <section className="flex w-full h-full space-x-5">
            <div className="w-full flex flex-col">
              <div className="flex flex-col w-full text-gray-800">
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="flex-shrin flex-col w-9/10">
                    <div className="flex items-center space-x-10 mb-3">
                      <Pagination
                        currentPage={filters.page}
                        pageSize={filters.pageSize}
                        totalItems={numberInvoice}
                        onPageChange={(page) => handleChange("page", page)}
                      />
                      <select
                        onChange={handleChangePageSize}
                        className="select select-bordered"
                        value={filters.pageSize}
                      >
                        {PAGE_SIZE_OPTIONS.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="overflow-x-auto">
                      <Table
                        headers={HEADERS_TABLE}
                        data={invoices.map((invoice, index) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{invoice.customer.document}</TableCell>
                            <TableCell>{invoice.plan.description}</TableCell>
                            <TableCell>{invoice.dateInvoice}</TableCell>
                            <TableCell>{invoice.mount}</TableCell>
                            <TableCell>
                              {getStatusLabel(invoice.status)}
                            </TableCell>
                          </TableRow>
                        ))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default InvoicesList;
