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

  NOTIFICATIONS_CLIENTS: "/notifications/clients",
  NOTIFICATION_CLIENTS_PLANS: "/notifications/clients-plans",
  NOTIFICATIONS_PLANS: "/notifications/plans",
  NOTIFICATIONS_INVOICES: "/notifications/invoices",
  NOTIFICATIONS_PAYMENTS: "/notifications/payments",
  NOTIFICATIONS_USERS: "/notifications/users",
  NOTIFICATIONS_PERMISSIONS: "/notifications/permissions",
  NOTIFICATIONS_ROLES: "/notifications/roles",
  NOTIFICATIONS_ROLES_PERMISSIONS: "/notifications/roles-permissions",
  NOTIFICATIONS_INVOICES_PAYMENTS: "/notifications/invoices-payments",

  DASHBOARD: "/control-panel",
  CUSTOMERS: "/customers",
  CONTRATS: "/contrats",
  PLANS: "/plans",
  FACTURATION: "/facturation",
  INVENTORY: "/inventory",
  NOTIFICATIONS: "/notifications",
  CONFIGURATION: "/configuration",
};
