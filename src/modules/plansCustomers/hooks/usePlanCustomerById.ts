import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { PlanCustomer } from "@/common/models/PlanCustomer";
import { getPlanCustomerByIdService } from "../services/getPlanCustomerById.service";

export const usePlanCustomerById = (id: string) => {
    const { fetchData } = useFetch();
    const [planCustomer, setPlanCustomer] = useState<PlanCustomer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlanCustomer = async () => {
            try {
                const response = await getPlanCustomerByIdService(fetchData)(id);
                setPlanCustomer(response);
            } catch (error) {
                alert(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPlanCustomer();
    }, [id])
    return { planCustomer, loading };
}