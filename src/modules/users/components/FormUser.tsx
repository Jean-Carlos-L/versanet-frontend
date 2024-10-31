import { UserCreate, UserUpdate } from "@/common/models/User";
import { useUsersCommand } from "../hooks/useUsersCommand";
import Button from "@/common/components/Button";
import { useRolesQuery } from "@/modules/roles/hooks/useRolesQuery";
import Select from "@/common/components/Select";
import Textfield from "@/common/components/Textfield";

function FormUser({ user, loading, onSubmit, onChange }: FormUserProps) {
  const { roles } = useRolesQuery();
  const { name, email, password, confirmPassword } = user;
  const { validations, errors } = useUsersCommand();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      const { hasErrors } = validations(user);
      if (!hasErrors) {
        return onSubmit();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg shadow-md max-w-xl mx-auto bg-gray-800"
      aria-label="Formulario de Usuario"
    >
      <div className="flex flex-col gap-6">
        <Textfield
          label="Nombre"
          name="name"
          value={name}
          placeholder="Nombre del usuario"
          onChange={handleChangeText}
          error={errors.name}
        />

        <Textfield
          label="Correo Electrónico"
          name="email"
          value={email}
          placeholder="Correo electrónico del usuario"
          onChange={handleChangeText}
          error={errors.email}
        />

        <Select
          label="Rol"
          name="role"
          options={roles.map((role) => ({
            value: role.id,
            label: role.description,
          }))}
          value={user.role}
          onChange={(e) => onChange({ ...user, role: e.target.value })}
          error={errors.role}
        />

        <Textfield
          label="Contraseña"
          name="password"
          value={password}
          type="password"
          placeholder="Contraseña del usuario"
          onChange={handleChangeText}
          error={errors.password}
        />

        <Textfield
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          placeholder="Confirmar contraseña del usuario"
          onChange={handleChangeText}
          error={errors.confirmPassword}
        />

        <div className="flex justify-end gap-4 mt-4">
          <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
        </div>
      </div>
    </form>
  );
}

interface FormUserProps {
  user: UserCreate | UserUpdate;
  loading?: boolean;
  onSubmit: () => void;
  onChange: (user: UserCreate | UserUpdate) => void;
}

export default FormUser;
