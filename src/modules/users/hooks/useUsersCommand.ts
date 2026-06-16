import { useFetch } from "@/common/hooks/useFetch";
import { useState } from "react";
import { UserCreate, UserUpdate } from "@/common/models/User";
import { deleteUserService } from "../services/deleteUsers.service";
import { createUserService } from "../services/createUsers.service";
import { updateUserService } from "../services/updateUsers.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { toast } from "react-toastify";

export const useUsersCommand = (refresh?: () => void) => {
  const { fetchData } = useFetch();
  const confirmation = useConfirmation();
  const [loadingAction, setLoadingAction] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const deleteUser = async (id: string) => {
    try {
      setLoadingAction(true);
      const confirmed = await confirmation({
        title: "Eliminar usuario",
        message: "¿Estás seguro de que deseas eliminar este usuario?",
      });
      if (!confirmed.isConfirmed) {
        return;
      }

      const response = await deleteUserService(fetchData)(id);
      if (refresh) {
        refresh();
      }

      toast.success("Usuario eliminado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
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
      toast.success("Usuario creado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const updateUser = async (user: UserUpdate) => {
    try {
      setLoadingAction(true);
      const confirmed = await confirmation({
        title: "Actualizar usuario",
        message: "¿Estás seguro de que deseas actualizar este usuario?",
      });
      if (!confirmed.isConfirmed) {
        return;
      }
      const response = await updateUserService(fetchData)(user);
      if (refresh) {
        refresh();
      }
      toast.success("Usuario actualizado correctamente");
      return response;
    } catch (error) {
      toast.error(error.message);
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

    if ("id" in user === false) {
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

    // validar que el correo sea un correo
    const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!emailRegex.test(user.email)) {
      errors.email = "El correo no es válido";
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
