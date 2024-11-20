import { useDispatch } from "react-redux"
import { logout as logoutSlice, login as loginSlice } from "@/common/redux/auth.slice"
import { useFetch } from "@/common/hooks/useFetch"
import { loginService } from "../services/login.service"
import { toast } from "react-toastify"
import { logoutService } from "../services/logout.service"
import { resetPasswordService } from "../services/resetPassword.service"

export const useAuthCommand = () => {
   const { fetchData } = useFetch()
   const dispatch = useDispatch()

   const login = async (email: string, password: string) => {
      try {
         const response = await loginService(fetchData)(email, password);
         dispatch(loginSlice(response));
         return response;
      } catch (error) {
         console.error("Error while trying to login", error);
         toast.error(error.message);
         throw new Error(error.message)
      }
   }

   const logout = async () => {
      try {
         await logoutService(fetchData)();
         dispatch(logoutSlice());
      } catch (error) {
         console.error("Error while trying to logout", error);
         toast.error(error.message);
         throw new Error(error.message)
      }
   }

   const resetPassword = async (email: string, password: string) => {
      try {
         await resetPasswordService(fetchData)(email, password);
         toast.success("Contraseña cambiada correctamente");
      } catch (error) {
         console.error("Error while trying to reset password", error);
         toast.error(error.message);
         throw new Error(error.message)
      }
   }

   return {
      logout,
      login,
      resetPassword
   }
}