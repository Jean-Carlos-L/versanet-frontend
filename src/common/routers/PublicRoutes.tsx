import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import AuthLogin from "@/modules/auth/AuthLogin";

function PublicRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<AuthLogin />} />
    </Routes>
  );
}

export default PublicRoutes;
