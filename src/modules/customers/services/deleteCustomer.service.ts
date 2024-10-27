import { FetchData } from "@/common/hooks/useFetch";

export const deleteCustomerService = (fetch: FetchData) => async (id: string) => {
    try{
        const response = await fetch({
            url: `/api/customers/${id}`,
            method: "delete",
        });

        return response.data;
    }catch(error){
        console.error(error);
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al obtener los roles"
        );
    }
};