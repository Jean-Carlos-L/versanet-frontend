import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import UsersCreate from "@/modules/users/UsersCreate";
import UsersList from "@/modules/users/UsersList";
import UsersEdit from "@/modules/users/UsersEdit";
import RolesList from "@/modules/roles/RolesList";
import RolesCreate from "@/modules/roles/RolesCreate";
import RolesEdit from "@/modules/roles/RolesEdit";
import RolesView from "@/modules/roles/RolesView";
import AuthLogout from "@/modules/auth/AuthLogout";
import Plans from "@/modules/plans/Plans";
import PlansCustomersList from "@/modules/plansCustomers/PlansCustomersList";
// Helper para verificar si la cookie con el token está presente
const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

// Verifica si el token está en las cookies
const isValidToken = () => {
  const token = getCookie("token");
  return !!token; // Devuelve true si la cookie está presente
};


function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RequiredAuth />}>
        <Route path={ROUTES.USERS_CREATE} element={<UsersCreate />} />
        <Route path={ROUTES.USERS_LIST} element={<UsersList />} />
        <Route path={ROUTES.USERS_EDIT} element={<UsersEdit />} />

        <Route path={ROUTES.ROLES_LIST} element={<RolesList />} />
        <Route path={ROUTES.ROLES_CREATE} element={<RolesCreate />} />
        <Route path={ROUTES.ROLES_EDIT} element={<RolesEdit />} />
        <Route path={ROUTES.ROLES_VIEW} element={<RolesView />} />

        <Route path={ROUTES.LOGOUT} element={<AuthLogout />} />
        <Route path={ROUTES.PLANS_LIST} element={<Plans />} />
        <Route path={ROUTES.PLANS_CUSTOMERS_LIST} element={<PlansCustomersList />} />
      </Route>
    </Routes>
  );
}

// Redirige al usuario a la página de login si no hay un token válido en las cookies
function RequiredAuth() {
  if (!isValidToken()) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
