import { customerAdapter } from './../adapters/customer.adapter';
import { Customer } from "@/common/models/Customer";
import { FetchData } from "@/common/hooks/useFetch";

export const getCustomerByIdService = (fetch: FetchData) => async (id: string): Promise<Customer> => {
   try {
      interface typeResponse { data: Customer, message: string }
      const response = await fetch<void, typeResponse>({
         url: `/api/customers/${id}`,
         method: "get"
      })
      return customerAdapter(response.data.data);
   } catch (error) {
      console.error(error);
      throw new Error(
         error?.response?.data?.message ||
         "Ocurrió un error al obtener los clientes"
      );
   }
}