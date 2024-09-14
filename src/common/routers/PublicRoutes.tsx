import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";

function PublicRoutes() {
   return (
      <Routes>
         <Route path={ROUTES.LOGIN} element={<div>Login</div>} />
         <Route index path={ROUTES.HOME} element={<div>Home</div>} />
      </Routes>
   )
}

export default PublicRoutes