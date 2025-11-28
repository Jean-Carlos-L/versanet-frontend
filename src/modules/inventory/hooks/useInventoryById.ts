import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { Inventory } from "@/common/models/Inventory";
import { getInventoryByIdService } from "../services/getInventoryId.service";
import { inventoryAdapter } from "../adapters/inventory.adapter";

export const useInventoryById = (id: string) => {
    const { fetchData } = useFetch();
    const [inventory, setInventory] = useState<Inventory | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            if (!id) {
                setLoading(false);
                return;
            }
            try {
                const response = await getInventoryByIdService(fetchData)(id);
                setInventory(inventoryAdapter(response));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, [id]);

    return { inventory, loading };
};