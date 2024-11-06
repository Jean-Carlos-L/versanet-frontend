import { FetchData } from "@/common/hooks/useFetch";
import { CustomerCreate } from "@/common/models/Customer";

export const createCustomerService =
   (fetch: FetchData) => async (customer: CustomerCreate) => {
      console.log(customer);
      try {
         const response = await fetch({
            url: "/api/customers",
            method: "post",
            body: customer,
         });

         return response.data;
      } catch (error) {
        
        console.log(customer);
         throw new Error(
            error?.response?.data?.message || "Ocurrió un error al crear el cliente"
         );
      }
   };