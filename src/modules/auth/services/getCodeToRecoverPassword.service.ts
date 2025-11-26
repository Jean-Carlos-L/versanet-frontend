import { FetchData } from "@/common/hooks/useFetch";

export const getCodeToRecoverPasswordService = (fetch: FetchData) => async (email: string) => {
   try {
      interface RequestBody { email: string };
      const response = await fetch<RequestBody, void>({
         url: "/api/auth/generate-recovery-code",
         method: "post",
         body: { email }
      })

      return response.data
   } catch (error) {
      console.error("Error getting recovery code", error);
      throw new Error(error.response?.data?.message || "Error getting recovery code");
   }
}