import { ROUTES } from "@/common/routers/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthCommand } from "./hooks/useAuthCommand";
import Textfield from "@/common/components/Textfield";
import Button from "@/common/components/Button";

function ResetPassword() {
   const { resetPassword } = useAuthCommand();
   const [auth, setAuth] = useState({
      email: "",
      password: "",
   })

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetPassword(auth.email, auth.password).then(() => {
         setAuth({
            email: "",
            password: "",
         })
      })
   }

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
                  onChange={(e) =>
                     setAuth({ ...auth, email: e.target.value })
                  }
                  value={auth.email}
                  placeholder="Email"
               />
               <Textfield
                  label="Password"
                  name="password"
                  onChange={(e) =>
                     setAuth({ ...auth, password: e.target.value })
                  }
                  value={auth.password}
                  placeholder="Password"
                  type="password"
               />


               <Button
                  type="submit"
               >
                  Cambiar contraseña
               </Button>

            </form>
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
   )
}

export default ResetPassword;