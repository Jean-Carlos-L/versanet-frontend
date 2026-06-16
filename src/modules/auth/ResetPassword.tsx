import { ROUTES } from "@/common/routers/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthCommand } from "./hooks/useAuthCommand";
import Textfield from "@/common/components/Textfield";
import Button from "@/common/components/Button";

function RecoverPassword() {
  const { recoverPassword } = useAuthCommand();
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    recoverPassword(auth.email, auth.password, auth.code).then(() => {
      setAuth({
        email: "",
        password: "",
        code: "",
      });
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Recuperar contraseña
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textfield
            label="Email"
            name="email"
            onChange={(e) => setAuth({ ...auth, email: e.target.value })}
            value={auth.email}
            placeholder="Email"
          />
          <Textfield
            label="Password"
            name="password"
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            value={auth.password}
            placeholder="Password"
            type="password"
          />
          <Textfield
            label="Código de recuperación"
            name="code"
            onChange={(e) => setAuth({ ...auth, code: e.target.value })}
            value={auth.code}
            placeholder="Código de recuperación"
          />

          <Button type="submit">Cambiar contraseña</Button>
        </form>
        <div className="text-center mt-4">
          <Link
            to={ROUTES.LOGIN}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </main>
  );
}

export default RecoverPassword;
