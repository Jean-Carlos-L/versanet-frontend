import { RootState } from "@/common/redux/store.slice"
import { useSelector } from "react-redux"

export const useAuthQuery = () => {
   const { isAuth, user } = useSelector((state: RootState) => state.auth)

   const hasPermission = (permission: string) => {
      return user.permissions.includes(permission)
   }

   return { isAuth, hasPermission }
}