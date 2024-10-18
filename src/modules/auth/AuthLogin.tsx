import { useState, useEffect } from "react";
import { Auth } from "@/common/models/Auth";
import FormAuth from "./components/FormAuth";
import { useAuth } from "./hooks/useAuth";
import Header from "@/common/components/Header";
import { useNavigate } from "react-router-dom";

function AuthLogin() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<Auth>({
    email: "",
    password: "",
  });
  const { login, loading, errors } = useAuth();

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

    navigate("/home"); // Redirigir al home
  };

  useEffect(() => {
    if (errors.message) {
      alert(errors.message); // Mostrar alerta cuando haya un error
    }
  }, [errors]);

  return (
    <div>
      <Header title="Iniciar Sesión" />
      <FormAuth
        auth={auth}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </div>
  );
}

export default AuthLogin;
