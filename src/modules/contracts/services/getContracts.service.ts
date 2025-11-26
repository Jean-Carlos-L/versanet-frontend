import { FetchData } from "@/common/hooks/useFetch";
import { FiltersContracts } from "../hooks/useFiltersContracts";

export const getContractsService = (fetch: FetchData) => async (filters?: FiltersContracts) => {
  try {
    const params = {
      page: filters?.page || 1,
      pageSize: filters?.pageSize || 10,
      ...(filters?.estado && { estado: filters.estado }),
      ...(filters?.plan && { plan: filters.plan }), // Alias para plan_name
      ...(filters?.customer && { customer_name: filters.customer }),
      ...(filters?.customer_document && { customer_document: filters.customer_document }),
      ...(filters?.date_from && { date_from: filters.date_from }),
      ...(filters?.date_to && { date_to: filters.date_to }),
    };
    const searchParams = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();

    const raw = await fetch({ url: `/api/contracts?${searchParams}` });

    // Normalize different backend shapes:
    // - { data: { data: [...], total, totalPages, page, pageSize } }
    // - { data: [...], total, totalPages, page, pageSize }
    // - [...] (direct array)
    const responseAny: any = raw;
    const maybeNested = responseAny?.data;
    const dataArray = maybeNested?.data ?? (Array.isArray(maybeNested) ? maybeNested : (Array.isArray(responseAny) ? responseAny : maybeNested));

    const total = maybeNested?.total ?? responseAny?.total ?? (Array.isArray(dataArray) ? dataArray.length : 0);
    const totalPages = maybeNested?.totalPages ?? responseAny?.totalPages ?? 1;
    const page = maybeNested?.page ?? responseAny?.page ?? (filters?.page || 1);
    const pageSize = maybeNested?.pageSize ?? responseAny?.pageSize ?? (filters?.pageSize || 10);

    return {
      data: Array.isArray(dataArray) ? dataArray : [],
      total,
      totalPages,
      page,
      pageSize,
    };
  } catch (error) {
    throw new Error(error?.response?.data?.error || "Ocurrió un error al obtener los contratos");
  }
};
