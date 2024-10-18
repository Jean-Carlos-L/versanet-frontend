import { FetchData } from "../hooks/useFetch";
import { Permission } from "../models/Permission";

export const getPermissionsService =
  (fetch: FetchData) => async (): Promise<Permission[]> => {
    try {
      interface Response {
        data: Permission[];
        message: string;
      }
      const response = await fetch<void, Response>({ url: "/api/permissions" });
      return response.data.data.map((permission) => ({
        id: permission.id,
        description: permission.description,
        url: permission.url,
        status: permission.status,
      }));
    } catch (error) {
      console.error("Error fetching permissions", error);
      throw new Error(
        error?.response?.data?.message || "Error fetching permissions"
      );
    }
  };
