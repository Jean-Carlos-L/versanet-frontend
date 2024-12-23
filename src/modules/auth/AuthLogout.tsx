import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthCommand } from "./hooks/useAuthCommand";

function AuthLogout() {
  const { logout } = useAuthCommand();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null;
}

export default AuthLogout;
