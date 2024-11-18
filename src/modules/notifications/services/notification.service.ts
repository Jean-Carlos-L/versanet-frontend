import { FetchData } from "@/common/hooks/useFetch";

export const getNotificationService = (fetch: FetchData) => async () => {
  try {
    interface typeResponse {
      data: Notification[];
      message: string;
    }
    const response = await fetch<void, typeResponse>({
      url: "/api/notifications",
      method: "get",
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error?.response?.data?.message ||
        "Ocurrió un error al obtener las notificaciones"
    );
  }
};
