import { FetchData } from "@/common/hooks/useFetch";

export const disableContractService = (fetch: FetchData) => async (id: string) => {
   try {
      const response = await fetch<any, any>({
         url: `/api/contracts/${id}`,
         method: "put",
         body: { status: 'inactivo' }
      });
      const raw: any = response?.data;
      return raw?.message ?? raw;
   } catch (error) {
      console.error(error);
      throw new Error(
         error?.response?.data?.message || "Ocurrió un error al deshabilitar el contrato"
      );
   }
}
