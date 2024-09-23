import { useState } from "react";
import FormUser from "./components/FormUser";
import { UserCreate } from "@/common/models/User";
import { useUsersCommand } from "./hooks/useUsersCommand";

function UsersCreate() {
  const [user, setUser] = useState<UserCreate>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: 1,
  });

  const { createUser, loadingAction } = useUsersCommand();

  const handleChange = (user: UserCreate) => {
    setUser(user);
  };

  const handleSubmit = async () => {
    await createUser(user);
  };

  return (
    <div>
      <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
        <h1 className="text-3xl font-semibold text-gray-700">Crear usuario</h1>
      </header>

      <FormUser
        user={user}
        loading={loadingAction}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </div>
  );
}

export default UsersCreate;
