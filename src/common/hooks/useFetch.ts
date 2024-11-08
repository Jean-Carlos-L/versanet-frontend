import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../routers/routes";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth.slice";

const defaultHeaders = {
  "Content-Type": "application/json",
};

axios.defaults.withCredentials = true;

export const useFetch = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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
        withCredentials: true,
      };

      const response = await axios(config);
      return response;
    } catch (error) {
      console.error(error);
      if (error.response.status === 401 && ROUTES.LOGIN !== pathname) {
        dispatch(logout());
        navigate("/login");
      }
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
