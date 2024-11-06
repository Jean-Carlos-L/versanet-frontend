import { FetchData } from "@/common/hooks/useFetch";
import { Customer } from "@/common/models/Customer";
import { customerAdapter } from "../adapters/customer.adapter";

export const getCustomersService =
    (fetch: FetchData) =>
        async (filters?: Record<string, string>): Promise<Customer[]> => {
            try {
                interface typeResponse { data: Customer[], message: string }
                const searchParams = new URLSearchParams(filters).toString();
                const response = await fetch<void, typeResponse>({
                    url: `/api/customers?${searchParams}`,
                });

                return response.data.data.map(customerAdapter);
            } catch (error) {
                console.error(error);
                throw new Error(
                    error?.response?.data?.message ||
                    "Ocurrió un error al obtener los clientes"
                );
            }
        };