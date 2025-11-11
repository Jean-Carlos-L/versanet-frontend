import { FetchData } from "@/common/hooks/useFetch";

export const deleteInventoryService = (fetch: FetchData) => async (id: string) => {
    try {
        const response = await fetch({
            url: `/api/inventory/${id}`,
            method: "delete",
        });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 404) {
            try {
                const response2 = await fetch({
                    url: `/api/inventory/${id}`,
                    method: "delete",
                });
                return response2.data;
            } catch (err2) {
                console.error(err2);
                throw new Error(
                    err2?.response?.data?.message || "Ocurrió un error al eliminar el inventario"
                );
            }
        }

        console.error(error);
        throw new Error(
            error?.response?.data?.message || "Ocurrió un error al eliminar el inventario"
        );
    }

}