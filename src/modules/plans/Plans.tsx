import { useState } from "react";
import { usePlansQuery } from "./hooks/usePlansQuery";
import { formatCurrency } from "@/common/utils/formatCurrency";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Header from "@/common/components/Header";
import Textfield from "@/common/components/Textfield";
import Pagination from "@/common/components/Pagination";
import Spinner from "@/common/components/Spinner";
import Button from "@/common/components/Button";
import { usePlanCommand } from "./hooks/usePlanCommand";
import { generatePath } from "@/common/utils/generatePath.util";
import { ROUTES } from "@/common/routers/routes";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const HEADERS_TABLE = [
  "#",
  "Descripción",
  "Características",
  "Precio",
  "Acciones",
];

function Plans() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { plans, loading, page, pageSize, onPage, total, refresh } =
    usePlansQuery(filters);
  const { deletePlan } = usePlanCommand(refresh);

  const handleChangeFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const goToEditPlan = (planId: string) => {
    const path = generatePath(ROUTES.PLANS_EDIT, { id: planId });
    navigate(path);
  };

  return (
    <main>
      <Header title="Planes" />
      <div className="flex flex-col items-center w-full">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          <div className="flex gap-4 mb-4">
            <div className="flex-grow">
              <Textfield
                label=""
                name="description"
                placeholder="Buscar planes"
                value={filters.description || ""}
                onChange={handleChangeFilters}
              />
            </div>
            <Textfield
              label=""
              name="minPrice"
              type="number"
              placeholder="Precio mínimo"
              value={filters.minPrice || ""}
              onChange={handleChangeFilters}
            />
            <Textfield
              label=""
              name="maxPrice"
              type="number"
              placeholder="Precio máximo"
              value={filters.maxPrice || ""}
              onChange={handleChangeFilters}
            />
          </div>

          <div className="mb-4">
            {loading ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={plans.map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{plan.description}</TableCell>
                    <TableCell>{plan.features}</TableCell>
                    <TableCell>
                      {formatCurrency({ amount: plan.price })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3 justify-center">
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => goToEditPlan(plan.id)}
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          className="hover:shadow-lg hover:bg-gray-100 hover:translate-x-0 hover:rounded-lg p-1"
                          onClick={() => deletePlan(plan.id)}
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

export default Plans;
