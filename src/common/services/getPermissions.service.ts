import { FetchData } from "../hooks/useFetch";
import { Permission } from "../models/Permission";

export const getPermissionsService =
  (fetch: FetchData) => async (): Promise<Permission[]> => {
    try {
      const response = await fetch<void, Permission[]>({
        url: "/api/permissions",
      });
      return response.data.map((permission) => ({
        id: permission.id,
        description: permission.description,
        code: permission.code,
        status: permission.status,
      }));
    } catch (error) {
      console.error("Error fetching permissions", error);
      throw new Error(
        error?.response?.data?.message || "Error fetching permissions"
      );
    }
  };
