import { FetchData } from "@/common/hooks/useFetch";
import { AuthResponse } from "@/common/models/Auth";

export const loginService =
   (fetch: FetchData) => async (email: string, password: string): Promise<AuthResponse> => {
      try {
         interface RequeresBody { email: string, password: string }
         interface Reponse { data: AuthResponse, message: string }
         const response = await fetch<RequeresBody, Reponse>({
            url: "/api/login",
            method: "post",
            body: { email, password },
         });
         return response.data.data
      } catch (error) {
         console.error(error);
         throw new Error(
            error?.response?.data?.message || "Ocurrió un error al autenticar"
         );
      }
   };
