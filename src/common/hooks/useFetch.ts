import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
// import { useLocation, useNavigate } from "react-router-dom";
// import { ROUTES } from "../routes/routes";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/slices/auth.slice";

const defaultHeaders = {
   "Content-Type": "application/json"
};

axios.defaults.withCredentials = true;

export const useFetch = () => {
   const BASE_URL = import.meta.env.VITE_BASE_URL;
   // const location = useLocation();
   // const pathname = location.pathname
   // const dispatch = useDispatch()
   // const navigate = useNavigate()

   const fetchData: FetchData = async <T, R>({ url, method = "get", body, headers = defaultHeaders, responseType = "json" }: FetchParams<T>): Promise<AxiosResponse<R>> => {
      try {
         const config: AxiosRequestConfig = {
            method,
            url: `${BASE_URL}${url}`,
            headers,
            data: body,
            responseType
         };

         const response = await axios(config);
         return response;
      } catch (error) {
         // const codeError = error.response?.status;
         // if (codeError === 401 && pathname !== ROUTES.LOGIN) {
         //    dispatch(logout())
         //    navigate(ROUTES.LOGIN)
         // }

         // console.error(codeError)
         console.error(error)
         throw error
      }


   };

   return {
      fetchData
   }
}

export interface FetchParams<T> {
   url: string;
   method?: "get" | "post" | "put" | "delete" | "patch";
   body?: T;
   headers?: { [key: string]: string };
   responseType?: "blob" | "json";
}

export type FetchData = <T, R>(params: FetchParams<T>) => Promise<AxiosResponse<R>>;