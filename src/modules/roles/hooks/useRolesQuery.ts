import { useFetch } from "@/common/hooks/useFetch"
import { Role } from "@/common/models/Role"
import { useEffect, useState } from "react"
import { getRolesService } from "../services/getRoles.service"

export const useRolesQuery = () => {
   const { fetchData } = useFetch()
   const [roles, setRoles] = useState<Role[]>([])
   const [loading, setLoading] = useState(false)
   const [refresh, setRefresh] = useState(false)

   const getRoles = async (filters?: Record<string, string>) => {
      try {
         setLoading(true)
         const response = await getRolesService(fetchData)(filters)
         setRoles(response)
      } catch (error) {
         alert(error.message)
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      getRoles()
   }, [refresh])

   return {
      roles,
      loading,
      refresh: () => setRefresh(!refresh)
   }
}