import Header from "@/common/components/Header";
import { ROUTES } from "@/common/routers/routes";
import { IdentificationIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

function Configuration() {
   return (
      <main>
         <Header title="Configuración" />

         <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
            <article className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
               <div className="flex items-center mb-4">
                  {/* Ícono de usuario */}
                  <UserIcon className="h-6 w-6 text-blue-500 mr-3" />
                  <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
               </div>
               <p className="text-gray-600 mb-4">Administra los usuarios de la plataforma.</p>
               <div className="flex space-x-2">
                  <Link to={ROUTES.USERS_LIST} className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-600 transition">
                     Ver usuarios
                  </Link>
                  <Link to={ROUTES.USERS_CREATE} className="px-4 py-2 text-sm font-semibold text-gray-800 border-gray-800 border rounded hover:bg-gray-800 hover:text-gray-50 transition">
                     Crear usuario
                  </Link>
               </div>
            </article>

            <article className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300">
               <div className="flex items-center mb-4">
                  <IdentificationIcon className="h-6 w-6 text-green-500 mr-3" />
                  <h2 className="text-xl font-bold text-gray-800">Roles</h2>
               </div>
               <p className="text-gray-600 mb-4">Administra los roles de la plataforma.</p>
               <div className="flex space-x-2">
                  <Link to={ROUTES.ROLES_LIST} className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-600 transition">
                     Ver roles
                  </Link>
                  <Link to={ROUTES.ROLES_CREATE} className="px-4 py-2 text-sm font-semibold text-gray-800 border-gray-800 border rounded hover:bg-gray-800 hover:text-gray-50 transition">
                     Crear rol
                  </Link>
               </div>
            </article>
         </section>
      </main>
   )
}

export default Configuration;