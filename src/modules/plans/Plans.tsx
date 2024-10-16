import Spinner from "@/common/components/Spinner";
import { usePlansQuery } from "./hooks/usePlansQuery";
import Table from "@/common/components/Table";

const HEADERS_TABLE = ["#", "Descripción", "Características", "Precio"];

function Plans() {
   const { plans, loading } = usePlansQuery()

   return (
      <div className="flex flex-col items-center">
         <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
            <h1 className="text-3xl font-semibold text-gray-700">
               Lista de planes
            </h1>
         </header>

         <section>
            {loading ? (
               <Spinner />
            ) : (
               <Table
                  headers={HEADERS_TABLE}
                  data={plans.map((plan, index) => (
                     <tr key={plan.id}>
                        <td>{index + 1}</td>
                        <td>{plan.description}</td>
                        <td>{plan.features}</td>
                        <td>{plan.price}</td>
                     </tr>
                  ))}
               />
            )}
         </section>
      </div>
   )
}

export default Plans;