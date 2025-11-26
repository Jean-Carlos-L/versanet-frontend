import { FetchData } from "@/common/hooks/useFetch";

export const recoverPasswordService = (fetch: FetchData) => async (email: string, password: string, code: string) => {
   try {
      interface RequestBody { email: string, password: string, code: string };
      const response = await fetch<RequestBody, void>({
         url: "/api/auth/recover-password",
         method: "post",
         body: { email, password, code }
      })

      return response.data
   } catch (error) {
      console.error("Error resetting password", error);
      throw new Error(error.response?.data?.message || "Error resetting password");
   }
}