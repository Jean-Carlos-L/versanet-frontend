import Button from "@/common/components/Button";
import Checkbox from "@/common/components/Checkbox";
import Radio from "@/common/components/Radio";
import Textfield from "@/common/components/Textfield";
import { RoleCreate, RoleUpdate } from "@/common/models/Role";
import { useRolesCommand } from "../hooks/useRolesCommand";

const permissions = [
   { id: "1", description: "Permiso 1" },
   { id: "2", description: "Permiso 2" },
   { id: "3", description: "Permiso 3" },
   { id: "4", description: "Permiso 4" },
   { id: "5", description: "Permiso 5" },
]

function FormRole({ role, loading, onSubmit, onChange }: FormRoleProps) {
   const { validations, errors } = useRolesCommand();

   const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange({ ...role, [name]: value });
   }

   const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange({ ...role, [name]: Number(value) });
   }

   const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = e.target;
      const permissions = checked
         ? [...role.permissions, value]
         : role.permissions.filter((id) => id !== value);
      onChange({ ...role, permissions });
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!loading) {
         const { hasErrors } = validations(role);
         if (!hasErrors) {
            return onSubmit();
         }
      }
   }

   return (
      <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-md max-w-lg mx-auto">
         <div className="flex flex-col gap-6">
            <div>
               <Textfield
                  label="Descripción"
                  name="description"
                  value={role.description}
                  placeholder="Descripción del rol"
                  onChange={handleChangeText}
                  error={errors.description}
               />
            </div>

            <div className="flex gap-6 items-center">
               <Radio
                  label="Activo"
                  name="status"
                  value={1}
                  checked={role.status === 1}
                  onChange={handleChangeRadio}
               />
               <Radio
                  label="Inactivo"
                  name="status"
                  value={0}
                  checked={role.status === 0}
                  onChange={handleChangeRadio}
               />
            </div>

            <div className="border-t border-gray-200 pt-4">
               <h3 className="text-lg font-semibold text-gray-100 mb-2">Permisos</h3>
               {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center gap-3 mb-2">
                     <Checkbox
                        checked={role.permissions.includes(permission.id)}
                        label={permission.description}
                        onChange={handleChangeCheckbox}
                        value={permission.id}
                     />
                  </div>
               ))}
            </div>

            <div className="mt-4">
               <Button type="submit">
                  Guardar
               </Button>
            </div>
         </div>
      </form>
   );
}

interface FormRoleProps {
   role: RoleCreate | RoleUpdate;
   loading?: boolean;
   onSubmit: () => void;
   onChange: (role: RoleCreate | RoleUpdate) => void;
}

export default FormRole;