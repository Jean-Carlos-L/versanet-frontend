import { useEffect, useState } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { Contract } from "@/common/models/Contract";
import { getContractByIdService } from "../services/getContractById.service";
import { contractAdapter } from "../adapters/contract.adapter";

export const useContractById = (id: string) => {
  const { fetchData } = useFetch();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContract = async () => {
      if (!id) return;
      try {
        const response = await getContractByIdService(fetchData)(id);
        setContract(contractAdapter(response));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContract();
  }, [id]);

  return { contract, loading };
};
