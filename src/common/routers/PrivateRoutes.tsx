import { Outlet, Route, Routes } from "react-router-dom"
import { ROUTES } from "./routes"
import RolesList from "@/modules/roles/RolesList"
import RolesCreate from "@/modules/roles/RolesCreate"
import RolesEdit from "@/modules/roles/RolesEdit"
import RolesView from "@/modules/roles/RolesView"

function PrivateRoutes() {
   return (
      <Routes>
         <Route path="/" element={<RequiredAuth />}>
            <Route path={ROUTES.USERS_LIST} element={<div>Users List</div>} />
            <Route path={ROUTES.USERS_CREATE} element={<div>Users Create</div>} />
            <Route path={ROUTES.USERS_EDIT} element={<div>Users Edit</div>} />

            <Route path={ROUTES.ROLES_LIST} element={<RolesList />} />
            <Route path={ROUTES.ROLES_CREATE} element={<RolesCreate />} />
            <Route path={ROUTES.ROLES_EDIT} element={<RolesEdit />} />
            <Route path={ROUTES.ROLES_VIEW} element={<RolesView />} />

         </Route>
      </Routes>
   )
}

function RequiredAuth() {
   return <Outlet />
}

export default PrivateRoutes