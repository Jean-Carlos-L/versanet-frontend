import { useFetch } from "@/common/hooks/useFetch";
import { getCountEntitiesService } from "../services/getCountEntities.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const useCountEntitiesQuery = () => {
  const { fetchData } = useFetch();
  const [data, setData] = useState<{
    users: number;
    customers: number;
    contracts: number;
    invoices: number;
  } | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountEntities = async () => {
    try {
      setLoading(true);
      const response = await getCountEntitiesService(fetchData)();
      setData(response);
    } catch (error) {
      toast.error("Error fetching entity counts");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountEntities();
  }, []);

  return { data, loading, error };
};
