import { useFetch } from "@/common/hooks/useFetch"
import { Customer } from "@/common/models/Customer"
import { useEffect, useState } from "react"
import { getCustomersService } from './../services/getCustomers.service';

export const useCustomersQuery = () => {
   const { fetchData } = useFetch()
   const [customers, setCustomers] = useState<Customer[]>([])
   const [loading, setLoading] = useState(false)
   const [refresh, setRefresh] = useState(false)

   const getCustomers = async (filters?: Record<string, string>) => {
      try {
         setLoading(true)
         const response = await getCustomersService(fetchData)(filters)
         setCustomers(response)
      } catch (error) {
         alert(error.message)
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      getCustomers()
   }, [refresh])

   return {
      customers,
      loading,
      refresh: () => setRefresh(!refresh)
   }
}