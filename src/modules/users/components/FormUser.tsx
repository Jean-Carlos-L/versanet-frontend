import InputField from "@/common/components/InputField";
import { UserCreate, UserUpdate } from "@/common/models/User";
import { useUsersCommand } from "../hooks/useUsersCommand";
import Button from "@/common/components/Button";

// Formulario para registrar y editar usuarios (name, email, rol, password, confirm password)
function FormUser({ user, loading, onSubmit, onChange }: FormUserProps) {
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
      className="p-4 rounded-lg shadow-md max-w-lg mx-auto"
      aria-label="Formulario de Usuario"
    >
      <div className="flex flex-col gap-6">
        {/* Nombre */}
        <InputField
          label="Nombre"
          name="name"
          value={name}
          placeholder="Nombre del usuario"
          onChange={handleChangeText}
          error={errors.name}
          errorId="nombre-error"
        />

        {/* Correo electrónico */}
        <InputField
          label="Correo Electrónico"
          name="email"
          value={email}
          placeholder="Correo electrónico del usuario"
          onChange={handleChangeText}
          error={errors.email}
          errorId="email-error"
        />

        {/* Contraseña */}
        <InputField
          label="Contraseña"
          name="password"
          value={password}
          placeholder="Contraseña del usuario"
          onChange={handleChangeText}
          error={errors.password}
          errorId="password-error"
        />

        {/* Confirmar contraseña */}
        <InputField
          label="Confirmar Contraseña"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirmar contraseña del usuario"
          onChange={handleChangeText}
          error={errors.confirmPassword}
          errorId="confirm-password-error"
        />

        {/* Contenedor de botones con separación y alineación */}
        <div className="flex justify-end gap-4 mt-4">
          <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
          <Button type="button" onClick={() => console.log("Cancelar")}>
            Cancelar
          </Button>
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
