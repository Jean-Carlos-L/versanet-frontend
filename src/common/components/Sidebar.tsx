import { NavLink } from "react-router-dom";
import {
  UserGroupIcon,
  ListBulletIcon,
  PresentationChartLineIcon,
  ClipboardDocumentCheckIcon,
  DocumentCurrencyDollarIcon,
  Square3Stack3DIcon,
  BellAlertIcon,
  Cog8ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { ROUTES } from "../routers/routes";
import { useAuthQuery } from "@/modules/auth/hooks/useAuthQuery";
import { useAuthCommand } from "@/modules/auth/hooks/useAuthCommand";

function Sidebar() {
  const { isAuth } = useAuthQuery();
  const { logout } = useAuthCommand();

  return (
    <aside className="bg-gray-800 min-h-screen w-[20%] p-3">
      <header className="text-center">
        <img
          src="/logo.png"
          alt="Logo de la empresa"
          className="h-28 w-28 mx-auto"
        />
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-50 ">
          Versanet
        </h1>
      </header>
      {isAuth && (
        <div className="flex flex-col text-start space-y-3">
          <LinkComponent
            to={ROUTES.DASHBOARD}
            icon={
              <PresentationChartLineIcon className="h-6 w-6 inline-block mb-1 mr-1" />
            }
            label="Panel de control"
          />
          <LinkComponent
            to={ROUTES.CUSTOMERS}
            icon={<UserGroupIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
            label="Clientes"
          />
          <LinkComponent
            to={ROUTES.CONTRATS}
            icon={
              <ClipboardDocumentCheckIcon className="h-6 w-6 inline-block mb-1 mr-1" />
            }
            label="Contratos"
          />

          <LinkComponent
            to={ROUTES.PLANS}
            icon={<ListBulletIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
            label="Planes"
          />

          <LinkComponent
            to={ROUTES.FACTURATION}
            icon={
              <DocumentCurrencyDollarIcon className="h-6 w-6 inline-block mb-1 mr-1" />
            }
            label="Facturación"
          />

          <LinkComponent
            to={ROUTES.INVENTORY}
            icon={
              <Square3Stack3DIcon className="h-6 w-6 inline-block mb-1 mr-1" />
            }
            label="Inventario"
          />

          <LinkComponent
            to={ROUTES.NOTIFICATIONS}
            icon={<BellAlertIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
            label="Notificaciones"
          />
          <LinkComponent
            to={ROUTES.CONFIGURATION}
            icon={<Cog8ToothIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
            label="Configuración"
          />


          <button onClick={logout} className="px-4 py-4 text-gray-50 rounded-md text-start cursor-pointer w-full hover:bg-gray-300 hover:text-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400">
            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 inline-block mb-1 mr-1" /> Cerrar
            sesión
          </button>

        </div>
      )}
    </aside>
  );
}

function LinkComponent({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `px-4 py-4 text-gray-50 rounded-md cursor-pointer w-full hover:bg-gray-300 hover:text-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${isActive ? "bg-gray-300 text-gray-800 shadow-md" : ""
          }`;
      }}
    >
      {icon} {label}
    </NavLink>
  );
}

export default Sidebar;
