import { useParams } from "react-router-dom";
import { useRoleById } from "./hooks/useRoleById";
import { RoleUpdate } from "@/common/models/Role";
import { useEffect, useState } from "react";
import FormRole from "./components/FormRole";
import Header from "@/common/components/Header";
import { useRolesCommand } from "./hooks/useRolesCommand";

function RolesEdit() {
  const { id } = useParams<{ id: string }>();
  const { role } = useRoleById(id);
  const { updateRole, loadingAction } = useRolesCommand();
  const [roleUpdate, setRoleUpdate] = useState<RoleUpdate>({
    id: "",
    description: "",
    permissions: [],
    status: 0,
  });

  useEffect(() => {
    if (role) {
      setRoleUpdate({
        id: role.id,
        description: role.description,
        permissions: role.permissions.map((permission) => permission.id),
        status: role.status,
      });
    }
  }, [role]);

  const handleChange = (role: RoleUpdate) => {
    setRoleUpdate(role);
  };

  const handleSubmit = () => {
    if (window.confirm("¿Estás seguro de que deseas actualizar este rol?")) {
      if (!loadingAction) {
        updateRole(roleUpdate);
      }
    }
  };

  return (
    <div>
      <Header title="Editar rol" />
      <FormRole
        role={roleUpdate}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default RolesEdit;
