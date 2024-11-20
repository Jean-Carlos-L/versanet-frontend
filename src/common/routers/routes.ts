export const ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  HOME: "/home",

  USERS_LIST: "/configuration/users/list",
  USERS_CREATE: "/configuration/users/create",
  USERS_EDIT: "/configuration/users/edit/:id",
  USERS_DELETE: "/configuration/users/delete/:id",

  ROLES_LIST: "/configuration/roles/list",
  ROLES_CREATE: "/configuration/roles/create",
  ROLES_EDIT: "/configuration/roles/edit/:id",
  ROLES_DELETE: "/configuration/roles/delete/:id",
  ROLES_VIEW: "/configuration/roles/view/:id",

  PLANS_LIST: "/plans/list",
  PLANS_CUSTOMERS_LIST: "/plans/customers/list",

  HISTORY_CLIENTS: "/history/clients",
  HISTORY_CLIENTS_PLANS: "/history/clients-plans",
  HISTORY_PLANS: "/history/plans",
  HISTORY_INVOICES: "/history/invoices",
  HISTORY_PAYMENTS: "/history/payments",
  HISTORY_USERS: "/history/users",
  HISTORY_PERMISSIONS: "/history/permissions",
  HISTORY_ROLES: "/history/roles",
  HISTORY_ROLES_PERMISSIONS: "/history/roles-permissions",
  HISTORY_INVOICES_PAYMENTS: "/history/invoices-payments",

  DASHBOARD: "/control-panel",
  CUSTOMERS: "/customers",
  CONTRATS: "/contrats",
  PLANS: "/plans",
  FACTURATION: "/facturation",
  INVENTORY: "/inventory",
  HISTORY: "/history",
  CONFIGURATION: "/configuration",
};
