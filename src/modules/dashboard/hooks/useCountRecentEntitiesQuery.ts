import { useFetch } from "@/common/hooks/useFetch";
import { getCountRecentEntitiesService } from "../services/getCountRecentEntities.service";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export const useCountRecentEntitiesQuery = () => {
  const { fetchData } = useFetch();
  const [data, setData] = useState<{
    customers: {
      thisMonth: number;
      percentageChange: number;
    };
    contracts: {
      thisMonth: number;
      percentageChange: number;
    };
    invoices: {
      thisMonth: number;
      percentageChange: number;
    };
  } | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountEntities = async () => {
    try {
      setLoading(true);
      const response = await getCountRecentEntitiesService(fetchData)();
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
