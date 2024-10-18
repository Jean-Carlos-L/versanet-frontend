import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Habilita las cookies en todas las peticiones de Axios
axios.defaults.withCredentials = true;

export const useFetch = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchData: FetchData = async <T, R>({
    url,
    method = "get",
    body,
    headers = defaultHeaders,
    responseType = "json",
  }: FetchParams<T>): Promise<AxiosResponse<R>> => {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: `${BASE_URL}${url}`,
        headers,
        data: body,
        responseType,
        // 'withCredentials' para asegurarse de que las cookies se envían en cada solicitud
        withCredentials: true, // Esta línea garantiza el envío de cookies en cada solicitud
      };

      const response = await axios(config);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    fetchData,
  };
};

export interface FetchParams<T> {
  url: string;
  method?: "get" | "post" | "put" | "delete" | "patch";
  body?: T;
  headers?: { [key: string]: string };
  responseType?: "blob" | "json";
}

export type FetchData = <T, R>(
  params: FetchParams<T>
) => Promise<AxiosResponse<R>>;
