import React from "react";

function Dropdown({ title, type = "button", children }: DropdownProps) {
   return (
      <div className="dropdown dropdown-right">
         {type === "link" && (
            <span
               tabIndex={0}
               className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md cursor-pointer  hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2  focus:ring-gray-400"
            >
               {title}
            </span>
         )}
         {type === "button" && (
            <div tabIndex={0} role="button" className="btn m-1">
               {title}
            </div>
         )}

         <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
         >
            {React.Children.map(children, (child) => {
               return <li>{child}</li>;
            })}
         </ul>
      </div>
   );
}

interface DropdownProps {
   title: string | React.ReactNode;
   type?: "button" | "link";
   children: React.ReactNode;
}

export default Dropdown;
