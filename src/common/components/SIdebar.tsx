import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { ROUTES } from "../routers/routes";
import { UserCircleIcon } from "@heroicons/react/16/solid";

function Sidebar() {
  return (
    <aside className="bg-gray-200 min-h-screen w-[20%] p-3">
      <h1 className="text-black text-2xl mb-3">Versnet</h1>

      <div className="text-start">
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
    </aside>
  );
}

export default Sidebar;
