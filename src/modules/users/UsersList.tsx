import Table from "@/common/components/Table";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useUsersQuery } from "./hooks/useUsersQuery";
import Spinner from "@/common/components/Spinner";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useUsersCommand } from "./hooks/useUsersCommand";
import { useUsersFilters } from "./hooks/useUsersFilters "; // Importar el hook

const HEADERS_TABLE = ["#", "Nombre", "Correo", "Rol", "Acciones"];

function UsersList() {
  const navigate = useNavigate();
  const { users, loading, refresh } = useUsersQuery();
  const { deleteUser, loadingAction } = useUsersCommand(refresh);
  const { search, filteredUsers, handleSearchChange } = useUsersFilters(users);

  const handleEdit = (id: string) => {
    const path = generatePath(ROUTES.USERS_EDIT, { id });
    navigate(path);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm("¿Estás seguro de eliminar este usuario?") &&
      !loadingAction
    ) {
      deleteUser(id);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
        <h1 className="text-3xl font-semibold text-gray-700">
          Lista de usuarios
        </h1>
      </header>

      {/* Cuadro de búsqueda único */}
      <div className="w-11/12 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, correo o rol"
          className="input input-bordered w-full"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="w-11/12 text-center">
        {loading && users.length === 0 ? (
          <Spinner />
        ) : (
          <Table
            headers={HEADERS_TABLE}
            data={filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role?.description}</td>
                <td>
                  <div className="flex-gap-2">
                    <button onClick={() => handleDelete(user.id)}>
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleEdit(user.id)}>
                      <PencilIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          />
        )}
      </div>
    </div>
  );
}

export default UsersList;
