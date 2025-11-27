import { useFetch } from "@/common/hooks/useFetch"
import { useState } from "react"
import { deleteRoleService } from "../services/deleteRole.service";
import { RoleCreate, RoleUpdate } from "@/common/models/Role";
import { createRoleService } from "../services/createRole.service";
import { updateRoleService } from "../services/updateRole.service";
import { useConfirmation } from "@/common/hooks/useConfirmation";
import { toast } from "react-toastify";

export const useRolesCommand = (refresh?: () => void) => {
   const { fetchData } = useFetch()
   const confirmation = useConfirmation()
   const [loadingAction, setLoadingAction] = useState(false);
   const [errors, setErrors] = useState<{ [key: string]: string }>({})

   const deleteRole = async (id: string) => {
      try {
         setLoadingAction(true)
         const confirmed = await confirmation({
            title: "Eliminar rol",
            message: "¿Estás seguro de que deseas eliminar este rol?",
         });
         if (!confirmed.isConfirmed) {
            return;
         }
         const response = await deleteRoleService(fetchData)(id)
         if (refresh) {
            refresh();
         }
         toast.success("Rol eliminado correctamente");
         return response;
      } catch (error) {
         toast.error(error.message);
      } finally {
         setLoadingAction(false)
      }
   }

   const createRole = async (role: RoleCreate) => {
      try {
         setLoadingAction(true)
         const response = await createRoleService(fetchData)(role)
         if (refresh) {
            refresh();
         }
         toast.success("Rol creado correctamente");
         return response;
      } catch (error) {
         toast.error(error.message);
      } finally {
         setLoadingAction(false)
      }
   }

   const updateRole = async (role: RoleUpdate) => {
      try {
         setLoadingAction(true)
         const confirmed = await confirmation({
            title: "Actualizar rol",
            message: "¿Estás seguro de que deseas actualizar este rol?",
         });
         if (!confirmed.isConfirmed) {
            return;
         }
         const response = await updateRoleService(fetchData)(role)
         if (refresh) {
            refresh();
         }
         toast.success("Rol actualizado correctamente");
         return response
      } catch (error) {
         toast.error(error.message);
      } finally {
         setLoadingAction(false)
      }
   }

   const validations = (role: RoleCreate | RoleUpdate) => {
      const errors: { [key: string]: string } = {}

      if (!role.description) {
         errors.description = "La descripción es requerida"
      }

      const hasErrors = Object.keys(errors).length > 0
      setErrors(errors)
      return { hasErrors }
   }

   return {
      deleteRole,
      createRole,
      updateRole,
      validations,
      errors,
      loadingAction
   }
}