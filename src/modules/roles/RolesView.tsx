import { useParams } from "react-router-dom";
import { useRoleById } from "./hooks/useRoleById";
import Header from "@/common/components/Header";

function RolesView() {
  const { id } = useParams<{ id: string }>();
  const { role } = useRoleById(id);

  return (
    <div>
      <Header title="Ver rol" />

      <div className="flex items-center justify-center p-5">
        <div className="bg-white p-6 rounded-lg shadow-inner w-full max-w-3xl">
          <div className="mb-6">
            <p className="text-xl text-gray-800">
              <span className="font-semibold">
                Descripción:{" "}
              </span>
              {role?.description || (
                <span className="italic text-gray-500">Sin descripción</span>
              )}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xl text-gray-800">
              <span className="font-semibold">Estado: </span>
              {role?.status === "activo" ? (
                <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-green-100 font-medium">
                  Activo
                </span>
              ) : (
                <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-red-100 font-medium">
                  Inactivo
                </span>
              )}
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold  text-gray-800 mb-3">
              Permisos:
            </p>
            {role?.permissions.length > 0 ? (
              <ul className="space-y-2">
                {role.permissions.map((permission) => (
                  <li key={permission.id} className="flex items-center">
                    <span className="flex-shrink-0 inline-block w-4 h-4 bg-gray-500 rounded-full mr-3"></span>
                    <span className="text-gray-800">
                      {permission.description}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">
                No tiene permisos asignados.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesView;
