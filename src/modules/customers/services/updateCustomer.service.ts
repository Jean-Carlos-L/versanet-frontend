import { FetchData } from "@/common/hooks/useFetch";
import { CustomerUpdate } from "@/common/models/Customer";

export const updateCustomerService =
   (fetch: FetchData) => async (customer: CustomerUpdate) => {
      try {
         const response = await fetch({
            url: `/api/customers/${customer.id}`,
            method: "put",
            body: customer,
         });

         return response.data;
      } catch (error) {
         console.error(error);
         throw new Error(
            error?.response?.data?.message || "Ocurrió un error al actualizar el cliente"
         );
      }
   };