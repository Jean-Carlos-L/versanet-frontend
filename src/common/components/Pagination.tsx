import { useState } from "react";

function Pagination({ itemsPerPage = 5, totalItems, currentPage, pageSize, onPageChange }: PaginationProps) {
   const [initailPage, setInitialPage] = useState<number>(0);

   const handleNextPage = (currentPage: number) => {
      if (currentPage === (calculateTotalPages(totalItems))) return;

      if (currentPage % 5 === 0) {
         setInitialPage(initailPage + itemsPerPage);
      }

      onPageChange(currentPage + 1);
   }

   const handlePreviosPage = (currentPage: number) => {
      if (currentPage === 1) return;

      if (currentPage % 5 === 1) {
         setInitialPage(initailPage - 5);
      }

      onPageChange(currentPage - 1);
   }

   const calculateTotalPages = (totalItems: number) => {
      return Math.ceil(totalItems / pageSize);
   }

   const calculatePrintPages = (initialPage: number, totalItems: number) => {
      const totalPage = calculateTotalPages(totalItems)

      if (totalPage <= itemsPerPage) {
         return totalPage
      }

      if (totalPage - initialPage <= itemsPerPage) {
         return totalPage - initialPage;
      }

      return itemsPerPage;
   }

   return (
      <div className="flex justify-between flex-col mx-1">
         <div className="flex items-center space-x-1">
            <button
               onClick={() => handlePreviosPage(currentPage)}
               className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
               disabled={currentPage === 1 || totalItems === 0}
            >
               {"<"}
            </button>

            {Array.from(
               { length: calculatePrintPages(initailPage, totalItems) },
               (_, i) => (
                  <button
                     key={i}
                     className={`w-12 mx-1 px-3 py-1 text-gray-600 rounded hover:bg-gray-300 ${i + 1 + initailPage === currentPage
                        ? "bg-gray-600 text-white"
                        : "bg-gray-200"
                        }`}
                     onClick={() => onPageChange(i + 1 + initailPage)}
                  >
                     {i + 1 + initailPage}
                  </button>
               )
            )}

            <button
               onClick={() => handleNextPage(currentPage)}
               className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
               disabled={currentPage === (calculateTotalPages(totalItems)) || totalItems === 0}
            >
               {">"}
            </button>
         </div>
         <span className="text-sm text-gray-600">
         </span>
      </div>
   )
}

interface PaginationProps {
   itemsPerPage?: number;
   totalItems: number;
   pageSize: number;
   currentPage: number;
   onPageChange: (page: number) => void;
}

export default Pagination;