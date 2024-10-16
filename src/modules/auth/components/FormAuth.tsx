import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import { useAuth } from "../hooks/useAuth";
import { Auth } from "@/common/models/Auth";
import { Link } from "react-router-dom"; // Importa Link para navegación

function FormAuth({ auth, loading, onSubmit, onChange }: FormAuthProps) {
  const { email, password } = auth;
  const { errors } = useAuth();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...auth, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      return onSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg shadow-md max-w-lg mx-auto"
      aria-label="Formulario de Autenticación"
    >
      <div className="flex flex-col gap-6">
        <Textfield
          label="Correo Electrónico"
          name="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={handleChangeText}
          error={errors.email}
        />
        <Textfield
          label="Contraseña"
          name="password"
          value={password}
          placeholder="Contraseña"
          type="password"
          onChange={handleChangeText}
          error={errors.password}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
        <Link to="/recover-password" className="text-blue-500 text-center mt-4">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </form>
  );
}

type FormAuthProps = {
  auth: Auth;
  loading: boolean;
  onSubmit: () => void;
  onChange: (auth: Auth) => void;
  errorMessage?: string; // Agregamos un nuevo prop para manejar errores
};

export default FormAuth;
