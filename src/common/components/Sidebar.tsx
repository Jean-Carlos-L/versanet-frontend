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
} from "@heroicons/react/20/solid";
import { ROUTES } from "../routers/routes";

function Sidebar() {
  return (
    <aside className="bg-gray-800 min-h-screen w-[20%] p-3">
      <header className="text-center">
        <img src="/logo.png" alt="Logo de la empresa" className="h-28 w-28 mx-auto" />
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-50 ">
          Versanet
        </h1>

      </header>
      <div className="flex flex-col text-start space-y-3">
        <LinkComponent
          to={ROUTES.DASHBOARD}
          icon={<PresentationChartLineIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Panel de control"
        />
        <LinkComponent
          to={ROUTES.CUSTOMERS}
          icon={<UserGroupIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Clientes"
        />
        <LinkComponent
          to={ROUTES.CONTRATS}
          icon={<ClipboardDocumentCheckIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Contratos"
        />

        <LinkComponent
          to={ROUTES.PLANS}
          icon={<ListBulletIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Planes"
        />

        <LinkComponent
          to={ROUTES.FACTURATION}
          icon={<DocumentCurrencyDollarIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Facturación"
        />

        <LinkComponent
          to={ROUTES.INVENTORY}
          icon={<Square3Stack3DIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
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
        {/* <DropdownItem
          icon={<UserGroupIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          title="Roles"
          links={[
            { to: ROUTES.ROLES_CREATE, label: "Crear rol" },
            { to: ROUTES.ROLES_LIST, label: "Ver roles" },
          ]}
        />
        <DropdownItem
          icon={<UserCircleIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          title="Usuarios"
          links={[
            { to: ROUTES.USERS_CREATE, label: "Crear usuario" },
            { to: ROUTES.USERS_LIST, label: "Ver usuarios" },
          ]}
        />
        <DropdownItem
          icon={<UserCircleIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          title="Perfil"
          links={[{ to: ROUTES.LOGOUT, label: "Cerrar sesión" }]}
        />
        <LinkComponent
          to={ROUTES.PLANS_LIST}
          icon={<ListBulletIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Planes"
        />
        <LinkComponent
          to={ROUTES.PLANS_CUSTOMERS_LIST}
          icon={<ServerStackIcon className="h-6 w-6 inline-block mb-1 mr-1" />}
          label="Servicios"
        /> */}
      </div>
    </aside>
  );
}

function LinkComponent({ to, icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => {
      return `px-4 py-4 text-gray-50 rounded-md cursor-pointer w-full hover:bg-gray-300 hover:text-gray-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${isActive ? 'bg-gray-300 text-gray-800 shadow-md' : ''}`
    }}>
      {icon} {label}
    </NavLink>
  );
}

export default Sidebar;
