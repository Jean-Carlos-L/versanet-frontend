import { useState } from "react";
import FormRole from "./components/FormRole";
import Header from "@/common/components/Header";
import { RoleCreate } from "@/common/models/Role";
import { useRolesCommand } from "./hooks/useRolesCommand";

function RolesCreate() {
  const [role, setRole] = useState<RoleCreate>({
    permissions: [],
    description: "",
    status: 1,
  });
  const { createRole, loadingAction } = useRolesCommand();

  const handleChange = (role: RoleCreate) => {
    setRole(role);
  };

  const handleSubmit = () => {
    if (!loadingAction) {
      createRole(role).then(() => {
        setRole({
          permissions: [],
          description: "",
          status: 1,
        });
      });
    }
  };

  return (
    <main>
      <Header title="Crear rol" />
      <FormRole role={role} onChange={handleChange} onSubmit={handleSubmit} />
    </main>
  );
}

export default RolesCreate;
