import Table, { TableCell, TableRow } from "@/common/components/Table";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useUsersQuery } from "./hooks/useUsersQuery";
import Spinner from "@/common/components/Spinner";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useUsersCommand } from "./hooks/useUsersCommand";
import { useUsersFilters } from "./hooks/useUsersFilters "; // Importar el hook
import Header from "@/common/components/Header";
import Textfield from "@/common/components/Textfield";

const HEADERS_TABLE = ["#", "Nombre", "Correo", "Rol", "Acciones"];

function UsersList() {
  const navigate = useNavigate();
  const { users, loading, refresh } = useUsersQuery();
  const { deleteUser } = useUsersCommand(refresh);
  const { search, filteredUsers, handleSearchChange } = useUsersFilters(users);

  const handleEdit = (id: string) => {
    const path = generatePath(ROUTES.USERS_EDIT, { id });
    navigate(path);
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  return (
    <main>
      <Header title="Lista de usuario" />

      <div className="flex flex-col items-center w-full p-5">
        <section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
          {/* Cuadro de búsqueda único */}
          <div className="mb-4 justify-center">
            <Textfield
              label=""
              name="search"
              placeholder="Buscar por nombre, correo o rol"
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="mb-4 space-y-2 flex flex-col">
            {loading && users.length === 0 ? (
              <Spinner />
            ) : (
              <Table
                headers={HEADERS_TABLE}
                data={filteredUsers.map((user, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role?.description}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleDelete(user.id)}>
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleEdit(user.id)}>
                          <PencilIcon className="h-5 w-5" />
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

export default UsersList;
