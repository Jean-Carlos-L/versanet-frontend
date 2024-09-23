import { useParams } from "react-router-dom";
import { useUsersById } from "./hooks/useUsersById";
import { UserUpdate } from "@/common/models/User";
import { useEffect, useState } from "react";
import FormUser from "./components/FormUser";
import Header from "@/common/components/Header";
import { useUsersCommand } from "./hooks/useUsersCommand";

function UsersEdit() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUsersById(id);
  const { updateUser, loadingAction } = useUsersCommand();
  const [userUpdate, setUserUpdate] = useState<UserUpdate>({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUserUpdate({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
        status: user.status,
      });
    }
  }, [user]);

  const handleChange = (user: UserUpdate) => {
    setUserUpdate(user);
  };

  const handleSubmit = () => {
    if (
      window.confirm("¿Estás seguro de que deseas actualizar este usuario?")
    ) {
      if (!loadingAction) {
        updateUser(userUpdate);
      }
    }
  };

  return (
    <div>
      <Header title="Editar usuario" />

      <FormUser
        user={userUpdate}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default UsersEdit;
