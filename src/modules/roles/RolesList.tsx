import Table, { TableCell, TableRow } from "@/common/components/Table";
import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/20/solid";
import { useRolesQuery } from "./hooks/useRolesQuery";
import Spinner from "@/common/components/Spinner";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useRolesCommand } from "./hooks/useRolesCommand";
import Header from "@/common/components/Header";

const HEADERS_TABLE = ["#", "Descripción", "Estado", "Acciones"];

function RolesList() {
  const navigate = useNavigate();
  const { roles, loading, refresh } = useRolesQuery();
  const { deleteRole } = useRolesCommand(refresh);

  const handleEdit = (id: string) => {
    const path = generatePath(ROUTES.ROLES_EDIT, { id });
    navigate(path);
  };

  const handleDelete = (id: string) => {
    deleteRole(id);
  };

  const handleView = (id: string) => {
    const path = generatePath(ROUTES.ROLES_VIEW, { id });
    navigate(path);
  };

  return (
    <main>
      <Header title="Lista de roles" />
      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4 space-y-2 flex flex-col">
            {loading && roles.length === 0 ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={roles.map((role, index) => (
                  <TableRow key={role.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => handleView(role.id)}>
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleEdit(role.id)}>
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(role.id)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default RolesList;
