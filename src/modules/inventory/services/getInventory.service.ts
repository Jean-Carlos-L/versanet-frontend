import { FetchData } from "@/common/hooks/useFetch";
import { FiltersInventory } from "../hooks/useFilters";
import { Inventory } from "@/common/models/Inventory";
import { inventoryAdapter } from "../adapters/inventory.adapter";

interface ResponseData {
  data: Inventory[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export const getInventoryService =
  (fetch: FetchData) =>
  async (
    filters: FiltersInventory,
    page?: number,
    pageSize?: number
  ): Promise<ResponseData> => {
    try {
      const searchParams = new URLSearchParams(
        Object.entries({
          "page": page?.toString(),
          "pageSize": pageSize?.toString(),
          ...filters,
        })
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString();
      interface ResponseApi {
        data: Inventory[];
        page: number;
        total: number;
        totalPages: number;
        pageSize: number;
      }

      const response = await fetch<void, ResponseApi>({
        url: `/api/inventory?${searchParams}`,
      });

      return {
        data: response.data.data.map(inventoryAdapter),
        pagination: {
          total: response.data.total,
          page: response.data.page,
          totalPages: response.data.totalPages,
        },
      };
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
      throw new Error(
        error.response?.data?.message ||
          "Ocurrió un error al obtener el inventario"
      );
    }
  };
