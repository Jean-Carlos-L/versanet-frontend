import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./routes";
import AuthLogin from "@/modules/auth/AuthLogin";
import ResetPassword from "@/modules/auth/ResetPassword";
import CodeToRecoveryPass from "@/modules/auth/CodeToRecoveryPass";

function PublicRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<AuthLogin />} />
      <Route path={ROUTES.RECOVER_PASSWORD} element={<ResetPassword />} />
      <Route
        path={ROUTES.GET_CODE_RECOVER_PASS}
        element={<CodeToRecoveryPass />}
      />
    </Routes>
  );
}

export default PublicRoutes;
