import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { UserGroupIcon, UserCircleIcon, ListBulletIcon } from "@heroicons/react/20/solid";
import { ROUTES } from "../routers/routes";

function Sidebar() {
  return (
    <aside className="bg-gray-200 min-h-screen w-[20%] p-3">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-600">
        Versanet
      </h1>

      <div className="flex flex-col text-start justify-start space-y-3">
        <div>
          <Dropdown
            type="link"
            title={
              <span className="align-middle p-1">
                <UserGroupIcon className="h-6 w-6 inline-block mb-1 mr-1" /> Roles
              </span>
            }
          >
            <Link to={ROUTES.ROLES_CREATE}>Crear rol</Link>
            <Link to={ROUTES.ROLES_LIST}>Ver roles</Link>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            type="link"
            title={
              <span className="align-middle p-1">
                <UserCircleIcon className="h-6 w-6 inline-block mb-1 mr-1" />{" "}
                Usuarios
              </span>
            }
          >
            <Link to={ROUTES.USERS_CREATE}>Crear usuario</Link>
            <Link to={ROUTES.USERS_LIST}>Ver usuarios</Link>
          </Dropdown>
        </div>
        <div>
          <LinkComponent to={ROUTES.PLANS_LIST}>
            <ListBulletIcon className="h-6 w-6 inline-block mb-1 mr-1" />{" "}
            Planes
          </LinkComponent>
        </div>
        <div>
          <LinkComponent to={ROUTES.PLANS_LIST}>
            <ListBulletIcon className="h-6 w-6 inline-block mb-1 mr-1" />{" "}
            Servicios
          </LinkComponent>
        </div>
      </div>
    </aside>
  );
}

function LinkComponent({ to, children }) {
  return (
    <div className="px-4 py-2 text-gray-600 rounded-md cursor-pointer w-52 hover:bg-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400">
      <Link to={to}>
        {children}
      </Link>
    </div>
  );
}

export default Sidebar;
