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
import Configuration from "@/modules/configuration/Configuration";
import { useAuthQuery } from "@/modules/auth/hooks/useAuthQuery";
import CustomerListModal from "@/modules/customers/CustomerList";

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
        <Route
          path={ROUTES.PLANS_CUSTOMERS_LIST}
          element={<PlansCustomersList />}
        />

        <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />

        <Route path={ROUTES.CUSTOMERS} element={<CustomerListModal />} />

        <Route path={ROUTES.CONTRATS} element={<PlansCustomersList />} />

        <Route path={ROUTES.PLANS} element={<Plans />} />

        <Route path={ROUTES.FACTURATION} element={<div>Facturación</div>} />

        <Route path={ROUTES.INVENTORY} element={<div>Inventario</div>} />

        <Route
          path={ROUTES.NOTIFICATIONS}
          element={<div>Notificaciones</div>}
        />

        <Route path={ROUTES.CONFIGURATION} element={<Configuration />} />
      </Route>
    </Routes>
  );
}

function RequiredAuth() {
  const { isAuth } = useAuthQuery();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <Outlet />;
}

export default PrivateRoutes;