function Table({ data, headers }: TableProps) {
   return (
      <div className="overflow-x-auto">
         <table className="table-auto w-full text-center border border-gray-300 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-800 text-gray-50">
               <tr>
                  {headers.map((header, index) => (
                     <th key={index} className="px-4 py-2 font-semibold text-sm uppercase tracking-wider">
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="text-gray-800 divide-y divide-gray-300">
               {data}
            </tbody>
         </table>
      </div>
   )
}

interface TableProps {
   data: React.ReactNode;
   headers: string[];
}

export default Table;

export const TableRow = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
   const handleOnClick = () => {
      if (onClick) {
         onClick()
      }
   }

   return <tr onClick={handleOnClick} className="hover:bg-gray-300 transition duration-200 cursor-pointer">{children}</tr>
}

export const TableCell = ({ children }: { children: React.ReactNode }) => {
   return <td className="px-4 py-2 text-sm">{children}</td>
}