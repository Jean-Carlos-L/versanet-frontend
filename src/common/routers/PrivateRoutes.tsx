import { Outlet, Route, Routes } from "react-router-dom"
import { ROUTES } from "./routes"

function PrivateRoutes() {
   return (
      <Routes>
         <Route path="/" element={<RequiredAuth />}>
            <Route path={ROUTES.USERS_LIST} element={<div>Users List</div>} />
            <Route path={ROUTES.USERS_CREATE} element={<div>Users Create</div>} />
            <Route path={ROUTES.USERS_EDIT} element={<div>Users Edit</div>} />

            <Route path={ROUTES.ROLES_LIST} element={<div>Roles List</div>} />
            <Route path={ROUTES.ROLES_CREATE} element={<div>Roles Create</div>} />
            <Route path={ROUTES.ROLES_EDIT} element={<div>Roles Edit</div>} />
         </Route>
      </Routes>
   )
}

function RequiredAuth() {
   return <Outlet />
}

export default PrivateRoutes