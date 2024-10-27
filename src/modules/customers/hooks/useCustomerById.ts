import { useFetch } from "@/common/hooks/useFetch"
import { Customer } from "@/common/models/Customer"
import { useEffect, useState } from "react"
import { getCustomerByIdService } from "../services/getCostumerById.service"

export const useCustomerById = (id: string) => {
   const { fetchData } = useFetch()
   const [customer, setCustomer] = useState<Customer | null>(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchCustomer = async () => {
         try {
            const response = await getCustomerByIdService(fetchData)(id)
            setCustomer(response)
         } catch (error) {
            alert(error.message)
            console.error(error)
         } finally {
            setLoading(false)
         }
      }

      fetchCustomer()
   }, [id])

   return { customer, loading }
}
