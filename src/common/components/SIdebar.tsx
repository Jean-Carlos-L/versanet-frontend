import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import {
  UserGroupIcon,
  UserCircleIcon,
  ListBulletIcon,
  ServerStackIcon,
} from "@heroicons/react/20/solid";
import { ROUTES } from "../routers/routes";

function Sidebar() {
  return (
    <aside className="bg-gray-200 min-h-screen w-[20%] p-3">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
        Versanet
      </h1>
      <div className="text-start space-y-3">
        <DropdownItem
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
        />
      </div>
    </aside>
  );
}

function DropdownItem({ icon, title, links }) {
  return (
    <Dropdown
      type="link"
      title={
        <span className="align-middle p-1">
          {icon} {title}
        </span>
      }
    >
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </Dropdown>
  );
}

function LinkComponent({ to, icon, label }) {
  return (
    <div className="px-4 py-2 text-gray-600 rounded-md cursor-pointer w-52 hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400">
      <Link to={to}>
        {icon} {label}
      </Link>
    </div>
  );
}

export default Sidebar;
