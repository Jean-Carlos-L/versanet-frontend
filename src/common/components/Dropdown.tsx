import React, { useState, useRef, useEffect } from "react";

function Dropdown({ title, type = "button", children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Referencia al dropdown

  // Función para alternar la visibilidad del dropdown
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Función para cerrar el dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Cierra el dropdown al hacer clic fuera de él
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Efecto para manejar clics fuera
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown dropdown-right mb-2" ref={dropdownRef}>
      {type === "link" && (
        <span
          tabIndex={0}
          onClick={toggleDropdown}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {title}
        </span>
      )}
      {type === "button" && (
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDropdown}
          className="btn m-1"
        >
          {title}
        </div>
      )}

      {/* El menú se muestra solo si isOpen es true */}
      {isOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {React.Children.map(children, (child) => {
            return (
              <li onClick={closeDropdown}>{child}</li> // Cierra el dropdown al hacer clic en la opción
            );
          })}
        </ul>
      )}
    </div>
  );
}

interface DropdownProps {
  title: string | React.ReactNode;
  type?: "button" | "submit" | "link";
  children: React.ReactNode;
}

export default Dropdown;
