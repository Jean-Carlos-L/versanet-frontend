import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "./routes";
import { PERMISSIONS } from "../constants/permissions";
import { useAuthQuery } from "@/modules/auth/hooks/useAuthQuery";

import Plans from "@/modules/plans/Plans";
import ContractList from "@/modules/contracts/ContractList";
import Configuration from "@/modules/configuration/Configuration";
import CustomerListModal from "@/modules/customers/CustomerList";
import StatsList from "@/modules/stats/stats";
import UsersList from "@/modules/users/UsersList";
import UsersCreate from "@/modules/users/UsersCreate";
import RolesList from "@/modules/roles/RolesList";
import RolesCreate from "@/modules/roles/RolesCreate";
import RolesEdit from "@/modules/roles/RolesEdit";
import RolesView from "@/modules/roles/RolesView";
import History from "@/modules/history/History";
import InventoryList from "@/modules/inventory/InventoryList";
import TraficoList from "@/modules/stats/trafico";
import UsersEdit from "@/modules/users/UsersEdit";
import PlanCreate from "@/modules/plans/PlanCreate";
import PlanEdit from "@/modules/plans/PlanEdit";
import Invoices from "@/modules/invoices/Invoices";
import InvoiceCreate from "@/modules/invoices/InvoiceCreate";
import InvoiceEdit from "@/modules/invoices/InvoiceEdit";
import InventoryCreate from "@/modules/inventory/InventoryCreate";
import InventoryUpdate from "@/modules/inventory/InventoryEdit";
import ContractUpdate from "@/modules/contracts/ContractEdit";
import ContractCreate from "@/modules/contracts/ContractCreate";
import Payments from "@/modules/payments/Payments";
import PaymentCreate from "@/modules/payments/PaymentCreate";
import PaymentUpdate from "@/modules/payments/PaymentEdit";

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RequiredAuth />}>
        <Route path={ROUTES.DASHBOARD} element={<StatsList />} />
        <Route path={ROUTES.CUSTOMERS} element={<CustomerListModal />} />
        <Route path={ROUTES.INVENTORY} element={<InventoryList />} />
        <Route path={ROUTES.INVENTORY_CREATE} element={<InventoryCreate />} />
        <Route path={ROUTES.INVENTORY_EDIT} element={<InventoryUpdate />} />
        <Route path={ROUTES.CONTRACTS} element={<ContractList />} />
        <Route path={ROUTES.CONTRACTS_CREATE} element={<ContractCreate />} />
        <Route path={ROUTES.CONTRACTS_EDIT} element={<ContractUpdate />} />
        <Route path={ROUTES.INVOICES} element={<Invoices />} />
        <Route path={ROUTES.INVOICES_CREATE} element={<InvoiceCreate />} />
        <Route path={ROUTES.INVOICES_EDIT} element={<InvoiceEdit />} />
        <Route path={ROUTES.PAYMENTS} element={<Payments />} />
        <Route path={ROUTES.PAYMENTS_CREATE} element={<PaymentCreate />} />
        <Route path={ROUTES.PAYMENTS_EDIT} element={<PaymentUpdate />} />
        <Route path={ROUTES.TRAFICO} element={<TraficoList />} />
        <Route path={ROUTES.CONFIGURATION} element={<Configuration />} />
        <Route path={ROUTES.PLANS} element={<Plans />} />
        <Route path={ROUTES.USERS_LIST} element={<UsersList />} />
        <Route path={ROUTES.USERS_CREATE} element={<UsersCreate />} />
        <Route path={ROUTES.USERS_EDIT} element={<UsersEdit />} />
        <Route path={ROUTES.ROLES_LIST} element={<RolesList />} />
        <Route path={ROUTES.ROLES_CREATE} element={<RolesCreate />} />
        <Route path={ROUTES.ROLES_EDIT} element={<RolesEdit />} />
        <Route path={ROUTES.ROLES_VIEW} element={<RolesView />} />
        <Route path={ROUTES.PLANS_CREATE} element={<PlanCreate />} />
        <Route path={ROUTES.PLANS_EDIT} element={<PlanEdit />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
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
