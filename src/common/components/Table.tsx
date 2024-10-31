function Table({ data, headers }: TableProps) {
   return (
      <div className="overflow-x-auto">
         <table className="table text-center">
            <thead className="bg-gray-800 text-gray-50">
               <tr>
                  {headers.map((header, index) => (
                     <th key={index}>{header}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
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