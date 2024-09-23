import { useState } from "react";
import FormRole from "./components/FormRole";
import { RoleCreate } from "@/common/models/Role";
import { useRolesCommand } from "./hooks/useRolesCommand";

function RolesCreate() {
   const [role, setRole] = useState<RoleCreate>({
      permissions: [],
      description: "",
      status: 1
   });
   const { createRole, loadingAction } = useRolesCommand();

   const handleChange = (role: RoleCreate) => {
      setRole(role);
   }

   const handleSubmit = () => {
      if (!loadingAction) {
         createRole(role).then(() => {
            setRole({
               permissions: [],
               description: "",
               status: 1
            })
         })
      }
   }

   return (
      <div>
         <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
            <h1 className="text-3xl font-semibold text-gray-700">Crear rol</h1>
         </header>

         <FormRole role={role} onChange={handleChange} onSubmit={handleSubmit} />
      </div>
   );
}

export default RolesCreate;