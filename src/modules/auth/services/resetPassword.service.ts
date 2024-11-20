import { FetchData } from "@/common/hooks/useFetch";

export const resetPasswordService = (fetch: FetchData) => async (email: string, password: string) => {
   try {
      interface RequestBody { email: string, password: string };
      const response = await fetch<RequestBody, void>({
         url: "/api/reset-password",
         method: "post",
         body: { email, password }
      })

      return response.data
   } catch (error) {
      console.error("Error resetting password", error);
      throw new Error(error.response?.data?.message || "Error resetting password");
   }
}