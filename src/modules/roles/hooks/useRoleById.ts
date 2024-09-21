import { useFetch } from "@/common/hooks/useFetch"
import { Role } from "@/common/models/Role"
import { useEffect, useState } from "react"
import { getRoleByIdService } from "../services/getRoleById.service"

export const useRoleById = (id: string) => {
   const { fetchData } = useFetch()
   const [role, setRole] = useState<Role | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchRole = async () => {
         try {
            const response = await getRoleByIdService(fetchData)(id)
            setRole(response)
         } catch (error) {
            alert(error.message)
            console.error(error)
         } finally {
            setLoading(false)
         }
      }

      fetchRole()
   }, [id])

   return { role, loading }
}