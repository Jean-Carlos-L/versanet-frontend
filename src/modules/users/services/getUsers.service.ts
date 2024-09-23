// import { FetchData } from "@/common/hooks/useFetch";

// //filtros de busqueda de usuarios (nombre, rol, estado)
// export const getUsersService = (fetch: FetchData) => asyn (filters: any) => {
//     try {
//         const searchParams = new URLSearchParams(filters).toString();
//         const response = await fetch<void, User[]>({
//         url: `/api/v1/users?${searchParams}`,
//         });

//         return response.data.map(userAdapter);
//     } catch (error) {
//         console.error(error);
//         throw new Error(
//         error?.response?.data?.message || "Ocurrió un error al obtener los usuarios"
//         );
//     }
// };
