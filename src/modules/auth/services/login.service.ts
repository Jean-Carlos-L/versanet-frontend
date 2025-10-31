import { FetchData } from "@/common/hooks/useFetch";
import { AuthResponse } from "@/common/models/Auth";

export const loginService =
  (fetch: FetchData) =>
  async (email: string, password: string): Promise<AuthResponse> => {
    try {
      interface RequeresBody {
        email: string;
        password: string;
      }

      const response = await fetch<RequeresBody, AuthResponse>({
        url: "/api/auth/login",
        method: "post",
        body: { email, password },
      });

      console.log("response:", response.data);

      return response.data
    } catch (error) {
      console.error(error);
      throw new Error(
        error?.response?.data?.message || "Ocurrió un error al autenticar"
      );
    }
  };
