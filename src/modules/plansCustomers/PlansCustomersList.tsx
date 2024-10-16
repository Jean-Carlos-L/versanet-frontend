import { usePlansCustomersQuery } from "./hooks/usePlansCustomersQuery";
import { useFilters } from "./hooks/useFilters";
import Spinner from "@/common/components/Spinner";
import Table from "@/common/components/Table";
import { usePlansCustoermsCommand } from "./hooks/usePlansCustomersCommand";
import { PowerIcon } from "@heroicons/react/20/solid";

const HEADERS_TABLE = ["#", "Descripción", "Precio", "Fecha de inicio", "Fecha de fin", "Cliente", "Teléfono", "Acciones"];

function PlansCustomersList() {
   const { filters, handleChange } = useFilters();
   const { plansCustomers, loading, refresh } = usePlansCustomersQuery(filters);
   const { enablePlan, disablePlan } = usePlansCustoermsCommand(refresh);

   return (
      <div className="flex flex-col items-center">
         <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
            <h1 className="text-3xl font-semibold text-gray-700">
               Lista de servicios de clientes
            </h1>
         </header>


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
            {loading ? (
               <Spinner />
            ) : (
               <Table
                  headers={HEADERS_TABLE}
                  data={plansCustomers.map((plan, index) => (
                     <tr key={plan.id}>
                        <td>{index + 1}</td>
                        <td>{plan.plan.description}</td>
                        <td>{plan.plan.price}</td>
                        <td>{plan.startDate}</td>
                        <td>{plan.endDate}</td>
                        <td>{plan.customer.name}</td>
                        <td>{plan.customer.phone}</td>
                        <td>
                           {plan.status === 1 ? (
                              <button onClick={() => disablePlan(plan.id)}>
                                 <PowerIcon className="h-5 w-5 text-red-500" />
                              </button>
                           ) : (
                              <button onClick={() => enablePlan(plan.id)}>
                                 <PowerIcon className="h-5 w-5 text-green-500" />
                              </button>
                           )}
                        </td>
                     </tr>
                  ))}
               />
            )}
         </section>
      </div>
   )
}

export default PlansCustomersList;