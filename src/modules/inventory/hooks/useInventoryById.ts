import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { Inventory } from "@/common/models/Inventory";
import { getInventoryByIdService } from "../services/getInventoryId.service.ts";

export const useInventoryById = (id: string) => {
    const { fetchData } = useFetch();
    const [inventory, setInventory] = useState<Inventory | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await getInventoryByIdService(fetchData)(id);
                setInventory(response);
            } catch (error) {
                alert(error.message);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchInventory();
    }, [id])
    return { inventory, loading };
}