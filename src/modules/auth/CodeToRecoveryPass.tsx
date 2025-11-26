import Textfield from "@/common/components/Textfield";
import { useAuthCommand } from "./hooks/useAuthCommand";
import Button from "@/common/components/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useState } from "react";

function CodeToRecoveryPass() {
  const { getCodeToRecoverPassword } = useAuthCommand();

  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCodeToRecoverPassword(email).then(() => {
      setEmail("");
      setOk(true);
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
          />
          <Button type="submit">Enviar código de recuperación</Button>
        </form>
        {!ok && (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-4 mt-5">
            <p className="text-lg text-gray-700 font-medium mb-4 text-center">
              Se ha enviado un código de recuperación a tu correo electrónico.
            </p>
            <Link
              to={ROUTES.RECOVER_PASSWORD}
              className="text-white bg-gray-700 hover:bg-gray-800 font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Ir a recuperar contraseña
            </Link>
          </div>
        )}

        <p className="mt-4 text-sm text-center text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}

export default CodeToRecoveryPass;
