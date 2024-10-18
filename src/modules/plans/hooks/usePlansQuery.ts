import { Plan } from "@/common/models/Plan"
import { useEffect, useState } from "react"
import { getPlansService } from "../services/getPlans.service"
import { useFetch } from "@/common/hooks/useFetch"

export const usePlansQuery = () => {
   const { fetchData } = useFetch()
   const [plans, setPlans] = useState<Plan[]>([])
   const [loading, setLoading] = useState(false)

   const getPlans = async () => {
      try {
         setLoading(true)
         const response = await getPlansService(fetchData)()
         setPlans(response)
      } catch (error) {
         alert(error.message)
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      getPlans()
   }, [])

   return {
      plans,
      loading,
   }
}