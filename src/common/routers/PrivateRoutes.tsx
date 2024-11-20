import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
// import UsersCreate from "@/modules/users/UsersCreate";
//import UsersList from "@/modules/users/UsersList";
// import UsersEdit from "@/modules/users/UsersEdit";
// import RolesList from "@/modules/roles/RolesList";
// import RolesCreate from "@/modules/roles/RolesCreate";
// import RolesEdit from "@/modules/roles/RolesEdit";
// import RolesView from "@/modules/roles/RolesView";
// import AuthLogout from "@/modules/auth/AuthLogout";
import Plans from "@/modules/plans/Plans";
import PlansCustomersList from "@/modules/plansCustomers/PlansCustomersList";
import Configuration from "@/modules/configuration/Configuration";
import { useAuthQuery } from "@/modules/auth/hooks/useAuthQuery";
import CustomerListModal from "@/modules/customers/CustomerList";
import UsersList from "@/modules/users/UsersList";
import UsersCreate from "@/modules/users/UsersCreate";
import RolesList from "@/modules/roles/RolesList";
import RolesCreate from "@/modules/roles/RolesCreate";
import RolesEdit from "@/modules/roles/RolesEdit";
import RolesView from "@/modules/roles/RolesView";
import { PERMISSIONS } from "../constants/permissions";
import History from "@/modules/history/History";
import HistoryList from "@/modules/history/HistoryList";

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RequiredAuth />}>
        <Route index path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
        <Route path={ROUTES.CUSTOMERS} element={<CustomerListModal />} />
        <Route path={ROUTES.CONTRATS} element={<PlansCustomersList />} />
        <Route path={ROUTES.PLANS} element={<Plans />} />
        <Route path={ROUTES.FACTURATION} element={<div>Facturación</div>} />
        <Route path={ROUTES.INVENTORY} element={<div>Inventario</div>} />
        <Route path={ROUTES.HISTORY} element={<History />} />
        <Route
          path={ROUTES.HISTORY_USERS}
          element={<HistoryList entities="usuarios" />}
        />
        <Route
          path={ROUTES.HISTORY_PERMISSIONS}
          element={<HistoryList entities="permisos" />}
        />
        <Route
          path={ROUTES.HISTORY_ROLES}
          element={<HistoryList entities="roles" />}
        />
        <Route
          path={ROUTES.HISTORY_ROLES_PERMISSIONS}
          element={<HistoryList entities="roles_permisos" />}
        />
        <Route
          path={ROUTES.HISTORY_INVOICES_PAYMENTS}
          element={<HistoryList entities="facturas_pagos" />}
        />
        <Route
          path={ROUTES.HISTORY_CLIENTS}
          element={<HistoryList entities="clientes" />}
        />
        <Route
          path={ROUTES.HISTORY_CLIENTS_PLANS}
          element={<HistoryList entities="clientes_planes" />}
        />
        <Route
          path={ROUTES.HISTORY_PLANS}
          element={<HistoryList entities="planes" />}
        />
        <Route
          path={ROUTES.HISTORY_INVOICES}
          element={<HistoryList entities="facturas" />}
        />
        <Route
          path={ROUTES.HISTORY_PAYMENTS}
          element={<HistoryList entities="pagos" />}
        />
        <Route path={ROUTES.CONFIGURATION} element={<Configuration />} />
        <Route path={ROUTES.USERS_LIST} element={<UsersList />} />\
        <Route path={ROUTES.USERS_CREATE} element={<UsersCreate />} />
        <Route path={ROUTES.USERS_EDIT} element={<div>Editar Usuario</div>} />
        <Route path={ROUTES.ROLES_LIST} element={<RolesList />} />
        <Route path={ROUTES.ROLES_CREATE} element={<RolesCreate />} />
        <Route path={ROUTES.ROLES_EDIT} element={<RolesEdit />} />
        <Route path={ROUTES.ROLES_VIEW} element={<RolesView />} />
      </Route>
    </Routes>
  );
}

function RequiredAuth() {
  const { isAuth, hasPermission } = useAuthQuery();
  const { state } = useLocation();

  if (!isAuth) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (
    state?.code &&
    PERMISSIONS.DASHBOARD !== state.code &&
    !hasPermission(state.code)
  ) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <Outlet />;
}

export default PrivateRoutes;
