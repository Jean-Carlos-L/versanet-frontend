import Table from "@/common/components/Table";
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
  const { deleteRole, loadingAction } = useRolesCommand(refresh);

  const handleEdit = (id: string) => {
    const path = generatePath(ROUTES.ROLES_EDIT, { id });
    navigate(path);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("¿Estás seguro de eliminar este rol?") &&
      !loadingAction
    ) {
      deleteRole(id);
    }
  };

  const handleView = (id: string) => {
    const path = generatePath(ROUTES.ROLES_VIEW, { id });
    navigate(path);
  };

  return (
    <main>
      <Header title="Lista de roles" />
      <div className="flex flex-col items-center">
        <div className="w-11/12 text-center">
          {loading && roles.length === 0 ? (
            <Spinner />
          ) : (
            <Table
              headers={HEADERS_TABLE}
              data={roles.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>{role.description}</td>
                  <td>{role.status}</td>
                  <td>
                    <div className="flex gap-2">
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
                  </td>
                </tr>
              ))}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default RolesList;
