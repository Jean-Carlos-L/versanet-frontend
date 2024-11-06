import Spinner from "@/common/components/Spinner";
import { usePlansQuery } from "./hooks/usePlansQuery";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Header from "@/common/components/Header";

const HEADERS_TABLE = ["#", "Descripción", "Características", "Precio"];

function Plans() {
   const { plans, loading } = usePlansQuery()

   return (
      <main>
         <Header title="Planes" />
         <div className="flex flex-col items-center w-full">
            <section className="w-11/12">
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
                           <TableCell>{plan.price}</TableCell>
                        </TableRow>
                     ))}
                  />
               )}
            </section>
         </div>
      </main>
   )
}

export default Plans;