import { useState } from "react";
import { Auth } from "@/common/models/Auth";
import FormAuth from "./components/FormAuth";
import Header from "@/common/components/Header";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/common/routers/routes";
import { useAuthCommand } from "./hooks/useAuthCommand";

function AuthLogin() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<Auth>({
    email: "",
    password: "",
  });
  const { login } = useAuthCommand();

  const handleChange = (auth: Auth) => {
    setAuth(auth);
  };

  const handleSubmit = async () => {
    if (!auth.email || !auth.password) {
      alert("Por favor, completa ambos campos.");
      return;
    }

    await login(auth.email, auth.password);
    setAuth({
      email: "",
      password: "",
    });

    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <Header title="Iniciar Sesión" />
      <FormAuth
        auth={auth}
        loading={false}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </div>
  );
}

export default AuthLogin;
