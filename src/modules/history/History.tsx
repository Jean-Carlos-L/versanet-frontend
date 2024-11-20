import Header from "@/common/components/Header";
import { ROUTES } from "@/common/routers/routes";
import { Link } from "react-router-dom";
import {
  UserIcon,
  IdentificationIcon,
  DocumentTextIcon,
  ClipboardIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChartPieIcon,
} from "@heroicons/react/20/solid";

function History() {
  const entities = [
    {
      name: "Clientes",
      route: ROUTES.HISTORY_CLIENTS,
      icon: <UserIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Planes",
      route: ROUTES.HISTORY_PLANS,
      icon: <ChartPieIcon className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Facturas",
      route: ROUTES.HISTORY_INVOICES,
      icon: <DocumentTextIcon className="h-6 w-6 text-yellow-500" />,
    },
    {
      name: "Pagos",
      route: ROUTES.HISTORY_PAYMENTS,
      icon: <CreditCardIcon className="h-6 w-6 text-purple-500" />,
    },
    {
      name: "Usuarios",
      route: ROUTES.HISTORY_USERS,
      icon: <UserIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      name: "Permisos",
      route: ROUTES.HISTORY_PERMISSIONS,
      icon: <ShieldCheckIcon className="h-6 w-6 text-pink-500" />,
    },
    {
      name: "Roles",
      route: ROUTES.HISTORY_ROLES,
      icon: <IdentificationIcon className="h-6 w-6 text-green-500" />,
    },
    {
      name: "Roles_Permisos",
      route: ROUTES.HISTORY_ROLES_PERMISSIONS,
      icon: <ClipboardIcon className="h-6 w-6 text-teal-500" />,
    },
    {
      name: "Facturas_Pagos",
      route: ROUTES.HISTORY_INVOICES_PAYMENTS,
      icon: <CreditCardIcon className="h-6 w-6 text-red-500" />,
    },
    {
      name: "Contratos",
      route: ROUTES.HISTORY_CLIENTS_PLANS,
      icon: <ChartPieIcon className="h-6 w-6 text-gray-600" />,
    },
  ];

  return (
    <main>
      <Header title="Historial" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {entities.map((entity) => (
          <Link
            to={entity.route}
            key={entity.name}
            className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center mb-4">
              {entity.icon}
              <h2 className="text-xl font-bold text-gray-800 ml-3">
                {entity.name}
              </h2>
            </div>
            <p className="text-gray-600">Ver reportes de {entity.name}.</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default History;
