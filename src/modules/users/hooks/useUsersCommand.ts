import { useFetch } from "@/common/hooks/useFetch";
import { useState } from "react";
import { UserCreate, UserUpdate } from "@/common/models/User";
import { deleteUserService } from "../services/deleteUsers.service";
import { createUserService } from "../services/createUsers.service";
import { updateUserService } from "../services/updateUsers.service";

export const useUsersCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deleteUser = async (id: string) => {
    try {
      setLoadingAction(true);
      const response = await deleteUserService(fetchData)(id);
      if (refresh) {
        refresh();
      }

      alert("Usuario eliminado correctamente");
      return response;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const createUser = async (user: UserCreate) => {
    try {
      setLoadingAction(true);
      const response = await createUserService(fetchData)(user);
      if (refresh) {
        refresh();
      }
      return response;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const updateUser = async (user: UserUpdate) => {
    try {
      setLoadingAction(true);
      const response = await updateUserService(fetchData)(user);
      if (refresh) {
        refresh();
      }
      return response;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const validations = (user: UserCreate | UserUpdate) => {
    const errors: { [key: string]: string } = {};

    if (!user.name) {
      errors.name = "El nombre es requerido";
    }

    if (!user.email) {
      errors.email = "El correo es requerido";
    }

    if ('id' in user === false) {
      if (!user.password) {
        errors.password = "La contraseña es requerida";
      }

      if (!user.confirmPassword) {
        errors.confirmPassword = "La confirmación de contraseña es requerida";
      }

      if (user.password !== user.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
    }


    if (user.role === undefined || user.role === "") {
      errors.role = "El rol es requerido";
    }

    const hasErrors = Object.keys(errors).length > 0;
    setErrors(errors);
    return { hasErrors };
  };

  return {
    deleteUser,
    createUser,
    updateUser,
    loadingAction,
    errors,
    validations,
  };
};
