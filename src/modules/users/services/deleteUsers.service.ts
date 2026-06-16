import { FetchData } from "@/common/hooks/useFetch";

export const deleteUserService = (fetch: FetchData) => async (id: string) => {
  try {
    const response = await fetch({
      url: `/api/users/${id}`,
      method: "delete",
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error?.response?.data?.message ||
      "Ocurrió un error al obtener los usuarios"
    );
  }
};
