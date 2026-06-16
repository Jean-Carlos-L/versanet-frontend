import { useFetch } from "@/common/hooks/useFetch";
import { useEffect, useState } from "react";
import { getPercentageDistributionPlansService } from "../services/getPercentageDistributionPlans.service";
import { toast } from "react-toastify";

export const usePercentageDistributionPlansQuery = () => {
    const {fetchData} = useFetch();
    const [data, setData] = useState<{ plan: string; percentage: number }[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetchPercentageDistributionPlans = async () => {
        try {
            setLoading(true);
            const response = await getPercentageDistributionPlansService(fetchData)();
            setData(response);
        } catch (error) {
            toast.error("Error fetching percentage distribution of plans");
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchPercentageDistributionPlans();
    }, []);
    
    return {data, loading, error};
}