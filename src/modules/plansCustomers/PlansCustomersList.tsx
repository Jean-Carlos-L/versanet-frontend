import { usePlansCustomersQuery } from "./hooks/usePlansCustomersQuery";
import { useFilters } from "./hooks/useFilters";
import Spinner from "@/common/components/Spinner";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import { usePlansCustoermsCommand } from "./hooks/usePlansCustomersCommand";
import { PowerIcon } from "@heroicons/react/20/solid";
import { useNumberOfPlansCustomers } from "./hooks/useNumberOfPlansCustomers";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";

const HEADERS_TABLE = [
   "#",
   "Descripción",
   "Precio",
   "Fecha de inicio",
   "Fecha de fin",
   "Cliente",
   "Teléfono",
   "Acciones",
];

function PlansCustomersList() {
   const { filters, handleChange } = useFilters();
   const { plansCustomers, loading, refresh } = usePlansCustomersQuery(filters);
   const { numberOfPlansCustomers } = useNumberOfPlansCustomers(filters);
   const { enablePlan, disablePlan } = usePlansCustoermsCommand(refresh);


   const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChange("pageSize", e.target.value);
   }

   return (
      <main>
         <Header title="Lista de servicios de clientes" />
         <div className="flex flex-col items-center">

            <section className="mb-10 w-11/12">
               <div className="flex space-x-5 justify-start w-full">
                  <button
                     onClick={() => handleChange("status", 1)}
                     className={`px-4 py-2 rounded-t-lg focus:outline-none ${filters.status === 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                  >
                     Activos
                  </button>
                  <button
                     onClick={() => handleChange("status", 0)}
                     className={`px-4 py-2 rounded-t-lg focus:outline-none ${filters.status === 0
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                  >
                     Inactivos
                  </button>
               </div>
            </section>

            <section className="w-11/12">
               <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <div className="flex flex-col">
                        <label htmlFor="plan" className="text-sm font-medium text-gray-700 mb-1">
                           Plan
                        </label>
                        <input
                           type="text"
                           id="plan"
                           value={filters.plan}
                           onChange={(e) => handleChange("plan", e.target.value)}
                           className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Buscar plan"
                        />
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="customer" className="text-sm font-medium text-gray-700 mb-1">
                           Cliente
                        </label>
                        <input
                           type="text"
                           id="customer"
                           value={filters.customer}
                           onChange={(e) => handleChange("customer", e.target.value)}
                           className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Buscar cliente"
                        />
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-sm font-medium text-gray-700 mb-1">
                           Fecha de inicio
                        </label>
                        <input
                           type="date"
                           id="startDate"
                           value={filters.startDate}
                           onChange={(e) => handleChange("startDate", e.target.value)}
                           className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-sm font-medium text-gray-700 mb-1">
                           Fecha de fin
                        </label>
                        <input
                           type="date"
                           id="endDate"
                           value={filters.endDate}
                           onChange={(e) => handleChange("endDate", e.target.value)}
                           className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                     </div>
                  </div>
               </header>
               {loading ? (
                  <Spinner />
               ) : (
                  <div>
                     <div className="flex items-center space-x-10 mb-5">
                        <Pagination
                           currentPage={filters.page}
                           pageSize={filters.pageSize}
                           totalItems={numberOfPlansCustomers}
                           onPageChange={(page) => handleChange("page", page)}
                        />
                        <select onChange={handleChangePageSize} className="p-2 mb-0 rounded-md" value={filters.pageSize}>
                           <option value="10">10</option>
                           <option value="25">25</option>
                           <option value="50">50</option>
                           <option value="100">100</option>
                        </select>
                     </div>
                     <Table
                        headers={HEADERS_TABLE}
                        data={plansCustomers.map((plan, index) => (
                           <TableRow key={plan.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{plan.plan.description}</TableCell>
                              <TableCell>{plan.plan.price}</TableCell>
                              <TableCell>{plan.startDate}</TableCell>
                              <TableCell>{plan.endDate}</TableCell>
                              <TableCell>{plan.customer.name}</TableCell>
                              <TableCell>{plan.customer.phone}</TableCell>
                              <TableCell>
                                 {plan.status === 1 ? (
                                    <button onClick={() => disablePlan(plan.id)}>
                                       <PowerIcon className="h-5 w-5 text-red-500" />
                                    </button>
                                 ) : (
                                    <button onClick={() => enablePlan(plan.id)}>
                                       <PowerIcon className="h-5 w-5 text-green-500" />
                                    </button>
                                 )}
                              </TableCell>
                           </TableRow>
                        ))}
                     />
                  </div>
               )}
            </section>
         </div>
      </main>

   );
}

export default PlansCustomersList;
