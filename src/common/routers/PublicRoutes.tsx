import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import AuthLogin from "@/modules/auth/AuthLogin";
import ResetPassword from "@/modules/auth/ResetPassword";

function PublicRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<AuthLogin />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
    </Routes>
  );
}

export default PublicRoutes;
